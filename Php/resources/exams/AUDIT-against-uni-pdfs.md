# Mock exam: audit against her university's own PDFs

Ahmad asked for two things, in this order:

1. Section 4's model answer is wrong — it prints a partial table on bad input.
2. **Every question must come only from the PDFs her university gave her.**

This file records the audit so the rewrite can be done in one pass. The
rewrite itself has **not** been applied — the paper and the key are still
the versions in git, so nothing is half-changed.

## The corpus

All four PDFs were extracted and read in full (the PDFs themselves are
gitignored — the repo is a public site and the decks are hers).

| Deck | Pages | What it actually contains |
|---|---|---|
| Lesson 01 — Introduction to Algorithms | 20 | PDLC's six phases · algorithm / flowchart / pseudocode definitions · Euclid's GCD · his pseudocode conventions (name, `[comments]`, CAPITALS, `<--`, `+ - * / < > = !=`) · the five flowchart symbols · "must have a start and stop", "all steps must connect" · if-then-else-endif · relational operators · **Example 1** add 10 and 20 · **Example 2** a student's grade = average of four marks, below 60 = FAIL else PASS · **Example 3** log in to email · **loop example** the sum of five numbers · 5 exercises |
| Lesson 02 — PHP Installation | 22 | PHP = Hypertext Preprocessor · Rasmus Lerdorf, 1994/95 · PHP 8.2 · interpreted, server-side, embedded in HTML · XAMPP = Apache + MySQL + PHP + Perl · `C:\xampp\htdocs` · localhost 127.0.0.1 · Apache as a daemon · PHP internals: Core, Extension layer, Zend Engine · VS Code |
| Lesson 03 — Introduction to PHP | 48 | variable naming (his own bad examples: `abc = 12`, `$2php`, `$bad-punc`) · missing `$` → parse error · single vs double quotes · comments `//` `/* */` `#` · `echo` vs `print` · `"15" + 27` → 42 · operators of note · `$x = 12; $y = 15 + $x++;` → x is 13, y is 27 · concatenation is `.` not `+` · ternary · `.=` · casting (`56/12`, `"100"+36.25+TRUE`, `(int) 9.9 - 1`, `"sam"+25`, `"sam".25`) · `"A".FALSE."B"` → AB · equality vs identity · `strpos` · if / elseif / else · while (zero-trip) · do-while (one-trip) · for · break · continue · the circle-area exercise |
| PHP Problems — Set I | 3 | the five problem scenarios already on the practice page |

## What is NOT in any of them

`var_dump` · `(bool)` casting · `empty()` · `foreach` · arrays beyond one
trivial `array("x" => "Hello")` · `switch` · `is_numeric` · `number_format`
· `strlen` · **PHPDoc** · the PHP 8 change to `.` and `+` precedence.

PHPDoc is the one exception worth keeping: it is absent from the decks but
the **exam announcement demands it by name**, and the announcement is uni
material too.

## Question-by-question verdict

| Q | Topic | Verdict | Where it comes from / what to replace it with |
|---|---|---|---|
| 1 | where PHP runs | **keep** | L02: "server-side scripting language" |
| 2 | valid variable name | **keep** | L03 p8 — the wrong options are his own `$2php`, `$bad-punc`, `abc` |
| 3 | `echo 10 . 5` | **keep** | L03 p27 `"100" . 25` → 10025 |
| 4 | PHP 8 precedence `"Total: " . 5 + 3` | **replace** | not in any deck → use L03 p27 `echo "100" + 25;` → `125` |
| 5 | `var_dump((int) "12abc")` | **replace** | `var_dump` not in decks → use L03 p26 `echo (int) 9.9 - 1;` → `8` |
| 6 | which comparison is TRUE | **replace** | use his own p29 line: `FALSE == "0"` is the true one |
| 7 | `7 / 2` | **keep** | L03 p26 "division forces operands to be floating point" |
| 8 | do-while runs once | **keep** | L03 p39 "a one-trip loop" |
| 9 | `continue` | **keep** | L03 p43 |
| 10 | valid comment | **keep** | L03 p14 |
| 11 | every variable starts `$` | **keep** | L03 p8 |
| 12 | `$Name` vs `$name` | **keep** | L03 p8 "Case matters" |
| 13 | `===` compares type too | **keep** | L03 p19 "Identity" |
| 14 | `"5" === 5` | **keep** | L03 p29 |
| 15 | `+` joins strings | **keep** | L03 p22, stated outright |
| 16 | `(bool) "0.0"` | **replace** | → L03 p28 `echo "X".TRUE."Y";` prints `X1Y` (TRUE) |
| 17 | `empty("0")` | **replace** | → see the PHP 8 warning below before using `"sam" + 25` |
| 18 | `foreach` by reference | **replace** | → L03 p9 writing `y = $x + 5;` with no `$` is a parse error (TRUE) |
| 19 | `var_dump` ==/=== | **replace** | same idea in his style: `if (123 == "123") print ...` |
| 20 | break + continue | **keep** | L03 p42 and p43 |
| 21 | do-while one trip | **keep** | L03 p39 |
| 22 | `.=` **and `strlen`** | **trim** | keep `.=` (p24), drop `strlen`; pair it with `"A".FALSE."B"` (p28) |
| 23 | `foreach` over an array | **replace** | → a counted `for` summing 1..5 — L01's "sum of five numbers" + L03 p40 |
| 24 | `$x++` vs `++$x` | **keep** | L03 p20, almost his exact snippet |
| 25 | the three faults | **keep** | all three are his: missing `;`, `=` vs `==` (p33), `+` vs `.` (p22) |

