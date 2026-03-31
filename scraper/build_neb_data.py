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

    # Track existing scraped note IDs so we don't duplicate
    existing_note_ids: set[str] = {n["id"] for n in notes}

    unmatched: list[dict] = []
    new_notes: list[dict] = []
    updated_count = 0

    sources = [
        ("nebplus2_data.json", "nebplus2"),
        ("readers_data.json", "readers"),
    ]

    for filename, source_key in sources:
        scraped = _load(filename)
        if not scraped:
            print(f"  Skipping {filename} (not found)")
            continue

        print(f"\nProcessing {filename}...")
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

                # Find the best matching chapter in neb_data
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
                note_id = _make_note_id(chapter_id, source_key)

                # Build the note record (full HTML, no redirect link)
                note = {
                    "id": note_id,
                    "chapterId": chapter_id,
                    "type": "theory",
                    "title": scraped_ch["title"],
                    "content": content,
                    "source_url": scraped_ch.get("source_url", ""),
                    "content_quality": scraped_ch.get("content_quality", "full"),
                }

                if note_id in existing_note_ids:
                    # Update existing note content
                    for i, n in enumerate(notes):
                        if n["id"] == note_id:
                            notes[i] = note
                            updated_count += 1
                            break
                else:
                    new_notes.append(note)
                    existing_note_ids.add(note_id)

                print(f"  ✓ Matched: '{scraped_ch['title']}' → {chapter_id}")

    # Merge new notes in
    notes.extend(new_notes)
    neb["notes"] = notes

    print(f"\nSummary:")
    print(f"  New notes added : {len(new_notes)}")
    print(f"  Notes updated   : {updated_count}")
    print(f"  Unmatched       : {len(unmatched)}")

    if unmatched:
        _save({"unmatched": unmatched}, "_unmatched_chapters.json")
        print(f"  Unmatched log   : data/_unmatched_chapters.json")

    if not dry_run:
        _save(neb, "neb_data.json")
        print("\nneb_data.json updated with full scraped content.")
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
