// Renders the formula course from formulas.js and questions.js.
const F = window.FORMULAS, Q = window.QUESTIONS;
const $ = (h) => { const d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstElementChild; };
const frac = (s) => s.replace(/\{([^{}|]+)\|([^{}]+)\}/g, '<span class="fr"><span>$1</span><span>$2</span></span>');
const fmt = (x) => Number(x).toLocaleString("en-US", { maximumFractionDigits: 4 });
const ids = F.map((t, i) => "t" + (i + 1));
const views = [{ id: "start", label: "Start here" }, { id: "all", label: "All formulas" },
  ...F.map((t, i) => ({ id: ids[i], label: (i + 1) + ". " + t.title.split(/[:(]/)[0].trim() })),
  { id: "exam", label: "Mock exam" }];
const total = ids.reduce((n, id) => n + (Q.practice[id] || []).length, 0);

let solved = {};
try { solved = JSON.parse(localStorage.getItem("bq-solved") || "{}"); } catch (e) {}
const save = () => { try { localStorage.setItem("bq-solved", JSON.stringify(solved)); } catch (e) {} };
const topicDone = (id) => (Q.practice[id] || []).every((q, k) => solved[id + "-" + k]);

// Accept "1,500", "25%", "0.625", "−2". Close enough = within 0.5% or 0.01.
const parse = (v) => parseFloat(String(v).replace(/[,\s%$]/g, "").replace("−", "-"));
function right(v, q) {
  const x = parse(v);
  return !isNaN(x) && [q.a, ...(q.alt || [])].some(a => Math.abs(x - a) <= Math.max(0.01, Math.abs(a) * 0.005));
}

function progress() {
  const n = Object.keys(solved).length;
  document.getElementById("prog").style.width = (n / total * 100) + "%";
  document.getElementById("count").textContent = `${n} / ${total} practice solved`;
}

let current = "start";
function nav(cur) {
  const n = document.getElementById("nav"); n.innerHTML = "";
  views.forEach(v => {
    const tick = ids.includes(v.id) && topicDone(v.id) ? '<span class="tick">✓</span>' : "";
    const b = $(`<button type="button" class="${v.id === "exam" ? "exam" : ""}">${v.label}${tick}</button>`);
    b.setAttribute("aria-current", v.id === cur);
    b.onclick = () => go(v.id);
    n.append(b);
    if (v.id === cur) setTimeout(() => b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }), 0);
  });
}

let clock = null;
function go(id) {
  if (!views.some(v => v.id === id)) id = "start";
  clearInterval(clock); current = id;
  try { history.replaceState(null, "", "#" + id); } catch (e) {}
  nav(id); progress();
  const m = document.getElementById("main"); m.innerHTML = "";
  if (id === "start") start(m); else if (id === "all") all(m); else if (id === "exam") exam(m); else topic(m, ids.indexOf(id));
  [...m.children].forEach((c, i) => c.style.setProperty("--i", i));
  window.scrollTo(0, 0);
}

const table = (t) => `<div class="sheet"><table>${t.formulas.map(f => `<tr><td class="n">${f[0]}</td><td class="f">${frac(f[1])}</td><td class="m">${f[2]}</td></tr>`).join("")}</table></div>`;
const steps = (s, hidden) => `<ol class="steps sol"${hidden ? " hidden" : ""}>${s.map(x => `<li>${x}</li>`).join("")}</ol>`;

