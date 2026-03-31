"""
NEB Notes API
=============
FastAPI backend serving educational content for NEB students.

Run: uvicorn backend.main:app --reload --port 8000
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.subjects import router as subjects_router
from .routes.chapters import router as chapters_router
from .routes.search import router as search_router
from .routes.tests import router as tests_router

app = FastAPI(
    title="NEB Notes API",
    description="API for NEB Class 11 & 12 study materials — notes, chapters, past papers, and mock tests.",
    version="1.0.0",
)

# CORS — allow the Next.js frontend (local + Vercel deployment)
_base_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]
# Accept comma-separated extra origins from env (e.g. your Vercel URL)
_extra = os.getenv("ALLOWED_ORIGINS", "")
_extra_origins = [o.strip() for o in _extra.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_base_origins + _extra_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(subjects_router)
app.include_router(chapters_router)
app.include_router(search_router)
app.include_router(tests_router)


@app.get("/")
def root():
    return {
        "name": "NEB Notes API",
        "version": "1.0.0",
        "endpoints": [
            "GET /subjects",
            "GET /subjects/{slug}",
            "GET /chapters/{chapter_id}",
            "GET /search?q=keyword",
            "GET /tests",
            "GET /tests/{test_id}",
        ],
    }


@app.get("/health")
def health():
    return {"status": "ok"}
