/* ============================================================
   Builds the Session 0A slide deck.

   The deck is deliberately unfinished. Slides carry the words
   that must be exact (definitions, the lecturer's conventions,
   the operators) and leave the thinking parts blank, because
   those get drawn live over Zoom's annotate tool while she
   watches. A finished slide is something to read; a slide being
   drawn on is something to follow.

   Run:  npm install pptxgenjs
         node scripts/build-deck-0a.js
   Out:  Php/resources/session-0A-algorithms.pptx
   ============================================================ */
const path = require("path");
const pptxgen = require("pptxgenjs");

/* the course palette, same values as Php/app/app.css */
const INK = "15181C", PAPER = "FFFFFF", SOFT = "F7F6F3";
const TEAL = "0F7B6C", TEALSOFT = "E3F1EE";
const WARM = "B5541F", WARMSOFT = "FBEDE4";
const GOLD = "A57C1B";
const MUTE = "5C6168", FAINT = "8D939B", LINE = "E2DFD8";

const HEAD = "Cambria", BODY = "Calibri", MONO = "Courier New";
const M = 0.55;                       // page margin
const W = 10, H = 5.625;              // LAYOUT_16x9

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Ahmad";
pres.title = "Session 0A - Algorithms";

/* ---------- small builders ---------- */

// every light slide opens the same way: kicker, then title
function head(s, kicker, title, opts = {}) {
  s.addText(kicker, {
    x: M, y: 0.36, w: 6, h: 0.22, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.6,
    color: opts.kickerColor || WARM
  });
  s.addText(title, {
    x: M, y: 0.62, w: opts.tw || 8.9, h: opts.h || 0.72, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: opts.size || 32, bold: true,
    color: opts.color || INK
  });
}

// the motif: a filled rounded chip holding a number or symbol
function chip(s, x, y, label, fill, textColor) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w: 0.42, h: 0.42, rectRadius: 0.1, fill: { color: fill }
  });
  s.addText(label, {
    x, y, w: 0.42, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: textColor || "FFFFFF",
    align: "center", valign: "middle"
  });
}

// a plain content card
function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: fill || SOFT }, line: { color: LINE, width: 1 }
  });
}

// the dashed zone that says "this part gets drawn live"
function drawHere(s, x, y, w, h, label) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: PAPER }, line: { color: WARM, width: 1.25, dashType: "dash" }
  });
  s.addText(label, {
    x, y: y + h - 0.34, w, h: 0.26, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 10.5, italic: true, color: WARM, align: "center"
  });
}

function body(s, text, x, y, w, h, opts = {}) {
  s.addText(text, {
    x, y, w, h, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: opts.size || 14.5, color: opts.color || MUTE,
    lineSpacing: opts.lineSpacing || 21, align: opts.align || "left",
    bold: opts.bold || false, italic: opts.italic || false
  });
}

function code(s, lines, x, y, w, h, opts = {}) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06, fill: { color: opts.dark ? INK : SOFT },
    line: { color: opts.dark ? INK : LINE, width: 1 }
  });
  s.addText(lines.join("\n"), {
    x: x + 0.22, y: y + 0.16, w: w - 0.44, h: h - 0.32, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: opts.size || 13,
    color: opts.dark ? "F2F1EE" : INK, lineSpacing: opts.lineSpacing || 20
  });
}

function light() { const s = pres.addSlide(); s.background = { color: PAPER }; return s; }
function dark()  { const s = pres.addSlide(); s.background = { color: INK }; return s; }

/* ============================================================
   1 - title
   ============================================================ */
let s = dark();
s.addText("MIT320  ·  LESSON 1  ·  SESSION 0A", {
  x: M, y: 1.5, w: 8, h: 0.26, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12, bold: true, charSpacing: 2.2, color: "4FC2AE"
});
s.addText("Algorithms", {
  x: M, y: 1.84, w: 8.5, h: 0.95, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 54, bold: true, color: "FFFFFF"
});
s.addText("Flowcharts, pseudocode — and no code at all today.", {
  x: M, y: 2.86, w: 7.4, h: 0.4, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 17, color: "A3A9B2"
});
s.addShape(pres.ShapeType.roundRect, {
  x: M, y: 3.62, w: 2.2, h: 0.38, rectRadius: 0.19, fill: { color: "1F2A2E" }
});
s.addText("60 minutes", {
  x: M, y: 3.62, w: 2.2, h: 0.38, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12, color: "4FC2AE", align: "center", valign: "middle"
});
s.addNotes("Open with: \"Today we write no code at all. That is deliberate - it is how your lecturer starts, and it is the easiest part of the exam.\" Editor closed. Pen and paper at both ends.");

