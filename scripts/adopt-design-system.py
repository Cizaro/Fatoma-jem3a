#!/usr/bin/env python3
"""
Put the standalone pages on the shared design system.

Each of these pages carried its own copy of the palette. That is how
roadmap, code-lab and stages quietly lost dark mode: a script rewrote the
token values in every :root block on the page, including the dark one, so
dark mode was serving the light palette. One copy of the tokens makes that
class of bug impossible rather than fixed.

So for each page this:
  1. deletes its local :root{...} token block,
  2. deletes the two dark-mode token blocks that went with it,
  3. links Php/app/app.css instead,
  4. rewrites every hard-coded corner radius onto the one scale.

Page-specific CSS is left completely alone - only the token blocks go.

Run from the repo root:  python scripts/adopt-design-system.py
"""
import io
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHP = os.path.join(ROOT, "Php")
VERSION = "4"

# page -> how it reaches app/app.css from where it sits
PAGES = {
    "index.html": "app/app.css",
    "roadmap.html": "app/app.css",
    "flashcards.html": "app/app.css",
    "code-lab.html": "app/app.css",
    "stages.html": "app/app.css",
    "exam-simulator.html": "app/app.css",
    os.path.join("games", "php-arcade.html"): "../app/app.css",
}

# 13 radii became 4. Anything pill-shaped stays pill-shaped; 50% stays a circle.
RADIUS = {
    "3px": "var(--r-sm)", "4px": "var(--r-sm)", "5px": "var(--r-sm)",
    "6px": "var(--r-sm)", "7px": "var(--r-sm)", "8px": "var(--r-sm)",
    "9px": "var(--r-sm)",
    "10px": "var(--r)", "11px": "var(--r)", "12px": "var(--r)",
    "13px": "var(--r)", "14px": "var(--r)", "15px": "var(--r)",
    "16px": "var(--r-lg)", "18px": "var(--r-lg)", "20px": "var(--r-lg)",
    "22px": "var(--r-lg)",
    "99px": "var(--r-pill)", "999px": "var(--r-pill)", "9999px": "var(--r-pill)",
}


def block_at(css, start):
    """Return the index just past the brace-balanced block starting at `start`."""
    depth, i = 0, start
    while i < len(css):
        if css[i] == "{":
            depth += 1
        elif css[i] == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return -1


def strip_token_blocks(css):
    """Remove :root / dark-mode blocks, but only ones that define the palette."""
    removed = 0
    for pattern in (r"@media\s*\(prefers-color-scheme:\s*dark\)\s*\{",
                    r":root\[data-theme=\"dark\"\]\s*\{",
                    r":root\s*\{"):
        while True:
            m = re.search(pattern, css)
            if not m:
                break
            end = block_at(css, css.index("{", m.start()))
            if end == -1:
                break
            body = css[m.start():end]
            # only a palette block - never a media query holding real rules
            if "--paper" not in body and "--ink:" not in body:
                # skip past it so the next loop finds a different one
                css = css[:m.start()] + css[m.start():].replace(body, body.replace("{", "\u0001", 1), 1)
                continue
            css = css[:m.start()] + css[end:]
            removed += 1
    return css.replace("\u0001", "{"), removed


def fix_radii(css):
    def sub(m):
        val = m.group(2).strip()
        return m.group(1) + RADIUS.get(val, val)
    # single-value radii only; multi-value ones (e.g. "0 11px 11px 0") are shapes
    return re.sub(r"(border-radius:\s*)([0-9]+px)\b", sub, css)


def link_tag(href):
    return '<link rel="stylesheet" href="%s?v=%s">' % (href, VERSION)


def main():
    for page, href in PAGES.items():
        path = os.path.join(PHP, page)
        src = io.open(path, encoding="utf-8").read()

        if "app/app.css" in src:
            print("  already on the system:", page)
            continue

        cleaned, removed = strip_token_blocks(src)
        cleaned = fix_radii(cleaned)

        # the link goes immediately before the page's own <style>, so page
        # rules still win over the shared ones
        idx = cleaned.find("<style")
        if idx == -1:
            print("  !! no <style> in", page)
            continue
        cleaned = cleaned[:idx] + link_tag(href) + "\n" + cleaned[idx:]

        io.open(path, "w", encoding="utf-8").write(cleaned)
        print("  %-24s %d token block(s) removed" % (page, removed))


if __name__ == "__main__":
    main()
