# PROGRESS — read this first

**Last updated:** 2026-09-22 (fourth session)
**Update this file at the end of every session.** It is the handoff between machines and
between agent sessions. If it is stale, the next session wastes an hour re-deriving context.

---

## 1. The situation

I (the repo owner) am teaching my girlfriend **Fatima** her university web-development
material over **Zoom**. I explain, she shares her screen and writes the code herself.

- Her textbook: **Web Development Full Stack** (Cengage)
- Relevant chapters: 8 CMS overview · 9 WordPress security/themes/plug-ins ·
  **10 Dynamic Webpages with PHP** · **11 Database Basics with MySQL** ·
  **12 Dynamic Webpage with a MySQL Database**
- She is a **complete beginner**. No prior programming.
- Her uni lab uses **XAMPP** (Apache + MySQL + phpMyAdmin).

**Everything built here is aimed at her chapters**, so the practice matches her exam.

---

## 2. Current status

| | |
|---|---|
| **Phase** | PHP course material is fully built. Teaching has not started yet. |
| **Next action** | Run Zoom **Session 1** (setup + lesson 1) |
| **Blocked on** | nothing |

### Sessions delivered

*(add a row after every Zoom call — this is the single most useful thing for the next session)*

| # | Date | Covered | How it went | Homework given |
|---|---|---|---|---|
| — | — | *not started* | — | — |

---

## 3. What is already done ✅

The whole `Php/` folder — 83 files, every `.php` file passes `php -l`, examples verified by
actually running them.

```
Php/
├── README.md                 her entry point: the road, how to run things
├── INSTRUCTOR-GUIDE.md       MY guide: 10-session Zoom plan, teaching notes, the walls she'll hit
├── 00-setup/                 SETUP.md + hello.php
├── 01-basics/                echo, variables, comments
├── 02-datatypes/             string/int/float/bool, string functions
├── 03-operators/             maths, comparison, && ||, ternary
├── 04-conditions/            if / elseif / else / switch, truthiness
├── 05-loops/                 for, while, do-while, foreach, break/continue, nested
├── 06-arrays/                indexed, associative, multidimensional, array functions
├── 07-functions/             params, return, defaults, scope, type hints
├── 08-forms/                 $_POST/$_GET, validation, htmlspecialchars, register.php
├── 09-mysql/                 SQL, mysqli, prepared statements, school.sql, full CRUD page
├── 10-dynamic-page/          complete mini site: includes/, search, detail.php, admin.php
├── flashcards.html           102 cards, 6 decks, missed cards repeat until known twice
├── games/                    php-arcade.html (6 games, 133 questions, XP + 8 badges),
│                             php-quest.php (7-door escape room), guess-number.php,
│                             hangman.php, README.md hub
├── projects/                 3 projects with starter files and checklists
├── roadmap.html              interactive A-Z map, 26 steps, progress saved in localStorage
├── exam-simulator.html       the final exam, timed and self-marking (see the session log)
├── quizzes/                  20 files: quiz-00 intro, 10 mini-quizzes, 4 unit quizzes,
│                             final exam, README index, 3 answer keys
└── resources/                cheatsheet.md, common-errors.md, youtube.md
```

**Structure convention** — every lesson folder has exactly three files:

- `lesson.md` — the explanation, simple English, a "Watch out" table at the end
- `examples.php` — runnable, heavily commented, built for *"predict the output, then run"*
- `exercises.php` — numbered `TODO` comments, easy → challenge, nothing solved for her

`ROADMAP.md` at the repo root is the same 26-step map as a Mermaid diagram, which GitHub
renders inline.

**Three pages are published as private Claude Artifacts** so she can play on her phone:
- Arcade: https://claude.ai/artifact/JYBuyUAnizeyXzAT9tXMu2
- Roadmap: https://claude.ai/artifact/EDpJwwwvaoGwGHnjeAXdPb
- Flashcards: https://claude.ai/artifact/WDYShUSe2eV7Yu19XxYJZn

