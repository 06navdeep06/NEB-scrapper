"""Generic scraper that works with any SourceConfig.

scrape_subject_page(config, url)  →  list of {title, url} chapter dicts
scrape_chapter(config, url)       →  {title, content, source_url, content_quality}

Both functions first try the site-specific selectors declared in the
SourceConfig, then fall back to the universal readability-style heuristic
in utils.extract_universal_content() — so they work on any education site
without writing bespoke parser code.
"""

from typing import Optional

from .utils import (
    fetch_page,
    clean_text,
    remove_unwanted_elements,
    extract_universal_content,
    logger,
)
from .parsers import (
    extract_html_content,
    validate_content_quality,
    _find_dense_container,
    _heuristic_chapter_links,
)
from .sources import SourceConfig

_NOISE_SELECTORS = (
    ".sharedaddy", ".jp-relatedposts", ".relatedposts",
    "[class*='sharedaddy']", "[class*='relatedposts']", "[class*='jetpack']",
    "nav", "[class*='navigation']", "[class*='nav-links']",
    "style", "script",
)


def scrape_subject_page(config: SourceConfig, url: str, subject: str = "") -> list[dict]:
    """Discover chapter links on a subject index page.

    If config.custom_subject_scraper is set, delegates entirely to that callable
    (signature: fn(url, subject) -> list[dict]) — it may return dicts that already
    contain a 'content' key, in which case the caller should skip scrape_chapter().

    Otherwise falls back to the generic link-discovery logic:
    1. Fetch the page.
    2. Scope link search to .entry-content → article → main → p-density fallback → full doc.
    3. Keep only links that (a) belong to this domain, (b) contain one of
       config.link_path_contains in the href, and (c) have text longer than
       config.min_title_len.
    4. If that yields 0 links, run the full-page heuristic finder as a last resort.
    """
    if config.custom_subject_scraper is not None:
        return config.custom_subject_scraper(url, subject=subject)

    soup = fetch_page(url)
    if not soup:
        logger.warning(f"[{config.key}] Could not fetch subject page: {url}")
        return []

    label = subject or url

    container = (
        soup.select_one(".entry-content")
        or soup.select_one("article")
        or soup.select_one("main")
        or _find_dense_container(soup)
        or soup
    )

    all_links = container.find_all("a", href=True)
    logger.info(f"[{config.key}] Found {len(all_links)} <a> tags in container for {label}")
    print(f"DEBUG [{config.key}]: Found {len(all_links)} links for {label}")

    chapters: list[dict] = []
    seen: set[str] = set()

    for link in all_links:
        href: str = link["href"]
        title = clean_text(link.get_text())

        if href.startswith("/"):
            href = config.base_url.rstrip("/") + href
        elif not href.startswith("http"):
            continue

        if config.base_url not in href:
            continue

        if not any(p in href for p in config.link_path_contains):
            continue

        if href == url or href in seen:
            continue

        if not title or len(title) < config.min_title_len:
            continue

        seen.add(href)
        chapters.append({"title": title, "url": href})

    # Heuristic fallback when the container-scoped approach found nothing
    if not chapters:
        logger.info(f"[{config.key}] Container search 0 links — trying heuristic finder for {label}")
        print(f"DEBUG [{config.key}]: 0 links in container — falling back to heuristic finder")
        all_candidates = _heuristic_chapter_links(soup, base_url=config.base_url, subject_url=url)
        chapters = [
            c for c in all_candidates
            if config.base_url in c["url"]
            and any(p in c["url"] for p in config.link_path_contains)
        ]
        if not chapters:
            print(
                f"DEBUG [{config.key}]: Still 0 links after heuristic. "
                f"First 500 chars of HTML:\n{str(soup)[:500]}"
            )

    logger.info(f"[{config.key}] Kept {len(chapters)} chapter links for {label}")
    return chapters


def scrape_chapter(config: SourceConfig, url: str) -> Optional[dict]:
    """Scrape a single chapter page for any SourceConfig.

    Extraction order:
    1. Try each CSS selector in config.content_selectors.
    2. If all fail quality validation, try the universal heuristic
       (extract_universal_content) as a last-resort fallback.
    """
    soup = fetch_page(url)
    if not soup:
        return None

    soup = remove_unwanted_elements(soup)

    title_el = soup.select_one("h1") or soup.find("title")
    title = clean_text(title_el.get_text()) if title_el else "Untitled"

    content: Optional[str] = None

    for selector in config.content_selectors:
        area = soup.select_one(selector)
        if not area:
            continue

        for noise_sel in _NOISE_SELECTORS:
            for el in area.select(noise_sel):
                el.decompose()

        candidate = extract_html_content(area)
        ok, reason = validate_content_quality(candidate)
        if ok:
            content = candidate
            logger.debug(f"[{config.key}] Selector '{selector}' matched: {url}")
            break
        logger.debug(f"[{config.key}] '{selector}' low quality ({reason}): {url}")

    if not content:
        best_el = extract_universal_content(soup)
        if best_el:
            for noise_sel in _NOISE_SELECTORS:
                for el in best_el.select(noise_sel):
                    el.decompose()
            candidate = extract_html_content(best_el)
            ok, reason = validate_content_quality(candidate)
            if ok:
                content = candidate
                logger.info(f"[{config.key}] Universal fallback succeeded: {url}")

    if not content:
        logger.warning(f"[{config.key}] No quality content found: {url}")
        return None

    return {
        "title": title,
        "content": content,
        "source_url": url,
        "content_quality": "full",
    }
