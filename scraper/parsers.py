"""Parsers for scraping NEB educational content from target websites."""

import re
import logging
from typing import Optional
from bs4 import BeautifulSoup, NavigableString, Tag

from .utils import (
    fetch_page,
    clean_text,
    remove_unwanted_elements,
    polite_delay,
    logger,
)

# ─── Quality thresholds ──────────────────────────────────────────────

MIN_CONTENT_CHARS = 400
MIN_TEXT_CHARS = 200

# Domains whose links must be stripped from scraped content
_STRIP_DOMAINS = [
    "nebplus2notes.com",
    "readersnepal.com",
    "facebook.com",
    "twitter.com",
    "instagram.com",
    "youtube.com",
    "t.me",
    "whatsapp.com",
]

# ─── nebplus2notes.com ───────────────────────────────────────────────

NEBPLUS2_BASE = "https://nebplus2notes.com"

# Known URL patterns for nebplus2notes.com
NEBPLUS2_SUBJECTS = {
    12: {
        "Science": {
            "Physics": f"{NEBPLUS2_BASE}/class-12/physics/",
            "Chemistry": f"{NEBPLUS2_BASE}/class-12/chemistry/",
            "Mathematics": f"{NEBPLUS2_BASE}/class-12/mathematics/",
            "Biology": f"{NEBPLUS2_BASE}/class-12/biology/",
            "Computer Science": f"{NEBPLUS2_BASE}/class-12/computer-science/",
            "English": f"{NEBPLUS2_BASE}/class-12/english/",
        },
        "Management": {
            "Accountancy": f"{NEBPLUS2_BASE}/class-12/accountancy/",
            "Economics": f"{NEBPLUS2_BASE}/class-12/economics/",
            "Business Studies": f"{NEBPLUS2_BASE}/class-12/business-studies/",
        },
    },
    11: {
        "Science": {
            "Physics": f"{NEBPLUS2_BASE}/class-11/physics/",
            "Chemistry": f"{NEBPLUS2_BASE}/class-11/chemistry/",
            "Mathematics": f"{NEBPLUS2_BASE}/class-11/mathematics/",
            "Biology": f"{NEBPLUS2_BASE}/class-11/biology/",
            "Computer Science": f"{NEBPLUS2_BASE}/class-11/computer-science/",
            "English": f"{NEBPLUS2_BASE}/class-11/english/",
        },
        "Management": {
            "Accountancy": f"{NEBPLUS2_BASE}/class-11/accountancy/",
            "Economics": f"{NEBPLUS2_BASE}/class-11/economics/",
            "Business Studies": f"{NEBPLUS2_BASE}/class-11/business-studies/",
        },
    },
}


def scrape_nebplus2_subject_page(url: str) -> list[dict]:
    """Scrape a subject page from nebplus2notes.com to get chapter list."""
    soup = fetch_page(url)
    if not soup:
        logger.warning(f"Could not fetch subject page: {url}")
        return []

    soup = remove_unwanted_elements(soup)
    chapters = []

    # Look for chapter links in the main content area
    content_area = (
        soup.select_one(".entry-content")
        or soup.select_one("article")
        or soup.select_one(".post-content")
        or soup.select_one("main")
    )

    if not content_area:
        logger.warning(f"No content area found on: {url}")
        return []

    # Find all links that look like chapter links
    for link in content_area.find_all("a", href=True):
        href = link["href"]
        title = clean_text(link.get_text())

        if not title or len(title) < 3:
            continue
        # Skip non-content links
        if any(skip in href.lower() for skip in ["#", "javascript:", "facebook", "twitter"]):
            continue

        # Only include links from the same domain
        if NEBPLUS2_BASE in href or href.startswith("/"):
            if href.startswith("/"):
                href = NEBPLUS2_BASE + href

            chapters.append({
                "title": title,
                "url": href,
            })

    return chapters


