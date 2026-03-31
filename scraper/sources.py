"""Source registry for the Universal NEB Scraper.

To add a new source, append a SourceConfig to SOURCES.
You only need to provide:
  - name, key, base_url
  - subjects dict  {class_num: {faculty: {subject: url}}}
  - content_selectors  (CSS priority list for note content extraction)
  - link_path_contains  (href must contain at least one of these substrings
                         to be treated as a chapter link)

The generic scraper (generic.py) handles fetching, link discovery,
content extraction, noise removal, and quality validation automatically
for every SourceConfig — no bespoke parser code required.

URL verification:
  Run  python -m scraper.discover "<Subject>"  to probe all domains and
  find the correct URLs before adding them here.
"""

from dataclasses import dataclass, field
from typing import Optional, Callable

# Lazy import to avoid circular dependency — resolved at first use
def _readers_scraper(url: str, subject: str = "") -> list:
    from .parsers import scrape_readers_full_subject
    return scrape_readers_full_subject(url, subject=subject)


# ─── Base URLs ────────────────────────────────────────────────────────

_NEBPLUS2  = "https://nebplus2notes.com"
_READERS   = "https://readersnepal.com"
_TYROCITY  = "https://www.tyrocity.com"
_HAMRO     = "https://hamronotes.com"
_KULLABS   = "https://kullabs.com"


# ─── SourceConfig ────────────────────────────────────────────────────

@dataclass
class SourceConfig:
    """Declarative config for a single scraped source.

    Fields
    ------
    name               Human-readable site name.
    key                Short identifier; output written to data/{key}_data.json.
    base_url           Scheme + domain (no trailing slash).
    subjects           Nested dict:  class_num → faculty → subject → URL.
                       Use the discovery script to find the right URLs.
    content_selectors  CSS selectors tried in order to locate note content.
                       The universal heuristic is tried as a final fallback.
    link_path_contains Href must contain at least one substring to qualify
                       as a chapter link (prevents picking up nav/footer links).
    min_title_len      Minimum characters in link text to accept as a chapter.
    """
    name: str
    key: str
    base_url: str
    subjects: dict
    content_selectors: list[str] = field(default_factory=lambda: [
        ".entry-content", ".post-content", "article", "main",
    ])
    link_path_contains: list[str] = field(default_factory=lambda: ["/notes/"])
    min_title_len: int = 5
    custom_subject_scraper: Optional[Callable] = field(default=None, compare=False)


# ─── Source definitions ───────────────────────────────────────────────

