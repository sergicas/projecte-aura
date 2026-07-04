#!/usr/bin/env python3
"""Find and save one exceptional recent open article per day."""

from __future__ import annotations

import argparse
import calendar
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
import textwrap
import time
import traceback
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qsl, urlencode, urljoin, urlsplit, urlunsplit

import feedparser
import requests
import trafilatura
from bs4 import BeautifulSoup
from dateutil import parser as date_parser


APP_NAME = "Article Diari Gratuit"
DISPLAY_NAME = "Article Diari Gratuït"
PROJECT_DIR = Path(__file__).resolve().parent
SOURCES_PATH = PROJECT_DIR / "sources.json"
APP_SUPPORT_DIR = Path.home() / "Library" / "Application Support" / "ArticleDiariGratuit"
DATA_DIR = Path(os.environ.get("ARTICLE_DIARI_DATA_DIR", APP_SUPPORT_DIR / "data"))
HISTORY_PATH = DATA_DIR / "history.json"
LEGACY_HISTORY_PATH = PROJECT_DIR / "data" / "history.json"
OUTPUT_ROOT = Path.home() / "Desktop" / "Articles"
USER_AGENT = (
    "ArticleDiariGratuit/1.0 (+local macOS personal article downloader; "
    "respects public access and paywalls)"
)

AREAS = {
    "literatura": [
        "literature",
        "writing",
        "writer",
        "writers",
        "book",
        "books",
        "novel",
        "fiction",
        "poetry",
        "poem",
        "essay",
        "essays",
        "memoir",
        "language",
        "translation",
        "storytelling",
        "reading",
        "author",
        "authors",
        "letters",
        "library",
    ],
    "filosofia": [
        "philosophy",
        "philosopher",
        "culture",
        "cultural",
        "ethics",
        "moral",
        "meaning",
        "mind",
        "consciousness",
        "society",
        "history",
        "ideas",
        "politics",
        "civilization",
        "religion",
        "myth",
        "art",
        "aesthetics",
    ],
    "IA": [
        "ai",
        "a.i.",
        "artificial intelligence",
        "machine learning",
        "llm",
        "large language model",
        "technology",
        "tech",
        "future",
        "robot",
        "robots",
        "automation",
        "algorithm",
        "algorithms",
        "computing",
        "software",
        "internet",
        "digital",
        "data",
    ],
    "salut-neurociencia": [
        "health",
        "medicine",
        "medical",
        "neuroscience",
        "neuron",
        "brain",
        "brains",
        "cognition",
        "cognitive",
        "psychology",
        "psychiatry",
        "mental",
        "sleep",
        "memory",
        "emotion",
        "disease",
        "biology",
        "biological",
        "longevity",
        "wellbeing",
    ],
}

BAD_URL_PARTS = (
    "/podcast",
    "/video",
    "/videos",
    "/event",
    "/events",
    "/newsletter",
    "/tag/",
    "/tags/",
    "/author/",
    "/authors/",
    "/category/",
    "/the-download/",
)

BAD_TITLE_PATTERNS = (
    r"^\s*the download\s*:",
    r"\bbooks to read this\b",
    r"\bwhat to read this\b",
    r"\bweekend reads\b",
    r"\bdaily briefing\b",
    r"\bnewsletter\b",
)

TRACKING_QUERY_PREFIXES = ("utm_",)
TRACKING_QUERY_NAMES = {
    "fbclid",
    "gclid",
    "mc_cid",
    "mc_eid",
    "igshid",
    "ref",
    "source",
}

HARD_PAYWALL_PATTERNS = [
    r"\bsubscribe to continue\b",
    r"\bregister to continue\b",
    r"\bsign in to continue\b",
    r"\blog in to continue\b",
    r"\bsubscribe now to read\b",
    r"\bcreate an account to continue\b",
    r"\bthis article is for subscribers\b",
    r"\bsubscribers only\b",
    r"\breserved for subscribers\b",
    r"\bmembers-only\b",
    r"\bpaid subscribers\b",
    r'data-testid=["\']paywall',
    r'id=["\'][^"\']*paywall',
    r'class=["\'][^"\']*paywall',
]

