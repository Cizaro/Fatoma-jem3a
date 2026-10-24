/* ---------------------------------------------------------------
   A flowchart, drawn.

   The answers used to sketch these in text, which is not a flowchart -
   it is a description of one. Her lecturer marks the shapes: an oval
   to start and stop, a parallelogram for input and output, a rectangle
   to do something, a diamond to decide, and every path connected.

   So a chart is written as data and this file draws it as SVG, with
   the real shapes, so she can copy it onto paper.

       FLOW.draw({ nodes: [
         { t:"start" },
         { t:"io",   s:"read A, B, C" },
         { t:"dec",  s:"A + B <= C ?", yes:{ t:"io", s:"print Not a triangle" } },
         { t:"proc", s:"AREA <-- PI * R * R" },
         { t:"stop" }
       ]})

   Node types
     start, stop   oval          s defaults to START / STOP
     io            parallelogram input or output
     proc          rectangle     do something
     dec           diamond       a question, two ways out

   A dec can carry either
     yes: node     a single box reached by "yes", which then rejoins
                   the spine lower down - the ladder shape
     body: [...]   a loop: these run while the answer is yes, and the
                   last one arrows back up to the diamond

   Everything lays out on one vertical spine, which is how a flowchart
   is read and how she will draw it.
--------------------------------------------------------------- */
const FLOW = (function () {

  /* The spine sits well right of the edge so a loop's back-edge has a
     clear gutter to climb, outside the widest shape (320 wide, so the
     boxes span CX-160 to CX+160). */
  const CX    = 290;   // centre of the spine
  const SIDE  = 580;   // centre of a yes-branch box
  const MERGE = 762;   // the line every yes-branch comes down
  const GAP   = 30;    // vertical space between shapes

  const esc = s => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* Text is measured roughly, which is enough: these are short labels and
     the boxes are generous. Long ones wrap onto a second line. */
  function lines(s, max) {
    const words = String(s).split(/\s+/);
    const out = [];
    let line = "";
    for (const w of words) {
      if (line && (line + " " + w).length > max) { out.push(line); line = w; }
      else line = line ? line + " " + w : w;
    }
    if (line) out.push(line);
    return out;
  }

  const SHAPE = {
    start: { w: 150, pad: 14, max: 18 },
    stop:  { w: 150, pad: 14, max: 18 },
    io:    { w: 300, pad: 14, max: 34 },
    proc:  { w: 320, pad: 14, max: 36 },
    dec:   { w: 330, pad: 26, max: 30 }
  };

  function size(n) {
    const sh = SHAPE[n.t] || SHAPE.proc;
    const ls = lines(n.s || (n.t === "start" ? "START" : n.t === "stop" ? "STOP" : ""), sh.max);
    const h  = Math.max(n.t === "dec" ? 78 : 48, ls.length * 19 + sh.pad * 2);
    return { w: sh.w, h, ls };
  }

  function shape(n, cx, y, w, h, ls) {
    const x = cx - w / 2, b = y + h, cls = "fc-" + n.t;
    let svg = "";
    if (n.t === "start" || n.t === "stop")
      svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" class="${cls}"/>`;
    else if (n.t === "io")
      svg = `<polygon points="${x + 20},${y} ${x + w},${y} ${x + w - 20},${b} ${x},${b}" class="${cls}"/>`;
    else if (n.t === "dec")
      svg = `<polygon points="${cx},${y} ${x + w},${y + h / 2} ${cx},${b} ${x},${y + h / 2}" class="${cls}"/>`;
    else
      svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>`;

    const top = y + h / 2 - (ls.length - 1) * 9.5;
    ls.forEach((t, i) => {
      svg += `<text x="${cx}" y="${top + i * 19}" class="fc-t">${esc(t)}</text>`;
    });
    return svg;
  }

  const down  = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="fc-l" marker-end="url(#fcA)"/>`;
  const plain = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="fc-l"/>`;
  const label = (x, y, t) => `<text x="${x}" y="${y}" class="fc-y">${esc(t)}</text>`;

  /* Lay a list of nodes down a spine starting at y. Returns the svg, the
     y the spine reached, and whether anything hangs off to the right. */
  function column(nodes, cx, y, state) {
    let svg = "";

    nodes.forEach((n, i) => {
      const { w, h, ls } = size(n);
      svg += shape(n, cx, y, w, h, ls);
      const bottom = y + h;

      if (n.t === "dec" && n.body) {
        /* A loop. "yes" drops into the body, drawn on the same spine; the
           body's last shape runs back UP the left gutter into the left
           vertex of the diamond. "no" leaves the right vertex, goes down
           the right gutter past the whole body, and rejoins underneath.
           The two gutters step outwards with depth so a loop inside a
           loop does not draw over its parent. */
        const d      = state.depth || 0;
        const backX  = 112 - d * 34;
        const noX    = MERGE - 60 + d * 26;
        const midY   = y + h / 2;

        state.depth = d + 1;
        const inner = column(n.body, cx, bottom + GAP, state);
        state.depth = d;

        svg += down(cx, bottom, bottom + GAP) + label(cx + 10, bottom + 20, "yes");
        svg += inner.svg;

        const endY = inner.y + 30;
        svg += plain(cx, inner.y, cx, endY)
             + plain(cx, endY, backX, endY)
             + plain(backX, endY, backX, midY)
             + `<line x1="${backX}" y1="${midY}" x2="${cx - w / 2}" y2="${midY}" class="fc-l" marker-end="url(#fcA)"/>`;

        const outY = endY + 40;
        svg += label(cx + w / 2 + 14, midY - 8, "no");
        svg += plain(cx + w / 2, midY, noX, midY)
             + plain(noX, midY, noX, outY)
             + `<line x1="${noX}" y1="${outY}" x2="${cx}" y2="${outY}" class="fc-l"/>`;

        y = outY;
        if (i < nodes.length - 1) svg += down(cx, y, y + GAP);
        y = y + GAP;
        return;
      }

      if (n.t === "dec" && n.yes) {
        const s2 = size(n.yes);
        const sy = y + h / 2 - s2.h / 2;
        svg += shape(n.yes, SIDE, sy, s2.w, s2.h, s2.ls);
        svg += `<line x1="${cx + w / 2}" y1="${y + h / 2}" x2="${SIDE - s2.w / 2}" y2="${y + h / 2}" class="fc-l" marker-end="url(#fcA)"/>`;
        svg += label(cx + w / 2 + 14, y + h / 2 - 8, "yes");
        /* down the shared gutter to the merge line at the bottom */
        svg += plain(SIDE + s2.w / 2, y + h / 2, MERGE, y + h / 2);
        state.merges.push(y + h / 2);
        svg += label(cx - 26, bottom + 20, "no");
      }

      if (i < nodes.length - 1) svg += down(cx, bottom, bottom + GAP);
      y = bottom + GAP;
    });

    return { svg, y: y - GAP };
  }

  function draw(spec) {
    const state = { merges: [] };
    const body  = column(spec.nodes, CX, 26, state);
    let svg = body.svg;

    /* every yes-branch runs down the same gutter and comes back into the
       spine just above the last shape - the way she drew it by hand */
    if (state.merges.length) {
      const last = spec.nodes[spec.nodes.length - 1];
      const lh   = size(last).h;
      const topOfLast = body.y - lh;
      const mergeY = topOfLast - 18;
      svg += plain(MERGE, Math.min(...state.merges), MERGE, mergeY)
           + `<line x1="${MERGE}" y1="${mergeY}" x2="${CX}" y2="${mergeY}" class="fc-l"/>`
           + down(CX, mergeY, topOfLast);
    }

    const h = body.y + 34;
    const w = MERGE + 40;
    return `<svg class="fc" viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="flowchart">
<defs><marker id="fcA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
  orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fc-h"/></marker></defs>
${svg}
</svg>`;
  }

  return { draw };
})();
