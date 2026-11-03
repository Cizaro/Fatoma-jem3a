// Renders the course from formulas.js, solved.js and questions.js.
// Views (hash): start · t1..t15 (lessons) · solved-t1.. · practice-t1.. · all · exam
const F = window.FORMULAS, S = window.SOLVED, Q = window.QUESTIONS;
const $ = (h) => { const d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstElementChild; };
const frac = (s) => s.replace(/\{([^{}|]+)\|([^{}]+)\}/g, '<span class="fr"><span>$1</span><span>$2</span></span>');
const fmt = (x) => Number(x).toLocaleString("en-US", { maximumFractionDigits: 4 });
const short = (i) => F[i].title.split(/[:(]/)[0].trim();
const ids = F.map((t, i) => "t" + (i + 1));
const sections = [
  { id: "start", label: "Start here" },
  { id: "lesson", label: "Lessons", first: "t1" },
  { id: "solved", label: "Solved questions", first: "solved-t1" },
  { id: "practice", label: "Practice", first: "practice-t1" },
  { id: "all", label: "All formulas" },
  { id: "exam", label: "Mock exam" }
];
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
// A few rows of the z-table around z, with a pointer to the full table in Lesson 14.
const zPart = (z) => window.ZTABLE.html(z, Math.max(0, Math.floor(z * 10) / 10 - 0.2), Math.floor(z * 10) / 10 + 0.2)
  .replace("</figure>", `<p class="zhow"><a href="#t14" data-go="t14">See the full z-table in Lesson 14</a></p></figure>`);
const answerText =(q) => q.o ? q.o[q.c] : fmt(q.a) + (q.unit === "%" ? "%" : q.unit ? " " + q.unit : "");

function progress() {
  const n = Object.keys(solved).length;
  document.getElementById("prog").style.width = (n / total * 100) + "%";
  document.getElementById("count").textContent = `${n} / ${total} practice solved`;
}

// "solved-t5" → { sec: "solved", i: 4 }
function route(hash) {
  if (/^t\d+$/.test(hash) && ids.includes(hash)) return { sec: "lesson", i: ids.indexOf(hash) };
  const m = /^(solved|practice)(?:-(t\d+))?$/.exec(hash);
  if (m) return { sec: m[1], i: Math.max(0, ids.indexOf(m[2] || "t1")) };
  if (hash === "all" || hash === "exam") return { sec: hash };
  return { sec: "start" };
}
const hashFor = (sec, i) => sec === "lesson" ? ids[i] : sec === "solved" || sec === "practice" ? `${sec}-${ids[i]}` : sec;

function nav(sec) {
  const n = document.getElementById("nav"); n.innerHTML = "";
  sections.forEach(v => {
    const b = $(`<button type="button" class="${v.id === "exam" ? "exam" : ""}">${v.label}</button>`);
    b.setAttribute("aria-current", v.id === sec);
    b.onclick = () => go(v.first || v.id);
    n.append(b);
  });
}

// Chapter picker inside Lessons, Solved questions and Practice.
function chips(sec, cur) {
  const name = { lesson: "Lessons", solved: "Solved questions", practice: "Practice" }[sec];
  const c = $(`<div class="chips" role="navigation" aria-label="Chapters"><span class="lbl">${name} · pick a chapter</span><div class="grid"></div></div>`);
  F.forEach((t, i) => {
    const b = $(`<button type="button" title="${i + 1}. ${t.title}" aria-label="Chapter ${i + 1}: ${t.title}">${i + 1}</button>`);
    if (sec === "practice" && topicDone(ids[i])) b.classList.add("done");
    b.setAttribute("aria-current", i === cur);
    b.onclick = () => go(hashFor(sec, i));
    c.querySelector(".grid").append(b);
  });
  return c;
}

function pager(sec, i) {
  const nx = $(`<div class="next"></div>`);
  if (i > 0) { const b = $(`<button class="btn ghost" type="button">← ${i}. ${short(i - 1)}</button>`); b.onclick = () => go(hashFor(sec, i - 1)); nx.append(b); } else nx.append($("<span></span>"));
  if (i < F.length - 1) { const b = $(`<button class="btn" type="button">${i + 2}. ${short(i + 1)} →</button>`); b.onclick = () => go(hashFor(sec, i + 1)); nx.append(b); }
  else { const b = $(`<button class="btn coral" type="button">Mock exam →</button>`); b.onclick = () => go("exam"); nx.append(b); }
  return nx;
}

// Links from one chapter to the same chapter in the other two sections.
function jump(sec, i) {
  const r = $(`<div class="row jump"></div>`);
  [["lesson", "Lesson"], ["solved", "Solved questions"], ["practice", "Practice"]].filter(x => x[0] !== sec).forEach(([s, l]) => {
    const b = $(`<button class="btn ghost" type="button">${l} for chapter ${i + 1}</button>`); b.onclick = () => go(hashFor(s, i)); r.append(b);
  });
  return r;
}

let clock = null;
function go(hash) {
  const r = route(hash);
  clearInterval(clock);
  try { history.replaceState(null, "", "#" + hashFor(r.sec, r.i)); } catch (e) {}
  nav(r.sec); progress();
  const m = document.getElementById("main"); m.innerHTML = "";
  if (r.sec === "lesson" || r.sec === "solved" || r.sec === "practice") m.append(chips(r.sec, r.i));
  ({ start, lesson, solvedView, practice, all, exam })[{ solved: "solvedView" }[r.sec] || r.sec](m, r.i);
  [...m.children].forEach((c, k) => c.style.setProperty("--i", k));
  m.querySelectorAll("a[data-go]").forEach(a => a.onclick = (e) => { e.preventDefault(); go(a.dataset.go); });
  window.scrollTo(0, 0);
}

const table = (t) => `<div class="sheet"><table>${t.formulas.map(f => `<tr><td class="n">${f[0]}</td><td class="f">${frac(f[1])}</td><td class="m">${f[2]}</td></tr>`).join("")}</table></div>`;
const steps = (s, hidden) => `<ol class="steps sol"${hidden ? " hidden" : ""}>${s.map(x => `<li>${x}</li>`).join("")}</ol>`;

// One practice question: number box or choice buttons, with Check and Show answer.
function question(q, label, onRight) {
  const el = $(`<div class="pq"><div class="n">${label}</div><div>${q.q}</div></div>`);
  // In practice the table's reading line ("area to the right = …") is the answer, so it moves into the hidden solution.
  const zHow = q.z != null ? /<p class="zhow">Row[\s\S]*?<\/p>/.exec(zPart(q.z))[0] : "";
  if (q.z != null) el.append($(zPart(q.z).replace(zHow, "")));
  const fb = $(`<span class="fb" aria-live="polite"></span>`);
  const sol = $(`<div class="sol" hidden><p class="answer">Answer: <b>${answerText(q)}</b></p>${zHow}${steps(q.s)}</div>`);
  const ok = () => { el.classList.add("ok"); el.classList.remove("no"); onRight(); };
  const no = () => { el.classList.remove("no"); void el.offsetWidth; el.classList.add("no"); };
  const show = $(`<button class="btn ghost" type="button">Show answer</button>`);
  show.onclick = () => {
    sol.hidden = !sol.hidden; show.textContent = sol.hidden ? "Show answer" : "Hide answer";
    if (q.o) el.querySelectorAll(".opt").forEach((b, k) => b.classList.toggle("right", !sol.hidden && k === q.c));
  };
  if (q.o) {
    const opts = $(`<div class="opts"></div>`);
    q.o.forEach((o, k) => {
      const b = $(`<button type="button" class="opt">${o}</button>`);
      b.onclick = () => {
        opts.querySelectorAll(".opt").forEach(x => x.classList.remove("right", "wrong"));
        if (k === q.c) { b.classList.add("right"); fb.className = "fb ok"; fb.textContent = "Correct."; ok(); }
        else { b.classList.add("wrong"); fb.className = "fb no"; fb.textContent = "Not this one. Try another."; no(); }
      };
      opts.append(b);
    });
    const row = $(`<div class="row"></div>`); row.append(show, fb);
    el.append(opts, row);
  } else {
    const row = $(`<div class="row"><input type="text" inputmode="decimal" autocomplete="off" aria-label="Your answer"><span class="unit">${q.unit || ""}</span><button class="btn" type="button">Check</button></div>`);
    const inp = row.querySelector("input"), chk = row.querySelector("button");
    inp.id = "a-" + label.replace(/\W+/g, "-");
    const check = () => {
      if (!inp.value.trim()) { fb.className = "fb no"; fb.textContent = "Type a number first."; return; }
      if (right(inp.value, q)) { fb.className = "fb ok"; fb.textContent = "Correct."; ok(); }
      else { fb.className = "fb no"; fb.textContent = "Not yet. Try again or show the answer."; no(); }
    };
    chk.onclick = check; inp.onkeydown = e => { if (e.key === "Enter") check(); };
    row.append(show, fb); el.append(row);
  }
  el.append(sol);
  return el;
}

function start(m) {
  const nS = ids.reduce((n, id) => n + S[id].length, 0);
  m.append($(`<section><h2>Every formula she needs, <em>in her order</em></h2>
    <p class="lede">Everything here comes from her 15 lecture files. For each chapter: read the <b>lesson</b>, study the <b>solved questions</b>, then try the <b>practice</b>. The <b>mock exam</b> puts it all together.</p></section>`));
  m.append($(`<div class="stats"><div class="stat"><b>${F.length}</b><span>chapters</span></div><div class="stat"><b>${nS}</b><span>solved questions</span></div><div class="stat"><b>${total}</b><span>practice questions</span></div><div class="stat"><b>${Q.exam.length}</b><span>exam questions</span></div></div>`));
  const s = $(`<section><h3>The chapters, in order</h3><div class="plan"></div></section>`), p = s.querySelector(".plan");
  F.forEach((t, i) => {
    const b = $(`<div class="chap ${topicDone(ids[i]) ? "done" : ""}"><span class="i">${topicDone(ids[i]) ? "✓" : i + 1}</span><span class="t">${t.title}</span>
      <span class="links"><button type="button">Lesson</button><button type="button">Solved</button><button type="button">Practice</button></span></div>`);
    const [a, bb, c] = b.querySelectorAll("button");
    a.onclick = () => go(ids[i]); bb.onclick = () => go("solved-" + ids[i]); c.onclick = () => go("practice-" + ids[i]);
    b.style.setProperty("--i", i); p.append(b);
  });
  m.append(s);
}

function lesson(m, i) {
  const t = F[i];
  m.append($(`<section><p class="meta">Chapter ${i + 1} of ${F.length} · file: ${t.file}</p><h2>${t.title}</h2><p class="lede">${t.what}</p></section>`));
  m.append($(`<section><h3>Formulas</h3>${table(t)}</section>`));
  if (t.example) m.append($(`<section><h3>Example from her file</h3><div class="work"><div class="q">${t.example.q}</div>${steps(t.example.s)}</div></section>`));
  if (t.example && t.example.z != null) m.append($(`<section><h3>The z-table</h3><p>Find the row with the first decimal of z, then the column with the second decimal. The highlighted cell is the value used in the example.</p>${window.ZTABLE.html(t.example.z)}</section>`));
  m.append($(`<div class="trap"><strong>Remember</strong>${t.remember}</div>`));
  m.append(jump("lesson", i), pager("lesson", i));
}

function solvedView(m, i) {
  m.append($(`<section><p class="meta">Chapter ${i + 1} of ${F.length} · solved questions</p><h2>${F[i].title}</h2><p class="lede">Read each question, try it in your head, then read the solution and the answer.</p></section>`));
  const s = $(`<section></section>`);
  S[ids[i]].forEach((x, k) => s.append($(`<div class="work"><div class="n meta">Solved question ${k + 1}</div><div class="q">${x.q}</div>${x.z != null ? zPart(x.z) : ""}${steps(x.s)}<p class="answer">Answer: <b>${x.a}</b></p></div>`)));
  m.append(s, jump("solved", i), pager("solved", i));
}

function practice(m, i) {
  const id = ids[i];
  m.append($(`<section><p class="meta">Chapter ${i + 1} of ${F.length} · practice</p><h2>${F[i].title}</h2><p class="lede">Answer each question, then press Check. Stuck? Press Show answer to see the answer and how to get it.</p></section>`));
  const ps = $(`<section></section>`);
  (Q.practice[id] || []).forEach((q, k) => ps.append(question(q, `Question ${k + 1}`, () => {
    if (solved[id + "-" + k]) return;
    solved[id + "-" + k] = 1; save(); progress();
    if (topicDone(id)) document.querySelectorAll(".chips button")[i].classList.add("done");
  })));
  m.append(ps, jump("practice", i), pager("practice", i));
}

function all(m) {
  m.append($(`<section><h2>All formulas</h2><p class="lede">The whole course on one page, in her order. The same sheet as the PDF, for the last read before the exam.</p></section>`));
  F.forEach((t, i) => m.append($(`<section class="topic"><p class="meta">${i + 1} · ${t.file}</p><h4>${t.title}</h4><p>${t.what}</p>${table(t)}</section>`)));
}

function exam(m) {
  const E = Q.exam;
  m.append($(`<section><h2>Mock exam</h2><p class="lede">${E.length} questions using her formulas with new numbers, mixed like a real paper. Answer as many as you can, then press <b>Mark my answers</b> at any time. Every question gets marked, and the right answer appears under each one, even the ones you left empty.</p></section>`));
  const top = $(`<div class="bar"><span class="timer">60:00</span><button class="btn coral" type="button">Mark my answers</button></div>`);
  m.append(top);
  const list = $(`<section></section>`), picks = [];
  const boxes = E.map((q, k) => {
    const el = $(`<div class="pq"><div class="n">Q${k + 1} · chapter ${q.t}: ${short(q.t - 1)}</div><div>${q.q}</div></div>`);
    if (q.o) {
      const opts = $(`<div class="opts"></div>`);
      q.o.forEach((o, j) => {
        const b = $(`<button type="button" class="opt">${o}</button>`);
        b.onclick = () => { if (el.dataset.marked) return; picks[k] = j; opts.querySelectorAll(".opt").forEach(x => x.classList.toggle("sel", x === b)); };
        opts.append(b);
      });
      el.append(opts);
    } else el.append($(`<div class="row"><input type="text" inputmode="decimal" autocomplete="off" id="ex-${k}" aria-label="Answer to question ${k + 1}"><span class="unit">${q.unit || ""}</span></div>`));
    el.append($(`<span class="fb"></span>`), $(`<div class="sol" hidden><p class="answer">Answer: <b>${answerText(q)}</b></p>${steps(q.s)}</div>`));
    list.append(el); return el;
  });
  m.append(list);
  const bottom = $(`<div class="row"><button class="btn coral" type="button">Mark my answers</button></div>`);
  m.append(bottom);
  let left = 60 * 60; const t = top.querySelector(".timer");
  clock = setInterval(() => {
    left = Math.max(0, left - 1);
    t.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
    t.classList.toggle("low", left < 300);
    if (!left) mark();
  }, 1000);
  function mark() {
    clearInterval(clock);
    let score = 0, blank = 0; const weak = new Set();
    boxes.forEach((el, k) => {
      const q = E[k], fb = el.querySelector(".fb"); el.dataset.marked = 1;
      let good, empty;
      if (q.o) {
        empty = picks[k] === undefined; good = picks[k] === q.c;
        el.querySelectorAll(".opt").forEach((b, j) => { if (j === q.c) b.classList.add("right"); else if (j === picks[k]) b.classList.add("wrong"); });
      } else {
        const inp = el.querySelector("input"); inp.readOnly = true;
        empty = !inp.value.trim(); good = !empty && right(inp.value, q);
        inp.classList.add(good ? "good" : "bad");
      }
      if (good) { score++; el.classList.add("ok"); fb.className = "fb ok"; fb.textContent = "Correct"; }
      else { weak.add(q.t); if (empty) blank++; el.classList.add("miss"); fb.className = "fb no"; fb.textContent = empty ? "Not answered" : "Wrong"; }
      el.querySelector(".sol").hidden = false;
    });
    const pct = score / E.length, C = 2 * Math.PI * 50;
    const res = $(`<div class="work result"><svg class="ring" viewBox="0 0 120 120"><circle class="bgc" cx="60" cy="60" r="50"/><circle class="fg" cx="60" cy="60" r="50" stroke-dasharray="${C}" stroke-dashoffset="${C}"/><text x="60" y="60">${Math.round(pct * 100)}%</text></svg>
      <div><p><b>${score} of ${E.length} correct</b>${blank ? `, ${blank} not answered` : ""}. The right answer and the solution are shown under every question.</p>
      <p>${weak.size ? "Go back over: " + [...weak].sort((a, b) => a - b).map(n => `<a href="#solved-t${n}">${n}. ${F[n - 1].title}</a>`).join(", ") + "." : "Every answer right. Read All formulas once more and get some sleep."}</p>
      <p><button class="btn ghost" type="button">Take the exam again</button></p></div></div>`);
    top.replaceWith(res); bottom.remove();
    res.querySelectorAll("a").forEach(a => a.onclick = (e) => { e.preventDefault(); go(a.getAttribute("href").slice(1)); });
    res.querySelector("button").onclick = () => go("exam");
    requestAnimationFrame(() => requestAnimationFrame(() => res.querySelector(".fg").style.strokeDashoffset = C * (1 - pct)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  top.querySelector("button").onclick = mark;
  bottom.querySelector("button").onclick = mark;
}

go((location.hash || "").slice(1) || "start");