/* ============================================================
   2 - why no code
   ============================================================ */
s = light();
head(s, "WHY TODAY LOOKS DIFFERENT", "You design it before you type it");
body(s, "Every programmer who skips this step writes code that works and solves the wrong problem. Your lecturer starts here for a reason.",
     M, 1.62, 4.6, 1.0);
const whyRows = [
  ["It is her Lesson 1", "Straight out of the MIT320 deck, not from the textbook."],
  ["It is the cheapest marks", "A flowchart cannot fail to compile."],
  ["It makes lesson 5 easy", "Tracing Euclid today is tracing a loop later."]
];
whyRows.forEach(([t, d], i) => {
  const y = 2.78 + i * 0.78;
  chip(s, M, y, String(i + 1), TEAL);
  s.addText(t, { x: M + 0.6, y: y - 0.02, w: 4.0, h: 0.26, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: INK });
  s.addText(d, { x: M + 0.6, y: y + 0.24, w: 4.0, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, color: MUTE });
});
card(s, 5.6, 1.62, 3.85, 3.35, TEALSOFT);
s.addText("“A program built on a wrong design is wrong no matter how neatly it is typed.”", {
  x: 5.95, y: 2.25, w: 3.15, h: 1.55, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 19, italic: true, color: TEAL, lineSpacing: 27
});
s.addText("Coding is phase 4 of 6.", {
  x: 5.95, y: 3.95, w: 3.15, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12.5, bold: true, color: TEAL
});
s.addNotes("Do not rush this slide. The reason she will resist a no-code lesson is that it feels like not starting. Name that, then move.");

/* ============================================================
   3 - what an algorithm is
   ============================================================ */
s = light();
head(s, "DEFINITION — WRITE THIS ONE DOWN",
     "A step-by-step procedure for solving a problem", { size: 28, h: 1.0 });
card(s, M, 1.68, 4.5, 2.9, SOFT);
["boil the water", "add the tea", "wait 3 minutes"].forEach((t, i) => {
  const y = 3.72 - i * 0.62;
  s.addShape(pres.ShapeType.roundRect, {
    x: M + 0.35 + i * 0.22, y, w: 2.5, h: 0.5, rectRadius: 0.06,
    fill: { color: PAPER }, line: { color: INK, width: 1.3 }
  });
  s.addText(String(i + 1), { x: M + 0.5 + i * 0.22, y, w: 0.3, h: 0.5, isTextBox: true,
    margin: 0, fontFace: MONO, fontSize: 12, color: FAINT, valign: "middle" });
  s.addText(t, { x: M + 0.85 + i * 0.22, y, w: 1.9, h: 0.5, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13, color: INK, valign: "middle" });
});
s.addText("in order  ·  it stops  ·  it gives an answer", {
  x: M, y: 4.28, w: 4.5, h: 0.26, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, color: FAINT, align: "center"
});
drawHere(s, 5.45, 1.68, 4.0, 2.9, "ask her for one, and draw it here");
s.addText("Her turn", { x: 5.75, y: 1.95, w: 3.4, h: 0.3, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 18, bold: true, color: INK });
s.addText("“Give me an algorithm you already follow every morning.”\n\nWrite her steps on the board in a second colour. They are her words, so keep them looking like hers.", {
  x: 5.75, y: 2.36, w: 3.4, h: 1.6, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12.5, color: MUTE, lineSpacing: 18
});
s.addNotes("Draw the stack live rather than reading it. Then hand her the pen: her own morning routine, numbered. Getting her drawing in the first ten minutes sets the tone for all eleven sessions.");

