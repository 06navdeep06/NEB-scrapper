# This file is a leftover from a refactor. It is safe to delete.
# main.py now contains the same registry-driven scraper logic.
"""
NEB Notes Scraper — Universal Edition
======================================
Scrapes educational content from any source defined in scraper/sources.py,
cleans it, and stores structured JSON in the /data directory.

Usage:
    python -m scraper.main                         # Scrape all sources
    python -m scraper.main --source nebplus2       # One source by key
    python -m scraper.main --source readers
    python -m scraper.main --source tyrocity
    python -m scraper.main --source hamronotes
    python -m scraper.main --source kullabs
    python -m scraper.main --list-sources          # Show registered sources
    python -m scraper.main --retry-failed
    python -m scraper.main --merge-sources         # Run build_neb_data after scraping
    python -m scraper.main --force-rescrape        # Clear URL cache
    python -m scraper.main --min-length 200        # Override quality threshold
"""

import argparse
import hashlib
import json
import os
import re
import sys

from .utils import save_json, load_json, polite_delay, logger, DATA_DIR
from .sources import SOURCES, SOURCES_BY_KEY, SourceConfig
from .generic import scrape_subject_page, scrape_chapter
from .parsers import validate_content_quality


def generate_id(class_num: int, subject: str, chapter_title: str) -> str:
    raw = f"{class_num}-{subject}-{chapter_title}".lower()
    short_hash = hashlib.md5(raw.encode()).hexdigest()[:6]
    slug = re.sub(r"[^a-z0-9]+", "-", subject.lower()).strip("-")
    return f"{slug}-{class_num}-{short_hash}"


def get_scraped_urls() -> set:
    tracker = load_json("_scraped_urls.json")
    return set(tracker.get("urls", [])) if tracker else set()


def save_scraped_urls(urls: set):
    save_json({"urls": sorted(urls)}, "_scraped_urls.json")


def get_failed_pages() -> dict:
    return load_json("_failed_pages.json") or {"failed": []}


def log_failed_page(url: str, reason: str, source: str):
    data = get_failed_pages()
    existing_urls = {e["url"] for e in data["failed"]}
    if url not in existing_urls:
        data["failed"].append({"url": url, "reason": reason, "source": source})
        save_json(data, "_failed_pages.json")
        logger.warning(f"Failed page logged: {url} — {reason}")


def scrape_source(config: SourceConfig, min_length: int = 0):
    """Scrape all content for a single SourceConfig entry."""
    logger.info("=" * 60)
    logger.info(f"Starting scrape: {config.name}")
    logger.info("=" * 60)

    scraped_urls = get_scraped_urls()
    out_file = f"{config.key}_data.json"
    all_data = load_json(out_file) or {"source": config.name, "subjects": []}
    existing_subjects = {s["subject"]: s for s in all_data["subjects"]}

    for class_num, faculties in config.subjects.items():
        for faculty, subjects in faculties.items():
            for subject_name, subject_url in subjects.items():
                logger.info(f"\n--- Class {class_num} | {faculty} | {subject_name} ---")

                if subject_url in scraped_urls:
                    logger.info("Already scraped subject page, skipping")
                    continue

                chapters_list = scrape_subject_page(config, subject_url, subject=subject_name)
                polite_delay()

                if not chapters_list:
                    logger.warning(f"No chapters found for {subject_name} at {subject_url}")
                    continue

                subject_key = f"{class_num}-{faculty}-{subject_name}"
                subject_entry = existing_subjects.get(subject_key, {
                    "class": class_num,
                    "faculty": faculty,
                    "subject": subject_name,
                    "chapters": [],
                })

                existing_chapter_urls = {c.get("source_url") for c in subject_entry["chapters"]}

                for ch_info in chapters_list:
                    ch_url = ch_info["url"]
                    if ch_url in scraped_urls or ch_url in existing_chapter_urls:
                        logger.info(f"Already scraped: {ch_info['title']}")
                        continue

                    chapter_data = scrape_chapter(config, ch_url)
                    polite_delay()

                    if chapter_data:
                        ok, reason = validate_content_quality(chapter_data.get("content", ""))
                        if not ok:
                            logger.warning(f"✗ Low quality ({reason}): {ch_info['title']}")
                            log_failed_page(ch_url, reason, config.key)
                        else:
                            chapter_data["id"] = generate_id(
                                class_num, subject_name, chapter_data["title"]
                            )
                            subject_entry["chapters"].append(chapter_data)
                            scraped_urls.add(ch_url)
                            logger.info(f"✓ Scraped: {chapter_data['title']}")
                    else:
                        logger.warning(f"✗ Failed: {ch_info['title']}")
                        log_failed_page(ch_url, "scrape returned None", config.key)

                scraped_urls.add(subject_url)
                existing_subjects[subject_key] = subject_entry

    all_data["subjects"] = list(existing_subjects.values())
    save_json(all_data, out_file)
    save_scraped_urls(scraped_urls)
    logger.info(f"{config.name} scrape complete. {len(all_data['subjects'])} subjects saved.")


