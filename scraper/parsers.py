"""Parsers for scraping NEB educational content from target websites."""

import re
import logging
from typing import Optional
from bs4 import BeautifulSoup, Tag

from .utils import (
    fetch_page,
    clean_text,
    remove_unwanted_elements,
    polite_delay,
    logger,
)

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
    """Scrape a chapter's content from nebplus2notes.com."""
    soup = fetch_page(url)
    if not soup:
        return None

    soup = remove_unwanted_elements(soup)

    # Extract title
    title_el = soup.select_one("h1.entry-title") or soup.select_one("h1") or soup.find("title")
    title = clean_text(title_el.get_text()) if title_el else "Untitled"

    # Extract main content
    content_area = (
        soup.select_one(".entry-content")
        or soup.select_one("article")
        or soup.select_one(".post-content")
        or soup.select_one("main")
    )

    if not content_area:
        return None

    # Clean up the content - keep text and important HTML structure
    content = extract_clean_content(content_area)

    return {
        "title": title,
        "content": content,
        "source_url": url,
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
    """Scrape a chapter's content from readersnepal.com."""
    soup = fetch_page(url)
    if not soup:
        return None

    soup = remove_unwanted_elements(soup)

    title_el = soup.select_one("h1") or soup.find("title")
    title = clean_text(title_el.get_text()) if title_el else "Untitled"

    content_area = (
        soup.select_one(".note-content")
        or soup.select_one(".entry-content")
        or soup.select_one("article")
        or soup.select_one("main .content")
        or soup.select_one("main")
    )

    if not content_area:
        return None

    content = extract_clean_content(content_area)

    return {
        "title": title,
        "content": content,
        "source_url": url,
    }


# ─── Shared helpers ──────────────────────────────────────────────────


def extract_clean_content(element: Tag) -> str:
    """Extract clean text content preserving basic structure."""
    # Remove remaining unwanted elements within content
    for tag in element.find_all(["script", "style", "iframe", "ins", "noscript"]):
        tag.decompose()

    # Remove share buttons, ad containers
    for tag in element.select('[class*="share"], [class*="social"], [class*="ad"]'):
        tag.decompose()

    # Build clean content preserving headings, paragraphs, lists
    parts = []
    for child in element.descendants:
        if isinstance(child, Tag):
            if child.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                text = clean_text(child.get_text())
                if text:
                    level = int(child.name[1])
                    parts.append(f"\n{'#' * level} {text}\n")
            elif child.name == "p":
                text = clean_text(child.get_text())
                if text:
                    parts.append(f"\n{text}\n")
            elif child.name == "li":
                text = clean_text(child.get_text())
                if text:
                    parts.append(f"- {text}")

    if not parts:
        # Fallback to plain text
        return clean_text(element.get_text())

    # Deduplicate consecutive identical lines
    result = []
    for line in "\n".join(parts).split("\n"):
        if not result or line != result[-1]:
            result.append(line)

    return "\n".join(result).strip()