SOURCES: list[SourceConfig] = [

    # ── nebplus2notes.com ─────────────────────────────────────────────
    SourceConfig(
        name="nebplus2notes.com",
        key="nebplus2",
        base_url=_NEBPLUS2,
        subjects={
            12: {
                "Science": {
                    "Physics":          f"{_NEBPLUS2}/class-12/physics/",
                    "Chemistry":        f"{_NEBPLUS2}/class-12/chemistry/",
                    "Mathematics":      f"{_NEBPLUS2}/class-12/mathematics/",
                    "Biology":          f"{_NEBPLUS2}/class-12/biology/",
                    "Computer Science": f"{_NEBPLUS2}/class-12/computer-science/",
                    "English":          f"{_NEBPLUS2}/class-12/english/",
                },
                "Management": {
                    "Accountancy":      f"{_NEBPLUS2}/class-12/accountancy/",
                    "Economics":        f"{_NEBPLUS2}/class-12/economics/",
                    "Business Studies": f"{_NEBPLUS2}/class-12/business-studies/",
                },
            },
            11: {
                "Science": {
                    "Physics":          f"{_NEBPLUS2}/class-11/physics/",
                    "Chemistry":        f"{_NEBPLUS2}/class-11/chemistry/",
                    "Mathematics":      f"{_NEBPLUS2}/class-11/mathematics/",
                    "Biology":          f"{_NEBPLUS2}/class-11/biology/",
                    "Computer Science": f"{_NEBPLUS2}/class-11/computer-science/",
                    "English":          f"{_NEBPLUS2}/class-11/english/",
                },
                "Management": {
                    "Accountancy":      f"{_NEBPLUS2}/class-11/accountancy/",
                    "Economics":        f"{_NEBPLUS2}/class-11/economics/",
                    "Business Studies": f"{_NEBPLUS2}/class-11/business-studies/",
                },
            },
        },
        content_selectors=["article", ".post-content", ".entry-content", "main"],
        link_path_contains=[f"/class-12/", f"/class-11/"],
    ),

    # ── readersnepal.com ──────────────────────────────────────────────
    SourceConfig(
        name="readersnepal.com",
        key="readers",
        base_url=_READERS,
        subjects={
            12: {
                "Science": {
                    "Physics":          f"{_READERS}/e-notes/neb-new-course-class-12/physics-1",
                    "Chemistry":        f"{_READERS}/e-notes/neb-new-course-class-12/chemistry-1",
                    "Biology":          f"{_READERS}/e-notes/neb-new-course-class-12/biology-1",
                    "Mathematics":      f"{_READERS}/e-notes/neb-new-course-class-12/mathematics-1",
                    "Computer Science": f"{_READERS}/e-notes/neb-new-course-class-12/computer-science-3",
                },
                "Management": {
                    "Economics":        f"{_READERS}/e-notes/neb-new-course-class-12/economics-1",
                    "Business Studies": f"{_READERS}/e-notes/neb-new-course-class-12/business-studies-1",
                },
            },
            11: {
                "Science": {
                    "Physics":          f"{_READERS}/e-notes/neb-new-course-class-11/physics",
                    "Chemistry":        f"{_READERS}/e-notes/neb-new-course-class-11/chemistry",
                    "Biology":          f"{_READERS}/e-notes/neb-new-course-class-11/biology",
                    "Computer Science": f"{_READERS}/e-notes/neb-new-course-class-11/computer-science-2",
                },
                "Management": {
                    "Economics":        f"{_READERS}/e-notes/neb-new-course-class-11/economics",
                    "Business Studies": f"{_READERS}/e-notes/neb-new-course-class-11/business-studies",
                },
            },
        },
        content_selectors=[".entry-content", ".note-content", "article", "main"],
        link_path_contains=["/e-notes/"],
        custom_subject_scraper=_readers_scraper,
    ),

    # ── tyrocity.com ──────────────────────────────────────────────────
    # URLs below are best-guess patterns.  Run the discovery script to verify:
    #   python -m scraper.discover "Physics" --class 12
    SourceConfig(
        name="tyrocity.com",
        key="tyrocity",
        base_url=_TYROCITY,
        subjects={
            12: {
                "Science": {
                    "Physics":          f"{_TYROCITY}/notes/physics-class-12/",
                    "Chemistry":        f"{_TYROCITY}/notes/chemistry-class-12/",
                    "Biology":          f"{_TYROCITY}/notes/biology-class-12/",
                    "Mathematics":      f"{_TYROCITY}/notes/mathematics-class-12/",
                    "Computer Science": f"{_TYROCITY}/notes/computer-science-class-12/",
                },
                "Management": {
                    "Economics":        f"{_TYROCITY}/notes/economics-class-12/",
                    "Business Studies": f"{_TYROCITY}/notes/business-studies-class-12/",
                },
            },
            11: {
                "Science": {
                    "Physics":          f"{_TYROCITY}/notes/physics-class-11/",
                    "Chemistry":        f"{_TYROCITY}/notes/chemistry-class-11/",
                    "Biology":          f"{_TYROCITY}/notes/biology-class-11/",
                },
            },
        },
        content_selectors=[".entry-content", ".post-content", ".thecontent", "article", "main"],
        link_path_contains=["/notes/"],
    ),

    # ── hamronotes.com ────────────────────────────────────────────────
    # URLs below are best-guess patterns.  Verify with the discovery script.
    SourceConfig(
        name="hamronotes.com",
        key="hamronotes",
        base_url=_HAMRO,
        subjects={
            12: {
                "Science": {
                    "Physics":          f"{_HAMRO}/neb-class-12-physics-notes/",
                    "Chemistry":        f"{_HAMRO}/neb-class-12-chemistry-notes/",
                    "Biology":          f"{_HAMRO}/neb-class-12-biology-notes/",
                    "Mathematics":      f"{_HAMRO}/neb-class-12-mathematics-notes/",
                    "Computer Science": f"{_HAMRO}/neb-class-12-computer-science-notes/",
                },
                "Management": {
                    "Economics":        f"{_HAMRO}/neb-class-12-economics-notes/",
                    "Business Studies": f"{_HAMRO}/neb-class-12-business-studies-notes/",
                },
            },
            11: {
                "Science": {
                    "Physics":          f"{_HAMRO}/neb-class-11-physics-notes/",
                    "Chemistry":        f"{_HAMRO}/neb-class-11-chemistry-notes/",
                },
            },
        },
        content_selectors=[".entry-content", ".post-content", ".article-content", "article", "main"],
        link_path_contains=["-notes/", "/notes/"],
    ),

    # ── kullabs.com ───────────────────────────────────────────────────
    # URLs below are best-guess patterns.  Verify with the discovery script.
    SourceConfig(
        name="kullabs.com",
        key="kullabs",
        base_url=_KULLABS,
        subjects={
            12: {
                "Science": {
                    "Physics":          f"{_KULLABS}/class-12/physics/",
                    "Chemistry":        f"{_KULLABS}/class-12/chemistry/",
                    "Biology":          f"{_KULLABS}/class-12/biology/",
                    "Mathematics":      f"{_KULLABS}/class-12/mathematics/",
                    "Computer Science": f"{_KULLABS}/class-12/computer-science/",
                },
                "Management": {
                    "Economics":        f"{_KULLABS}/class-12/economics/",
                    "Business Studies": f"{_KULLABS}/class-12/business-studies/",
                },
            },
            11: {
                "Science": {
                    "Physics":          f"{_KULLABS}/class-11/physics/",
                    "Chemistry":        f"{_KULLABS}/class-11/chemistry/",
                },
            },
        },
        content_selectors=[".note-content", ".entry-content", ".post-content", "article", "#content", "main"],
        link_path_contains=["/class-12/", "/class-11/", "/notes/"],
    ),
]

# Quick lookup by key
SOURCES_BY_KEY: dict[str, SourceConfig] = {s.key: s for s in SOURCES}
