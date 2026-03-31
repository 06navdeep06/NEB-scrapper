"""Chapter-related API routes."""

from fastapi import APIRouter, HTTPException

from ..data_loader import (
    get_chapter_by_id,
    get_notes_by_chapter,
    get_tests_by_chapter,
)

router = APIRouter(prefix="/chapters", tags=["chapters"])


@router.get("/{chapter_id}")
def get_chapter(chapter_id: str):
    """Get a chapter by ID with its notes and tests."""
    chapter = get_chapter_by_id(chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")

    notes = get_notes_by_chapter(chapter_id)
    tests = get_tests_by_chapter(chapter_id)

    return {
        **chapter,
        "notes": notes,
        "mockTests": tests,
    }
