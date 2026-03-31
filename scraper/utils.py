"""Utility functions for the NEB scraper."""

import time
import random
import logging
import os
import json
from typing import Optional

import requests
from bs4 import BeautifulSoup

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


def fetch_page(url: str, retries: int = 3) -> Optional[BeautifulSoup]:
    """Fetch a page and return parsed BeautifulSoup object."""
    for attempt in range(retries):
        try:
            logger.info(f"Fetching: {url} (attempt {attempt + 1})")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            # Client errors (bad URL / access denied) are permanent — skip immediately
            if resp.status_code in (403, 404, 410):
                logger.warning(f"HTTP {resp.status_code} — skipping without retry: {url}")
                return None
            resp.raise_for_status()
            return BeautifulSoup(resp.text, "html.parser")
        except requests.RequestException as e:
            logger.warning(f"Failed to fetch {url}: {e}")
            if attempt < retries - 1:
                delay = random.uniform(2, 5)
                logger.info(f"Retrying in {delay:.1f}s...")
                time.sleep(delay)
    return None


def clean_text(text: str) -> str:
    """Clean extracted text by removing extra whitespace."""
    lines = text.strip().split("\n")
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            cleaned.append(stripped)
    return "\n".join(cleaned)


def remove_unwanted_elements(soup: BeautifulSoup) -> BeautifulSoup:
    """Remove ads, nav, footer, scripts, and other clutter from HTML."""
    selectors_to_remove = [
        "script", "style", "noscript", "iframe",
        "nav", "footer", "header",
        ".advertisement", ".ad", ".ads", ".sidebar",
        ".nav", ".navbar", ".menu",
        ".footer", ".widget", ".social-share",
        ".comments", ".comment-section",
        ".related-posts", ".breadcrumb",
        '[class*="ad-"]', '[class*="banner"]',
        '[id*="ad-"]', '[id*="banner"]',
    ]
    for selector in selectors_to_remove:
        for el in soup.select(selector):
            el.decompose()
    return soup


def polite_delay(min_sec: float = 1.0, max_sec: float = 2.5):
    """Add a random delay between requests to be polite."""
    delay = random.uniform(min_sec, max_sec)
    time.sleep(delay)


def save_json(data: dict, filename: str):
    """Save data as JSON to the data directory."""
    os.makedirs(DATA_DIR, exist_ok=True)
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    logger.info(f"Saved: {filepath}")


def load_json(filename: str) -> Optional[dict]:
    """Load JSON data from the data directory."""
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return None
