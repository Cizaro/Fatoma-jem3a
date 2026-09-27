#!/usr/bin/env python3
"""
Turn every lesson.md into a real HTML page for the one-link app.

Run from the repo root:   python scripts/build-lessons.py

The lessons are written in a small, known subset of markdown: headings,
tables, fenced code, lists, blockquotes, rules, bold, inline code. So this
converts that subset exactly rather than pulling in a dependency the repo
would then have to carry. If a lesson starts using something new, extend
this and re-run; the .md file stays the source of truth either way.
"""
import html
import io
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHP = os.path.join(ROOT, "Php")
OUT = os.path.join(PHP, "app", "lessons")

# folder -> (id used in the app, title shown in the header)
LESSONS = [
    ("00-algorithms", "algorithms", "Algorithms, flowcharts, pseudocode"),
    ("00-setup", "setup", "Getting PHP running"),
    ("01-basics", "basics", "echo, variables, comments"),
    ("02-datatypes", "datatypes", "Data types and strings"),
    ("03-operators", "operators", "Operators"),
    ("04-conditions", "conditions", "Making decisions"),
    ("05-loops", "loops", "Loops"),
    ("06-arrays", "arrays", "Arrays"),
    ("07-functions", "functions", "Functions"),
    ("08-forms", "forms", "Forms: HTML talks to PHP"),
    ("09-mysql", "mysql", "Database basics with MySQL"),
    ("10-dynamic-page", "dynamic", "A dynamic page with a database"),
]

# Folders whose source file is not called lesson.md. The setup notes were
# written before the app existed, so they kept their own name.
SOURCE = {"00-setup": "SETUP.md"}

# ---------------------------------------------------------------
# "Practise this lesson" used to be a paragraph naming file paths in
# code chips - unclickable, and one of them pointed at a .md file that
# a browser shows as raw markdown. Each lesson now ends with real links,
# generated from this table so all twelve stay in step.
#
#   quiz : file in Php/quizzes/mini-quizzes/, built to a page below
#   deck : a flashcards.html deck id
#   game : the arcade round the instructor guide pairs with the lesson
#   run  : the folder holding examples.php / exercises.php
# ---------------------------------------------------------------
PRACTISE = {
    "algorithms": dict(quiz="lesson-00-algorithms", game="match", run="00-algorithms"),
    "setup":      dict(),
    "basics":     dict(quiz="lesson-01", deck="syntax",  game="match",  run="01-basics"),
    "datatypes":  dict(quiz="lesson-02", deck="strings", game="output", run="02-datatypes"),
    "operators":  dict(quiz="lesson-03", deck="syntax",  game="output", run="03-operators"),
    "conditions": dict(quiz="lesson-04", deck="control", game="bug",    run="04-conditions"),
    "loops":      dict(quiz="lesson-05", deck="control", game="blank",  run="05-loops"),
    "arrays":     dict(quiz="lesson-06", deck="arrays",  game="blank",  run="06-arrays"),
    "functions":  dict(quiz="lesson-07", deck="syntax",  game="bug",    run="07-functions"),
    "forms":      dict(quiz="lesson-08", deck="web",     game="order",  run="08-forms"),
    "mysql":      dict(quiz="lesson-09", deck="sql",     game="match",  run="09-mysql", sqllab=True),
    "dynamic":    dict(quiz="lesson-10", deck="sql",     game="order",  run="10-dynamic-page", sqllab=True),
}
DECKNAME = {"syntax": "Syntax &amp; symbols", "strings": "String functions",
            "arrays": "Array functions", "control": "Loops &amp; conditions",
            "web": "Forms &amp; security", "sql": "SQL &amp; MySQL"}
GAMENAME = {"match": "Match the Words", "output": "Guess the Output",
            "bug": "Fix the Bug", "blank": "Fill the Blank", "order": "Code Builder"}

PRACTISE_HEADING = "## ▶ Practise this lesson"


