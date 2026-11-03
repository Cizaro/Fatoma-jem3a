// The standard normal z-table (area to the LEFT of z), drawn as HTML.
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
      <line x1="${X(z)}" x2="${X(z)}" y1="${Y(0)}" y2="8" class="zm"/><text x="${X(z) + 4}" y="14" class="zt">z = ${z}</text>
      <text x="${X(z) - 6}" y="${H - 22}" class="zt" text-anchor="end">${cdf(z).toFixed(4)}</text><text x="${X(0)}" y="${H - 2}" class="zt" text-anchor="middle">0</text></svg>`;
  }

  // z: the value to highlight (or null). from/to: first and last row (e.g. 0.0 to 3.4).
  function html(z, from = 0, to = 3.4) {
    const hr = z == null ? null : Math.floor(z * 10 + 1e-9) / 10, hc = z == null ? null : Math.round((z - hr) * 100);
    const cols = [...Array(10).keys()];
    let rows = "";
    for (let r = Math.round(from * 10); r <= Math.round(to * 10); r++) {
      const rv = r / 10, isRow = hr != null && Math.abs(rv - hr) < 1e-9;
      rows += `<tr class="${isRow ? "hr" : ""}"><th>${rv.toFixed(1)}</th>${cols.map(c => `<td class="${isRow && c === hc ? "hit" : c === hc ? "hc" : ""}">${cdf(rv + c / 100).toFixed(4)}</td>`).join("")}</tr>`;
    }
    const how = z == null ? "" : `<p class="zhow">Row <b>${hr.toFixed(1)}</b> + column <b>${(hc / 100).toFixed(2)}</b> → z = ${z} → area to the left = <b>${cdf(z).toFixed(4)}</b>. Area to the right = 1 − ${cdf(z).toFixed(4)} = <b>${(1 - cdf(z)).toFixed(4)}</b>.</p>`;
    return `<figure class="ztable"><figcaption>z-table: area to the LEFT of z (below z)</figcaption>${z == null ? "" : curve(z)}
      <div class="zscroll"><table><thead><tr><th>z</th>${cols.map(c => `<th>.0${c}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>${how}</figure>`;
  }

  window.ZTABLE = { cdf, html };
})();