SOFT_PAYWALL_PATTERNS = [
    r"\bto continue reading\b",
    r"\bcontinue reading with\b",
    r"\bstart your subscription\b",
    r"\bsubscribe for unlimited access\b",
    r"\balready a subscriber\b",
    r"\bfree account to read\b",
]

SPONSORED_PATTERNS = [
    r"\bpaid post\b",
    r"\badvertorial\b",
    r"\bpartner content\b",
    r"\bbrand studio\b",
    r"\bsponsor content\b",
    r"\bsponsored content\b",
    r"\bprovided by\b",
    r"\bpaid for by\b",
    r"\bthis content was produced by\b",
    r"\bnot written by .* editorial staff\b",
]


@dataclass(frozen=True)
class Source:
    name: str
    homepage: str
    feeds: tuple[str, ...]
    priority: int
    default_area: str


@dataclass
class Candidate:
    title: str
    url: str
    source: Source
    published: datetime
    author: str
    summary: str
    tags: list[str]
    rough_score: float
    area: str


@dataclass
class EvaluatedArticle:
    candidate: Candidate
    final_url: str
    canonical_url: str
    html_content: str
    clean_html: str
    text: str
    extraction_ok: bool
    extraction_error: str
    word_count: int
    score: float
    area: str


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def local_today() -> datetime:
    return datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)


def local_now() -> datetime:
    return datetime.now()


def load_sources() -> list[Source]:
    data = json.loads(SOURCES_PATH.read_text(encoding="utf-8"))
    sources = []
    for item in data["sources"]:
        sources.append(
            Source(
                name=item["name"],
                homepage=item["homepage"],
                feeds=tuple(item.get("feeds", [])),
                priority=int(item.get("priority", 5)),
                default_area=item.get("default_area", "filosofia"),
            )
        )
    return sources


def load_history() -> dict[str, Any]:
    HISTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not HISTORY_PATH.exists() and LEGACY_HISTORY_PATH.exists() and LEGACY_HISTORY_PATH != HISTORY_PATH:
        shutil.copy2(LEGACY_HISTORY_PATH, HISTORY_PATH)

    if not HISTORY_PATH.exists():
        return {"version": 1, "articles": [], "runs": []}

    try:
        data = json.loads(HISTORY_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        backup = HISTORY_PATH.with_suffix(".json.broken")
        shutil.copy2(HISTORY_PATH, backup)
        return {"version": 1, "articles": [], "runs": []}

    if isinstance(data, list):
        data = {"version": 1, "articles": data, "runs": []}
    data.setdefault("version", 1)
    data.setdefault("articles", [])
    data.setdefault("runs", [])
    return data


def save_history(history: dict[str, Any]) -> None:
    HISTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = HISTORY_PATH.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(history, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(HISTORY_PATH)


def normalize_url(url: str) -> str:
    parts = urlsplit(url.strip())
    query = []
    for key, value in parse_qsl(parts.query, keep_blank_values=True):
        key_lower = key.lower()
        if key_lower in TRACKING_QUERY_NAMES:
            continue
        if any(key_lower.startswith(prefix) for prefix in TRACKING_QUERY_PREFIXES):
            continue
        query.append((key, value))
    path = re.sub(r"/+$", "", parts.path) or "/"
    return urlunsplit(
        (
            parts.scheme.lower(),
            parts.netloc.lower(),
            path,
            urlencode(query, doseq=True),
            "",
        )
    )


def known_urls(history: dict[str, Any]) -> set[str]:
    urls: set[str] = set()
    for item in history.get("articles", []):
        for key in ("url", "canonical_url", "original_url"):
            if item.get(key):
                urls.add(normalize_url(item[key]))
    return urls


def already_ran_today(history: dict[str, Any], today: str) -> bool:
    return any(run.get("run_date") == today for run in history.get("runs", []))


def slugify(value: str, max_chars: int = 76) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_value = ascii_value.lower()
    ascii_value = re.sub(r"[^a-z0-9]+", "-", ascii_value)
    ascii_value = re.sub(r"-{2,}", "-", ascii_value).strip("-")
    return ascii_value[:max_chars].strip("-") or "article"


def short_title(title: str, max_words: int = 10, max_chars: int = 72) -> str:
    words = re.findall(r"\w+(?:[-']\w+)?", title)
    short = " ".join(words[:max_words]) if words else title
    if len(short) > max_chars:
        short = short[:max_chars].rsplit(" ", 1)[0] or short[:max_chars]
    return short


def parse_entry_date(entry: Any) -> datetime | None:
    for attr in ("published_parsed", "updated_parsed", "created_parsed"):
        value = getattr(entry, attr, None)
        if value:
            return datetime.fromtimestamp(calendar.timegm(value), timezone.utc)

    for attr in ("published", "updated", "created", "date"):
        value = getattr(entry, attr, None)
        if value:
            try:
                parsed = date_parser.parse(value)
            except (TypeError, ValueError, OverflowError):
                continue
            if parsed.tzinfo is None:
                parsed = parsed.replace(tzinfo=timezone.utc)
            return parsed.astimezone(timezone.utc)
    return None


def clean_text(value: str) -> str:
    soup = BeautifulSoup(value or "", "html.parser")
    return re.sub(r"\s+", " ", soup.get_text(" ", strip=True)).strip()


def request_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en,ca;q=0.8,es;q=0.7",
        }
    )
    return session


