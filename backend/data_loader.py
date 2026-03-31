"""Load and cache JSON data for the API."""

import json
import os
import re
from functools import lru_cache
from typing import Optional

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "neb_data.json")


# ─── Quality computation ──────────────────────────────────────────────

def _compute_note_quality(content: str) -> dict:
    """Compute quality metrics for a note's HTML content.

    Returns:
        word_count       – number of words in the plain-text content
        heading_count    – number of heading tags (h1-h6)
        list_item_count  – number of <li> items
        is_complete      – True when word_count>=300 AND heading_count>=2
        quality_score    – integer 0-100
    """
    if not content:
        return {"word_count": 0, "heading_count": 0, "list_item_count": 0,
                "is_complete": False, "quality_score": 0}

    text = re.sub(r"<[^>]+>", " ", content)
    text = re.sub(r"\s+", " ", text).strip()
    words = [w for w in text.split() if w]
    word_count = len(words)

    heading_count = len(re.findall(r"<h[1-6][\s>]", content, re.IGNORECASE))
    list_item_count = len(re.findall(r"<li[\s>]", content, re.IGNORECASE))

    score = 0
    if word_count >= 800:
        score += 40
    elif word_count >= 400:
        score += 30
    elif word_count >= 200:
        score += 15
    elif word_count >= 100:
        score += 5

    if heading_count >= 4:
        score += 30
    elif heading_count >= 2:
        score += 20
    elif heading_count >= 1:
        score += 10

    if list_item_count >= 10:
        score += 20
    elif list_item_count >= 4:
        score += 12
    elif list_item_count >= 1:
        score += 6

    if word_count >= 100 and heading_count >= 1:
        score += 10

    is_complete = word_count >= 300 and heading_count >= 2

    return {
        "word_count": word_count,
        "heading_count": heading_count,
        "list_item_count": list_item_count,
        "is_complete": is_complete,
        "quality_score": min(score, 100),
    }


def _compute_chapter_quality(chapter_id: str) -> dict:
    """Aggregate quality metrics across all notes for a chapter."""
    notes = get_notes_by_chapter(chapter_id)
    if not notes:
        return {"is_complete": False, "quality_score": 0, "total_words": 0,
                "note_count": 0, "best_quality_score": 0}

    total_words = 0
    best_score = 0
    any_complete = False

    for note in notes:
        q = _compute_note_quality(note.get("content", ""))
        total_words += q["word_count"]
        if q["quality_score"] > best_score:
            best_score = q["quality_score"]
        if q["is_complete"]:
            any_complete = True

    return {
        "is_complete": any_complete,
        "quality_score": best_score,
        "total_words": total_words,
        "note_count": len(notes),
        "best_quality_score": best_score,
    }


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
    """Full-text search across subjects, chapters, and notes.

    Results are ranked by a composite score that factors in:
    - keyword relevance (term frequency + title bonus)
    - content length (more words = more useful)
    - completeness (is_complete notes ranked higher)
    """
    query_lower = query.lower()
    terms = query_lower.split()
    results = []

    slug_map = _build_subject_slug_map()
    chapter_subject_map = _build_chapter_subject_map()

    # Search subjects
    for s in get_subjects():
        rel = _score_match(terms, f"{s['name']} {s.get('description', '')}")
        if rel > 0:
            results.append({
                "type": "subject",
                "id": s["id"],
                "title": s["name"],
                "snippet": s.get("description", "")[:200],
                "subjectId": s["id"],
                "subjectSlug": s.get("slug", s["id"]),
                "chapterId": None,
                "score": rel,
                "is_complete": True,
                "quality_score": 100,
            })

    # Search chapters
    for c in get_chapters():
        text = f"{c['title']} {c.get('description', '')}"
        rel = _score_match(terms, text)
        if rel > 0:
            subject_id = c.get("subjectId")
            cq = _compute_chapter_quality(c["id"])
            # Composite: relevance * 10 + quality bonus
            composite = rel * 10 + (cq["quality_score"] / 10)
            results.append({
                "type": "chapter",
                "id": c["id"],
                "title": c["title"],
                "snippet": c.get("description", "")[:200],
                "subjectId": subject_id,
                "subjectSlug": slug_map.get(subject_id, subject_id),
                "chapterId": c["id"],
                "score": composite,
                "is_complete": cq["is_complete"],
                "quality_score": cq["quality_score"],
                "total_words": cq["total_words"],
            })

    # Search notes
    for n in get_notes():
        content = n.get("content", "")
        text = f"{n['title']} {content}"
        rel = _score_match(terms, text)
        if rel > 0:
            chapter_id = n.get("chapterId")
            subject_id = chapter_subject_map.get(chapter_id)
            nq = _compute_note_quality(content)
            snippet = _extract_snippet(content, terms)
            # Composite: relevance * 10 + quality bonus + completeness bonus
            composite = rel * 10 + (nq["quality_score"] / 10)
            if nq["is_complete"]:
                composite += 5
            results.append({
                "type": "note",
                "id": n["id"],
                "title": n["title"],
                "snippet": snippet,
                "subjectId": subject_id,
                "subjectSlug": slug_map.get(subject_id, subject_id),
                "chapterId": chapter_id,
                "score": composite,
                "is_complete": nq["is_complete"],
                "quality_score": nq["quality_score"],
                "word_count": nq["word_count"],
            })

    # Sort by composite score descending
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