(Both are private — they have to be shared from each page's Share menu before she can open them.)

---

## 4. What's next 🎯

### Immediate — run the course

Follow the session map in `Php/INSTRUCTOR-GUIDE.md`. 10 sessions, ~60–75 min each.

Quiz cadence: a **mini-quiz at the end of every single call** (5 min, `quizzes/mini-quizzes/`),
a **unit quiz** after sessions 2, 4, 7 and 10, and the **final exam** during revision week.
`quizzes/quiz-00-intro.md` is a no-code warm-up for session 1. Projects after sessions 7, 8 and 10.

Each mini-quiz ends with a line saying whether to move on or redo something — follow it.

**Do not advance past a failed loops (L5) or arrays (L6) quiz.** Everything afterwards depends
on them, and pushing on makes lessons 8–10 collapse.

### Asked for but not built yet

*(nothing outstanding — the exam simulator was the last open request and it's built)*

### Ideas worth proposing when the time is right

- [ ] A one-page **visual diagram**: browser → request → server → PHP → MySQL → HTML → browser.
      She'll need this mental model for the exam, and it explains why `.php` files can't be
      double-clicked.
- [ ] **Flashcards** (spaced repetition) for the function names and SQL keywords.
- [ ] A **past-paper style mock exam** once we know the real exam format — ask her to send a
      past paper or the exam outline.

---

## 5. Advanced roadmap 🚀

Only after lesson 10 and project 3 are genuinely finished. Each phase is roughly 2–4 sessions.
**Do not start these early** — they are the reward for finishing the fundamentals, not a substitute.

### Phase A — make it a real application *(highest value, do this first)*

| Topic | Why it matters | Build |
|---|---|---|
| **Login system** | `password_hash()` / `password_verify()`, sessions, "who is logged in" | put a login in front of project 3's admin |
| **PDO** | the modern alternative to mysqli; her teacher may want it | port `09-mysql/` to a `pdo/` variant, side by side |
| **Table relationships** | `students` + `courses` + `enrollments`, `JOIN`, foreign keys | extend `school.sql` to 3 tables |
| **File uploads** | `$_FILES`, validating type and size, where to store | student photos in project 3 |
| **Pagination + sorting** | `LIMIT`/`OFFSET`, clickable column headers | project 3's list page |

### Phase B — write better code

| Topic | Build |
|---|---|
| **OOP**: classes, properties, methods, constructors, `$this` | rewrite the student CRUD as a `Student` class |
| **Separating concerns** | move all queries into `StudentRepository`, keep the pages dumb |
| **Exceptions**, `try/catch`, real error handling | replace every `die()` with something sane |
| **Composer + autoloading** | one small package, e.g. a dotenv loader |
| **Security pass** | CSRF tokens, session fixation, safe headers — audit project 3 together |

### Phase C — connect to the front end

| Topic | Build |
|---|---|
| **JSON API**: `json_encode`, proper status codes | `api/students.php` returning JSON |
| **fetch() from JavaScript** — no page reload | live search box on the list page |
| **A tiny JS layer** | delete a row without reloading |

### Phase D — ship it

| Topic | Build |
|---|---|
| **Git**, properly | she gets her own repo, commits her own project |
| **Deployment** | free host (InfinityFree / 000webhost) — her project live on a real URL |
| **Environment config** | `.env`, never commit credentials |

### The ordering rule

Every phase must produce **something she can click**. She learns from a working page, not from
a concept. If a topic can't be attached to a visible feature in project 3, push it back.

---

## 6. How to work in this repo (for the next agent)

**Read before editing:** `Php/README.md` (her view) and `Php/INSTRUCTOR-GUIDE.md` (his view).
Match the existing tone — simple English, short sentences, no jargon without explaining it,
a "Watch out" table of real beginner mistakes at the end of each lesson.

**House rules for the material:**

1. **Never solve the exercises.** `exercises.php` files contain TODOs only. If a solutions file
   is ever added, it goes in a separate folder that isn't linked from her README.
2. **Everything must actually run.** Run `php -l` on every PHP file you touch, and execute the
   examples before claiming they work.
3. **Modern PHP 8 only.** `mysqli_`/PDO, never `mysql_`. Prepared statements everywhere a user
   value touches SQL. `htmlspecialchars()` on every printed user value. These are taught as
   non-negotiable rules, so the material must never break them, not even in a quick demo.
4. **Comments explain *why*, not *what*.** She reads the comments as part of the lesson.
5. **Deliberate bugs are a teaching tool** — several examples contain intentional mistakes
   (wrong `elseif` order, infinite loop, `=` vs `==`). They are labelled as such. Don't "fix" them.
6. **Games and quizzes are part of the course**, not decoration. New topics should get a few
   arcade questions added to `games/php-arcade.html` (the question arrays are at the top of the
   `<script>`, with a comment showing the shape).

**Useful commands:**

```bash
php -l path/to/file.php                    # syntax check
php Php/01-basics/examples.php             # run a lesson
cd Php && php -S localhost:8000            # server for lessons 8-10 + games
find Php -name "*.php" -exec php -l {} \;  # lint everything
```

**Environment:** Windows 11, Git Bash available. **Both machines run XAMPP 8.2** — PHP 8.2.12,
MySQL and phpMyAdmin, the same stack as her uni lab. If `php` isn't on PATH on a machine it's at
`C:\xampp\php\php.exe`; add `C:\xampp\php` to PATH to get the short command.
No `gh` CLI installed — use plain `git` for pushes.

---

## 7. Session log

*(newest first — one short entry per working session, so the next agent knows what changed and why)*

### 2026-09-22 (fourth) — Exam simulator + the second machine is set up
- **New `Php/exam-simulator.html`** — `final-exam.md` as a real mock. 90-minute countdown that
  does **not** pause and auto-marks whatever exists at 0:00; answers and the remaining time are
  saved to localStorage as she types, so a closed tab isn't a lost attempt.
  - Section **A** auto-marked. Section **B** auto-matched against an `accept[]` list, normalised
    for case and whitespace (`" 2 4 6 "` → `246`), and **still shown at marking time** so a
    partial mark is possible — nothing is locked.
  - Sections **C/D/E** are self-marked one criterion at a time, the criteria lifted verbatim
    from `FINAL-EXAM-ANSWERS.md` (e.g. Q20's four marks = form `name`, `REQUEST_METHOD`, empty
    check, `htmlspecialchars`). Marking a whole answer "correct" in one click was deliberately
    not offered — per-criterion is what makes the self-marking honest.
  - Results: total, band, per-section bars, the weak-section **diagnosis** from the answer key,
    and a revision list naming each lost question and its lesson folder. Past attempts kept
    (last 12) so the two runs can be compared.
- **The question text is duplicated** between `final-exam.md` and the simulator. There is no
  build step — if you edit one, edit the other. Both files now say so at the top.
- Linked from `Php/README.md`, `quizzes/README.md`, `final-exam.md`, the flashcards footer and
  the roadmap footer. `INSTRUCTOR-GUIDE.md` has a new "The final exam, twice" section: paper
  first with you, simulator solo in revision week, and **the gap between the two is the number
  that matters** — a much lower simulator score is a timing problem, not a knowledge one.
- Tested in a browser end to end: 23 questions render, MCQ scoring, B auto-match tolerance,
  per-criterion marks, the 0:00 auto-submit, and the results/diagnosis maths.
  Found and fixed a real bug on the way — clicking a criterion's *label text* toggled the
  checkbox twice (my handler plus the browser's native label behaviour) and cancelled itself out.
  It now listens on the checkbox's `change` event instead.
- **Second machine (this one) is now set up**: repo cloned, XAMPP 8.2 installed (PHP 8.2.12 —
  same version as the main machine, plus MySQL and phpMyAdmin). `.claude-flow/` is a local
  tool folder and is now gitignored.

### 2026-09-22 (third) — Made it fun, and much deeper
- **Arcade rebuilt**: 4 games -> 6 (added **Speed Round**, 45s true/false, and
  **Code Builder**, ordering lines). Question bank 45 -> **133**. Added persistent
  **XP, 8 levels and 8 badges**, all in localStorage under one `phparcade_save` key.
- **New game `games/php-quest.php`**: a seven-door escape room. Rooms are one
  multidimensional array at the top of the file, so adding a door needs no other change.
  Hints appear automatically after 2 wrong tries. Full play-through tested.
- **New `Php/flashcards.html`**: 102 cards in 6 decks, flip animation, "knew it / didn't",
  a card must be right **twice** to count as known, missed cards re-queue 3 cards later,
  plus an "only the ones I keep missing" mode.
- **Every `lesson.md` now ends with three new sections**: 💡 Did you know (a real story -
  Rasmus Lerdorf, the Samy worm, Little Bobby Tables, FizzBuzz, Yoda conditions),
  🎮 Play with it (3-4 playful experiments), 🏆 Boss challenge, and a line pointing at the
  matching arcade round, flashcard deck and mini-quiz.
- **New `games/README.md`** hub explaining every game and what it drills.
- Tone note for the next agent: the 💡/🎮/🏆 structure is now the house style for lessons.
  Keep the facts **true and checkable** - they are there to make it memorable, not to decorate.

### 2026-09-22 (later) — Roadmap + a lot more quizzes
- **Quizzes went from 5 files to 20.** Added `quiz-00-intro.md` (no code at all, for session 1),
  ten 8-question **mini-quizzes** (one per lesson, 5-minute exit tickets), a 40-mark
  **final exam**, a `quizzes/README.md` explaining which size to use when, and two new answer
  keys (`MINI-ANSWERS.md`, `FINAL-EXAM-ANSWERS.md` with a per-section diagnosis table).
- **Added the A-Z roadmap** in two forms: `ROADMAP.md` (Mermaid, renders on GitHub) and
  `Php/roadmap.html` (interactive, 26 steps A-Z, tick-boxes saved in localStorage,
  auto-highlights the next step). Published as an Artifact too.
- Design note for whoever edits `roadmap.html`: the 26 steps are deliberately one per letter,
  so **adding a step means merging or re-lettering** — don't just append a 27th.

### 2026-09-22 — Course built from scratch
- Created the whole `Php/` folder: 10 lessons, 3 games, 4 quizzes + answer key, 3 projects,
  3 resource docs, instructor guide.
- Originally planned 8 lessons; **extended to 10** after seeing a photo of her lecture slide
  showing the textbook's chapter list — MySQL (Ch. 11) and dynamic pages with a database
  (Ch. 12) are examinable, so lessons 9 and 10 were added to cover them.
- Verified: every PHP file lints, every example was executed, the arcade was tested in a browser
  (all four game modes), both PHP games tested over `php -S`.
- Published the arcade as a private Claude Artifact.
- Set up this git repo and pushed to GitHub for two-machine sync.
