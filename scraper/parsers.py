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
            "Physics": f"{NEBPLUS2_BASE}/physics-class-12/",
            "Chemistry": f"{NEBPLUS2_BASE}/chemistry-class-12/",
            "Mathematics": f"{NEBPLUS2_BASE}/mathematics-class-12/",
            "Biology": f"{NEBPLUS2_BASE}/biology-class-12/",
            "Computer Science": f"{NEBPLUS2_BASE}/computer-science-class-12/",
            "English": f"{NEBPLUS2_BASE}/english-class-12/",
        },
        "Management": {
            "Accountancy": f"{NEBPLUS2_BASE}/accountancy-class-12/",
            "Economics": f"{NEBPLUS2_BASE}/economics-class-12/",
            "Business Studies": f"{NEBPLUS2_BASE}/business-studies-class-12/",
        },
    },
    11: {
        "Science": {
            "Physics": f"{NEBPLUS2_BASE}/physics-class-11/",
            "Chemistry": f"{NEBPLUS2_BASE}/chemistry-class-11/",
            "Mathematics": f"{NEBPLUS2_BASE}/mathematics-class-11/",
            "Biology": f"{NEBPLUS2_BASE}/biology-class-11/",
            "Computer Science": f"{NEBPLUS2_BASE}/computer-science-class-11/",
            "English": f"{NEBPLUS2_BASE}/english-class-11/",
        },
        "Management": {
            "Accountancy": f"{NEBPLUS2_BASE}/accountancy-class-11/",
            "Economics": f"{NEBPLUS2_BASE}/economics-class-11/",
            "Business Studies": f"{NEBPLUS2_BASE}/business-studies-class-11/",
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

    # Try content selectors in priority order; retry with each on quality failure
    content_selectors = [
        ".entry-content",
        ".post-content",
        "article .content",
        "article",
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
            "Computer Science": f"{READERS_BASE}/e-notes/class-12-computer-science",
            "Physics": f"{READERS_BASE}/e-notes/class-12-physics",
            "Chemistry": f"{READERS_BASE}/e-notes/class-12-chemistry",
            "Biology": f"{READERS_BASE}/e-notes/class-12-biology",
            "Mathematics": f"{READERS_BASE}/e-notes/class-12-mathematics",
        },
    },
    11: {
        "Science": {
            "Computer Science": f"{READERS_BASE}/e-notes/class-11-computer-science",
            "Physics": f"{READERS_BASE}/e-notes/class-11-physics",
            "Chemistry": f"{READERS_BASE}/e-notes/class-11-chemistry",
        },
    },
}


def scrape_readers_subject_page(url: str) -> list[dict]:
    """Scrape a subject page from readersnepal.com to get chapter list."""
    soup = fetch_page(url)
    if not soup:
        logger.warning(f"Could not fetch subject page: {url}")
        return []

    soup = remove_unwanted_elements(soup)
    chapters = []

    # readersnepal uses card-based layouts
    cards = soup.select(".card, .post-card, .note-card, article")
    if not cards:
        # Fallback: look for links in main content
        main = soup.select_one("main, .content, .container")
        if main:
            cards = [main]

    for card in cards:
        for link in card.find_all("a", href=True):
            href = link["href"]
            title = clean_text(link.get_text())

            if not title or len(title) < 3:
                continue
            if any(skip in href.lower() for skip in ["#", "javascript:"]):
                continue

            if READERS_BASE in href or href.startswith("/"):
                if href.startswith("/"):
                    href = READERS_BASE + href
                chapters.append({
                    "title": title,
                    "url": href,
                })

    return chapters


def scrape_readers_chapter(url: str) -> Optional[dict]:
    """Scrape a chapter's full content from readersnepal.com."""
    soup = fetch_page(url)
    if not soup:
        return None

    soup = remove_unwanted_elements(soup)

    title_el = soup.select_one("h1") or soup.find("title")
    title = clean_text(title_el.get_text()) if title_el else "Untitled"

    content_selectors = [
        ".note-content",
        ".entry-content",
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
