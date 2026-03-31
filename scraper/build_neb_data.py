"""
build_neb_data.py
=================
Merges scraped chapter content (nebplus2_data.json / readers_data.json)
into the canonical neb_data.json that the backend serves.

Matching strategy:
  - Normalise subject names to match existing subject IDs (phy, chem, …)
  - Match scraped chapter titles to existing chapter titles via
    normalised string similarity (lower-case, strip punctuation)
  - If a match is found: replace/add a Note record with full HTML content
  - If multiple sources match the same chapter: merge their content
    (deduplication, heading normalization, paragraph merging)
  - If no match: log the unmatched chapter (data/_unmatched_chapters.json)
  - Never creates redirect links; source_url is stored but not surfaced

Run:
    python -m scraper.build_neb_data
    python -m scraper.build_neb_data --dry-run   # preview without saving
"""

import argparse
import json
import os
import re
import sys
from typing import Optional

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


# ─── Content merging helpers ──────────────────────────────────────────

_BLOCK_RE = re.compile(r"(<h[1-6][^>]*>.*?</h[1-6]>|<p[^>]*>.*?</p>|<ul[^>]*>.*?</ul>|<ol[^>]*>.*?</ol>|<blockquote[^>]*>.*?</blockquote>|<table[^>]*>.*?</table>)", re.IGNORECASE | re.DOTALL)
_TAG_RE = re.compile(r"<[^>]+>")
_HEADING_RE = re.compile(r"<(h[1-6])([^>]*)>", re.IGNORECASE)
_WS_RE = re.compile(r"\s+")


def _strip_tags(html: str) -> str:
    return _WS_RE.sub(" ", _TAG_RE.sub(" ", html)).strip()


def _fingerprint(block: str) -> str:
    """Normalised fingerprint of a block for deduplication."""
    text = _strip_tags(block).lower()
    text = re.sub(r"[^a-z0-9 ]", " ", text)
    return _WS_RE.sub(" ", text).strip()


def _normalise_headings(html: str) -> str:
    """Normalise all headings: h1→h2, keep h3+ as-is (prevents duplicate h1)."""
    def _map(m: re.Match) -> str:
        tag = m.group(1).lower()
        attrs = m.group(2)
        if tag == "h1":
            return f"<h2{attrs}>"
        return m.group(0)
    return _HEADING_RE.sub(_map, html)


def _extract_blocks(html: str) -> list[str]:
    """Split HTML into top-level semantic blocks."""
    blocks = _BLOCK_RE.findall(html)
    if not blocks:
        # Fallback: treat the whole thing as one block
        return [html.strip()] if html.strip() else []
    return [b.strip() for b in blocks if b.strip()]


def merge_html_content(sources: list[dict]) -> tuple[str, str]:
    """Merge HTML content from multiple scraped sources into one unified note.

    Args:
        sources: list of dicts with keys 'content' (HTML str) and 'source_url'

    Returns:
        (merged_html, merged_source_urls_csv)
    """
    if not sources:
        return "", ""
    if len(sources) == 1:
        return sources[0]["content"], sources[0].get("source_url", "")

    seen_fps: set[str] = set()
    merged_blocks: list[str] = []
    all_urls: list[str] = []

    for src in sources:
        raw = src.get("content", "").strip()
        url = src.get("source_url", "")
        if url:
            all_urls.append(url)
        if not raw:
            continue

        # Normalise headings so h1 from source doesn't clash with page h1
        normalised = _normalise_headings(raw)
        blocks = _extract_blocks(normalised)

        for block in blocks:
            fp = _fingerprint(block)
            if not fp or fp in seen_fps:
                continue
            # Skip very short blocks (likely navigation remnants)
            if len(fp.split()) < 4:
                continue
            seen_fps.add(fp)
            merged_blocks.append(block)

    merged_html = "\n".join(merged_blocks)
    merged_urls = ", ".join(dict.fromkeys(all_urls))  # preserve order, dedupe
    return merged_html, merged_urls


# ─── Subject name → canonical subject ID ─────────────────────────────

SUBJECT_MAP: dict[str, str] = {
    "physics": "phy",
    "chemistry": "chem",
    "biology": "bio",
    "mathematics": "math",
    "computer science": "cs",
    "english": "eng",
    "nepali": "nep",
    "accountancy": "acc",
    "economics": "eco",
    "business studies": "bus",
}


def _load(filename: str) -> dict:
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _save(data: dict, filename: str):
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved: {path}")


