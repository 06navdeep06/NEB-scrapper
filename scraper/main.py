"""
NEB Notes Scraper
=================
Scrapes educational content from nebplus2notes.com and readersnepal.com,
cleans it, and stores structured JSON in the /data directory.

Usage:
    python -m scraper.main                    # Scrape all sources
    python -m scraper.main --source nebplus2  # Scrape only nebplus2notes
    python -m scraper.main --source readers   # Scrape only readersnepal
    python -m scraper.main --convert-existing # Convert existing data.ts to JSON
"""

import argparse
import hashlib
import json
import os
import re
import sys

from .utils import save_json, load_json, polite_delay, logger, DATA_DIR
from .parsers import (
    NEBPLUS2_SUBJECTS,
    READERS_SUBJECTS,
    scrape_nebplus2_subject_page,
    scrape_nebplus2_chapter,
    scrape_readers_subject_page,
    scrape_readers_chapter,
)


def generate_id(class_num: int, subject: str, chapter_title: str) -> str:
    """Generate a deterministic chapter ID."""
    raw = f"{class_num}-{subject}-{chapter_title}".lower()
    short_hash = hashlib.md5(raw.encode()).hexdigest()[:6]
    slug = re.sub(r"[^a-z0-9]+", "-", subject.lower()).strip("-")
    return f"{slug}-{class_num}-{short_hash}"


def get_scraped_urls() -> set:
    """Load already-scraped URLs to avoid duplicates."""
    tracker = load_json("_scraped_urls.json")
    if tracker:
        return set(tracker.get("urls", []))
    return set()


def save_scraped_urls(urls: set):
    """Save the set of already-scraped URLs."""
    save_json({"urls": sorted(urls)}, "_scraped_urls.json")


def scrape_nebplus2():
    """Scrape all content from nebplus2notes.com."""
    logger.info("=" * 60)
    logger.info("Starting nebplus2notes.com scrape")
    logger.info("=" * 60)

    scraped_urls = get_scraped_urls()
    all_data = load_json("nebplus2_data.json") or {"source": "nebplus2notes.com", "subjects": []}
    existing_subjects = {s["subject"]: s for s in all_data["subjects"]}

    for class_num, faculties in NEBPLUS2_SUBJECTS.items():
        for faculty, subjects in faculties.items():
            for subject_name, subject_url in subjects.items():
                logger.info(f"\n--- Class {class_num} | {faculty} | {subject_name} ---")

                if subject_url in scraped_urls:
                    logger.info(f"Already scraped subject page, skipping: {subject_url}")
                    continue

                # Get chapter list
                chapters_list = scrape_nebplus2_subject_page(subject_url)
                polite_delay()

                if not chapters_list:
                    logger.warning(f"No chapters found for {subject_name}")
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

                    chapter_data = scrape_nebplus2_chapter(ch_url)
                    polite_delay()

                    if chapter_data:
                        chapter_data["id"] = generate_id(class_num, subject_name, chapter_data["title"])
                        subject_entry["chapters"].append(chapter_data)
                        scraped_urls.add(ch_url)
                        logger.info(f"✓ Scraped: {chapter_data['title']}")
                    else:
                        logger.warning(f"✗ Failed: {ch_info['title']}")

                scraped_urls.add(subject_url)
                existing_subjects[subject_key] = subject_entry

    all_data["subjects"] = list(existing_subjects.values())
    save_json(all_data, "nebplus2_data.json")
    save_scraped_urls(scraped_urls)
    logger.info(f"nebplus2notes.com scrape complete. {len(all_data['subjects'])} subjects saved.")


def scrape_readers():
    """Scrape all content from readersnepal.com."""
    logger.info("=" * 60)
    logger.info("Starting readersnepal.com scrape")
    logger.info("=" * 60)

    scraped_urls = get_scraped_urls()
    all_data = load_json("readers_data.json") or {"source": "readersnepal.com", "subjects": []}
    existing_subjects = {s["subject"]: s for s in all_data["subjects"]}

    for class_num, faculties in READERS_SUBJECTS.items():
        for faculty, subjects in faculties.items():
            for subject_name, subject_url in subjects.items():
                logger.info(f"\n--- Class {class_num} | {faculty} | {subject_name} ---")

                if subject_url in scraped_urls:
                    logger.info(f"Already scraped subject page, skipping")
                    continue

                chapters_list = scrape_readers_subject_page(subject_url)
                polite_delay()

                if not chapters_list:
                    logger.warning(f"No chapters found for {subject_name}")
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

                    chapter_data = scrape_readers_chapter(ch_url)
                    polite_delay()

                    if chapter_data:
                        chapter_data["id"] = generate_id(class_num, subject_name, chapter_data["title"])
                        subject_entry["chapters"].append(chapter_data)
                        scraped_urls.add(ch_url)
                        logger.info(f"✓ Scraped: {chapter_data['title']}")
                    else:
                        logger.warning(f"✗ Failed: {ch_info['title']}")

                scraped_urls.add(subject_url)
                existing_subjects[subject_key] = subject_entry

    all_data["subjects"] = list(existing_subjects.values())
    save_json(all_data, "readers_data.json")
    save_scraped_urls(scraped_urls)
    logger.info(f"readersnepal.com scrape complete. {len(all_data['subjects'])} subjects saved.")