def practise_block(slug):
    """The row of real links that closes every lesson."""
    p = PRACTISE.get(slug)
    if not p:
        return ""
    out = []
    if p.get("quiz"):
        # the interactive runner, not a printed worksheet: she types an
        # answer and it is marked
        out.append('<a class="pl main" href="../quiz.html?q=%s">Mini-quiz</a>' % p["quiz"])
    if p.get("sqllab"):
        # lessons 9 and 10 need a database, so they get the SQL lab rather
        # than the PHP one
        out.append('<a class="pl" href="../../sql-lab.html">SQL lab</a>')
    elif p.get("run"):
        out.append('<a class="pl" href="../../code-lab.html">Code lab</a>')
    if p.get("deck"):
        out.append('<a class="pl" href="../../flashcards.html?deck=%s">%s</a>'
                   % (p["deck"], DECKNAME[p["deck"]]))
    if p.get("game"):
        out.append('<a class="pl" href="../../games/php-arcade.html?game=%s">%s</a>'
                   % (p["game"], GAMENAME[p["game"]]))

    run = ""
    if p.get("run"):
        # these have to be executed, so they are hidden unless a server is serving
        run = ('<div class="practise run" hidden>'
               '<a class="pl file" href="../../{f}/examples.php" target="_blank" rel="noopener">'
               '{f}/examples.php</a>'
               '<a class="pl file" href="../../{f}/exercises.php" target="_blank" rel="noopener">'
               '{f}/exercises.php</a></div>'
               '<p class="runnote">Open this page from <code>localhost</code> to run '
               '<code>examples.php</code> and <code>exercises.php</code>.</p>').format(f=p["run"])

    return ('<h2>Practise this lesson</h2>\n<div class="practise">%s</div>\n%s'
            % ("".join(out), run))


def inline(text):
    """Bold, inline code and escaping, in that order so code stays literal."""
    out, i, n = [], 0, len(text)
    while i < n:
        ch = text[i]
        if ch == "`":
            end = text.find("`", i + 1)
            if end != -1:
                out.append("<code>" + html.escape(text[i + 1:end]) + "</code>")
                i = end + 1
                continue
        if text.startswith("**", i):
            end = text.find("**", i + 2)
            if end != -1:
                out.append("<strong>" + inline(text[i + 2:end]) + "</strong>")
                i = end + 2
                continue
        if ch == "*" and not text.startswith("**", i):
            end = text.find("*", i + 1)
            if end != -1 and end > i + 1:
                out.append("<em>" + inline(text[i + 1:end]) + "</em>")
                i = end + 1
                continue
        out.append(html.escape(ch))
        i += 1
    return "".join(out)


def convert(md):
    lines = md.split("\n")
    out, i, n = [], 0, len(lines)

    while i < n:
        line = lines[i]

        # fenced code
        if line.startswith("```"):
            lang = line[3:].strip()
            i += 1
            buf = []
            while i < n and not lines[i].startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            cls = ' class="lang-%s"' % html.escape(lang) if lang else ""
            out.append("<pre%s><code>%s</code></pre>" % (cls, html.escape("\n".join(buf))))
            continue

        # table: a header row followed by a |---| separator
        if line.startswith("|") and i + 1 < n and re.match(r"^\|[\s:|-]+\|$", lines[i + 1]):
            head = [c.strip() for c in line.strip().strip("|").split("|")]
            i += 2
            rows = []
            while i < n and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            t = ['<div class="tablewrap"><table><thead><tr>']
            t += ["<th>%s</th>" % inline(c) for c in head]
            t.append("</tr></thead><tbody>")
            for r in rows:
                t.append("<tr>" + "".join("<td>%s</td>" % inline(c) for c in r) + "</tr>")
            t.append("</tbody></table></div>")
            out.append("".join(t))
            continue

        # heading
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            lvl = len(m.group(1))
            out.append("<h%d>%s</h%d>" % (lvl, inline(m.group(2)), lvl))
            i += 1
            continue

        # horizontal rule
        if re.match(r"^-{3,}$", line.strip()):
            out.append("<hr>")
            i += 1
            continue

        # blockquote (consecutive > lines)
        if line.startswith(">"):
            buf = []
            while i < n and lines[i].startswith(">"):
                buf.append(lines[i].lstrip(">").strip())
                i += 1
            inner = convert("\n".join(buf))
            out.append("<blockquote>%s</blockquote>" % inner)
            continue

        # lists
        m_ul = re.match(r"^([-*])\s+(.*)$", line)
        m_ol = re.match(r"^(\d+)\.\s+(.*)$", line)
        if m_ul or m_ol:
            tag = "ul" if m_ul else "ol"
            items, first = [], True
            while i < n:
                mu = re.match(r"^([-*])\s+(.*)$", lines[i])
                mo = re.match(r"^(\d+)\.\s+(.*)$", lines[i])
                cur = mu if tag == "ul" else mo
                if cur:
                    items.append(cur.group(2))
                    i += 1
                    first = False
                elif lines[i].startswith("  ") and items and lines[i].strip():
                    items[-1] += " " + lines[i].strip()   # continuation line
                    i += 1
                elif not lines[i].strip() and not first:
                    # blank line ends the list unless another item follows
                    look = i + 1
                    nxt = lines[look] if look < n else ""
                    if re.match(r"^([-*])\s+", nxt) or re.match(r"^\d+\.\s+", nxt):
                        i += 1
                        continue
                    break
                else:
                    break
            out.append("<%s>%s</%s>" % (tag, "".join("<li>%s</li>" % inline(x) for x in items), tag))
            continue

        # raw html passes through untouched
        if line.lstrip().startswith("<"):
            out.append(line)
            i += 1
            continue

        # blank
        if not line.strip():
            i += 1
            continue

        # paragraph: gather until a blank line or a block starter
        buf = []
        while i < n and lines[i].strip() and not re.match(
                r"^(#{1,6}\s|```|\||>|-{3,}$|[-*]\s|\d+\.\s|<)", lines[i]):
            buf.append(lines[i].strip())
            i += 1
        if buf:
            out.append("<p>%s</p>" % inline(" ".join(buf)))
        else:
            i += 1

    return "\n".join(out)