def fetch_text(session: requests.Session, url: str, timeout: tuple[int, int] = (10, 25)) -> str | None:
    try:
        response = session.get(url, timeout=timeout, allow_redirects=True)
        response.raise_for_status()
    except requests.RequestException:
        return None
    if not response.content:
        return None
    response.encoding = response.encoding or response.apparent_encoding
    return response.text


def discover_feeds(session: requests.Session, source: Source) -> list[str]:
    urls = list(source.feeds)
    homepage = fetch_text(session, source.homepage, timeout=(8, 15))
    if not homepage:
        return dedupe(urls)

    soup = BeautifulSoup(homepage, "html.parser")
    for link in soup.find_all("link"):
        rel = " ".join(link.get("rel", [])).lower()
        type_value = (link.get("type") or "").lower()
        href = link.get("href")
        if not href:
            continue
        if "alternate" in rel and any(token in type_value for token in ("rss", "atom", "xml")):
            urls.append(urljoin(source.homepage, href))
    return dedupe(urls)


def dedupe(values: list[str]) -> list[str]:
    seen = set()
    result = []
    for value in values:
        if value in seen:
            continue
        seen.add(value)
        result.append(value)
    return result


def is_recent(published: datetime, days: int) -> bool:
    start = now_utc() - timedelta(days=days)
    end = now_utc() + timedelta(days=1)
    return start <= published <= end


def is_article_url(url: str) -> bool:
    lowered = url.lower()
    return not any(part in lowered for part in BAD_URL_PARTS)


def is_article_title(title: str) -> bool:
    return not any(re.search(pattern, title, flags=re.I) for pattern in BAD_TITLE_PATTERNS)


def area_scores(text: str) -> dict[str, int]:
    lowered = f" {text.lower()} "
    scores: dict[str, int] = {}
    for area, keywords in AREAS.items():
        score = 0
        for keyword in keywords:
            if " " in keyword:
                if keyword in lowered:
                    score += 3
            else:
                score += len(re.findall(rf"\b{re.escape(keyword)}\b", lowered))
        scores[area] = score
    return scores


def choose_area(text: str, default_area: str) -> tuple[str, int]:
    scores = area_scores(text)
    best_area, best_score = max(scores.items(), key=lambda item: item[1])
    if best_score <= 0 and default_area in AREAS:
        return default_area, 1
    return best_area, best_score


