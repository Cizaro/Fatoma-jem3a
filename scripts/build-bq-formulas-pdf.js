// Builds Business-Quantitative/Business-Quantitative-Formulas.pdf from formulas.js.
// Usage: node scripts/build-bq-formulas-pdf.js   (needs Chrome or Edge installed)
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");

const dir = path.join(__dirname, "..", "Business-Quantitative");
global.window = {};
require(path.join(dir, "formulas.js"));
const F = window.FORMULAS;
const frac = (s) => s.replace(/\{([^{}|]+)\|([^{}]+)\}/g, '<span class="fr"><span>$1</span><span>$2</span></span>');

const topics = F.map((t, i) => `
<section>
  <div class="file">${i + 1} · file: ${t.file}</div>
  <h2>${t.title}</h2>
  <p class="what">${t.what}</p>
  <table>${t.formulas.map(f => `<tr><td class="n">${f[0]}</td><td class="f">${frac(f[1])}</td><td class="m">${f[2]}</td></tr>`).join("")}</table>
  ${t.example ? `<div class="ex"><b>Example from her file.</b> ${t.example.q}<ol>${t.example.s.map(s => `<li>${s}</li>`).join("")}</ol></div>` : ""}
  <p class="rem"><b>Remember:</b> ${t.remember}</p>
</section>`).join("");

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Business Quantitative Formulas</title><style>
@page{size:A4;margin:14mm 13mm}
body{font:10.5pt/1.45 "Segoe UI",Arial,sans-serif;color:#15211d;margin:0}
h1{font:800 22pt/1.1 "Arial Narrow",Arial,sans-serif;margin:0 0 4px;color:#0d6b4e}
.sub{color:#5b6a64;margin:0 0 10px}
.toc{columns:2;margin:0 0 6px;padding-left:20px;font-size:10pt}
section{break-inside:avoid;border-top:2px solid #0d6b4e;padding-top:8px;margin-top:14px}
.file{font:9pt Consolas,monospace;color:#5b6a64}
h2{font:700 14pt "Arial Narrow",Arial,sans-serif;margin:2px 0 4px}
.what{margin:0 0 8px}
table{border-collapse:collapse;width:100%;margin-bottom:8px}
td{border:1px solid #d6e0db;padding:6px 8px;vertical-align:middle}
td.n{width:24%;font-weight:600;color:#33433d}
td.f{font-family:Consolas,monospace;font-size:10pt}
td.m{width:28%;color:#5b6a64;font-size:9pt}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 3px}
.fr>span:first-child{border-bottom:1.2px solid #15211d;padding:0 3px 1px}
.fr>span:last-child{padding:1px 3px 0}
.ex{background:#eef5f1;padding:7px 10px;border-radius:4px}
.ex ol{margin:4px 0 0;padding-left:20px}
.ex b,li b{color:#0d6b4e}
.rem{background:#fbefe2;border-left:3px solid #a4520c;padding:6px 10px;margin:8px 0 0}
</style></head><body>
<h1>Business Quantitative: the formulas</h1>
<p class="sub">Every formula from her 15 lecture files, in the order they were given, explained in plain words.</p>
<ol class="toc">${F.map(t => `<li>${t.title}</li>`).join("")}</ol>
${topics}
</body></html>`;

const tmp = path.join(os.tmpdir(), "bq-formulas.html");
fs.writeFileSync(tmp, html);
const out = path.join(dir, "Business-Quantitative-Formulas.pdf");
const browsers = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"];
const exe = browsers.find(b => fs.existsSync(b));
execFileSync(exe, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=" + out, "file:///" + tmp.replace(/\\/g, "/")], { stdio: "inherit" });
console.log("wrote", out);