/* ============================================================
   4 - three rules
   ============================================================ */
s = light();
head(s, "THE TEST", "Three things, or it is not an algorithm");
const rules = [
  ["Data", "You give it something. Two numbers, four marks, a word."],
  ["A result", "It tells you something back. Answering nothing does not count."],
  ["An end", "It stops, after a finite number of steps."]
];
rules.forEach(([t, d], i) => {
  const x = M + i * 3.05;
  card(s, x, 1.75, 2.8, 1.85, SOFT);
  chip(s, x + 0.3, 2.05, String(i + 1), i === 2 ? WARM : TEAL);
  s.addText(t, { x: x + 0.3, y: 2.6, w: 2.2, h: 0.32, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 19, bold: true, color: INK });
  s.addText(d, { x: x + 0.3, y: 2.95, w: 2.25, h: 0.6, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, color: MUTE, lineSpacing: 16 });
});
card(s, M, 3.92, 8.9, 0.95, WARMSOFT);
s.addText("A loop where nothing ever changes is not a slow algorithm. It is not an algorithm at all.", {
  x: M + 0.35, y: 4.12, w: 8.2, h: 0.55, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 17, italic: true, color: WARM, valign: "middle"
});
s.addNotes("Ask: \"Is a recipe an algorithm? Why?\" Let her argue it out loud - all three rules fall out of the answer on their own.");

/* ============================================================
   5 - PDLC
   ============================================================ */
s = light();
head(s, "EXPECT THIS AS A WRITTEN QUESTION", "The Program Development Life Cycle");
const phases = [
  ["Problem definition", "say what it must solve"],
  ["Problem analysis", "inputs, processes, outputs"],
  ["Algorithm development", "flowcharts live here"],
  ["Coding", "and documentation"],
  ["Testing and debugging", "run it, find the bugs"],
  ["Maintenance", "keep fixing it after launch"]
];
phases.forEach(([t, d], i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = M + col * 3.05, y = 1.72 + row * 1.32;
  const on = i === 3;
  card(s, x, y, 2.8, 1.12, on ? WARMSOFT : SOFT);
  chip(s, x + 0.25, y + 0.2, String(i + 1), on ? WARM : TEAL);
  s.addText(t, { x: x + 0.78, y: y + 0.19, w: 1.9, h: 0.46, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, color: INK, lineSpacing: 15 });
  s.addText(d, { x: x + 0.25, y: y + 0.72, w: 2.3, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, color: MUTE });
});
s.addText("Coding is phase 4 of 6. Most of the job happens before you type, and a good chunk after you think you have finished.", {
  x: M, y: 4.55, w: 8.9, h: 0.4, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13.5, bold: true, color: WARM
});
s.addNotes("Read them in order, then circle number 4 with the annotate pen and ask: \"where do flowcharts live?\" Answer: phase 3.");

/* ============================================================
   5b - the program development cycle, and the two kinds of error
   ============================================================ */
s = light();
head(s, "THE LOOP INSIDE THE LIFE CYCLE", "The program development cycle");
["Design the program", "Write the code", "Correct the syntax errors",
 "Test the program", "Correct the logic errors"].forEach((t, i) => {
  const y = 1.72 + i * 0.52;
  chip(s, M, y, String(i + 1), i === 2 || i === 4 ? WARM : TEAL);
  s.addText(t, { x: M + 0.62, y, w: 3.6, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14.5, color: INK, valign: "middle" });
});
card(s, 5.1, 1.72, 4.35, 1.28, SOFT);
s.addText("Syntax error", { x: 5.42, y: 1.92, w: 3.7, h: 0.28, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.3, color: TEAL });
s.addText("PHP cannot read what you typed. It refuses to run, and tells you the line.",
  { x: 5.42, y: 2.24, w: 3.7, h: 0.62, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, color: MUTE, lineSpacing: 17 });
card(s, 5.1, 3.12, 4.35, 1.45, WARMSOFT);
s.addText("Logic error", { x: 5.42, y: 3.32, w: 3.7, h: 0.28, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.3, color: WARM });
s.addText("PHP understood you perfectly and did exactly what you said, which was not what you meant. Nothing warns you.",
  { x: 5.42, y: 3.64, w: 3.7, h: 0.82, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, color: INK, lineSpacing: 17 });
