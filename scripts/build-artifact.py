#!/usr/bin/env python3
"""
Assemble the whole course as one flat folder, ready to publish as a
single Artifact.

The repo keeps the shell in Php/app/ and the pages beside it in Php/.
The shell already knows about both layouts - every route carries a repo
path and a published path - so this script only has to put the files
where the published paths say they are.

Two wrinkles are handled here rather than in the pages:

  * the artifact host wraps the page in its own <!doctype html> skeleton,
    so the shell's own doctype is stripped and the full-height rule is
    switched from 100dvh to 100%, which is what fits inside the safe-area
    padding that skeleton adds;

  * the pages sit at two depths and reach the shared CSS and JS by two
    different relative paths, so those files are published at both.

    python scripts/build-artifact.py <output folder>
"""
import io
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHP = os.path.join(ROOT, "Php")
APP = os.path.join(PHP, "app")

# Php/<name>.html -> <published path>.  Php/index.html is the course map,
# which the shell publishes as home.html because index.html is the shell.
ROOT_PAGES = {"index.html": "home.html"}

# shared files that both depths have to be able to reach
SHARED = ["app.css", "embed.js", "quiz.html", "quiz-data-a.js", "quiz-data-b.js"]
APP_ONLY = ["php-engine.js", "problems-data.js", "problems-extra.js",
            "problems-set2.js", "sql-engine.js", "teach-data.js",
            "teaching-order-data.js"]


def shell(src):
    """The app shell, adjusted for the artifact host."""
    s = io.open(src, encoding="utf-8").read()
    s = re.sub(r"^<!doctype html>\s*", "", s, flags=re.I)
    # the gallery shows this beside every other artifact, so it names the module
    s = s.replace("<title>PHP Course</title>", "<title>MIT320 PHP Course</title>", 1)
    # the host pads :root by the phone's safe-area insets, so a 100dvh
    # shell would stand that much taller than the window
    s = s.replace("<div class=\"shell\">",
                  "<style>\n"
                  "  /* published as an artifact: the host supplies the document,\n"
                  "     and its root carries the safe-area padding */\n"
                  "  html, body { height: 100%; }\n"
                  "  .shell { height: 100%; }\n"
                  "</style>\n\n<div class=\"shell\">", 1)
    return s


def main(out):
    if os.path.isdir(out):
        shutil.rmtree(out)
    os.makedirs(out)

    def dest(rel):
        path = os.path.join(out, rel.replace("/", os.sep))
        os.makedirs(os.path.dirname(path), exist_ok=True)
        return path

    def put(rel, src):
        """Copy a file. Never pass text here - an earlier version took either
        and decided by type, which meant every path string was written out as
        the file's contents and the whole bundle looked plausible and was
        empty."""
        shutil.copyfile(src, dest(rel))

    io.open(dest("index.html"), "w", encoding="utf-8",
            newline="\n").write(shell(os.path.join(APP, "index.html")))

    for name in sorted(os.listdir(PHP)):
        if name.endswith(".html"):
            put(ROOT_PAGES.get(name, name), os.path.join(PHP, name))

    for folder in ("lessons", "quizzes", "docs"):
        for name in sorted(os.listdir(os.path.join(APP, folder))):
            if name.endswith(".html"):
                put(folder + "/" + name, os.path.join(APP, folder, name))

    put("games/php-arcade.html", os.path.join(PHP, "games", "php-arcade.html"))

    for name in SHARED:                       # reachable as ../x and as app/x
        put(name, os.path.join(APP, name))
        put("app/" + name, os.path.join(APP, name))
    for name in APP_ONLY:
        put("app/" + name, os.path.join(APP, name))

    files = []
    for base, _dirs, names in os.walk(out):
        for n in names:
            files.append(os.path.relpath(os.path.join(base, n), out).replace(os.sep, "/"))
    for f in sorted(files):
        print(" ", f)
    print("\n%d files in %s" % (len(files), out))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    main(os.path.abspath(sys.argv[1]))
