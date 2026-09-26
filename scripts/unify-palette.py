#!/usr/bin/env python3
"""
Pull every page onto the one course palette.

Run from the repo root:   python scripts/unify-palette.py

Only the values inside :root blocks are touched, and only for tokens this
script knows about. Variable NAMES are left alone, so each page's component
CSS keeps working untouched; a page that calls its success colour --good
still has a --good, it is just the course's green now instead of its own.

Tokens a page invented for itself and that carry real meaning (the stages
worlds, for instance) are re-tuned rather than flattened: still six
distinguishable hues, but drawn from the course's range instead of a rainbow.
"""
import io
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHP = os.path.join(ROOT, "Php")

LIGHT = {
    "paper": "#F7F6F3", "surface": "#FFFFFF", "surface-2": "#EFEDE8",
    "ink": "#1A1D21", "ink-2": "#5C6168", "ink-3": "#8D939B",
    "line": "#E2DFD8", "accent": "#0F7B6C", "accent-soft": "#E3F1EE",
    "warm": "#B5541F", "warm-soft": "#FBEDE4",
    "gold": "#A57C1B", "gold-soft": "#FBF2DC",
    # per-page aliases for the same roles
    "marker": "#B5541F", "marker-soft": "#FBEDE4",
    "done": "#0F7B6C", "done-soft": "#E3F1EE",
    "good": "#0F7B6C", "good-soft": "#E3F1EE",
    "bad": "#B5541F", "bad-soft": "#FBEDE4",
    "editor": "#15181C", "editor-ink": "#F2F1EE",
    "code-bg": "#15181C", "code-ink": "#F2F1EE", "gutter": "#6E757E",
    # the six stage worlds, harmonised instead of rainbow
    "w1": "#0F7B6C", "w2": "#3E6B8A", "w3": "#A57C1B",
    "w4": "#B5541F", "w5": "#94413A", "w6": "#5C5470",
}

DARK = {
    "paper": "#14161A", "surface": "#1D2126", "surface-2": "#262B31",
    "ink": "#ECEEF1", "ink-2": "#A3A9B2", "ink-3": "#787E88",
    "line": "#30353C", "accent": "#4FC2AE", "accent-soft": "#16302C",
    "warm": "#E08B5A", "warm-soft": "#2E211A",
    "gold": "#D8B45B", "gold-soft": "#2C2517",
    "marker": "#E08B5A", "marker-soft": "#2E211A",
    "done": "#4FC2AE", "done-soft": "#16302C",
    "good": "#4FC2AE", "good-soft": "#16302C",
    "bad": "#E08B5A", "bad-soft": "#2E211A",
    "editor": "#0E1013", "editor-ink": "#F2F1EE",
    "code-bg": "#0E1013", "code-ink": "#F2F1EE", "gutter": "#6E757E",
    "w1": "#4FC2AE", "w2": "#7FA8C4", "w3": "#D8B45B",
    "w4": "#E08B5A", "w5": "#D08A82", "w6": "#A79BC0",
}

FILES = ["roadmap.html", "code-lab.html", "stages.html"]

BLOCK = re.compile(r"(:root[^{]*\{)([^}]*)(\})")
TOKEN = re.compile(r"(--([a-z0-9-]+)\s*:\s*)(#[0-9A-Fa-f]{3,8})")


def main():
    for name in FILES:
        path = os.path.join(PHP, name)
        src = io.open(path, encoding="utf-8").read()
        changed = [0]

        def do_block(m):
            head, body, tail = m.group(1), m.group(2), m.group(3)
            # a block guarded by prefers-color-scheme dark or [data-theme="dark"]
            # is the dark palette; anything else is the light one
            dark = 'data-theme="dark"' in head or "dark" in head
            table = DARK if dark else LIGHT

            def do_token(t):
                prefix, token_name, value = t.group(1), t.group(2), t.group(3)
                if token_name in table and table[token_name].lower() != value.lower():
                    changed[0] += 1
                    return prefix + table[token_name]
                return t.group(0)

            return head + TOKEN.sub(do_token, body) + tail

        # the dark palette also lives inside @media blocks, whose :root rules
        # this regex still finds, but "dark" is not in that selector, so mark
        # them by splitting the file on the media query first
        out, last = [], 0
        for m in re.finditer(r"@media \(prefers-color-scheme: dark\)\s*\{", src):
            out.append(src[last:m.start()])
            depth, i = 1, m.end()
            while i < len(src) and depth:
                if src[i] == "{":
                    depth += 1
                elif src[i] == "}":
                    depth -= 1
                i += 1
            inner = src[m.start():i]
            # force the dark table inside this media block
            inner = BLOCK.sub(lambda mm: mm.group(1) + TOKEN.sub(
                lambda t: (changed.__setitem__(0, changed[0] + 1) or (t.group(1) + DARK[t.group(2)]))
                if t.group(2) in DARK and DARK[t.group(2)].lower() != t.group(3).lower()
                else t.group(0), mm.group(2)) + mm.group(3), inner)
            out.append(inner)
            last = i
        out.append(src[last:])
        src = "".join(out)

        src = BLOCK.sub(do_block, src)
        io.open(path, "w", encoding="utf-8").write(src)
        print("  %-20s %d token values re-pointed" % (name, changed[0]))


if __name__ == "__main__":
    main()