PAGE = """<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Public+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="../app.css?v=4">
<body class="reader">
<article class="prose">
{body}
</article>
<nav class="lessonnav">
{nav}
</nav>
<script src="../embed.js?v=4"></script>
<script>
/* the run-it links only make sense where something is executing PHP.
   Braces are doubled because this template goes through str.format. */
if (/^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname)){{
  document.querySelectorAll(".practise.run").forEach(function(el){{ el.hidden = false; }});
  document.querySelectorAll(".runnote").forEach(function(el){{ el.remove(); }});
}}
</script>
"""

# the quizzes sit one folder over, so their relative paths differ
QUIZ_PAGE = """<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Public+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="../app.css?v=4">
<body class="reader">
<article class="prose">
{body}
</article>
<nav class="lessonnav">
{nav}
</nav>
<script src="../embed.js?v=4"></script>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    built = []
    for idx, (folder, slug, title) in enumerate(LESSONS):
        src = os.path.join(PHP, folder, SOURCE.get(folder, "lesson.md"))
        if not os.path.exists(src):
            print("  skip (missing):", folder)
            continue
        md = io.open(src, encoding="utf-8").read()
        # drop the old prose version of the practise section; it is replaced
        # below with real links rather than unclickable code chips
        cut = md.find(PRACTISE_HEADING)
        if cut != -1:
            md = md[:cut].rstrip() + "\n"
        body = convert(md) + "\n" + practise_block(slug)

        prev_l = LESSONS[idx - 1] if idx > 0 else None
        next_l = LESSONS[idx + 1] if idx + 1 < len(LESSONS) else None
        nav = []
        if prev_l:
            nav.append('<a class="prev" href="%s.html"><span>Previous</span>%s</a>'
                       % (prev_l[1], html.escape(prev_l[2])))
        if next_l:
            nav.append('<a class="next" href="%s.html"><span>Next lesson</span>%s</a>'
                       % (next_l[1], html.escape(next_l[2])))
        page = PAGE.format(title=html.escape(title), body=body, nav="\n".join(nav))
        io.open(os.path.join(OUT, slug + ".html"), "w", encoding="utf-8").write(page)
        built.append(slug)
        print("  built %-12s from %s" % (slug + ".html", folder))
    print("\n%d lesson pages in %s" % (len(built), OUT))
    build_quizzes()


def build_quizzes():
    """A readable copy of each mini-quiz.

    The quiz she actually sits is app/quiz.html, which marks her answers.
    These pages are the whole worksheet on one screen - useful for you to
    read before a call, and the place the answers are written out in full.
    Nothing links to them from the course, so they cannot be mistaken for
    the real thing.
    """
    src_dir = os.path.join(PHP, "quizzes", "mini-quizzes")
    out_dir = os.path.join(PHP, "app", "quizzes")
    if not os.path.isdir(src_dir):
        return
    os.makedirs(out_dir, exist_ok=True)

    back = {p["quiz"]: slug for slug, p in PRACTISE.items() if p.get("quiz")}
    n = 0
    for name in sorted(os.listdir(src_dir)):
        if not name.endswith(".md"):
            continue
        stem = name[:-3]
        md = io.open(os.path.join(src_dir, name), encoding="utf-8").read()
        title = "Mini-quiz"
        for line in md.splitlines():
            if line.startswith("# "):
                title = line[2:].strip()
                break
        nav = ""
        if stem in back:
            nav = ('<a class="prev" href="../lessons/%s.html">'
                   '<span>Back to</span>the lesson</a>' % back[stem])
        page = QUIZ_PAGE.format(title=html.escape(title), body=convert(md), nav=nav)
        io.open(os.path.join(out_dir, stem + ".html"), "w", encoding="utf-8").write(page)
        n += 1
    print("%d quiz pages in %s" % (n, out_dir))


if __name__ == "__main__":
    main()
