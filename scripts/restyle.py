#!/usr/bin/env python3
"""
Swap the course palette for the daylight one and add the motion layer.

Run once. It replaces the token block at the top of app/app.css - which
used to carry a light palette and two dark ones - with a single light
palette, and appends the depth and motion rules that go with it.

    python scripts/restyle.py
"""
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "Php", "app", "app.css")

TOKENS = """:root{
  color-scheme: light;

  /* ---- Daylight -------------------------------------------------------
     One palette, no dark mode: she reads this at a desk in the evening on
     a lit screen, and the request was for no dark colours anywhere - which
     includes the code blocks, which used to be charcoal.

     The depth comes from layered shadow and a very faint colour wash
     instead, so the page still has somewhere to sit.                      */
  --paper:#FBFAF7; --surface:#FFFFFF; --surface-2:#F2EFE8;
  --ink:#15171E; --ink-2:#565C6B; --ink-3:#8A8F9E;
  --line:#E7E2D8;

  --accent:#3A42DB; --accent-soft:#EDEEFD;
  --warm:#DC5C33;   --warm-soft:#FDEDE7;
  --gold:#BC8710;   --gold-soft:#FAF1D9;

  /* code and editors: ivory, with ink dark enough to read all evening */
  --cabinet:#F5F3EC; --cabinet-ink:#1B1E27;

  --shadow:0 1px 2px rgba(20,22,30,.05), 0 10px 30px -16px rgba(20,22,30,.20);
  --lift:0 2px 6px rgba(20,22,30,.06), 0 34px 70px -34px rgba(58,66,219,.38);

  --display:"Familjen Grotesk","Segoe UI",system-ui,sans-serif;
  --body:"Public Sans",system-ui,-apple-system,sans-serif;
  --mono:"JetBrains Mono",ui-monospace,Consolas,monospace;

  /* One corner-radius scale for the whole course. Before this there were
     thirteen different radii across the pages, which is what makes a site
     look like it has no system behind it. Small things, panels, big
     containers, and anything pill-shaped. Nothing else. */
  --r-sm:9px; --r:14px; --r-lg:22px; --r-pill:999px;
  --rail:252px;

  /* Names the older pages use. They are aliases, not new colours, so that
     every page can share this one file instead of carrying its own copy
     of the palette - which is how three pages quietly lost dark mode. */
  --marker:var(--warm); --marker-soft:var(--warm-soft);
  --done:var(--accent);  --done-soft:var(--accent-soft);
  --good:#1C7F57;        --good-soft:#E6F4ED;
  --bad:var(--warm);     --bad-soft:var(--warm-soft);
  --code-bg:var(--cabinet); --code-ink:var(--cabinet-ink); --editor:var(--cabinet);
  --editor-ink:var(--cabinet-ink); --gutter:#A7A396;

  /* the six stage worlds */
  --w1:#3A42DB; --w2:#2E6F9E; --w3:#BC8710; --w4:#DC5C33; --w5:#A33F62; --w6:#5B4BA8;
}
"""

CINEMA = """

/* ============================================================
   DAYLIGHT: depth and motion
   The brief was modern and cinematic without dark colours, so the
   drama is carried by scale, air and layered light rather than by a
   dark ground. Everything here is additive - remove this block and
   the course still works exactly as before.
   ============================================================ */

/* A wash behind everything. Fixed, so it does not travel with the
   scroll, and pale enough to read as light rather than as colour. */
body::before{
  content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  background:
    radial-gradient(900px 620px at 8% -8%,  rgba(58,66,219,.10), transparent 62%),
    radial-gradient(760px 540px at 98% 4%,  rgba(220,92,51,.09),  transparent 60%),
    radial-gradient(900px 700px at 50% 108%,rgba(28,127,87,.07),  transparent 62%);
}

/* one theme now, so the buttons that switched it have nothing to do */
.theme-btn, #themeBtn{ display:none !important; }

/* ---------- the shell reads as glass over the wash ---------- */
.rail{ background:rgba(255,255,255,.72); backdrop-filter:blur(18px) saturate(1.3);
  -webkit-backdrop-filter:blur(18px) saturate(1.3); border-right:1px solid rgba(231,226,216,.8); }
.brand{ background:transparent; }
.stage, .stage iframe{ background:transparent; }
.topbar{ background:rgba(255,255,255,.82); backdrop-filter:blur(18px) saturate(1.3);
  -webkit-backdrop-filter:blur(18px) saturate(1.3); border-bottom:1px solid rgba(231,226,216,.8); }

.nav a{ transition:background .18s ease, color .18s ease, transform .18s cubic-bezier(.16,1,.3,1); }
.nav a:hover{ transform:translateX(3px); }
.nav a.on{ box-shadow:inset 0 0 0 1px rgba(58,66,219,.16); }

/* ---------- type, one size bolder ---------- */
.prose{ max-width:788px; }
.prose h1{ font-size:clamp(34px,6.2vw,58px); letter-spacing:-.035em; line-height:1.02;
  margin-bottom:26px; }
.prose h2{ font-size:clamp(21px,2.4vw,27px); letter-spacing:-.025em; margin-top:46px;
  padding-top:24px; }
.prose p{ font-size:15.5px; }

/* code sits on ivory now, so it needs an edge to stay a distinct object */
.prose pre, pre.code, .out, .brief pre{
  border:1px solid var(--line); box-shadow:inset 0 1px 0 rgba(255,255,255,.9); }

/* ---------- things you can press should feel it ---------- */
.pl, .lessonnav a, .gl, .hl{
  transition:transform .22s cubic-bezier(.16,1,.3,1), box-shadow .22s ease, border-color .18s ease; }
.pl:hover, .gl:hover, .hl:hover{ transform:translateY(-2px); box-shadow:var(--shadow); }
.lessonnav a:hover{ transform:translateY(-3px); box-shadow:var(--lift); }
.pl.main:hover{ box-shadow:0 10px 30px -12px rgba(58,66,219,.6); }

/* ---------- entrances ----------
   A scroll-linked animation where the browser supports one, which is
   genuinely cinematic and costs nothing: no library, no observer, and
   no element is ever left invisible, because anything already on screen
   when the page loads is past its entry range. */
@keyframes enter{
  from{ opacity:.25; transform:translateY(18px) scale(.985); }
  to  { opacity:1;   transform:none; }
}
@keyframes rise{
  from{ opacity:0; transform:translateY(14px); }
  to  { opacity:1; transform:none; }
}
@media (prefers-reduced-motion: no-preference){
  .prose > h1{ animation:rise .7s cubic-bezier(.16,1,.3,1) both; }
  .prose > p:first-of-type{ animation:rise .7s .08s cubic-bezier(.16,1,.3,1) both; }

  @supports (animation-timeline: view()){
    .prose > h2, .prose > pre, .prose > .tablewrap, .prose > blockquote,
    .lessonnav a, .practise{
      animation:enter linear both;
      animation-timeline:view();
      animation-range:entry 0% entry 58%;
    }
  }
}
"""


def main():
    s = io.open(CSS, encoding="utf-8").read()
    start = s.index(":root{")
    end = s.index("*{box-sizing:border-box}")
    s = s[:start] + TOKENS + "\n" + s[end:]

    # the scrim was tuned against a dark page
    s = s.replace("background:rgba(15,17,20,.45)", "background:rgba(21,23,30,.32)")

    io.open(CSS, "w", encoding="utf-8", newline="\n").write(s.rstrip() + "\n" + CINEMA)
    print("app.css restyled")


if __name__ == "__main__":
    main()
