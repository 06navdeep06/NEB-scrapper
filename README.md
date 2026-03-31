# NEB Notes Platform

A full-stack study platform for NEB Class 11 & 12 students — chapter-wise notes, formula sheets, past papers, and mock tests.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS v4 |
| Backend API | FastAPI (Python) |
| Scraper | requests + BeautifulSoup4 |
| Data | JSON (upgradeable to PostgreSQL/MongoDB) |

---

## Quick Start

### 1. Frontend (Next.js)

```bash
npm install
npm run dev
# → http://localhost:3000
```

### 2. Backend API (FastAPI)

```bash
# Install Python dependencies
pip install fastapi uvicorn[standard] pydantic requests beautifulsoup4

# Start the API server
python -m uvicorn backend.main:app --port 8001 --reload
# → http://localhost:8001
```

The frontend reads `NEXT_PUBLIC_API_URL` from `.env.local` (defaults to `http://localhost:8001`).

### 3. Scraper (optional — data already included)

```bash
# Convert existing data.ts to JSON (already done — data/neb_data.json exists)
python -m scraper.convert_data

# Scrape live content from nebplus2notes.com + readersnepal.com
python -m scraper.main                    # all sources
python -m scraper.main --source nebplus2  # only nebplus2notes.com
python -m scraper.main --source readers   # only readersnepal.com
```

Scraped data is saved to `data/` as JSON files.

---

## API Endpoints

```
GET /                          # API info
GET /health                    # Health check
GET /subjects                  # List all subjects
GET /subjects/{slug}           # Subject with chapters + past papers
GET /chapters/{chapter_id}     # Chapter with notes + mock tests
GET /search?q=keyword          # Full-text search (subjects, chapters, notes)
GET /tests                     # All mock tests
GET /tests/{test_id}           # Mock test with questions
```

### Search example

```bash
curl "http://localhost:8001/search?q=kinematics&limit=5"
```

---

## Project Structure

```
NEB-scrapper/
├── src/                        # Next.js frontend
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx            # Homepage with class/faculty selector
│   │   ├── subjects/           # Subject + chapter pages
│   │   ├── quick-revision/     # Formula sheets
│   │   ├── past-papers/        # Past exam papers
│   │   ├── mock-test/          # Mock tests
│   │   └── resources/          # Downloads
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky nav with search (⌘K) + dark mode
│   │   ├── SearchDialog.tsx    # Global search modal
│   │   ├── DarkModeToggle.tsx  # Theme toggle
│   │   ├── SubjectBrowser.tsx  # Class/faculty filter on homepage
│   │   └── chapter/            # Notes, PastPapers, MockTest tabs
│   └── lib/
│       ├── data.ts             # Static data (fallback)
│       └── api.ts              # FastAPI client
├── backend/                    # FastAPI backend
│   ├── main.py                 # App + CORS setup
│   ├── data_loader.py          # JSON loader + full-text search
│   ├── models.py               # Pydantic models
│   └── routes/                 # subjects, chapters, search, tests
├── scraper/                    # Web scraper
│   ├── main.py                 # CLI entry point
│   ├── parsers.py              # Site-specific parsers
│   ├── utils.py                # fetch, clean, save helpers
│   └── convert_data.py         # data.ts → JSON converter
└── data/                       # Scraped/converted JSON files
    └── neb_data.json           # 7 subjects, 98 chapters, 176 notes
```

---

## Features

- **Global search** — Cmd+K / Ctrl+K, searches subjects + chapters + notes via API
- **Dark mode** — toggle in navbar, persists via localStorage
- **Class/Faculty selector** — homepage filter for Grade 11/12 × Science/Management
- **Chapter tabs** — Notes, Formulas, Past Papers, Mock Tests per chapter
- **Breadcrumb navigation** — Subjects → Subject → Chapter
- **Prev/Next chapter** navigation
- **Timed mock tests** — with scoring and instant results
- **Past papers** — filterable by subject and year (2075–2082 BS)
