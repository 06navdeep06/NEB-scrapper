"""Pydantic models for the NEB Notes API."""

from pydantic import BaseModel
from typing import Optional


class Subject(BaseModel):
    id: str
    name: str
    slug: str
    icon: str
    description: str
    totalChapters: int


class Chapter(BaseModel):
    id: str
    subjectId: str
    number: int
    title: str
    description: str
    estimatedHours: int
    grade: Optional[int] = None


class Note(BaseModel):
    id: str
    chapterId: str
    type: str  # theory, formula, derivation, diagram
    title: str
    content: str


class PastPaper(BaseModel):
    id: str
    subjectId: str
    chapterId: str
    year: int
    title: str
    pdfUrl: str
    hasSolutions: bool
    solutionPdfUrl: Optional[str] = None


class MockTest(BaseModel):
    id: str
    chapterId: str
    title: str
    durationMinutes: int
    totalMarks: int
    difficulty: str


class Question(BaseModel):
    id: str
    testId: str
    type: str
    question: str
    options: Optional[list[str]] = None
    correctAnswer: str | int
    marks: int
    explanation: Optional[str] = None


class SearchResult(BaseModel):
    type: str  # subject, chapter, note
    id: str
    title: str
    snippet: str
    subjectId: Optional[str] = None
    chapterId: Optional[str] = None
    score: float = 0.0
