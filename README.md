# Fatoma jem3a

Teaching material I build for Fatima's university courses. Kept in git so it stays in sync
across my two machines and so any Claude Code session can pick up exactly where the last one left off.

**👉 If you are an AI agent starting a session here, read [`PROGRESS.md`](PROGRESS.md) first.**
It holds the current state, what's done, what's next, and the long-term plan.

---

## What's in here

| Folder | Subject | Status |
|---|---|---|
| [`Php/`](Php/) | Intro to PHP + MySQL (10 lessons, games, quizzes, 3 projects) | ✅ built, teaching in progress |

Her textbook is **Web Development Full Stack** (Cengage) — PHP is Ch. 10, MySQL is Ch. 11–12.

---

## Working on two machines

**Starting work (always do this first):**

```bash
git pull
```

**Finishing work:**

```bash
git add -A
git commit -m "what I changed"
git push
```

If `git pull` complains about diverged branches after editing on both machines:

```bash
git pull --rebase
```

Then fix any conflict, `git add` the file, and `git rebase --continue`.

**The rule:** pull before you start, push before you close the laptop. Every time.

---

## Running the PHP material

PHP 8.2 CLI is installed on the main machine, so lessons 1–7 need nothing else:

```bash
php Php/01-basics/examples.php
```

Lessons 8–10, the projects and the PHP games need a server. From inside `Php/`:

```bash
php -S localhost:8000
```

Lessons 9–10 additionally need MySQL — XAMPP, with the `.sql` files imported through phpMyAdmin.
Full setup: [`Php/00-setup/SETUP.md`](Php/00-setup/SETUP.md).