s.addText("Writing >= 60 when you meant > 60 is a logic error. The only way to find it is to test with exactly 60.",
  { x: M, y: 4.62, w: 8.9, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, italic: true, color: FAINT });
s.addNotes("Ask her which kind of error is worse. The answer is the logic one, because the computer never tells you about it. That is the whole argument for testing.");

/* ============================================================
   5c - an algorithm does not have to be about numbers
   ============================================================ */
s = light();
head(s, "HER LECTURER'S THIRD EXAMPLE", "An algorithm need not be about numbers");
s.addText("Write an algorithm to log in to your school email account.", {
  x: M, y: 1.66, w: 8.9, h: 0.35, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 18, italic: true, color: WARM
});
code(s, [
  "1.  Go to the school website",
  "2.  Click the Office 365 for Students and Teachers link",
  "3.  Enter the email ID and the password",
  "4.  Click Sign in"
], M, 2.16, 5.6, 1.7);
card(s, 6.5, 2.16, 2.95, 1.7, SOFT);
s.addText("The trap", { x: 6.8, y: 2.38, w: 2.4, h: 0.28, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.3, color: WARM });
s.addText("Being too vague. “Log in” is one step to a person and nine to a computer.", {
  x: 6.8, y: 2.72, w: 2.4, h: 0.95, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12.5, color: MUTE, lineSpacing: 17 });
s.addText("Four steps, in order, each one a single action, and it stops. That is a complete and correct answer, with no maths anywhere in it.", {
  x: M, y: 4.08, w: 8.9, h: 0.45, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: MUTE, lineSpacing: 19 });
s.addNotes("Give her a different everyday task and make her do it live: making tea, or withdrawing money from an ATM. Then follow her steps literally and pedantically until it breaks.");

/* ============================================================
   6 - plain english
   ============================================================ */
s = light();
head(s, "FIRST WAY TO WRITE ONE", "Plain English, one thing per line");
code(s, [
  "1.  Initialize sum to 0",
  "2.  Enter the two numbers",
  "3.  Add them, store in sum",
  "4.  Print sum"
], M, 1.72, 4.7, 1.9);
s.addText("Four lines, each doing exactly one thing, in order. That is a complete algorithm.", {
  x: M, y: 3.8, w: 4.7, h: 0.5, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: MUTE, lineSpacing: 18
});
card(s, 5.55, 1.72, 3.9, 2.9, SOFT);
s.addText("The only verbs you need", {
  x: 5.85, y: 1.95, w: 3.3, h: 0.3, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 16, bold: true, color: INK
});
[["in / out / store", "read, write, compute, set"],
 ["maths", "add, subtract, multiply, divide"],
 ["compare", "equal to, less than, greater than"],
 ["control", "repeat for, while, if, halt, exit"]].forEach(([k, v], i) => {
  const y = 2.4 + i * 0.55;
  s.addText(k, { x: 5.85, y, w: 3.3, h: 0.22, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1, color: TEAL });
  s.addText(v, { x: 5.85, y: y + 0.22, w: 3.3, h: 0.3, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 10.5, color: INK });
});
s.addNotes("Keep the verb list visible for the rest of the session. Every time she writes a wordy line, point at it.");

/* ============================================================
   7 - pseudocode conventions
   ============================================================ */
s = light();
head(s, "USE HER LECTURER'S NOTATION", "Pseudocode is fake code");
body(s, "No syntax rules, so it cannot give a syntax error. Never compiled, never run. Translates into any language afterwards.",
     M, 1.62, 8.9, 0.5, { size: 13.5 });
