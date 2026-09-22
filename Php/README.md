# PHP from Zero — Fatima's Course

Welcome! This folder is your full PHP course. You don't need to know anything before starting.

It follows your textbook — **Web Development Full Stack** (Cengage) — so the work you do here
is the work your exam will ask about:

| Your textbook | This folder |
|---|---|
| Ch. 8–9 — CMS & WordPress | background reading, see `resources/youtube.md` |
| **Ch. 10 — Dynamic Webpages with PHP** | **lessons 0–8** |
| **Ch. 11 — Database Basics with MySQL** | **lesson 9** |
| **Ch. 12 — Dynamic Webpage with a MySQL Database** | **lesson 10 + project 3** |

---

## The map

Open **[`roadmap.html`](roadmap.html)** in your browser — 26 steps from A to Z, with tick-boxes
that remember how far you've got. There's also a version that renders on GitHub:
[`../ROADMAP.md`](../ROADMAP.md).

---

## How to use this folder

Every lesson folder has three things:

| File | What it is |
|---|---|
| `lesson.md` | Read this first. Explanation in simple words. |
| `examples.php` | Code you **run** to see the idea working. |
| `exercises.php` | Code **you** write. It has TODOs waiting for you. |

**The rule:** read → run the example → do the exercise → play the game → take the quiz.

---

## The road

| # | Folder | What you learn | Time |
|---|---|---|---|
| 0 | `00-setup/` | Run your first PHP file | 20 min |
| 1 | `01-basics/` | `echo`, variables, comments | 45 min |
| 2 | `02-datatypes/` | string, int, float, bool, string functions | 45 min |
| 3 | `03-operators/` | maths, comparison, AND / OR | 45 min |
| 4 | `04-conditions/` | `if`, `else`, `switch` | 1 h |
| 5 | `05-loops/` | `for`, `while`, `foreach` | 1 h |
| 6 | `06-arrays/` | lists and key→value data | 1 h |
| 7 | `07-functions/` | making your own commands | 1 h |
| 8 | `08-forms/` | HTML form → PHP (the real web part) | 1 h |
| 9 | `09-mysql/` | databases, SQL, connecting PHP to MySQL | 1.5 h |
| 10 | `10-dynamic-page/` | a complete database-driven website | 1.5 h |

Then `projects/` — three real mini apps you build yourself.

---

## Fun stuff (do these — they're not optional 🙂)

Full details in [`games/README.md`](games/README.md).

| | | |
|---|---|---|
| 🕹 **[games/php-arcade.html](games/php-arcade.html)** | double-click | 6 games, 133 questions, XP, levels and 8 badges |
| 🗝 **[games/php-quest.php](games/php-quest.php)** | needs server | escape room — 7 doors, 7 puzzles, keys to collect |
| 🎯 **[games/guess-number.php](games/guess-number.php)** | needs server | find the number in 7 guesses. Teaches sessions. |
| 💀 **[games/hangman.php](games/hangman.php)** | needs server | programming words, written in PHP |
| 🃏 **[flashcards.html](flashcards.html)** | double-click | 102 cards, 6 decks, the ones you miss come back |
| ⏱ **[exam-simulator.html](exam-simulator.html)** | double-click | the final exam on a 90-minute clock, marked for you |

**Quizzes** — `quizzes/` has three sizes: a 5-minute **mini-quiz after every lesson**, a bigger
**unit quiz** every few lessons, and a **final exam** for revision week. Every one of them ends
with a hidden *"Check your answers"* section you click open once you've finished.
Start with `quizzes/quiz-00-intro.md` — it has no code in it at all.

**[`exam-simulator.html`](exam-simulator.html)** is that final exam as a real mock: a clock that
doesn't pause, sections A and B marked automatically, and C, D and E marked by you against the
actual marking scheme, one criterion at a time. It ends with the list of questions you lost
marks on and which lesson each one came from. Do the paper version with your instructor first —
the simulator is for the second run, on your own, during revision week.

Every `lesson.md` also ends with **💡 Did you know**, **🎮 Play with it** and a
**🏆 Boss challenge** — the fun bits. Don't skip them; they're where it sticks.

## Extra

- `resources/cheatsheet.md` — every bit of syntax on one page. **Print this.**
- `resources/common-errors.md` — when PHP shouts at you, look here first.
- `resources/youtube.md` — a video for every lesson, in English and in Arabic.

---

## How to run your code

**For lessons 1–7** (terminal — the fast way):

```bash
php 01-basics/examples.php
```

**For lessons 8–10 and the games** (you need a server). From inside this `Php` folder:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000/08-forms/form.php` in your browser.
Keep the terminal open while you work; `Ctrl + C` stops the server.

> Using XAMPP instead (like at uni)? Same thing — put this folder in `xampp/htdocs/`,
> press Start on Apache and MySQL, then open `http://localhost/Php/`.
> Full instructions in `00-setup/SETUP.md`.

---

### Before you start

You *will* get errors. Everyone does — one missing `;` breaks the whole page, and that is
normal, not a sign you're bad at this. Read the line number, go to that line, fix it, run again.
That loop **is** programming. Nobody types it perfectly the first time, not even people who've
done it for twenty years.

One lesson at a time. Don't rush. 💪