def rough_score(source: Source, title: str, summary: str, tags: list[str], published: datetime) -> tuple[float, str]:
    text = " ".join([title, summary, " ".join(tags)])
    area, area_score = choose_area(text, source.default_area)
    age_days = max(0.0, (now_utc() - published).total_seconds() / 86400)
    recency = max(0.0, 14.0 - age_days) / 2.0
    essay_bonus = 0
    if re.search(r"\b(essay|long read|feature|review|analysis|ideas)\b", text, flags=re.I):
        essay_bonus = 5
    return source.priority * 4 + area_score * 5 + recency + essay_bonus, area


def collect_candidates(
    session: requests.Session,
    sources: list[Source],
    history: dict[str, Any],
    days: int,
) -> tuple[list[Candidate], dict[str, int]]:
    seen_urls = known_urls(history)
    candidates: list[Candidate] = []
    candidate_seen: set[str] = set()
    stats = {
        "feeds_seen": 0,
        "entries_seen": 0,
        "entries_recent": 0,
        "entries_unseen": 0,
    }

    for source in sources:
        feed_urls = discover_feeds(session, source)
        for feed_url in feed_urls:
            feed_text = fetch_text(session, feed_url, timeout=(8, 20))
            if not feed_text:
                continue
            stats["feeds_seen"] += 1
            parsed = feedparser.parse(feed_text)
            for entry in parsed.entries:
                stats["entries_seen"] += 1
                title = clean_text(getattr(entry, "title", ""))
                url = getattr(entry, "link", "").strip()
                if not title or not url or not is_article_url(url) or not is_article_title(title):
                    continue
                published = parse_entry_date(entry)
                if not published or not is_recent(published, days):
                    continue
                stats["entries_recent"] += 1
                normalized = normalize_url(url)
                if normalized in seen_urls or normalized in candidate_seen:
                    continue
                candidate_seen.add(normalized)
                stats["entries_unseen"] += 1
                summary = clean_text(getattr(entry, "summary", "") or getattr(entry, "description", ""))
                author = clean_text(getattr(entry, "author", ""))
                tags = [clean_text(tag.get("term", "")) for tag in getattr(entry, "tags", []) if tag.get("term")]
                score, area = rough_score(source, title, summary, tags, published)
                candidates.append(
                    Candidate(
                        title=title,
                        url=url,
                        source=source,
                        published=published,
                        author=author,
                        summary=summary,
                        tags=tags,
                        rough_score=score,
                        area=area,
                    )
                )
            time.sleep(0.25)

    candidates.sort(key=lambda item: item.rough_score, reverse=True)
    return candidates, stats


def has_paywall_signal(html_text: str, extracted_text: str = "") -> bool:
    haystack = f"{html_text[:250000]}\n{extracted_text[:25000]}".lower()
    if any(re.search(pattern, haystack, flags=re.I) for pattern in HARD_PAYWALL_PATTERNS):
        return True

    soft_hits = sum(1 for pattern in SOFT_PAYWALL_PATTERNS if re.search(pattern, haystack, flags=re.I))
    word_count = count_words(extracted_text)
    return soft_hits >= 2 or (soft_hits >= 1 and word_count < 600)


def has_sponsored_signal(html_text: str, extracted_text: str = "") -> bool:
    readable = clean_text(extracted_text) or clean_text(html_text[:50000])
    haystack = readable[:7000].lower()
    if any(re.search(pattern, haystack, flags=re.I) for pattern in SPONSORED_PATTERNS):
        return True

    first_words = " ".join(readable.split()[:80]).lower()
    return bool(re.search(r"\bsponsored\b", first_words))


def canonical_url(page_url: str, html_text: str) -> str:
    soup = BeautifulSoup(html_text, "html.parser")
    link = soup.find("link", rel=lambda value: value and "canonical" in value)
    if link and link.get("href"):
        return urljoin(page_url, link["href"])
    og_url = soup.find("meta", property="og:url")
    if og_url and og_url.get("content"):
        return urljoin(page_url, og_url["content"])
    return page_url