const conv = [
  ["The algorithm has a name", "Algorithm GCD"],
  ["Comments in square brackets", "[returns the greatest common divisor]"],
  ["Variables in CAPITALS", "GRADE, M1, X"],
  ["Assignment is a left arrow", "GRADE <-- (M1+M2+M3+M4)/4"],
  ["Decisions", "if-then, if-then-else, endif"],
  ["Repetition", "Repeat, for, while, until"]
];
conv.forEach(([k, v], i) => {
  const y = 2.32 + i * 0.44;
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: 8.9, h: 0.38, rectRadius: 0.05,
    fill: { color: i % 2 ? PAPER : SOFT }, line: { color: LINE, width: 0.75 }
  });
  s.addText(k, { x: M + 0.22, y, w: 3.4, h: 0.38, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, color: MUTE, valign: "middle" });
  s.addText(v, { x: M + 3.75, y, w: 4.9, h: 0.38, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 12, color: i === 3 ? WARM : INK,
    bold: i === 3, valign: "middle" });
});
s.addNotes("These are what the marker is reading. Writing correct logic in the wrong notation still loses marks.");

/* ============================================================
   8 - the arrow trap
   ============================================================ */
s = light();
head(s, "THE MOST COMMON LOST MARK", "The arrow, and the two equals signs");
card(s, M, 1.75, 4.25, 2.35, SOFT);
s.addText("In pseudocode", { x: M + 0.35, y: 2.0, w: 3.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.4, color: FAINT });
s.addText("<--", { x: M + 0.35, y: 2.38, w: 1.1, h: 0.42, isTextBox: true, margin: 0,
  fontFace: MONO, fontSize: 24, bold: true, color: WARM });
s.addText("puts a value in", { x: M + 1.5, y: 2.45, w: 2.4, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: INK });
s.addText("=", { x: M + 0.35, y: 3.0, w: 1.1, h: 0.42, isTextBox: true, margin: 0,
  fontFace: MONO, fontSize: 24, bold: true, color: TEAL });
s.addText("asks a question", { x: M + 1.5, y: 3.07, w: 2.4, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: INK });

card(s, 5.2, 1.75, 4.25, 2.35, WARMSOFT);
s.addText("In PHP — they swap", { x: 5.55, y: 2.0, w: 3.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.4, color: WARM });
s.addText("=", { x: 5.55, y: 2.38, w: 1.1, h: 0.42, isTextBox: true, margin: 0,
  fontFace: MONO, fontSize: 24, bold: true, color: WARM });
s.addText("puts a value in", { x: 6.7, y: 2.45, w: 2.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: INK });
s.addText("==", { x: 5.55, y: 3.0, w: 1.1, h: 0.42, isTextBox: true, margin: 0,
  fontFace: MONO, fontSize: 24, bold: true, color: TEAL });
s.addText("asks a question", { x: 6.7, y: 3.07, w: 2.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: INK });

s.addText("Same two jobs, different symbols in each language. Mixing them up is the single most common mark lost on this topic — and the bug she will spend longest on in session 4.", {
  x: M, y: 4.32, w: 8.9, h: 0.6, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: MUTE, lineSpacing: 18
});
s.addNotes("Slow right down here. Say it, write it, then ask her to say it back in her own words before moving on.");

/* ============================================================
   9 - flowchart symbols
   ============================================================ */
s = light();
head(s, "FIVE SHAPES, THAT IS ALL", "The flowchart alphabet");
const sy = 2.0, sh = 0.78;
s.addShape(pres.ShapeType.roundRect, { x: M, y: sy, w: 1.5, h: sh, rectRadius: 0.39,
  fill: { color: PAPER }, line: { color: INK, width: 1.4 } });
s.addText("Start / Stop", { x: M, y: sy, w: 1.5, h: sh, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, color: INK, align: "center", valign: "middle" });

s.addShape(pres.ShapeType.flowChartInputOutput, { x: 2.3, y: sy, w: 1.6, h: sh,
  fill: { color: PAPER }, line: { color: INK, width: 1.4 } });
s.addText("Input / Print", { x: 2.3, y: sy, w: 1.6, h: sh, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, color: INK, align: "center", valign: "middle" });

s.addShape(pres.ShapeType.rect, { x: 4.4, y: sy, w: 1.5, h: sh,
  fill: { color: PAPER }, line: { color: INK, width: 1.4 } });
s.addText("Do a step", { x: 4.4, y: sy, w: 1.5, h: sh, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, color: INK, align: "center", valign: "middle" });

