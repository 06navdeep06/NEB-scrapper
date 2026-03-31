"""Search API route."""

from fastapi import APIRouter, Query

from ..data_loader import search

router = APIRouter(tags=["search"])


@router.get("/search")
def search_content(
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(20, ge=1, le=100, description="Max results"),
):
    """Search across subjects, chapters, and notes."""
    results = search(q, limit=limit)
    return {
        "query": q,
        "count": len(results),
        "results": results,
    }