// One practice question: number box or choice buttons. onRight fires once it is answered correctly.
function question(q, label, onRight) {
  const el = $(`<div class="pq"><div class="n">${label}</div><div>${q.q}</div></div>`);
  const fb = $(`<span class="fb" aria-live="polite"></span>`), sol = $(steps(q.s, true));
  const ok = () => { el.classList.add("ok"); el.classList.remove("no"); onRight(); };
  const no = () => { el.classList.remove("no"); void el.offsetWidth; el.classList.add("no"); };
  if (q.o) {
    const opts = $(`<div class="opts"></div>`);
    q.o.forEach((o, k) => {
      const b = $(`<button type="button" class="opt">${o}</button>`);
      b.onclick = () => {
        opts.querySelectorAll(".opt").forEach(x => x.classList.remove("right", "wrong"));
        if (k === q.c) { b.classList.add("right"); fb.className = "fb ok"; fb.textContent = "Correct."; sol.hidden = false; ok(); }
        else { b.classList.add("wrong"); fb.className = "fb no"; fb.textContent = "Not this one. Try another."; no(); }
      };
      opts.append(b);
    });
    el.append(opts, fb);
  } else {
    const row = $(`<div class="row"><input type="text" inputmode="decimal" autocomplete="off" aria-label="Your answer"><span class="unit">${q.unit || ""}</span>
      <button class="btn" type="button">Check</button><button class="btn ghost" type="button">Show steps</button></div>`);
    const inp = row.querySelector("input"), [chk, show] = row.querySelectorAll("button");
    inp.id = "a-" + label.replace(/\W+/g, "-");
    const check = () => {
      if (!inp.value.trim()) { fb.className = "fb no"; fb.textContent = "Type a number first."; return; }
      if (right(inp.value, q)) { fb.className = "fb ok"; fb.textContent = "Correct."; ok(); }
      else { fb.className = "fb no"; fb.textContent = "Not yet. Try again or show the steps."; no(); }
    };
    chk.onclick = check; inp.onkeydown = e => { if (e.key === "Enter") check(); };
    show.onclick = () => { sol.hidden = !sol.hidden; show.textContent = sol.hidden ? "Show steps" : "Hide steps"; };
    row.append(fb); el.append(row);
  }
  el.append(sol);
  return el;
}

function start(m) {
  m.append($(`<section><h2>Every formula she needs, <em>in her order</em></h2>
    <p class="lede">Everything here comes from her 15 lecture files. Each topic explains the idea in plain words, lists the formulas, walks through the example from her file, then lets her practise. The mock exam at the end puts it all together.</p></section>`));
  m.append($(`<div class="stats"><div class="stat"><b>${F.length}</b><span>topics</span></div><div class="stat"><b>${total}</b><span>practice questions</span></div><div class="stat"><b>${Q.exam.length}</b><span>exam questions</span></div><div class="stat"><b>60</b><span>exam minutes</span></div></div>`));
  const s = $(`<section><h3>The order</h3><div class="plan"></div></section>`), p = s.querySelector(".plan");
  F.forEach((t, i) => {
    const n = (Q.practice[ids[i]] || []).length;
    const b = $(`<button type="button" class="${topicDone(ids[i]) ? "done" : ""}"><span class="i">${topicDone(ids[i]) ? "✓" : i + 1}</span><span class="t">${t.title}</span><span class="m">${n} questions</span></button>`);
    b.style.setProperty("--i", i); b.onclick = () => go(ids[i]); p.append(b);
  });
  const e = $(`<button type="button" class="x"><span class="i">✎</span><span class="t">Mock exam</span><span class="m">${Q.exam.length} questions · 60 min</span></button>`);
  e.style.setProperty("--i", F.length); e.onclick = () => go("exam"); p.append(e);
  m.append(s);
}

function topic(m, i) {
  const t = F[i], id = ids[i];
  m.append($(`<section><p class="meta">Topic ${i + 1} of ${F.length} · file: ${t.file}</p><h2>${t.title}</h2><p class="lede">${t.what}</p></section>`));
  m.append($(`<section><h3>Formulas</h3>${table(t)}</section>`));
  if (t.example) m.append($(`<section><h3>Example from her file</h3><div class="work"><div class="q">${t.example.q}</div>${steps(t.example.s)}</div></section>`));
  m.append($(`<div class="trap"><strong>Remember</strong>${t.remember}</div>`));
  const ps = $(`<section><h3>Practice</h3></section>`);
  (Q.practice[id] || []).forEach((q, k) => ps.append(question(q, `Question ${k + 1}`, () => {
    if (solved[id + "-" + k]) return;
    solved[id + "-" + k] = 1; save(); progress();
    if (topicDone(id)) nav(id);
  })));
  m.append(ps);
  const nx = $(`<div class="next"></div>`);
  if (i > 0) { const b = $(`<button class="btn ghost" type="button">← ${F[i - 1].title}</button>`); b.onclick = () => go(ids[i - 1]); nx.append(b); } else nx.append($("<span></span>"));
  const last = i === F.length - 1;
  const b = $(`<button class="btn${last ? " coral" : ""}" type="button">${last ? "Mock exam" : F[i + 1].title} →</button>`);
  b.onclick = () => go(last ? "exam" : ids[i + 1]); nx.append(b);
  m.append(nx);
}

