#!/usr/bin/env python3
"""
Fail if any page still links to a .md file.

A browser does not render markdown, it prints it: hashes, backticks and
all. Three separate pages shipped like that before anyone noticed, so
this is now a check rather than a habit.

Run from the repo root:  python scripts/check-md-links.py
Exit code 1 means something links to markdown that a person can click.
"""
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHP = os.path.join(ROOT, "Php")

# Two patterns, because the first version of this check passed a page that
# was still broken: the course map builds its links in JavaScript, so there
# was no href="...md" in the source to find. Any quoted .md path that looks
# like a route counts, wherever it appears.
LINKED = re.compile(r'(?:href|data-path|file|path)\s*[=:]\s*"([^"]*\.md)"')
QUOTED = re.compile(r'"([A-Za-z0-9_./-]*\.md)"')

# A .md name inside a <pre> or <code> block is prose - "run php lesson.md" -
# and not something anyone can click.
CODEBLOCK = re.compile(r"<pre\b.*?</pre>|<code\b.*?</code>", re.S | re.I)


def main():
    bad = []
    for base, _dirs, files in os.walk(PHP):
        for name in files:
            if not name.endswith(".html"):
                continue
            path = os.path.join(base, name)
            raw = io.open(path, encoding="utf-8", errors="ignore").read()
            text = CODEBLOCK.sub(lambda m: " " * len(m.group(0)), raw)
            hits = {}
            for pat in (LINKED, QUOTED):
                for m in pat.finditer(text):
                    hits[m.start()] = m.group(1)
            for pos, target in sorted(hits.items()):
                line = text[:pos].count("\n") + 1
                bad.append("%s:%d links to %s"
                           % (os.path.relpath(path, ROOT), line, target))
    if bad:
        print("Pages linking to raw markdown:\n")
        for b in bad:
            print("  " + b)
        print("\nBuild the file into a page (see DOCS in scripts/build-lessons.py)")
        print("and point the link at app/docs/<slug>.html instead.")
        return 1
    print("No page links to a .md file.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
