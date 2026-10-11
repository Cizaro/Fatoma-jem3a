#!/usr/bin/env python3
"""
Point the course map's buttons at pages that exist.

Two faults, both only visible once the site was not being read from a
local folder:

  * every link that was not a lesson went through a PUBLISHED table of
    artifact URLs from an older session, or fell back to a github.com
    blob page. So "Arcade" on the live site opened a different, older
    copy of the arcade, and "Examples" opened a page of source code on
    GitHub - or, inside the artifact, did nothing at all, because the
    frame will not follow a link out to another site.

  * examples.php and exercises.php need PHP to run them. On GitHub
    Pages and in the artifact there is no PHP, so those two buttons
    could never work. The roadmap already knew this and hid them unless
    the page was being served from localhost; the course map did not.

Now every link is relative, like everywhere else in the course, so the
app shell routes it. The two .php buttons appear only when something is
actually serving PHP, and the in-browser practice takes their place
when it is not.

    python scripts/fix-home-links.py
"""
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(ROOT, "Php", "index.html")

OLD_LINK = '''const REPO = "https://github.com/Cizaro/Fatoma-jem3a/blob/main/Php/";
const PUBLISHED = {
  "flashcards.html":       "https://claude.ai/artifact/WDYShUSe2eV7Yu19XxYJZn",
  "roadmap.html":          "https://claude.ai/artifact/EDpJwwwvaoGwGHnjeAXdPb",
  "games/php-arcade.html": "https://claude.ai/artifact/JYBuyUAnizeyXzAT9tXMu2",
  "exam-simulator.html":   "https://claude.ai/artifact/H3Ca9oVaXidqa51D5hesYc",
  "stages.html":           "https://claude.ai/artifact/Gqn7w4oMjEMCoC8CePNvk4",
  "code-lab.html":         "https://claude.ai/artifact/9Rq4wkJkdfJc7uA7KeaE2c"
};
const link = p => LOCAL ? p : (PUBLISHED[p] || REPO + p);'''

NEW_LINK = '''/* Everything the course map points at now lives beside it, so a plain
   relative path is right in all four places this file runs: the repo
   folder, localhost, GitHub Pages, and inside the one published
   artifact. It used to rewrite these to a table of artifact URLs from
   an older session, which sent her to stale copies of her own pages. */
const link = p => p;

/* examples.php and exercises.php have to be executed. Offer them only
   where something is serving PHP; everywhere else they would download
   as text or silently do nothing. Same test the roadmap uses. */
const SERVED = /^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname);

/* where a lesson's problems live in the problem sets */
const PROBLEM = { "3":"p1a", "4":"p2", "5":"p4", "8":"p1c" };'''

OLD_TOOLS = '''  if (!les.file){
    t.push(`<a class="tool" href="${link(les.dir + "/examples.php")}">Examples</a>`);
    /* lesson 8's exercises are written up rather than coded, so they have a
       built page; everything else runs as PHP */
    t.push(les.id === "8"
      ? `<a class="tool" href="app/docs/forms-exercises.html">Exercises</a>`
      : `<a class="tool" href="${link(les.dir + "/exercises.php")}">Exercises</a>`);
    const quiz = les.quiz || ("lesson-" + String(les.id).padStart(2,"0"));
    t.push(`<a class="tool" href="app/quiz.html?q=${quiz}">Mini quiz</a>`);
  }'''

NEW_TOOLS = '''  if (!les.file){
    const quiz = les.quiz || ("lesson-" + String(les.id).padStart(2,"0"));
    t.push(`<a class="tool" href="app/quiz.html?q=${quiz}">Mini quiz</a>`);

    /* the practice that works in a browser, which is the common case */
    if (PROBLEM[les.id])
      t.push(`<a class="tool" href="php-problems.html?p=${PROBLEM[les.id]}">Problem sheet</a>`);
    t.push(`<a class="tool" href="code-lab.html">Code lab</a>`);

    /* lesson 8's exercises are written up rather than coded, so they have
       a built page and need no server */
    if (les.id === "8")
      t.push(`<a class="tool" href="app/docs/forms-exercises.html">Exercises</a>`);
    else if (SERVED)
      t.push(`<a class="tool run" href="${les.dir}/exercises.php">Exercises</a>`);

    if (SERVED) t.push(`<a class="tool run" href="${les.dir}/examples.php">Examples</a>`);
  }'''


def main():
    s = io.open(F, encoding="utf-8").read()
    for old, new in ((OLD_LINK, NEW_LINK), (OLD_TOOLS, NEW_TOOLS)):
        if s.count(old) != 1:
            raise SystemExit("anchor not found or not unique:\n" + old[:70])
        s = s.replace(old, new)
    io.open(F, "w", encoding="utf-8", newline="\n").write(s)
    print("course map links repaired")


if __name__ == "__main__":
    main()
