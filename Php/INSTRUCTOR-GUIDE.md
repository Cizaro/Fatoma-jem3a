# Instructor Guide (for you, not for her)

PHP 8.2 CLI is already installed on this machine, so lessons 1–7 run with `php file.php` —
no XAMPP needed. Lessons 8–10 need a server: `php -S localhost:8000` from the `Php` folder,
or XAMPP if you want her on the same setup as her uni lab.

## Her course context

Textbook: **Web Development Full Stack** (Cengage). The chapters that matter:

- Ch. 10 — Building Dynamic Webpages with PHP → our lessons 0–8
- Ch. 11 — Database Basics with MySQL → our lesson 9
- Ch. 12 — Building a Dynamic Webpage with a MySQL Database → our lesson 10 + project 3

Chapters 8–9 (CMS, WordPress) come *before* PHP in her book. Worth one sentence in session 1:
**WordPress is written in PHP** — so what she's learning is what's under the hood of the CMS
chapters. That connection makes the whole course feel less random, and it's a likely exam question.

---

## Zoom session plan — 10 sessions, ~60–75 min

Same shape every time:

1. **Warm-up (5 min)** — she runs last week's exercise and explains one line out loud.
2. **Video (0–10 min)** — from `resources/youtube.md`, ideally watched *before* the call.
3. **You explain (15 min)** — share screen, walk through `lesson.md` + `examples.php`.
   **Type it live, don't paste.** Let her watch you make a typo and fix it — that's half the lesson.
4. **She drives (20 min)** — she shares her screen and does `exercises.php`.
   Stay quiet longer than feels comfortable. Hint, don't solve.
5. **Game (10 min)** — `games/php-arcade.html`, the round matching today's topic. Compete on score.
6. **Quiz (10 min)** — at the end of each unit. Go over wrong answers only.
7. **Homework (2 min)** — finish the exercises + next video.

## Session → material map

| Session | Lesson | Arcade round | Quiz |
|---|---|---|---|
| 1 | 00-setup + 01-basics | Match the words | — |
| 2 | 02-datatypes | Guess the output | quiz-01 |
| 3 | 03-operators | Guess the output | — |
| 4 | 04-conditions | Fix the bug | quiz-02 |
| 5 | 05-loops | Fill the blank + `guess-number.php` | — |
| 6 | 06-arrays | Fill the blank | — |
| 7 | 07-functions | Fix the bug + `hangman.php` | quiz-03 |
| 8 | 08-forms | — | — |
| 9 | 09-mysql | Match the words (web & database set) | — |
| 10 | 10-dynamic-page | — | quiz-04 + start project 3 |

Projects: 1 after session 7, 2 after session 8, 3 after session 10.

---

## Teaching notes that actually matter

- **Never fix her code by typing on her screen.** Say "line 12, look at the end of it."
  Let her find it. The finding is the skill.
- **Make her predict before running.** "What will this print?" → *then* run. The gap between
  her guess and the real output is where the learning happens. Every `examples.php` is built
  for this.
- **Errors are the lesson, not the interruption.** When she hits one, slow down and read it
  together: type, message, line number. Teach that habit in session 1 and session 5 gets much easier.
- **Praise something specific**, not "good job" — "nice, you used `foreach` instead of `for`,
  that's the right choice here."
- **End on a win.** Stopping early after something works beats pushing through to frustration.

## The predictable walls

| Where | What happens | What helps |
|---|---|---|
| L1 | single vs double quotes | show `'$name'` vs `"$name"` side by side, once |
| L4 | `=` vs `==` | it's in quiz-02 on purpose. Let her get it wrong, then explain. |
| L4 | wrong `elseif` order | give her grade 18 and let "Pass" print. The bug teaches it. |
| L5 | infinite loops | tell her about `Ctrl + C` *before* it happens, not after |
| **L6** | **arrays — the big one** | draw numbered boxes on a whiteboard before any code |
| L7 | scope, `echo` vs `return` | make her write `square()` and use the result in a calculation |
| L8 | double-clicking a .php file | she'll see raw code. Explain server vs file once, properly. |
| L9 | MySQL not started in XAMPP | first thing to check on every "connection failed" |

## If she gets frustrated

Drop to a smaller problem. If loops are breaking her, do `for ($i=1; $i<=3; $i++) echo $i;`
and *nothing else* until it clicks. Shrink the problem until she succeeds, then grow it again.

Frustration in week 5–6 is normal and not a sign she can't do this — arrays genuinely are the
hardest jump in the course. Say that out loud to her; it helps more than you'd think.

## Answers

`quizzes/answers/ANSWERS.md` — includes a marking guide and, more usefully, notes on *why*
each wrong answer is tempting. Keep it closed during the call.

**Don't advance past a failed loops or arrays quiz.** Everything after depends on them.