def scrape_nebplus2_chapter(url: str) -> Optional[dict]:
    """Scrape a chapter's full content from nebplus2notes.com."""
    soup = fetch_page(url)
    if not soup:
        return None

    soup = remove_unwanted_elements(soup)

    title_el = soup.select_one("h1.entry-title") or soup.select_one("h1") or soup.find("title")
    title = clean_text(title_el.get_text()) if title_el else "Untitled"

    # nebplus2notes uses article/.post-content as the primary content container
    content_selectors = [
        "article",
        ".post-content",
        ".entry-content",
        "article .content",
        ".article-content",
        "main .content",
        "main",
    ]

    content = None
    for selector in content_selectors:
        area = soup.select_one(selector)
        if not area:
            continue
        candidate = extract_html_content(area)
        ok, reason = validate_content_quality(candidate)
        if ok:
            content = candidate
            break
        logger.debug(f"Selector '{selector}' gave low-quality content: {reason}")

    if not content:
        logger.warning(f"All selectors gave low-quality content for: {url}")
        return None

    return {
        "title": title,
        "content": content,
        "source_url": url,
        "content_quality": "full",
    }


# ─── readersnepal.com ────────────────────────────────────────────────

READERS_BASE = "https://readersnepal.com"

READERS_SUBJECTS = {
    12: {
        "Science": {
            "Physics": f"{READERS_BASE}/e-notes/neb-new-course-class-12/physics-1",
            "Chemistry": f"{READERS_BASE}/e-notes/neb-new-course-class-12/chemistry-1",
            "Biology": f"{READERS_BASE}/e-notes/neb-new-course-class-12/biology-1",
            "Mathematics": f"{READERS_BASE}/e-notes/neb-new-course-class-12/mathematics-1",  # if 404, try removing -1
            "Computer Science": f"{READERS_BASE}/e-notes/neb-new-course-class-12/computer-science-3",
        },
        "Management": {
            "Economics": f"{READERS_BASE}/e-notes/neb-new-course-class-12/economics-1",
            "Business Studies": f"{READERS_BASE}/e-notes/neb-new-course-class-12/business-studies-1",
        },
    },
    11: {
        "Science": {
            "Physics": f"{READERS_BASE}/e-notes/neb-new-course-class-11/physics-1",
            "Chemistry": f"{READERS_BASE}/e-notes/neb-new-course-class-11/chemistry",
            "Biology": f"{READERS_BASE}/e-notes/neb-new-course-class-11/biology",
            "Computer Science": f"{READERS_BASE}/e-notes/neb-new-course-class-11/computer-science-2",
        },
        "Management": {
            "Economics": f"{READERS_BASE}/e-notes/neb-new-course-class-11/economics",
            "Business Studies": f"{READERS_BASE}/e-notes/neb-new-course-class-11/business-studies",
        },
    },
}


def scrape_readers_subject_page(url: str) -> list[dict]:
    """Scrape a subject page from readersnepal.com to get chapter list."""
    soup = fetch_page(url)
    if not soup:
        logger.warning(f"Could not fetch subject page: {url}")
        return []

    # Do NOT call remove_unwanted_elements here — it strips ALL <header> tags,
    # which includes WordPress <header class="entry-header"> blocks that contain
    # the chapter title <a> links on category/archive pages.
    chapters = []

    # On WordPress category pages the chapter links are inside <article> elements,
    # NOT inside .entry-content (that container only exists on single-post pages).
    # Search the full document so no links are missed regardless of page layout.
    all_links = soup.find_all("a", href=True)
    logger.info(f"Found {len(all_links)} total <a> tags on page.")

    seen_hrefs: set[str] = set()
    for link in all_links:
        href = link["href"]
        title = clean_text(link.get_text())

        # Normalise relative URLs before any filtering
        if href.startswith("/"):
            href = READERS_BASE + href

        # Only chapter/note links contain /e-notes/ in their path
        if "/e-notes/" not in href:
            continue

        # Drop links with empty text
        if not title:
            continue

        # Skip duplicate hrefs and the subject index URL itself
        if href == url or href in seen_hrefs:
            continue

        seen_hrefs.add(href)
        chapters.append({
            "title": title,
            "url": href,
        })

    logger.info(f"Kept {len(chapters)} chapter links after filtering.")
    return chapters


