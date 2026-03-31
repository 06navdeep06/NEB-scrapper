"""Load and cache JSON data for the API."""

import json
import os
from functools import lru_cache
from typing import Optional

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "neb_data.json")


@lru_cache(maxsize=1)
def load_data() -> dict:
    """Load the NEB data JSON file. Cached after first call."""
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def get_subjects() -> list[dict]:
    return load_data().get("subjects", [])


def get_chapters() -> list[dict]:
    return load_data().get("chapters", [])


def get_notes() -> list[dict]:
    return load_data().get("notes", [])


def get_past_papers() -> list[dict]:
    return load_data().get("pastPapers", [])


def get_mock_tests() -> list[dict]:
    return load_data().get("mockTests", [])


def get_questions() -> list[dict]:
    return load_data().get("questions", [])


def get_subject_by_slug(slug: str) -> Optional[dict]:
    for s in get_subjects():
        if s.get("slug") == slug or s.get("id") == slug:
            return s
    return None


def get_chapters_by_subject(subject_id: str) -> list[dict]:
    return [c for c in get_chapters() if c.get("subjectId") == subject_id]


def get_chapter_by_id(chapter_id: str) -> Optional[dict]:
    for c in get_chapters():
        if c.get("id") == chapter_id:
            return c
    return None


def get_notes_by_chapter(chapter_id: str) -> list[dict]:
    return [n for n in get_notes() if n.get("chapterId") == chapter_id]


def get_papers_by_subject(subject_id: str) -> list[dict]:
    return [p for p in get_past_papers() if p.get("subjectId") == subject_id]


def get_tests_by_chapter(chapter_id: str) -> list[dict]:
    return [t for t in get_mock_tests() if t.get("chapterId") == chapter_id]


def get_questions_by_test(test_id: str) -> list[dict]:
    return [q for q in get_questions() if q.get("testId") == test_id]


def _build_subject_slug_map() -> dict:
    """Build a map of subject_id -> slug."""
    return {s["id"]: s.get("slug", s["id"]) for s in get_subjects()}


def _build_chapter_subject_map() -> dict:
    """Build a map of chapter_id -> subject_id."""
    return {c["id"]: c.get("subjectId") for c in get_chapters()}


def search(query: str, limit: int = 20) -> list[dict]:
    """Full-text search across subjects, chapters, and notes."""
    query_lower = query.lower()
    terms = query_lower.split()
    results = []

    slug_map = _build_subject_slug_map()
    chapter_subject_map = _build_chapter_subject_map()

    # Search subjects
    for s in get_subjects():
        score = _score_match(terms, f"{s['name']} {s.get('description', '')}")
        if score > 0:
            results.append({
                "type": "subject",
                "id": s["id"],
                "title": s["name"],
                "snippet": s.get("description", "")[:150],
                "subjectId": s["id"],
                "subjectSlug": s.get("slug", s["id"]),
                "score": score,
            })

    # Search chapters
    for c in get_chapters():
        text = f"{c['title']} {c.get('description', '')}"
        score = _score_match(terms, text)
        if score > 0:
            subject_id = c.get("subjectId")
            results.append({
                "type": "chapter",
                "id": c["id"],
                "title": c["title"],
                "snippet": c.get("description", "")[:150],
                "subjectId": subject_id,
                "subjectSlug": slug_map.get(subject_id, subject_id),
                "chapterId": c["id"],
                "score": score,
            })

    # Search notes
    for n in get_notes():
        text = f"{n['title']} {n.get('content', '')}"
        score = _score_match(terms, text)
        if score > 0:
            chapter_id = n.get("chapterId")
            subject_id = chapter_subject_map.get(chapter_id)
            content = n.get("content", "")
            snippet = _extract_snippet(content, terms)
            results.append({
                "type": "note",
                "id": n["id"],
                "title": n["title"],
                "snippet": snippet,
                "subjectId": subject_id,
                "subjectSlug": slug_map.get(subject_id, subject_id),
                "chapterId": chapter_id,
                "score": score,
            })

    # Sort by relevance score descending
    results.sort(key=lambda r: r["score"], reverse=True)
    return results[:limit]


def _score_match(terms: list[str], text: str) -> float:
    """Score how well the search terms match the text."""
    text_lower = text.lower()
    score = 0.0

    for term in terms:
        if term in text_lower:
            # Exact word match scores higher
            count = text_lower.count(term)
            score += count * 1.0

            # Bonus for match in first 50 chars (likely title/header)
            if term in text_lower[:50]:
                score += 2.0

    return score


def _extract_snippet(content: str, terms: list[str], max_len: int = 200) -> str:
    """Extract a relevant snippet from content around the first match."""
    # Strip HTML tags for snippet
    import re
    clean = re.sub(r"<[^>]+>", " ", content)
    clean = re.sub(r"\s+", " ", clean).strip()

    content_lower = clean.lower()
    best_pos = -1

    for term in terms:
        pos = content_lower.find(term)
        if pos != -1 and (best_pos == -1 or pos < best_pos):
            best_pos = pos

    if best_pos == -1:
        return clean[:max_len] + ("..." if len(clean) > max_len else "")

    start = max(0, best_pos - 40)
    end = min(len(clean), start + max_len)
    snippet = clean[start:end]

    if start > 0:
        snippet = "..." + snippet
    if end < len(clean):
        snippet += "..."

    return snippet