s.addShape(pres.ShapeType.flowChartDecision, { x: 6.4, y: sy - 0.22, w: 1.9, h: 1.22,
  fill: { color: WARMSOFT }, line: { color: WARM, width: 1.4 } });
s.addText("A > B ?", { x: 6.4, y: sy - 0.22, w: 1.9, h: 1.22, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, color: INK, align: "center", valign: "middle" });

s.addShape(pres.ShapeType.line, { x: 8.55, y: sy + sh / 2, w: 0.9, h: 0,
  line: { color: MUTE, width: 1.6, endArrowType: "triangle" } });

["oval", "parallelogram", "rectangle", "diamond", "flow line"].forEach((t, i) => {
  const x = [M, 2.3, 4.4, 6.4, 8.5][i], w = [1.5, 1.6, 1.5, 1.9, 1.0][i];
  s.addText(t, { x, y: 3.18, w, h: 0.24, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 10.5, color: FAINT, align: "center" });
});
card(s, M, 3.72, 8.9, 1.1, SOFT);
s.addText("Two rules that cost marks", { x: M + 0.35, y: 3.9, w: 4, h: 0.28, isTextBox: true,
  margin: 0, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.3, color: WARM });
s.addText("1.  It must have a Start AND a Stop.          2.  Every step must connect — nothing left hanging.", {
  x: M + 0.35, y: 4.22, w: 8.2, h: 0.32, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13.5, color: INK });
s.addNotes("Draw each shape by hand as you name it, even though it is on the slide. The hand movement is what makes the shape stick.");

/* ============================================================
   10 - the decision, drawn live
   ============================================================ */
s = light();
head(s, "DRAW THIS ONE TOGETHER", "A decision has exactly two ways out");
s.addShape(pres.ShapeType.flowChartDecision, { x: 3.9, y: 1.62, w: 2.2, h: 1.1,
  fill: { color: WARMSOFT }, line: { color: WARM, width: 1.5 } });
s.addText("is A > B ?", { x: 3.9, y: 1.62, w: 2.2, h: 1.1, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, color: INK, align: "center", valign: "middle" });
drawHere(s, 1.15, 3.22, 2.7, 1.25, "yes  —  draw it");
drawHere(s, 6.15, 3.22, 2.7, 1.25, "no  —  draw it");
s.addText("Only one side ever runs.", {
  x: M, y: 4.72, w: 4.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 15, italic: true, color: MUTE
});
s.addNotes("Do NOT fill the boxes in. Ask her what goes in each one, draw her answer with the annotate pen, then show the matching pseudocode on the next slide.");

/* ============================================================
   11 - relational operators
   ============================================================ */
s = light();
head(s, "WHAT A DIAMOND IS ALLOWED TO ASK", "Relational operators");
const ops = [[">", "greater than", ">"], ["<", "less than", "<"],
             ["=", "equal to", "== "], [">=", "greater or equal", ">="],
             ["<=", "less or equal", "<="], ["!=", "not equal", "!="]];
s.addText("PSEUDOCODE", { x: M + 0.22, y: 1.72, w: 1.8, h: 0.24, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.3, color: FAINT });
s.addText("MEANS", { x: M + 2.3, y: 1.72, w: 2.5, h: 0.24, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.3, color: FAINT });
s.addText("IN PHP", { x: M + 6.0, y: 1.72, w: 2.0, h: 0.24, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.3, color: FAINT });
ops.forEach(([a, b2, c], i) => {
  const y = 2.04 + i * 0.44, hot = i === 2;
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: 8.9, h: 0.38, rectRadius: 0.05,
    fill: { color: hot ? WARMSOFT : (i % 2 ? PAPER : SOFT) },
    line: { color: hot ? WARM : LINE, width: hot ? 1.2 : 0.75 }
  });
  s.addText(a, { x: M + 0.22, y, w: 1.8, h: 0.38, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 13, bold: true, color: INK, valign: "middle" });
  s.addText(b2, { x: M + 2.3, y, w: 3.5, h: 0.38, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, color: MUTE, valign: "middle" });
  s.addText(c, { x: M + 6.0, y, w: 2.0, h: 0.38, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 13, bold: true, color: hot ? WARM : INK, valign: "middle" });
});
s.addText("The middle row is the trap. Pseudocode = becomes PHP ==.", {
  x: M, y: 4.78, w: 8.9, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, bold: true, color: WARM
});
s.addNotes("Circle the middle row live. It is the same point as the arrow slide, said a second way - repetition here is deliberate.");

