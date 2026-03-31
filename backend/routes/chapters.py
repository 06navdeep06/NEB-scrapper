"""Chapter-related API routes."""

from fastapi import APIRouter, HTTPException

from ..data_loader import (
    get_chapter_by_id,
    get_notes_by_chapter,
    get_tests_by_chapter,
    _compute_note_quality,
    _compute_chapter_quality,
)

router = APIRouter(prefix="/chapters", tags=["chapters"])


@router.get("/{chapter_id}")
def get_chapter(chapter_id: str):
    """Get a chapter by ID with its notes, tests, and quality metadata."""
    chapter = get_chapter_by_id(chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")

    raw_notes = get_notes_by_chapter(chapter_id)
    tests = get_tests_by_chapter(chapter_id)

    # Annotate each note with quality metadata
    notes_with_quality = []
    for note in raw_notes:
        content = note.get("content", "")
        q = _compute_note_quality(content)
        notes_with_quality.append({
            **note,
            "word_count": q["word_count"],
            "heading_count": q["heading_count"],
            "is_complete": q["is_complete"],
            "quality_score": q["quality_score"],
        })

    # Chapter-level quality aggregation
    cq = _compute_chapter_quality(chapter_id)

    return {
        **chapter,
        "is_complete": cq["is_complete"],
        "quality_score": cq["quality_score"],
        "total_words": cq["total_words"],
        "notes": notes_with_quality,
        "mockTests": tests,
    }
