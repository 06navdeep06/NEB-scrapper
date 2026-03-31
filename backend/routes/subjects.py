"""Subject-related API routes."""

from fastapi import APIRouter, HTTPException

from ..data_loader import (
    get_subjects,
    get_subject_by_slug,
    get_chapters_by_subject,
    get_papers_by_subject,
)

router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get("")
def list_subjects():
    """Get all subjects."""
    return get_subjects()


@router.get("/{slug}")
def get_subject(slug: str):
    """Get a subject by slug or ID, with its chapters."""
    subject = get_subject_by_slug(slug)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    chapters = get_chapters_by_subject(subject["id"])
    papers = get_papers_by_subject(subject["id"])

    return {
        **subject,
        "chapters": chapters,
        "pastPapers": papers,
    }