/* ============================================================
   12 - Euclid
   ============================================================ */
s = light();
head(s, "IN HER SLIDES THREE TIMES OVER — EXPECT IT", "Euclid's algorithm, roughly 300 BC");
code(s, [
  "Algorithm GCD  [greatest common divisor of two positives]",
  "",
  "1. Read : A, B",
  "2. X <-- A,  Y <-- B",
  "3. Repeat steps 4 to 5 while (X != Y)",
  "4. if X > Y then X <-- X - Y",
  "5. if Y > X then Y <-- Y - X",
  "6. Write : \"Greatest common divisor: \", X",
  "7. Exit"
], M, 1.7, 5.7, 2.75, { dark: true, size: 11.5, lineSpacing: 17 });
card(s, 6.5, 1.7, 2.95, 2.75, TEALSOFT);
s.addText("The whole idea", { x: 6.8, y: 1.95, w: 2.4, h: 0.28, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11, bold: true, charSpacing: 1.3, color: TEAL });
s.addText("Keep subtracting the smaller from the larger until they are equal.\n\nThat value is the answer.", {
  x: 6.8, y: 2.32, w: 2.4, h: 1.5, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 15, italic: true, color: TEAL, lineSpacing: 21
});
s.addText("Still what your computer uses to reduce a fraction. Two thousand years, and nobody found better.", {
  x: M, y: 4.62, w: 8.9, h: 0.4, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12.5, italic: true, color: FAINT
});
s.addNotes("Read the pseudocode out loud line by line. Do not trace it yet - the next slide is hers.");

/* ============================================================
   13 - the empty trace table
   ============================================================ */
s = light();
head(s, "HER TURN — YOU WRITE NOTHING", "Trace GCD(48, 18)");
s.addText("X", { x: 1.5, y: 1.72, w: 1.2, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, bold: true, color: FAINT, align: "center" });
s.addText("Y", { x: 3.0, y: 1.72, w: 1.2, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, bold: true, color: FAINT, align: "center" });
s.addText("what happened", { x: 4.6, y: 1.72, w: 2.6, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, bold: true, color: FAINT });
for (let i = 0; i < 5; i++) {
  const y = 2.12 + i * 0.5;
  s.addShape(pres.ShapeType.roundRect, { x: 1.5, y, w: 1.2, h: 0.42, rectRadius: 0.05,
    fill: { color: PAPER }, line: { color: LINE, width: 1 } });
  s.addShape(pres.ShapeType.roundRect, { x: 3.0, y, w: 1.2, h: 0.42, rectRadius: 0.05,
    fill: { color: PAPER }, line: { color: LINE, width: 1 } });
  s.addShape(pres.ShapeType.line, { x: 4.6, y: y + 0.42, w: 3.9, h: 0,
    line: { color: LINE, width: 1 } });
  if (i === 0) {
    s.addText("48", { x: 1.5, y, w: 1.2, h: 0.42, isTextBox: true, margin: 0,
      fontFace: MONO, fontSize: 14, color: FAINT, align: "center", valign: "middle" });
    s.addText("18", { x: 3.0, y, w: 1.2, h: 0.42, isTextBox: true, margin: 0,
      fontFace: MONO, fontSize: 14, color: FAINT, align: "center", valign: "middle" });
  }
}
s.addText("She fills every row, out loud, with the annotate pen.\nYou say nothing until she stops.", {
  x: M, y: 4.72, w: 8.9, h: 0.55, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 13, italic: true, color: WARM, lineSpacing: 18
});
s.addNotes("This is the most important five minutes of the session. Silence. If she stalls, ask \"which one is bigger?\" and nothing else. Answer is 6.");