def convert_existing_data():
    """Convert the existing data.ts into structured JSON for the backend."""
    logger.info("Converting existing data.ts to structured JSON...")

    data_ts_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)), "src", "lib", "data.ts"
    )

    if not os.path.exists(data_ts_path):
        logger.error(f"data.ts not found at: {data_ts_path}")
        return

    with open(data_ts_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract subjects array
    subjects = extract_ts_array(content, "subjects")
    chapters = extract_ts_array(content, "chapters")
    notes = extract_ts_array(content, "notes")
    past_papers = extract_ts_array(content, "pastPapers")
    mock_tests = extract_ts_array(content, "mockTests")
    questions = extract_ts_array(content, "questions")

    combined = {
        "source": "existing_data",
        "subjects": subjects,
        "chapters": chapters,
        "notes": notes,
        "pastPapers": past_papers,
        "mockTests": mock_tests,
        "questions": questions,
    }

    save_json(combined, "existing_data.json")
    logger.info("Existing data converted and saved to data/existing_data.json")


def extract_ts_array(content: str, var_name: str) -> list:
    """
    Extract a TypeScript array from data.ts content.
    This is a best-effort parser for the specific format used in this project.
    """
    # Find the variable declaration
    patterns = [
        rf"export\s+const\s+{var_name}\s*:\s*\w+(?:\[\])?\s*=\s*\[",
        rf"export\s+const\s+{var_name}\s*=\s*\[",
        rf"const\s+{var_name}\s*:\s*\w+(?:\[\])?\s*=\s*\[",
    ]

    start_idx = -1
    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            start_idx = match.end() - 1  # Position of the opening [
            break

    if start_idx == -1:
        logger.warning(f"Could not find array: {var_name}")
        return []

    # Find matching closing bracket
    depth = 0
    end_idx = start_idx
    for i in range(start_idx, len(content)):
        if content[i] == "[":
            depth += 1
        elif content[i] == "]":
            depth -= 1
            if depth == 0:
                end_idx = i + 1
                break

    array_str = content[start_idx:end_idx]

    # Convert TS object syntax to valid JSON
    # Add quotes around unquoted keys
    json_str = re.sub(r"(\w+)\s*:", r'"\1":', array_str)
    # Replace single quotes with double quotes
    json_str = json_str.replace("'", '"')
    # Remove trailing commas before } or ]
    json_str = re.sub(r",\s*([}\]])", r"\1", json_str)
    # Handle template literals (backtick strings) - replace with double quotes
    json_str = re.sub(r"`([^`]*)`", lambda m: '"' + m.group(1).replace('"', '\\"').replace("\n", "\\n") + '"', json_str)
    # Remove TypeScript type assertions
    json_str = re.sub(r"\bas\s+\w+(?:\[\])?", "", json_str)

    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        logger.warning(f"Could not parse {var_name} as JSON: {e}")
        # Save the problematic string for debugging
        debug_path = os.path.join(DATA_DIR, f"_debug_{var_name}.txt")
        with open(debug_path, "w", encoding="utf-8") as f:
            f.write(json_str[:5000])
        logger.info(f"Debug output saved to {debug_path}")
        return []


def main():
    parser = argparse.ArgumentParser(description="NEB Notes Scraper")
    parser.add_argument(
        "--source",
        choices=["nebplus2", "readers", "all"],
        default="all",
        help="Which source to scrape (default: all)",
    )
    parser.add_argument(
        "--convert-existing",
        action="store_true",
        help="Convert existing data.ts to JSON",
    )
    args = parser.parse_args()

    if args.convert_existing:
        convert_existing_data()
        return

    if args.source in ("nebplus2", "all"):
        scrape_nebplus2()

    if args.source in ("readers", "all"):
        scrape_readers()

    logger.info("\nAll scraping complete!")
    logger.info(f"Data saved to: {DATA_DIR}")


if __name__ == "__main__":
    main()