def scrape_readers_chapter(url: str) -> Optional[dict]:
    """Scrape a chapter's full content from readersnepal.com."""
    soup = fetch_page(url)
    if not soup:
        return None

    soup = remove_unwanted_elements(soup)

    title_el = soup.select_one("h1") or soup.find("title")
    title = clean_text(title_el.get_text()) if title_el else "Untitled"

    # readersnepal.com: primary container is .entry-content; strip WordPress sharing
    # and related-post widgets before extracting so they don't pollute the content.
    entry = soup.select_one(".entry-content")
    if entry:
        for unwanted_sel in (
            ".sharedaddy",
            ".jp-relatedposts",
            ".relatedposts",
            "[class*='sharedaddy']",
            "[class*='relatedposts']",
            "[class*='jetpack']",
            "nav",
            "[class*='navigation']",
            "[class*='nav-links']",
        ):
            for el in entry.select(unwanted_sel):
                el.decompose()

    content_selectors = [
        ".entry-content",
        ".note-content",
        ".post-body",
        "article .content",
        "article",
        "main .content",
        ".container .content",
        "main",
    ]

    content = None
    for selector in content_selectors:
        area = soup.select_one(selector)
        if not area:
            continue
        candidate = extract_html_content(area)
        ok, reason = validate_content_quality(candidate)
        if ok:
            content = candidate
            break
        logger.debug(f"Selector '{selector}' gave low-quality content: {reason}")

    if not content:
        logger.warning(f"All selectors gave low-quality content for: {url}")
        return None

    return {
        "title": title,
        "content": content,
        "source_url": url,
        "content_quality": "full",
    }


# ─── Shared helpers ──────────────────────────────────────────────────


def validate_content_quality(content: str) -> tuple[bool, str]:
    """Check whether scraped content meets minimum quality standards."""
    if not content or not content.strip():
        return False, "empty content"
    if len(content) < MIN_CONTENT_CHARS:
        return False, f"too short ({len(content)} < {MIN_CONTENT_CHARS} chars)"
    text_only = re.sub(r"<[^>]+>", "", content).strip()
    if len(text_only) < MIN_TEXT_CHARS:
        return False, f"insufficient text ({len(text_only)} < {MIN_TEXT_CHARS} chars)"
    return True, "ok"


def _strip_external_links(element: Tag) -> None:
    """Remove <a> tags whose href points to external/social domains.
    The link text is preserved as plain text so no content is lost."""
    for a in element.find_all("a", href=True):
        href = a.get("href", "")
        if any(domain in href for domain in _STRIP_DOMAINS):
            a.replace_with(NavigableString(a.get_text()))


def _process_element(el: Tag) -> str:
    """Recursively convert a BeautifulSoup element to clean HTML."""
    name = el.name
    if name is None:
        return ""

    if name in ("script", "style", "noscript", "iframe", "ins", "button"):
        return ""

    if name in ("h1", "h2", "h3", "h4", "h5", "h6"):
        text = clean_text(el.get_text())
        return f"<{name}>{text}</{name}>" if text else ""

    if name == "p":
        inner = _inner_html(el)
        text = clean_text(el.get_text())
        return f"<p>{inner}</p>" if text else ""

    if name in ("ul", "ol"):
        items = []
        for li in el.find_all("li", recursive=False):
            inner = _inner_html(li)
            t = clean_text(li.get_text())
            if t:
                items.append(f"<li>{inner}</li>")
        return f"<{name}>{''.join(items)}</{name}>" if items else ""

    if name == "li":
        inner = _inner_html(el)
        text = clean_text(el.get_text())
        return f"<li>{inner}</li>" if text else ""

    if name == "blockquote":
        text = clean_text(el.get_text())
        return f"<blockquote><p>{text}</p></blockquote>" if text else ""

    if name == "table":
        # Keep tables with their inner structure but sanitised
        return _sanitise_table(el)

    if name in ("strong", "b"):
        text = clean_text(el.get_text())
        return f"<strong>{text}</strong>" if text else ""

    if name in ("em", "i"):
        text = clean_text(el.get_text())
        return f"<em>{text}</em>" if text else ""

    if name in ("sub", "sup"):
        text = clean_text(el.get_text())
        return f"<{name}>{text}</{name}>" if text else ""

    if name in ("br",):
        return "<br>"

    if name in ("div", "section", "article", "main", "span"):
        parts = []
        for child in el.children:
            if isinstance(child, Tag):
                parts.append(_process_element(child))
            elif isinstance(child, NavigableString):
                t = child.strip()
                if t:
                    parts.append(str(t))
        return " ".join(p for p in parts if p)

    # Default: recurse into children
    parts = []
    for child in el.children:
        if isinstance(child, Tag):
            parts.append(_process_element(child))
        elif isinstance(child, NavigableString):
            t = child.strip()
            if t:
                parts.append(str(t))
    return " ".join(p for p in parts if p)


