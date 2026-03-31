"""NEB Content Discovery Utility
=================================
Given a subject name (and optional class), probes a list of predefined
domains to find which pages actually contain matching NEB notes.

Usage:
    python -m scraper.discover "Physics"
    python -m scraper.discover "Business Studies" --class 12
    python -m scraper.discover "Physics" --class 11 --verbose

Output:
    A table of probed URLs with their status (OK / 404 / ERROR) and
    a content preview, plus a ready-to-paste SourceConfig snippet for
    any URL that returned content.
"""

import argparse
import re
import sys
import time
from typing import Optional

import requests
from bs4 import BeautifulSoup

from .utils import HEADERS, logger, extract_universal_content
from .parsers import _heuristic_chapter_links

# ─── Domains and slug patterns to probe ─────────────────────────────────────

_DOMAINS = [
    "https://nebplus2notes.com",
    "https://readersnepal.com",
    "https://www.tyrocity.com",
    "https://hamronotes.com",
    "https://kullabs.com",
    "https://bscnotes.com",
    "https://nepalnotes.com",
    "https://classnotes.com.np",
]

# Each entry: (url_template, link_path_hint)
# Placeholders: {subject_slug}, {class_num}
_URL_PATTERNS: list[tuple[str, str]] = [
    ("{domain}/class-{class_num}/{subject_slug}/",            "/class-"),
    ("{domain}/notes/{subject_slug}-class-{class_num}/",      "/notes/"),
    ("{domain}/neb-class-{class_num}-{subject_slug}-notes/",  "-notes/"),
    ("{domain}/e-notes/neb-new-course-class-{class_num}/{subject_slug}", "/e-notes/"),
    ("{domain}/e-notes/neb-new-course-class-{class_num}/{subject_slug}-1", "/e-notes/"),
    ("{domain}/{subject_slug}-class-{class_num}/",            "/class-"),
    ("{domain}/class-{class_num}/{subject_slug}-notes/",      "/class-"),
    ("{domain}/neb/{subject_slug}/class-{class_num}/",        "/neb/"),
    ("{domain}/subjects/{subject_slug}/class-{class_num}/",   "/subjects/"),
]

# Common subject → slug variants to try
_SUBJECT_SLUGS: dict[str, list[str]] = {
    "physics":          ["physics"],
    "chemistry":        ["chemistry"],
    "biology":          ["biology"],
    "mathematics":      ["mathematics", "maths", "math"],
    "computer science": ["computer-science", "computer"],
    "english":          ["english"],
    "nepali":           ["nepali"],
    "economics":        ["economics"],
    "business studies": ["business-studies", "business"],
    "accountancy":      ["accountancy", "accounting"],
}


# ─── Helpers ─────────────────────────────────────────────────────────────────

def _slugify(text: str) -> str:
    text = text.lower().strip()
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def _probe(url: str, timeout: int = 8) -> tuple[int, Optional[BeautifulSoup]]:
    """Fetch URL, return (status_code, soup_or_None)."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        if resp.status_code == 200:
            return 200, BeautifulSoup(resp.text, "html.parser")
        return resp.status_code, None
    except requests.RequestException as e:
        logger.debug(f"Probe error {url}: {e}")
        return 0, None


def _get_page_title(soup: BeautifulSoup) -> str:
    """Extract page title from <title> or first <h1>."""
    el = soup.find("title") or soup.find("h1")
    return el.get_text(strip=True)[:80] if el else "(no title)"


def _count_chapter_links(soup: BeautifulSoup, link_hint: str, base_url: str = "") -> int:
    """Count links in main content that contain the given path hint.

    Falls back to the full-page heuristic finder when the hint-based
    search finds nothing (handles sites with non-standard layouts).
    base_url must be passed so that relative hrefs are resolved before
    pattern-matching — without it every relative link is silently dropped.
    """
    container = extract_universal_content(soup) or soup
    count = sum(1 for a in container.find_all("a", href=True) if link_hint in a["href"])
    if count > 0:
        return count
    # Heuristic fallback: pattern-match across the whole document
    return len(_heuristic_chapter_links(soup, base_url=base_url))


def _text_preview(soup: BeautifulSoup, chars: int = 120) -> str:
    el = extract_universal_content(soup)
    if not el:
        return ""
    text = el.get_text(separator=" ", strip=True)
    return text[:chars] + ("…" if len(text) > chars else "")


# ─── Main discovery logic ────────────────────────────────────────────────────

def discover(
    subject: str,
    class_num: int = 12,
    verbose: bool = False,
) -> list[dict]:
    """Probe all domains for pages matching the given subject and class.

    Returns a list of result dicts with keys:
        url, status, chapter_links, preview, link_hint
    """
    subject_lower = subject.lower().strip()
    slug_variants = _SUBJECT_SLUGS.get(subject_lower, [_slugify(subject)])

    probed: set[str] = set()
    results: list[dict] = []

    print(f"\nDiscovering '{subject}' (Class {class_num}) across {len(_DOMAINS)} domains…\n")
    print(f"{'URL':<70} {'STATUS':>7}  {'LINKS':>5}  PREVIEW")
    print("-" * 110)

    for domain in _DOMAINS:
        for slug in slug_variants:
            for tpl, link_hint in _URL_PATTERNS:
                url = tpl.format(domain=domain, subject_slug=slug, class_num=class_num)
                if url in probed:
                    continue
                probed.add(url)

                status, soup = _probe(url)
                time.sleep(0.3)  # be polite

                if status == 200 and soup:
                    ch_links = _count_chapter_links(soup, link_hint, base_url=domain)
                    page_title = _get_page_title(soup)
                    preview = _text_preview(soup) if verbose else ""
                    results.append({
                        "url": url,
                        "status": status,
                        "chapter_links": ch_links,
                        "preview": preview,
                        "link_hint": link_hint,
                        "domain": domain,
                        "page_title": page_title,
                    })
                    print(f"{url:<70} {'200':>7}  {ch_links:>5}  [{page_title}]")
                    if ch_links == 0:
                        body = soup.find("body")
                        raw = (str(body)[:1000] if body else str(soup)[:1000]).replace("\n", " ")
                        print(f"  ↳ RAW HTML DUMP: {raw}")
                elif verbose:
                    print(f"{url:<70} {str(status):>7}  {'—':>5}")

    ok = [r for r in results if r["chapter_links"] > 0]
    print(f"\n{'='*110}")
    print(f"Found {len(ok)} URL(s) with chapter links out of {len(probed)} probed.\n")

    if ok:
        print("─── Ready-to-paste SourceConfig snippet ─────────────────────────────")
        print(f'    "{subject}": {{')
        for r in ok:
            domain_var = "_" + r["domain"].split("//")[-1].replace("www.", "").replace(".", "_").upper().rstrip("/")
            print(f'        # {r["domain"]}  ({r["chapter_links"]} chapter links found)')
            print(f'        # "{subject}": f"{{{domain_var}}}{r["url"][len(r["domain"])]}",')
        print('    }')

    return results


def main():
    parser = argparse.ArgumentParser(description="NEB Content Discovery Utility")
    parser.add_argument("subject", help="Subject name to search for (e.g. 'Physics')")
    parser.add_argument(
        "--class",
        dest="class_num",
        type=int,
        default=12,
        help="Class number (default: 12)",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Show all probed URLs including 404s, and content previews",
    )
    args = parser.parse_args()
    discover(args.subject, class_num=args.class_num, verbose=args.verbose)


if __name__ == "__main__":
    main()
