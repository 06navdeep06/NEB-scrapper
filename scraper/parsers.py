"""Parsers for scraping NEB educational content from target websites."""

import re
import json
import html as _html_module
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

# ─── Heuristic link-finding helpers ────────────────────────────────────────

# Matches href paths that strongly indicate a note/chapter page
_NOTE_HREF_RE = re.compile(
    r"/(?:e-notes?|notes?|unit[-_]|chapter[-_]|lesson[-_]|solution)",
    re.IGNORECASE,
)
# Matches visible link text like "Unit 1", "Chapter 3", "Lesson 2"
_NOTE_TEXT_RE = re.compile(
    r"\b(?:unit|chapter|lesson|exercise)\b",
    re.IGNORECASE,
)
# URL tokens that indicate navigation/utility pages — skip these
_NAV_SKIP_TOKENS = frozenset({
    "category", "tag", "author", "contact", "about", "privacy",
    "terms", "login", "register", "cart", "shop", "search",
    "sitemap", "feed", "javascript:",
})


def _find_dense_container(soup: BeautifulSoup) -> Optional[Tag]:
    """Return the block element with the most <p> tags (paragraph-density heuristic).

    This finds the 'real' article body on pages where known CSS selectors are absent
    — the content div almost always has more paragraphs than any nav/sidebar element.
    """
    best: Optional[Tag] = None
    best_count = 0
    for el in soup.find_all(["div", "section", "article", "main"]):
        count = len(el.find_all(["p", "li"]))
        if count > best_count:
            best_count = count
            best = el
    return best if best_count >= 3 else None


def _heuristic_chapter_links(
    soup: BeautifulSoup,
    base_url: str = "",
    subject_url: str = "",
) -> list[dict]:
    """Find chapter links anywhere on the page using pattern heuristics.

    Does NOT rely on specific CSS class names.  A link qualifies if:
    - Its href path contains a note/unit/chapter keyword pattern, OR
    - Its visible text matches 'Unit N' / 'Chapter N' style text.
    Navigation links (category, tag, author, contact…) are always skipped.
    """
    chapters: list[dict] = []
    seen: set[str] = set()

    for link in soup.find_all("a", href=True):
        href: str = link["href"]
        title = clean_text(link.get_text())

        if not title or len(title) < 3:
            continue

        if href.startswith("/") and base_url:
            href = base_url.rstrip("/") + href
        elif not href.startswith("http"):
            continue

        # Split path into segments to avoid substring false-positives
        # (e.g. "search" must not match "research")
        href_segments = set(re.split(r"[/\-_?#]", href.lower()))
        if href_segments & _NAV_SKIP_TOKENS:
            continue

        if href == subject_url or href in seen:
            continue

        href_ok = bool(_NOTE_HREF_RE.search(href))
        text_ok = bool(_NOTE_TEXT_RE.search(title))
        if not (href_ok or text_ok):
            continue

        seen.add(href)
        chapters.append({"title": title, "url": href})

    return chapters


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

    # 1. Try known containers; fall back to paragraph-density heuristic
    container = (
        soup.select_one(".entry-content")
        or soup.select_one("article")
        or soup.select_one(".post-content")
        or soup.select_one("main")
        or _find_dense_container(soup)
        or soup
    )

    all_links = container.find_all("a", href=True)
    logger.info(f"[nebplus2] Found {len(all_links)} <a> tags in container for {url}")
    print(f"DEBUG [nebplus2]: Found {len(all_links)} links in container for {url}")

    chapters: list[dict] = []
    seen: set[str] = set()

    for link in all_links:
        href = link["href"]
        title = clean_text(link.get_text())

        if not title or len(title) < 3:
            continue
        if any(skip in href.lower() for skip in ["#", "javascript:", "facebook", "twitter"]):
            continue

        if NEBPLUS2_BASE in href or href.startswith("/"):
            if href.startswith("/"):
                href = NEBPLUS2_BASE + href
            if href == url or href in seen:
                continue
            seen.add(href)
            chapters.append({"title": title, "url": href})

    # 2. Full-page heuristic fallback when container search found nothing
    if not chapters:
        logger.info(f"[nebplus2] Container search 0 links — trying heuristic finder for {url}")
        print(f"DEBUG [nebplus2]: 0 links in container — falling back to heuristic finder")
        chapters = [
            c for c in _heuristic_chapter_links(soup, base_url=NEBPLUS2_BASE, subject_url=url)
            if NEBPLUS2_BASE in c["url"]
        ]
        if not chapters:
            body = soup.find("body")
            raw = str(body)[:1000] if body else str(soup)[:1000]
            print(
                f"DEBUG [nebplus2]: Still 0 links after heuristic. "
                f"Raw HTML Dump:\n{raw}"
            )

    logger.info(f"[nebplus2] Kept {len(chapters)} chapter links.")
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
            "Physics": f"{READERS_BASE}/e-notes/neb-new-course-class-11/physics",
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


