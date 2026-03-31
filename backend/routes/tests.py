"""Mock test API routes."""

from fastapi import APIRouter, HTTPException

from ..data_loader import get_mock_tests, get_questions_by_test

router = APIRouter(prefix="/tests", tags=["tests"])


@router.get("")
def list_tests():
    """Get all mock tests."""
    return get_mock_tests()


@router.get("/{test_id}")
def get_test(test_id: str):
    """Get a mock test with its questions."""
    tests = get_mock_tests()
    test = next((t for t in tests if t["id"] == test_id), None)
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")

    questions = get_questions_by_test(test_id)
    return {
        **test,
        "questions": questions,
    }
