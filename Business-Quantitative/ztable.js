// The standard normal z-table (area to the LEFT of z), drawn like a printed textbook table.
// Used by the website (app.js) and the PDF build (scripts/build-bq-formulas-pdf.js).
(function () {
  // Abramowitz & Stegun 7.1.26: erf to about 1e-7, plenty for a 4-decimal table.
  function erf(x) {
    const s = Math.sign(x); x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const cdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const four = (p) => p.toFixed(4).replace(/^0/, "");          // 0.9370 → .9370, like the printed table
  const minus = (s) => s.replace("-", "−");

  // Row r is stored in tenths with a sign (−15 = row −1.5, "-0" = row −0.0); column c is the hundredths digit.
  const cell = (neg, tenths, c) => cdf((neg ? -1 : 1) * (tenths / 10 + c / 100));

  // A small bell curve with the area left of z shaded.
  function curve(z) {
    const W = 260, H = 96, X = (v) => (v + 3.5) / 7 * W, Y = (v) => H - 14 - v / 0.4 * (H - 24);
    const pdf = (v) => Math.exp(-v * v / 2) / Math.sqrt(2 * Math.PI);
    let line = "", area = `M${X(-3.5)},${Y(0)}`;
    for (let v = -3.5; v <= 3.5001; v += 0.05) {
      line += (line ? "L" : "M") + X(v).toFixed(1) + "," + Y(pdf(v)).toFixed(1);
      if (v <= z) area += `L${X(v).toFixed(1)},${Y(pdf(v)).toFixed(1)}`;
    }
    area += `L${X(z).toFixed(1)},${Y(pdf(z)).toFixed(1)}L${X(z).toFixed(1)},${Y(0)}Z`;
    return `<svg class="zcurve" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bell curve with the area to the left of z = ${z} shaded">
      <path d="${area}" class="za"/><path d="${line}" class="zl"/><line x1="0" x2="${W}" y1="${Y(0)}" y2="${Y(0)}" class="zx"/>
      <line x1="${X(z)}" x2="${X(z)}" y1="${Y(0)}" y2="8" class="zm"/><text x="${X(z) + 4}" y="14" class="zt">z = ${minus(String(z))}</text>
      <text x="${X(z) - 6}" y="${H - 22}" class="zt" text-anchor="end">${four(cdf(z))}</text><text x="${X(0)}" y="${H - 2}" class="zt" text-anchor="middle">0</text></svg>`;
  }

  // One printed table. neg: the negative half. lo/hi: row range in tenths (0..36). pick: {neg, tenths, c} to mark.
  function table(neg, lo, hi, pick) {
    const cols = [...Array(10).keys()];
    const order = neg ? [...Array(hi - lo + 1).keys()].map(k => hi - k) : [...Array(hi - lo + 1).keys()].map(k => lo + k);
    const isCol = (c) => pick && pick.neg === neg && c === pick.c;
    let rows = "";
    order.forEach(r => {
      const isRow = pick && pick.neg === neg && r === pick.tenths;
      rows += `<tr class="${isRow ? "hr" : ""}"><th class="${isRow ? "mark" : ""}">${isRow ? '<i class="bd">1</i>' : ""}${neg ? "−" : ""}${(r / 10).toFixed(1)}</th>${cols.map(c =>
        `<td class="${isRow && isCol(c) ? "hit" : isCol(c) ? "hc" : ""}">${isRow && isCol(c) ? '<i class="bd">3</i>' : ""}${four(cell(neg, r, c))}</td>`).join("")}</tr>`;
    });
    return `<table class="zp"><thead><tr><th>z</th>${cols.map(c => `<th class="${isCol(c) ? "mark" : ""}">${isCol(c) ? '<i class="bd">2</i>' : ""}0.0${c}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  // z: value to mark (or null). span: how many rows either side of it (null = the whole half table).
  function html(z, span = null) {
    let pick = null;
    if (z != null) {
      const a = Math.abs(z), tenths = Math.floor(a * 10 + 1e-9);
      pick = { neg: z < 0, tenths, c: Math.round((a - tenths / 10) * 100) };
    }
    const neg = pick ? pick.neg : false;
    const lo = span == null || !pick ? 0 : Math.max(0, pick.tenths - span), hi = span == null || !pick ? 36 : Math.min(36, pick.tenths + span);
    const p = z == null ? 0 : cdf(z), rowTxt = (neg ? "−" : "") + (pick ? (pick.tenths / 10).toFixed(1) : "");
    const how = z == null ? "" : `<ol class="zhow">
      <li><i class="bd">1</i> Split z = ${minus(z.toFixed(2))} into <b>${rowTxt}</b> and <b>0.0${pick.c}</b>. Go down the z column to row <b>${rowTxt}</b>.</li>
      <li><i class="bd">2</i> Go across to the column headed <b>0.0${pick.c}</b>.</li>
      <li><i class="bd">3</i> Where they meet: <b>${four(p)}</b>. This is the area to the LEFT of z (the share below it).</li>
      <li>Need the share ABOVE z? 1 − ${four(p)} = <b>${four(1 - p)}</b>.</li></ol>`;
    return `<figure class="ztable"><figcaption>Standard normal table · area to the left of z</figcaption>${z == null ? "" : curve(z)}
      <div class="zscroll"><div class="zpaper">${table(neg, lo, hi, pick)}</div></div>${how}</figure>`;
  }

  // Both halves of the full table (for the lesson): negative z, then positive z.
  function full(z) {
    const pos = html(z), negPart = `<div class="zscroll"><div class="zpaper">${table(true, 0, 36, null)}</div></div>`;
    return { pos, neg: `<figure class="ztable"><figcaption>Standard normal table · negative z · area to the left of z</figcaption>${negPart}</figure>` };
  }

  window.ZTABLE = { cdf, html, full };
})();