def scrape_readers_subject_page(url: str, subject: str = "") -> list[dict]:
    """Scrape a subject page from readersnepal.com to get chapter list."""
    soup = fetch_page(url)
    if not soup:
        logger.warning(f"Could not fetch subject page: {url}")
        return []

    # Do NOT call remove_unwanted_elements here — it strips ALL <header> tags,
    # which includes WordPress <header class="entry-header"> blocks that contain
    # the chapter title <a> links on category/archive pages.
    label = subject or url
    print(f"DEBUG [readers]: Fetched {url} — using heuristic link finder")

    chapters = _heuristic_chapter_links(soup, base_url=READERS_BASE, subject_url=url)
    chapters = [c for c in chapters if READERS_BASE in c["url"]]

    logger.info(f"[readers] Kept {len(chapters)} chapter links for {label}")
    print(f"DEBUG [readers]: Kept {len(chapters)} chapter links for {label}")

    if not chapters:
        body = soup.find("body")
        raw = str(body)[:1000] if body else str(soup)[:1000]
        print(f"DEBUG [readers]: 0 links — Raw HTML Dump:\n{raw}")

    return chapters


def extract_readers_note_json(html_text: str) -> Optional[dict]:
    """Extract the :note Vue prop JSON embedded in a readersnepal.com subject page.

    readersnepal.com is a Laravel+Vue SPA that server-injects all chapter data
    (including full HTML content) as a single JSON prop on the root component:
        <note-view :note='{"id":...,"chapters":[{"name":"...","content":"..."}]}'...>
    The content strings are Unicode-escaped HTML (\\u003Cp\\u003E…).
    json.loads() decodes them automatically.
    """
    m = re.search(r":note='([^']+)'\s", html_text)
    if not m:
        m = re.search(r':note="([^"]+)"\s', html_text)
    if not m:
        return None
    raw = _html_module.unescape(m.group(1))
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        logger.warning(f"[readers] Failed to parse :note JSON: {exc}")
        return None


def scrape_readers_full_subject(url: str, subject: str = "") -> list[dict]:
    """Scrape a readersnepal.com subject page and return fully-populated chapter dicts.

    Because the site embeds all chapter content in the page HTML (via a Vue prop),
    this function returns chapter dicts that already contain 'content' — so the
    caller does NOT need to issue separate per-chapter HTTP requests.

    Returns a list of dicts compatible with scrape_chapter() output:
        {title, url, content, source_url, content_quality}
    plus an extra 'slug' key for reference.
    """
    import requests as _requests

    label = subject or url
    try:
        resp = _requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
        if resp.status_code in (403, 404, 410):
            logger.warning(f"[readers] HTTP {resp.status_code} on subject page: {url}")
            return []
        resp.raise_for_status()
        html_text = resp.text
    except Exception as exc:
        logger.warning(f"[readers] Could not fetch subject page {url}: {exc}")
        return []

    note = extract_readers_note_json(html_text)
    if not note:
        logger.warning(f"[readers] No embedded :note JSON found at {url}")
        return []

    chapters_raw = note.get("chapters", [])
    logger.info(f"[readers] Found {len(chapters_raw)} chapters in embedded JSON for {label}")

    results = []
    for ch in chapters_raw:
        ch_name = clean_text(ch.get("name", "") or "")
        ch_slug = ch.get("slug", "")
        ch_content_raw = ch.get("content", "") or ""

        if not ch_name or not ch_slug:
            continue

        # Content is already decoded HTML after json.loads()
        # Run it through BeautifulSoup to clean and standardise it
        try:
            area = BeautifulSoup(ch_content_raw, "html.parser")
            content = extract_html_content(area)
        except Exception:
            content = ch_content_raw

        ok, reason = validate_content_quality(content)
        if not ok:
            logger.debug(f"[readers] Low quality ({reason}) for chapter '{ch_name}'")
            # Still include it — caller can decide
            content_quality = "low"
        else:
            content_quality = "full"

        ch_url = url.rstrip("/") + "/" + ch_slug
        results.append({
            "title": ch_name,
            "url": ch_url,
            "content": content,
            "source_url": ch_url,
            "content_quality": content_quality,
            "slug": ch_slug,
        })

    logger.info(f"[readers] Returning {len(results)} chapters for {label}")
    return results


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
            "style",
            "script",
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