function all(m) {
  m.append($(`<section><h2>All formulas</h2><p class="lede">The whole course on one page, in her order. The same sheet as the PDF, for the last read before the exam.</p></section>`));
  F.forEach((t, i) => m.append($(`<section class="topic"><p class="meta">${i + 1} · ${t.file}</p><h4>${t.title}</h4><p>${t.what}</p>${table(t)}</section>`)));
}

function exam(m) {
  const E = Q.exam;
  m.append($(`<section><h2>Mock exam</h2><p class="lede">${E.length} questions using her formulas with new numbers, mixed like a real paper. Work on paper, type only the final number or pick an answer. Nothing is marked until you press Finish.</p></section>`));
  const top = $(`<div class="bar"><span class="timer">60:00</span><button class="btn coral" type="button">Finish and mark</button></div>`);
  m.append(top);
  const list = $(`<section></section>`), picks = [];
  const boxes = E.map((q, k) => {
    const el = $(`<div class="pq"><div class="n">Q${k + 1} · topic ${q.t}: ${F[q.t - 1].title.split(/[:(]/)[0].trim()}</div><div>${q.q}</div></div>`);
    if (q.o) {
      const opts = $(`<div class="opts"></div>`);
      q.o.forEach((o, j) => {
        const b = $(`<button type="button" class="opt">${o}</button>`);
        b.onclick = () => { if (el.dataset.marked) return; picks[k] = j; opts.querySelectorAll(".opt").forEach(x => x.classList.toggle("sel", x === b)); };
        opts.append(b);
      });
      el.append(opts);
    } else el.append($(`<div class="row"><input type="text" inputmode="decimal" autocomplete="off" id="ex-${k}" aria-label="Answer to question ${k + 1}"><span class="unit">${q.unit || ""}</span></div>`));
    el.append($(`<span class="fb"></span>`), $(steps(q.s, true)));
    list.append(el); return el;
  });
  m.append(list);
  let left = 60 * 60; const t = top.querySelector(".timer");
  clock = setInterval(() => {
    left = Math.max(0, left - 1);
    t.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
    t.classList.toggle("low", left < 300);
    if (!left) mark();
  }, 1000);
  function mark() {
    clearInterval(clock);
    let score = 0; const weak = new Set();
    boxes.forEach((el, k) => {
      const q = E[k], fb = el.querySelector(".fb"); el.dataset.marked = 1;
      let good;
      if (q.o) {
        good = picks[k] === q.c;
        el.querySelectorAll(".opt").forEach((b, j) => { if (j === q.c) b.classList.add("right"); else if (j === picks[k]) b.classList.add("wrong"); });
      } else {
        const inp = el.querySelector("input"); inp.readOnly = true; good = right(inp.value, q);
      }
      if (good) { score++; el.classList.add("ok"); fb.className = "fb ok"; fb.textContent = "Correct"; }
      else { weak.add(q.t); fb.className = "fb no"; fb.textContent = q.o ? "Right answer: " + q.o[q.c] : "Answer: " + fmt(q.a) + (q.unit === "%" ? "%" : ""); }
      el.querySelector(".sol").hidden = false;
    });
    const pct = score / E.length, C = 2 * Math.PI * 50;
    const res = $(`<div class="work result"><svg class="ring" viewBox="0 0 120 120"><circle class="bgc" cx="60" cy="60" r="50"/><circle class="fg" cx="60" cy="60" r="50" stroke-dasharray="${C}" stroke-dashoffset="${C}"/><text x="60" y="60">${Math.round(pct * 100)}%</text></svg>
      <div><p><b>${score} of ${E.length} correct.</b></p><p>${weak.size ? "Go back over: " + [...weak].sort((a, b) => a - b).map(n => `<a href="#t${n}">${n}. ${F[n - 1].title}</a>`).join(", ") + "." : "Every answer right. Read All formulas once more and get some sleep."}</p></div></div>`);
    top.replaceWith(res);
    res.querySelectorAll("a").forEach(a => a.onclick = (e) => { e.preventDefault(); go(a.getAttribute("href").slice(1)); });
    requestAnimationFrame(() => requestAnimationFrame(() => res.querySelector(".fg").style.strokeDashoffset = C * (1 - pct)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  top.querySelector("button").onclick = mark;
}

go((location.hash || "").slice(1) || "start");