/* ============================================================
   14 - pseudocode to PHP
   ============================================================ */
s = light();
head(s, "WHY THIS LESSON IS IN A PHP COURSE", "Line for line, the design becomes the code");
s.addText("PSEUDOCODE", { x: M + 0.2, y: 1.7, w: 3, h: 0.26, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1.3, color: FAINT });
s.addText("PHP", { x: 5.2, y: 1.7, w: 3, h: 0.26, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1.3, color: FAINT });
const pairs = [
  ["Input M1, M2, M3, M4", "$m1 = 15; $m2 = 12; ..."],
  ["GRADE <-- (M1+...+M4)/4", "$grade = ($m1 + ... ) / 4;"],
  ["if (GRADE < 60) then", "if ($grade < 60) {"],
  ["Print \"FAIL\"", "echo \"FAIL\";"],
  ["else", "} else {"],
  ["Print \"PASS\"", "echo \"PASS\";"],
  ["endif", "}"]
];
pairs.forEach(([a, b2], i) => {
  const y = 2.04 + i * 0.4;
  s.addShape(pres.ShapeType.roundRect, { x: M, y, w: 4.35, h: 0.34, rectRadius: 0.04,
    fill: { color: i % 2 ? PAPER : SOFT }, line: { color: LINE, width: 0.7 } });
  s.addShape(pres.ShapeType.roundRect, { x: 5.1, y, w: 4.35, h: 0.34, rectRadius: 0.04,
    fill: { color: i % 2 ? PAPER : SOFT }, line: { color: LINE, width: 0.7 } });
  s.addText(a, { x: M + 0.2, y, w: 4.0, h: 0.34, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 11, color: INK, valign: "middle" });
  s.addText(b2, { x: 5.3, y, w: 4.0, h: 0.34, isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 11, color: TEAL, valign: "middle" });
});
s.addText("Every pseudocode line became exactly one PHP line. The hard thinking was already done — typing it was mechanical.", {
  x: M, y: 4.92, w: 8.9, h: 0.35, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 12.5, color: MUTE
});
s.addNotes("This is the payoff slide. Say plainly: \"this is what a good algorithm buys you.\" Then mention the 60 vs 10 pass mark difference between her lecturer and our material.");

/* ============================================================
   15 - close
   ============================================================ */
s = dark();
s.addText("BEFORE NEXT TIME", {
  x: M, y: 1.15, w: 6, h: 0.26, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, bold: true, charSpacing: 2, color: "4FC2AE"
});
s.addText("Homework", {
  x: M, y: 1.46, w: 6, h: 0.65, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 38, bold: true, color: "FFFFFF"
});
[["1", "exercises.php", "Her lecturer's own five questions. Nothing is solved for you."],
 ["2", "The tea algorithm", "Write every step. Then make someone follow it exactly, doing nothing you did not write."],
 ["3", "One silly flowchart", "Anything with a decision in it. Proper start, proper stop."]
].forEach(([n, t, d], i) => {
  const y = 2.42 + i * 0.78;
  s.addShape(pres.ShapeType.roundRect, { x: M, y, w: 0.42, h: 0.42, rectRadius: 0.1,
    fill: { color: "1F2A2E" } });
  s.addText(n, { x: M, y, w: 0.42, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: "4FC2AE",
    align: "center", valign: "middle" });
  s.addText(t, { x: M + 0.62, y: y - 0.02, w: 3.2, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: "FFFFFF" });
  s.addText(d, { x: M + 0.62, y: y + 0.25, w: 5.2, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11.5, color: "A3A9B2", lineSpacing: 15 });
});
s.addText("“If you can trace Euclid by hand, you can trace a loop.\nThat is the whole of lesson 5.”", {
  x: 6.35, y: 2.6, w: 3.1, h: 1.3, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 16, italic: true, color: "4FC2AE", lineSpacing: 23
});
s.addNotes("End on something she got right today, by name. Then stop - do not add one more thing.");

/* ---------- write ---------- */
const out = path.join(__dirname, "..", "Php", "resources", "session-0A-algorithms.pptx");
pres.writeFile({ fileName: out }).then(f => console.log("wrote " + f));