def retry_failed_pages(min_length: int = 0):
    failed = get_failed_pages()
    pages = failed.get("failed", [])
    if not pages:
        logger.info("No failed pages to retry.")
        return

    logger.info(f"Retrying {len(pages)} failed pages...")
    scraped_urls = get_scraped_urls()

    import scraper.parsers as _parsers
    original_min = _parsers.MIN_CONTENT_CHARS
    if min_length > 0:
        _parsers.MIN_CONTENT_CHARS = min_length

    still_failed = []
    for entry in pages:
        url = entry["url"]
        source_key = entry.get("source", "unknown")
        config = SOURCES_BY_KEY.get(source_key)

        logger.info(f"Retrying [{source_key}]: {url}")

        if config:
            result = scrape_chapter(config, url)
        else:
            logger.warning(f"Unknown source key '{source_key}' — skipping")
            still_failed.append(entry)
            continue

        polite_delay()

        if result:
            ok, reason = validate_content_quality(result.get("content", ""))
            if ok:
                scraped_urls.add(url)
                logger.info(f"  ✓ Recovered: {url}")
            else:
                logger.warning(f"  ✗ Still low quality ({reason}): {url}")
                still_failed.append(entry)
        else:
            logger.warning(f"  ✗ Still failed: {url}")
            still_failed.append(entry)

    _parsers.MIN_CONTENT_CHARS = original_min
    save_scraped_urls(scraped_urls)
    save_json({"failed": still_failed}, "_failed_pages.json")
    recovered = len(pages) - len(still_failed)
    logger.info(f"Retry complete. {recovered} recovered, {len(still_failed)} still failing.")


def main():
    all_keys = [s.key for s in SOURCES]

    parser = argparse.ArgumentParser(description="NEB Notes Scraper — Universal Edition")
    parser.add_argument(
        "--source",
        default="all",
        help=f"Source key to scrape, or 'all'. Available: {', '.join(all_keys)}",
    )
    parser.add_argument(
        "--list-sources",
        action="store_true",
        help="Print all registered sources and exit",
    )
    parser.add_argument(
        "--force-rescrape",
        action="store_true",
        help="Clear scraped URL cache and re-scrape everything",
    )
    parser.add_argument(
        "--retry-failed",
        action="store_true",
        help="Re-scrape all URLs in data/_failed_pages.json",
    )
    parser.add_argument(
        "--min-length",
        type=int,
        default=0,
        metavar="CHARS",
        help="Override minimum content character threshold",
    )
    parser.add_argument(
        "--merge-sources",
        action="store_true",
        help="After scraping, merge all sources into neb_data.json",
    )
    args = parser.parse_args()

    if args.list_sources:
        print("\nRegistered sources:")
        for s in SOURCES:
            subject_count = sum(
                len(subj) for faculties in s.subjects.values() for subj in faculties.values()
            )
            print(f"  {s.key:<15} {s.name:<30} ({subject_count} subjects)")
        return

    if args.min_length > 0:
        import scraper.parsers as _parsers
        _parsers.MIN_CONTENT_CHARS = args.min_length
        logger.info(f"Minimum content length override: {args.min_length} chars")

    if args.force_rescrape:
        cache_path = os.path.join(DATA_DIR, "_scraped_urls.json")
        if os.path.exists(cache_path):
            os.remove(cache_path)
            logger.info("Cleared scraped URL cache — will re-scrape all pages.")

    if args.retry_failed:
        retry_failed_pages(min_length=args.min_length)
        return

    targets = SOURCES if args.source == "all" else []
    if args.source != "all":
        cfg = SOURCES_BY_KEY.get(args.source)
        if not cfg:
            logger.error(
                f"Unknown source '{args.source}'. "
                f"Available: {', '.join(all_keys)}"
            )
            sys.exit(1)
        targets = [cfg]

    for config in targets:
        scrape_source(config, min_length=args.min_length)

    logger.info("\nAll scraping complete!")
    logger.info(f"Data saved to: {DATA_DIR}")

    if args.merge_sources:
        logger.info("\nRunning --merge-sources: merging all scraped content into neb_data.json...")
        from scraper.build_neb_data import build
        build(dry_run=False)


if __name__ == "__main__":
    main()