def extract_article(page_url: str, html_text: str) -> tuple[str, str, bool, str]:
    errors: list[str] = []
    clean_fragment = None
    text = None

    try:
        clean_fragment = trafilatura.extract(
            html_text,
            url=page_url,
            output_format="html",
            include_comments=False,
            include_tables=False,
            include_images=True,
            include_links=True,
            favor_precision=False,
        )
    except Exception as exc:
        errors.append(f"trafilatura HTML ha fallat: {exc}")

    try:
        text = trafilatura.extract(
            html_text,
            url=page_url,
            output_format="txt",
            include_comments=False,
            include_tables=False,
            favor_precision=False,
        )
    except Exception as exc:
        errors.append(f"trafilatura text ha fallat: {exc}")

    if clean_fragment and text and count_words(text) >= 250:
        return normalize_html_fragment(clean_fragment), text, True, ""

    if text and count_words(text) >= 250:
        clean_fragment = paragraphs_to_html(text)
        note = "; ".join(errors) if errors else "trafilatura no ha produït HTML net"
        return clean_fragment, text, True, note

    fallback_text = fallback_extract_text(html_text)
    if fallback_text and count_words(fallback_text) >= 250:
        clean_fragment = paragraphs_to_html(fallback_text)
        note = "; ".join(errors) if errors else "trafilatura ha fallat"
        return clean_fragment, fallback_text, True, f"{note}; s'ha fet servir extracció HTML bàsica"

    note = "; ".join(errors) if errors else "sense error específic"
    return "", fallback_text or "", False, f"no s'ha pogut extreure un cos principal fiable ({note})"


def fallback_extract_text(html_text: str) -> str:
    soup = BeautifulSoup(html_text, "html.parser")
    for tag in soup(["script", "style", "noscript", "svg", "form", "nav", "footer", "header"]):
        tag.decompose()

    candidates = soup.find_all(["article", "main"])
    if not candidates:
        candidates = [soup.body] if soup.body else [soup]

    best = ""
    for candidate in candidates:
        text = re.sub(r"\n{3,}", "\n\n", candidate.get_text("\n", strip=True))
        if count_words(text) > count_words(best):
            best = text
    return best.strip()


def paragraphs_to_html(text: str) -> str:
    paragraphs = [para.strip() for para in re.split(r"\n{2,}", text) if para.strip()]
    return "\n".join(f"<p>{html.escape(para)}</p>" for para in paragraphs)


def normalize_html_fragment(fragment: str) -> str:
    soup = BeautifulSoup(fragment, "html.parser")
    root = soup.body if soup.body else soup
    for tag in root.find_all(["script", "style", "noscript", "form", "nav", "footer", "header"]):
        tag.decompose()
    return "\n".join(str(child) for child in root.contents if str(child).strip())


def count_words(text: str) -> int:
    return len(re.findall(r"\b[\w'-]+\b", text or "", flags=re.UNICODE))