def _inner_html(el: Tag) -> str:
    """Return the inner content of an element as clean HTML string."""
    parts = []
    for child in el.children:
        if isinstance(child, Tag):
            parts.append(_process_element(child))
        elif isinstance(child, NavigableString):
            t = child.strip()
            if t:
                parts.append(str(t))
    return " ".join(p for p in parts if p)


def _sanitise_table(table: Tag) -> str:
    """Return a clean <table> HTML string."""
    rows = []
    for tr in table.find_all("tr"):
        cells = []
        for cell in tr.find_all(["th", "td"]):
            tag = cell.name
            text = clean_text(cell.get_text())
            cells.append(f"<{tag}>{text}</{tag}>")
        if cells:
            rows.append(f"<tr>{''.join(cells)}</tr>")
    return f"<table>{''.join(rows)}</table>" if rows else ""


def extract_html_content(element: Tag) -> str:
    """Extract full educational content as clean, renderable HTML.

    - Strips ads, scripts, social widgets, navigation
    - Removes links to external domains (no redirect leakage)
    - Preserves headings, paragraphs, lists, tables, emphasis
    - Deduplicates consecutive identical blocks
    """
    # Phase 1: remove clutter tags in-place
    for tag in element.find_all(
        ["script", "style", "iframe", "ins", "noscript", "button", "form"]
    ):
        tag.decompose()

    clutter_selectors = [
        '[class*="share"]', '[class*="social"]', '[class*="-ad"]',
        '[class*="ad-"]',  '[class*="advertisement"]', '[id*="ad-"]',
        '[class*="related"]', '[class*="recommended"]', '[class*="popup"]',
        '[class*="subscribe"]', '[class*="newsletter"]', '[class*="cookie"]',
        '[class*="comment"]', '[class*="sidebar"]', '[class*="widget"]',
        '.sharedaddy', '.jp-relatedposts', '.relatedposts',
        '[class*="jetpack"]', '[class*="nav-links"]',
    ]
    for sel in clutter_selectors:
        for el in element.select(sel):
            el.decompose()

    # Phase 2: strip external redirect links (keep the link text)
    _strip_external_links(element)

    # Phase 3: build clean HTML from top-level block elements
    BLOCK_TAGS = {
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "ul", "ol", "blockquote", "table", "div", "section",
    }
    parts = []
    for child in element.children:
        if isinstance(child, Tag) and child.name in BLOCK_TAGS:
            html = _process_element(child)
            if html and html.strip():
                parts.append(html.strip())
        elif isinstance(child, NavigableString):
            t = child.strip()
            if t:
                parts.append(f"<p>{t}</p>")

    if not parts:
        # Last-resort fallback: grab all text as paragraphs
        raw = clean_text(element.get_text())
        if raw:
            return f"<p>{raw}</p>"
        return ""

    # Deduplicate consecutive identical blocks
    deduped = []
    for block in parts:
        if not deduped or block != deduped[-1]:
            deduped.append(block)

    return "\n".join(deduped)
