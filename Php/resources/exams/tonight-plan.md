# Tonight — the plan

Partial I is tomorrow at 12:30, and she has an exam in **another subject**
as well. So tonight is split, and this is built around the slice PHP
actually gets — not around covering everything.

**Give PHP 45 minutes. That is the plan.** It covers **38 of the 50 marks**.
There is a 90-minute version below if PHP turns out to be the weaker of the
two, and a 10-minute pass in the morning either way.

## Splitting the evening between two subjects

- **Do the subject she is weaker at first**, while she is fresh — not the one
  she enjoys.
- **One block each, with a real break between them.** Two subjects
  interleaved is how both get half-learned.
- **Finish on the subject sat first tomorrow.** Whatever is revised last
  sits nearest the surface.
- **Sleep beats the last hour.** Going to bed at a sane time is worth more
  marks than a fourth pass over either subject, and she has two papers to
  stay sharp for.
- If the other subject is heavy memorisation and PHP is not, give PHP the
  **45**, not the 90. PHP's 38 marks come from a skeleton and twelve facts —
  it rewards a short sharp block far better than a long one.

---

## The one decision that matters

| Section | Marks | How predictable | Minutes to spend |
|---|---|---|---|
| **4** — pseudocode, flowchart, PHP | **20** | **very** — same three deliverables every time | **35** |
| 1 — multiple choice | 10 | high — pure recall | 15 |
| 2 — true / false | 8 | high — pure recall | 10 |
| 3 — tracing | 12 | medium — needs practice | 25 |

**Section 4 is 40% of the paper and the most predictable thing on it.** The
scenario changes; the shape of the answer never does. One skeleton, learned
properly, can be bent to any question he sets. Start there while she is fresh.

---

## What to SKIP tonight

Say these out loud so she stops worrying about them. **None of them is in
any of her three decks:**

- `define()`, `const`, constants
- `var_dump()`
- `foreach`, and arrays generally
- `switch`
- `empty()`, `(bool)` casting
- `strlen()` and the string functions (except `strpos`, which he does show)
- MySQL, databases, sessions, cookies
- the PHP 8 change to `.` and `+` precedence

Also skip: **the Euclid GCD trace.** It is in Lesson 01 three times over, so
it is tempting — but it is long, and Section 4 is a *web* scenario per the
announcement, not GCD. Know what it *is* (greatest common divisor, by
repeated subtraction). Do not drill it.

---

## The 45 minutes — this is the one to actually do

- **0:00 – 0:25 · Section 4 skeleton**, written from blank on paper, then
  checked against the answer. Not read — **written**. *(20 marks)*
- **0:25 – 0:40 · The twelve facts**, out loud, twice. *(18 marks)*
- **0:40 – 0:45 · The five sentences.**

**38 of 50 marks.** Section 3 tracing is the one to drop: it is the section
that weeks of practice improve and a late night does not.

Detail for each block is in the 90-minute version below — use the same
blocks, just shorter.

---

## 90 minutes — only if PHP is the weaker subject

### 0:00 – 0:35 · Section 4, the skeleton *(20 marks)*

Not reading. **Writing, from blank, on paper.**

1. **(5 min)** Read the skeleton on the revision page once.
2. **(15 min)** Write it out from memory — pseudocode, flowchart, PHP — for
   this prompt: *five student names and five marks, print each one's name,
   mark and PASS/FAIL (pass is 60), and say who is highest and lowest.*
3. **(10 min)** Check it against the answer. Mark it honestly.
4. **(5 min)** Write out **only the parts she got wrong**, again.

If she can produce the skeleton from blank, Section 4 is safe. If she cannot,
nothing else tonight matters as much — stay here.

### 0:35 – 0:50 · Section 1 drill *(10 marks)*

Flashcards or straight questioning, out loud, fast. Twelve facts:

1. PHP runs **on the server**, before the HTML reaches the browser.
2. PHP = **Hypertext Preprocessor**. Interpreted, no compilation.
3. Valid name: `$` then a **letter or underscore**. `$2php` ✗ `$bad-punc` ✗ `abc` ✗
4. **Case matters.** `$Name` ≠ `$name`.
5. The **dot joins**. The plus adds. `10 . 5` → `105`, `10 + 5` → `15`.
6. **Division always makes a float.** `56 / 12` → `4.666…`
7. `(int) 9.9` → **9**. It chops, it does not round.
8. `==` converts then compares. `===` compares **value and type**.
9. `do…while` is the **one-trip** loop. `while` is **zero-trip**.
10. `break` ends the loop. `continue` ends only **this pass**.
11. Comments: `//`, `#`, `/* */`. **Not** `<!-- -->` — that is HTML.
12. `"A" . FALSE . "B"` → **AB**. `"X" . TRUE . "Y"` → **X1Y**.

### 0:50 – 1:00 · Section 2 drill *(8 marks)*

Same twelve facts, asked as true/false. He writes TF from the same material
as MCQ — if she has the twelve, she has both sections. 18 marks for 25
minutes of talking.

### 1:00 – 1:25 · Section 3, tracing *(12 marks)*

**Question 3 on the questions page.** She writes the output. You check it.

Then one rule, which is the whole section: **trace with a table, never in
your head.** A column per variable, a row per pass. Every mark lost in
Section 3 is lost by someone who tried to hold it in their head.

### 1:25 – 1:30 · The five sentences

Read these out. Nothing else.

- Write the **`$`** on every variable.
- Join with the **dot**. The plus will quietly turn her words into numbers.
- In an `if`, **`==` asks a question. A single `=` puts a value in and is
  always true.**
- Every flowchart needs a **START and a STOP**, and **nothing left hanging**.
- Heading rows and `<table>` go **outside** the loop. Only `<tr>` goes inside.

---

## Tomorrow morning — 10 minutes, no more

1. Read the **twelve facts** once. *(3 min)*
2. Write the **Section 4 PHP skeleton** from blank, once, on paper. *(5 min)*
3. Read the **five sentences**. *(2 min)*

Then stop. Nothing new on the morning of an exam — it displaces what is
already in there.

---

## In the hall

**Order to answer in: 1 → 2 → 4 → 3.**

Do Section 4 *third*, not last. It is 20 marks and needs the most time; if
the clock beats her it must not be the thing left unwritten. Tracing is the
one to leave till the end, because a half-traced answer can still score.

Within Section 4: **pseudocode first, then flowchart, then code.** The
flowchart is just the pseudocode drawn, and the code is just the pseudocode
typed. Doing them in that order means thinking once, writing three times.

- 12 minutes on Sections 1 and 2.
- 25 minutes on Section 4.
- 17 minutes on Section 3.
- 6 minutes to check: every `$` present, every flowchart has START and STOP,
  every brace closed.

If she blanks on Section 4, **write the pseudocode anyway**. It is 5 of the
20 marks and it needs no PHP at all.

---

## And the one warning

Lesson 03 teaches `"sam" + 25` giving **25**. On PHP 8.2 that is a fatal
error — but **he is marking from the slide**. If it appears, write **25**.