**Verified by running them** on PHP 8.2.12: `10 . 5` → `105`; `"100" + 25` →
`125`; `(int) 9.9 - 1` → `8`; `56 / 12` → `float(4.666666666666667)`;
`"X".TRUE."Y"` → `X1Y`; `"A".FALSE."B"` → `AB`; of the four comparisons only
`FALSE == "0"` is true.

## ⚠ His slide is out of date, and it matters

Lesson 03 p26 and p27 both teach:

```php
$f = "sam" + 25;   // his slides say this gives 25
```

**On PHP 8.2 that is a fatal error:**

```
PHP Fatal error: Uncaught TypeError: Unsupported operand types: string + int
```

It gave `25` in PHP 7. His own Lesson 02 deck says the class is on **PHP 8.2**,
so the slide and the installed interpreter disagree. Two consequences:

- **Do not** build a question on `"sam" + 25`. Whichever answer she gives can
  be argued wrong.
- **Do** tell her about it before the exam. If it appears on the paper, the
  answer he is marking from is `25`.

The same caution applies to `"15" + 27` → `42` (p17) and
`"100" + 36.25 + TRUE` → `137.25` (p26): those still work, because every
operand converts cleanly. It is only the non-numeric string that now throws.

## Section 4

Ahmad asked for it simplified: five student names, five marks, each one's
grade, and who is highest and lowest. Grounding that in the decks means
using **his** rule, not invented letter grades:

- **Example 2 (L01 p15–16)** — a student's grade, **below 60 = FAIL, else PASS**
- **the loop example (L01 p18)** — the sum of five numbers
- **Exercise 2 (L01 p20)** — find the largest of two numbers

So: *a teacher types five student names and five marks out of 100, presses
Show results, and the page prints each student's name, mark and PASS/FAIL,
and marks who scored highest and who lowest.* Marks out of 100 with 60 as the
pass, because that is his rule. A/B/C/D/F letter grades appear nowhere in any
deck and should go.

**This still forces the two-loop shape**, which is the point: you cannot say
who came top until you have read the last mark.

## The bug Ahmad found, and its fix

The old model answer validated *inside* the printing loop, so a bad mark left
a half-drawn table on the screen — the one thing the question says must not
happen. Confirmed by running it: marks `18, 16, 9, abc, 10` printed three rows
*and then* the error. Two more faults alongside it:

- `return;` in the error branch abandons the rest of the page, so the closing
  HTML never printed.
- `$_POST["mark3"]` was read before `isset`, so a missing box produced
  `Warning: Undefined array key`.

The fix is **two loops**: the first reads, validates and compares while
printing nothing; the second prints. Verified across all valid orderings plus
empty boxes, missing boxes, out-of-range marks, all-equal marks and a mark of
zero. This fix must land in `mock-exam-answers.md`, in
`Php/app/partial-1-data.js` (q26, q27, q28 and `STARTER`), and in the two
built PDFs.

## What is left to do

1. Apply the twelve replacements above to `mock-exam.md` and `mock-exam-answers.md`.
2. Rewrite Section 4 to the PASS/FAIL form, in both files.
3. Mirror all of it into `Php/app/partial-1-data.js` — the brief, q19–q28,
   their criteria, and `STARTER`.
4. `python scripts/build-mock-exam.py` and `python scripts/build-lessons.py`.
5. Rebuild and republish the artifact.
6. Add a provenance line to the top of the paper saying the questions are
   written to his announced structure from his own slides — not a past paper.
