#!/usr/bin/env python3
"""
Second design pass: give the daylight palette something to look at.

The first pass took the dark out and left the pages very plain - the
feedback was "plain white, boring". The gradients that would normally
carry that are the exact thing that stalled painting last time, so this
pass gets its colour from flat tints, small linear gradients on small
elements, and a colour per level of the course. All cheap to paint.

    python scripts/restyle2.py
"""
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "Php", "app", "app.css")
HOME = os.path.join(ROOT, "Php", "index.html")

WARMER = [
    # paper off the near-white, panels with a trace of colour in them
    ("--paper:#FBFAF7; --surface:#FFFFFF; --surface-2:#F2EFE8;",
     "--paper:#F6F3EA; --surface:#FFFDFA; --surface-2:#EDE8DC;"),
    ("--line:#E7E2D8;", "--line:#E2DACB;"),
]

CSS_ADD = """

/* ============================================================
   COLOUR
   The palette alone left the pages reading as white boxes on white.
   Everything below adds colour the cheap way - flat tints, small
   linear gradients on small elements, a coloured edge - and never
   with a large soft gradient, which is what broke painting before.
   ============================================================ */

/* a filled button should look lit rather than flat */
.pl.main, .btn:not(.ghost):not(.run), .primary, .chip.solid, .big .go{
  background-image:linear-gradient(180deg, rgba(255,255,255,.22), rgba(0,0,0,.06));
}
.btn.run{ background-image:linear-gradient(180deg, rgba(255,255,255,.24), rgba(0,0,0,.08)); }

/* code gets an edge in the accent so a block reads as a block */
.prose pre, pre.code, .brief pre{
  border-left:3px solid var(--accent);
  background-image:linear-gradient(180deg, rgba(58,66,219,.05), transparent 120px);
}
.prose blockquote{
  background-image:linear-gradient(180deg, rgba(58,66,219,.07), transparent);
}

/* section headings carry a short rule in the accent instead of a hairline
   across the whole measure */
.prose h2{ border-top:0; position:relative; }
.prose h2::before{
  content:"";position:absolute;top:6px;left:0;width:44px;height:3px;border-radius:2px;
  background:linear-gradient(90deg, var(--accent), var(--warm));
}

/* inline code reads as a tag, not as plain text in a grey box */
.prose code, .brief code{
  background:var(--accent-soft); color:#2A31A8;
  box-shadow:inset 0 0 0 1px rgba(58,66,219,.12);
}
.prose pre code{ background:none; color:inherit; box-shadow:none; }

/* tables: a tinted head row and alternating bands */
.prose th{ background:var(--accent-soft); color:#2A31A8; }
.prose tbody tr:nth-child(even) td{ background:rgba(237,238,253,.45); }

/* the rail's current page gets a bar in the accent */
.nav a.on{ position:relative; }
.nav a.on::before{
  content:"";position:absolute;left:-10px;top:7px;bottom:7px;width:3px;border-radius:0 3px 3px 0;
  background:var(--accent);
}

/* panels lift off the paper */
.pane, details.lesson, .step, .railprog{ background-color:var(--surface); }
"""

HOME_ADD = """
/* ---------- colour per level ----------
   Six levels, six hues from the stage worlds, so the spine, the number
   and the cards of one level all read as belonging together. The whole
   course map used to be one accent, which made a long page look flat. */
.level{ --lvc:var(--accent); }
.level:nth-of-type(1){ --lvc:var(--w1); }
.level:nth-of-type(2){ --lvc:var(--w2); }
.level:nth-of-type(3){ --lvc:var(--w3); }
.level:nth-of-type(4){ --lvc:var(--w4); }
.level:nth-of-type(5){ --lvc:var(--w5); }
.level:nth-of-type(6){ --lvc:var(--w6); }

.level::before{ background:linear-gradient(180deg, var(--lvc), rgba(0,0,0,.06)); opacity:.35; }
.level.done::before{ background:var(--lvc); opacity:1; }
.dot{ border-color:var(--lvc); color:var(--lvc); background:var(--surface);
  box-shadow:0 0 0 4px color-mix(in srgb, var(--lvc) 12%, transparent); }
.level.done .dot, .level.now .dot{ border-color:var(--lvc); }
.level.done .dot{ background:var(--lvc); color:#fff; }
.lvhead h2{ color:var(--ink); }
.lvhead h2::after{ content:"";display:block;width:38px;height:3px;border-radius:2px;margin-top:7px;
  background:var(--lvc); }

details.lesson{ border-left:3px solid color-mix(in srgb, var(--lvc) 45%, var(--line)); }
details.lesson:hover{ border-color:color-mix(in srgb, var(--lvc) 60%, var(--line));
  transform:translateY(-1px); box-shadow:var(--lift); }
details.lesson[open]{ border-color:var(--lvc); }
details.lesson[open] summary{ background:color-mix(in srgb, var(--lvc) 7%, transparent); }
details.lesson{ transition:transform .2s cubic-bezier(.16,1,.3,1), box-shadow .2s ease,
  border-color .18s ease; }
.lesson.done .tick, .lesson.part .tick{ border-color:var(--lvc); }
.lesson.done .tick{ background:var(--lvc); }
.lesson.part .tick{ color:var(--lvc); }

/* the row of buttons under a lesson: one filled, the rest tinted */
.tools .tool{ background:color-mix(in srgb, var(--lvc) 9%, var(--surface));
  border-color:color-mix(in srgb, var(--lvc) 22%, var(--line)); color:var(--ink); }
.tools .tool:hover{ border-color:var(--lvc); transform:translateY(-1px);
  box-shadow:0 6px 16px -8px color-mix(in srgb, var(--lvc) 70%, transparent); }
.tools .tool.key{ background:var(--lvc); border-color:var(--lvc); color:#fff;
  background-image:linear-gradient(180deg, rgba(255,255,255,.2), rgba(0,0,0,.07)); }
/* the two that need a PHP server, shown only when one is running */
.tools .tool.run{ font-family:var(--mono); font-size:12px;
  background:var(--surface-2); border-color:var(--line); color:var(--ink-2); }
"""


def main():
    s = io.open(CSS, encoding="utf-8").read()
    for old, new in WARMER:
        if s.count(old) != 1:
            raise SystemExit("token anchor missing: " + old)
        s = s.replace(old, new)
    io.open(CSS, "w", encoding="utf-8", newline="\n").write(s.rstrip() + "\n" + CSS_ADD)

    h = io.open(HOME, encoding="utf-8").read()
    anchor = "</style>"
    i = h.index(anchor)
    io.open(HOME, "w", encoding="utf-8", newline="\n").write(h[:i] + HOME_ADD + h[i:])
    print("colour pass applied")


if __name__ == "__main__":
    main()