def evaluate_candidate(
    session: requests.Session,
    candidate: Candidate,
    seen_urls: set[str],
) -> EvaluatedArticle | None:
    try:
        response = session.get(candidate.url, timeout=(10, 30), allow_redirects=True)
    except requests.RequestException:
        return None

    if response.status_code in (401, 402, 403):
        return None
    if response.status_code >= 400:
        return None
    response.encoding = response.encoding or response.apparent_encoding
    html_text = response.text
    final_url = response.url
    canonical = canonical_url(final_url, html_text)

    if normalize_url(final_url) in seen_urls or normalize_url(canonical) in seen_urls:
        return None
    if has_paywall_signal(html_text):
        return None
    if has_sponsored_signal(html_text):
        return None

    clean_fragment, text, extraction_ok, extraction_error = extract_article(final_url, html_text)
    if has_paywall_signal(html_text, text):
        return None
    if has_sponsored_signal(html_text, text):
        return None

    word_count = count_words(text)
    area_text = " ".join([candidate.title, candidate.summary, " ".join(candidate.tags), text[:6000]])
    area, area_score = choose_area(area_text, candidate.source.default_area)
    age_days = max(0.0, (now_utc() - candidate.published).total_seconds() / 86400)
    length_score = min(30.0, word_count / 120.0)
    if word_count >= 1600:
        length_score += 8
    if word_count < 700:
        length_score -= 12
    extraction_bonus = 6 if extraction_ok else -10
    score = (
        candidate.source.priority * 5
        + area_score * 4
        + max(0.0, 14.0 - age_days)
        + length_score
        + extraction_bonus
    )

    return EvaluatedArticle(
        candidate=candidate,
        final_url=final_url,
        canonical_url=canonical,
        html_content=html_text,
        clean_html=clean_fragment,
        text=text,
        extraction_ok=extraction_ok,
        extraction_error=extraction_error,
        word_count=word_count,
        score=score,
        area=area,
    )


def select_article(
    session: requests.Session,
    candidates: list[Candidate],
    history: dict[str, Any],
    max_candidates: int,
) -> tuple[EvaluatedArticle | None, list[str]]:
    seen_urls = known_urls(history)
    evaluated: list[EvaluatedArticle] = []
    notes: list[str] = []

    for candidate in candidates[:max_candidates]:
        article = evaluate_candidate(session, candidate, seen_urls)
        if not article:
            notes.append(f"descartat: {candidate.title} ({candidate.source.name})")
            time.sleep(0.5)
            continue
        evaluated.append(article)
        time.sleep(0.5)

    if not evaluated:
        return None, notes

    strong = [
        article
        for article in evaluated
        if article.extraction_ok and article.word_count >= 650
    ]
    pool = strong or evaluated
    pool.sort(key=lambda item: item.score, reverse=True)
    return pool[0], notes


def wrapped_clean_html(article: EvaluatedArticle) -> str:
    candidate = article.candidate
    publication_date = candidate.published.date().isoformat()
    article_body = article.clean_html or paragraphs_to_html(article.text)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(candidate.title)}</title>
  <link rel="canonical" href="{html.escape(article.canonical_url)}">
  <style>
    :root {{
      color-scheme: light dark;
      --fg: #202124;
      --muted: #5f6368;
      --bg: #ffffff;
      --rule: #dadce0;
      --accent: #006d77;
    }}
    @media (prefers-color-scheme: dark) {{
      :root {{
        --fg: #e8eaed;
        --muted: #bdc1c6;
        --bg: #202124;
        --rule: #3c4043;
      }}
    }}
    body {{
      margin: 0;
      background: var(--bg);
      color: var(--fg);
      font-family: Georgia, "Times New Roman", serif;
      line-height: 1.65;
    }}
    main {{
      max-width: 760px;
      margin: 0 auto;
      padding: 48px 22px 72px;
    }}
    header {{
      border-bottom: 1px solid var(--rule);
      margin-bottom: 32px;
      padding-bottom: 24px;
    }}
    h1 {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: clamp(2rem, 5vw, 3.2rem);
      line-height: 1.08;
      margin: 0 0 16px;
    }}
    .meta, .source {{
      color: var(--muted);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 0.95rem;
    }}
    a {{
      color: var(--accent);
    }}
    img {{
      max-width: 100%;
      height: auto;
    }}
    p, li {{
      font-size: 1.12rem;
    }}
    blockquote {{
      border-left: 3px solid var(--rule);
      color: var(--muted);
      margin-left: 0;
      padding-left: 1rem;
    }}
  </style>
</head>
<body>
  <main>
    <header>
      <h1>{html.escape(candidate.title)}</h1>
      <div class="meta">
        {html.escape(candidate.author or "Autor no indicat")} ·
        {html.escape(candidate.source.name)} ·
        {publication_date}
      </div>
      <div class="source">
        Font original: <a href="{html.escape(article.canonical_url)}">{html.escape(article.canonical_url)}</a>
      </div>
    </header>
    <article>
{article_body}
    </article>
  </main>