def _normalise(text: str) -> str:
    """Lowercase, strip punctuation and extra spaces for fuzzy matching."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _title_similarity(a: str, b: str) -> float:
    """Simple word-overlap similarity between two normalised strings."""
    words_a = set(_normalise(a).split())
    words_b = set(_normalise(b).split())
    if not words_a or not words_b:
        return 0.0
    intersection = words_a & words_b
    return len(intersection) / max(len(words_a), len(words_b))


def _find_best_chapter_match(
    scraped_title: str, candidates: list[dict], threshold: float = 0.5
) -> Optional[dict]:
    """Return the best-matching chapter from candidates, or None."""
    best_score = 0.0
    best = None
    for ch in candidates:
        score = _title_similarity(scraped_title, ch.get("title", ""))
        if score > best_score:
            best_score = score
            best = ch
    return best if best_score >= threshold else None


def _make_note_id(chapter_id: str, source: str) -> str:
    return f"scraped-{source}-{chapter_id}"


def build(dry_run: bool = False):
    neb = _load("neb_data.json")
    if not neb:
        print("ERROR: data/neb_data.json not found. Run convert_data.py first.")
        sys.exit(1)

    chapters: list[dict] = neb.get("chapters", [])
    notes: list[dict] = neb.get("notes", [])

    # Build lookup: subject_id → list of chapters
    subject_chapters: dict[str, list[dict]] = {}
    for ch in chapters:
        sid = ch.get("subjectId", "")
        subject_chapters.setdefault(sid, []).append(ch)

    sources = [
        ("nebplus2_data.json", "nebplus2"),
        ("readers_data.json", "readers"),
    ]

    # First pass: collect all scraped content per chapter_id across sources
    # Structure: chapter_id → list of {content, source_url, title, source_key}
    chapter_sources: dict[str, list[dict]] = {}
    unmatched: list[dict] = []

    for filename, source_key in sources:
        scraped = _load(filename)
        if not scraped:
            print(f"  Skipping {filename} (not found)")
            continue

        print(f"\nCollecting from {filename}...")
        for subject_entry in scraped.get("subjects", []):
            subject_name = subject_entry.get("subject", "").lower()
            subject_id = SUBJECT_MAP.get(subject_name)

            if not subject_id:
                print(f"  ! Unknown subject '{subject_name}' — skipping")
                continue

            candidates = subject_chapters.get(subject_id, [])
            if not candidates:
                print(f"  ! No chapters found for subject '{subject_id}'")
                continue

            for scraped_ch in subject_entry.get("chapters", []):
                content = scraped_ch.get("content", "")
                if not content or not content.strip():
                    continue

                matched = _find_best_chapter_match(scraped_ch["title"], candidates)
                if not matched:
                    unmatched.append({
                        "source": source_key,
                        "title": scraped_ch["title"],
                        "url": scraped_ch.get("source_url", ""),
                    })
                    print(f"  ? Unmatched: {scraped_ch['title']}")
                    continue

                chapter_id = matched["id"]
                chapter_sources.setdefault(chapter_id, []).append({
                    "content": content,
                    "source_url": scraped_ch.get("source_url", ""),
                    "title": scraped_ch["title"],
                    "source_key": source_key,
                    "content_quality": scraped_ch.get("content_quality", "full"),
                })
                print(f"  ✓ Matched [{source_key}]: '{scraped_ch['title']}' → {chapter_id}")

    # Second pass: merge multi-source content and build/update note records
    existing_note_ids: set[str] = {n["id"] for n in notes}
    new_notes: list[dict] = []
    updated_count = 0

    for chapter_id, src_list in chapter_sources.items():
        # Use a single merged note ID for this chapter (source-agnostic)
        note_id = f"scraped-merged-{chapter_id}"

        if len(src_list) > 1:
            print(f"  ↔ Merging {len(src_list)} sources for chapter {chapter_id}")
            merged_html, merged_urls = merge_html_content(src_list)
            best_title = max(src_list, key=lambda s: len(s["content"]))["title"]
        else:
            merged_html = src_list[0]["content"]
            merged_urls = src_list[0].get("source_url", "")
            best_title = src_list[0]["title"]

        note = {
            "id": note_id,
            "chapterId": chapter_id,
            "type": "theory",
            "title": best_title,
            "content": merged_html,
            "source_url": merged_urls,
            "content_quality": "full" if len(src_list) > 1 else src_list[0].get("content_quality", "full"),
        }

        if note_id in existing_note_ids:
            for i, n in enumerate(notes):
                if n["id"] == note_id:
                    notes[i] = note
                    updated_count += 1
                    break
        else:
            # Also remove old per-source notes for this chapter (clean up legacy IDs)
            old_ids = {f"scraped-{sk}-{chapter_id}" for sk in ("nebplus2", "readers")}
            notes = [n for n in notes if n["id"] not in old_ids]
            existing_note_ids -= old_ids

            new_notes.append(note)
            existing_note_ids.add(note_id)

    notes.extend(new_notes)
    neb["notes"] = notes

    print(f"\nSummary:")
    print(f"  Chapters processed : {len(chapter_sources)}")
    print(f"  New notes added    : {len(new_notes)}")
    print(f"  Notes updated      : {updated_count}")
    print(f"  Unmatched          : {len(unmatched)}")

    if unmatched:
        _save({"unmatched": unmatched}, "_unmatched_chapters.json")
        print(f"  Unmatched log      : data/_unmatched_chapters.json")

    if not dry_run:
        _save(neb, "neb_data.json")
        print("\nneb_data.json updated with merged scraped content.")
    else:
        print("\nDry-run: no files written.")


def main():
    parser = argparse.ArgumentParser(description="Merge scraped content into neb_data.json")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview changes without writing files",
    )
    args = parser.parse_args()
    build(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