</body>
</html>
"""


def article_path(article: EvaluatedArticle, run_date: datetime) -> Path:
    month_dir = OUTPUT_ROOT / run_date.strftime("%Y-%m")
    month_dir.mkdir(parents=True, exist_ok=True)
    base_name = (
        f"{run_date:%Y-%m-%d}_"
        f"{slugify(article.candidate.source.name, 32)}_"
        f"{slugify(short_title(article.candidate.title), 72)}"
    )
    html_path = month_dir / f"{base_name}.html"
    suffix = 2
    while html_path.exists():
        html_path = month_dir / f"{base_name}-{suffix}.html"
        suffix += 1
    return html_path


def worth_reading(article: EvaluatedArticle) -> str:
    candidate = article.candidate
    length = f"{article.word_count} paraules" if article.word_count else "extensió no estimada"
    reason = (
        f"Seleccionat per la combinació de font fiable ({candidate.source.name}), "
        f"publicació recent, encaix amb l'àrea {article.area} i una extensió substancial "
        f"({length})."
    )
    if candidate.summary:
        reason += f" El resum editorial apunta a: {trim_sentence(candidate.summary, 260)}"
    return reason


def trim_sentence(text: str, max_chars: int) -> str:
    cleaned = clean_text(text)
    if len(cleaned) <= max_chars:
        return cleaned
    return cleaned[:max_chars].rsplit(" ", 1)[0] + "..."


def save_article(article: EvaluatedArticle, run_date: datetime) -> tuple[Path, str]:
    html_path = article_path(article, run_date)

    if article.extraction_ok:
        html_path.write_text(wrapped_clean_html(article), encoding="utf-8")
    else:
        html_path.write_text(article.html_content, encoding="utf-8")

    return html_path, "descarregat correctament" if article.extraction_ok else "error parcial"


def save_no_recommendation(run_date: datetime, stats: dict[str, int], notes: list[str]) -> Path:
    month_dir = OUTPUT_ROOT / run_date.strftime("%Y-%m")
    month_dir.mkdir(parents=True, exist_ok=True)
    html_path = month_dir / f"{run_date:%Y-%m-%d}_cap-recomanacio-fiable-avui.html"
    reasons = [
        f"<li>Feeds consultats correctament: {stats.get('feeds_seen', 0)}</li>",
        f"<li>Entrades RSS revisades: {stats.get('entries_seen', 0)}</li>",
        f"<li>Entrades publicades dins els últims 14 dies: {stats.get('entries_recent', 0)}</li>",
        f"<li>Entrades recents no repetides: {stats.get('entries_unseen', 0)}</li>",
        "<li>Motiu: cap candidat ha superat alhora els filtres de recència, qualitat, accés públic i absència de senyals de paywall.</li>",
    ]
    notes_html = ""
    if notes:
        notes_html = "<h2>Notes de filtratge</h2><ul>" + "".join(
            f"<li>{html.escape(note)}</li>" for note in notes[:12]
        ) + "</ul>"
    html_path.write_text(
        f"""<!doctype html>
<html lang="ca">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cap recomanació fiable avui</title>
  <style>
    body {{
      max-width: 760px;
      margin: 0 auto;
      padding: 48px 22px 72px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
    }}
  </style>
</head>
<body>
  <h1>Cap recomanació fiable avui</h1>
  <ul>
    {"".join(reasons)}
  </ul>
  {notes_html}
</body>
</html>
""",
        encoding="utf-8",
    )
    return html_path


def record_article_run(
    history: dict[str, Any],
    run_date: datetime,
    article: EvaluatedArticle,
    html_path: Path,
    status: str,
) -> None:
    history["articles"].append(
        {
            "id": hashlib.sha256(normalize_url(article.canonical_url).encode("utf-8")).hexdigest()[:16],
            "run_date": run_date.date().isoformat(),
            "title": article.candidate.title,
            "author": article.candidate.author,
            "source": article.candidate.source.name,
            "published": article.candidate.published.date().isoformat(),
            "area": article.area,
            "url": article.final_url,
            "canonical_url": article.canonical_url,
            "html_path": str(html_path),
            "status": status,
            "word_count": article.word_count,
            "created_at": datetime.now().isoformat(timespec="seconds"),
        }
    )
    history["runs"].append(
        {
            "run_date": run_date.date().isoformat(),
            "status": status,
            "title": article.candidate.title,
            "path": str(html_path),
            "created_at": datetime.now().isoformat(timespec="seconds"),
        }
    )


def record_no_recommendation_run(history: dict[str, Any], run_date: datetime, html_path: Path) -> None:
    history["runs"].append(
        {
            "run_date": run_date.date().isoformat(),
            "status": "cap recomanació fiable avui",
            "path": str(html_path),
            "created_at": datetime.now().isoformat(timespec="seconds"),
        }
    )


def notify(title: str, message: str) -> None:
    if not shutil.which("osascript"):
        return
    script = (
        f'display notification "{applescript_escape(message)}" '
        f'with title "{applescript_escape(title)}"'
    )
    subprocess.run(["osascript", "-e", script], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def applescript_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def run(args: argparse.Namespace) -> int:
    run_date = local_today()
    current_local = local_now()
    today = run_date.date().isoformat()
    history = load_history()

    if current_local.hour < args.earliest_hour and not args.force and not args.dry_run:
        print(
            f"Encara no són les {args.earliest_hour:02d}:00. "
            "S'esperarà a la finestra del matí."
        )
        return 0

    if already_ran_today(history, today) and not args.force and not args.dry_run:
        print(f"Ja hi ha una execució registrada per a {today}. Usa --force per buscar-ne una altra.")
        return 0

    sources = load_sources()
    session = request_session()
    candidates, stats = collect_candidates(session, sources, history, args.days)

    if args.dry_run:
        print(f"Feeds consultats: {stats['feeds_seen']}")
        print(f"Entrades revisades: {stats['entries_seen']}")
        print(f"Entrades recents no repetides: {stats['entries_unseen']}")
        for candidate in candidates[:10]:
            print(
                f"- {candidate.rough_score:.1f} | {candidate.source.name} | "
                f"{candidate.published.date()} | {candidate.area} | {candidate.title}"
            )
        return 0

    article, notes = select_article(session, candidates, history, args.max_candidates)

    if not article:
        html_path = save_no_recommendation(run_date, stats, notes)
        record_no_recommendation_run(history, run_date, html_path)
        save_history(history)
        print(f"Cap recomanació fiable avui. HTML: {html_path}")
        return 0

    html_path, status = save_article(article, run_date)
    record_article_run(history, run_date, article, html_path, status)
    save_history(history)

    if not args.no_notify:
        notify(DISPLAY_NAME, f"Article diari descarregat: {article.candidate.title}")

    print(f"Article guardat: {article.candidate.title}")
    print(f"HTML: {html_path}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Descarrega un article o assaig obert recent.")
    parser.add_argument("--days", type=int, default=14, help="Finestra de recència en dies.")
    parser.add_argument("--max-candidates", type=int, default=24, help="Nombre màxim de candidats a validar.")
    parser.add_argument("--dry-run", action="store_true", help="Mostra candidats sense descarregar res.")
    parser.add_argument("--force", action="store_true", help="Ignora una execució ja registrada avui.")
    parser.add_argument("--no-notify", action="store_true", help="No mostra notificació de macOS.")
    parser.add_argument("--earliest-hour", type=int, default=8, help="Hora local més primerenca per descarregar.")
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        return run(args)
    except KeyboardInterrupt:
        return 130
    except Exception as exc:
        traceback.print_exc(file=sys.stderr)
        wrapped = "\n".join(textwrap.wrap(str(exc), width=88))
        print(f"Error inesperat:\n{wrapped}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
