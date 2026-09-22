# Videos to Watch

**How to watch a coding video:** not like a film. Watch 10 minutes → pause → type the code
yourself → continue. Watching 4 hours straight teaches you almost nothing. Ten minutes of
watching plus ten minutes of typing beats an hour of watching.

---

## 🎬 Watch this one first (20 min)

**"What is PHP?" / "PHP in 100 seconds"** — before anything else, get the idea of
*server vs browser* into your head.
👉 https://www.youtube.com/results?search_query=php+in+100+seconds

---

## 📚 Full courses (pick ONE and stick with it)

| Course | Channel | Length | Good for |
|---|---|---|---|
| [PHP Programming Language Tutorial – Full Course](https://www.youtube.com/watch?v=OK_JCtrrv-c) | freeCodeCamp | 4 h 37 | Calm, very clear, perfect for a total beginner |
| [PHP Tutorials for Beginners (playlist)](https://www.youtube.com/@Dani_Krossing/playlists) | Dani Krossing | short episodes | Best if you like 10-minute chunks you can finish |
| [PHP courses](https://www.youtube.com/@ProgramWithGio) | Program With Gio | series | Modern PHP, a bit more advanced |

**In Arabic 🇱🇧** — if English explanations slow you down, Osama Elzero's PHP course is the
best Arabic one and it's free:
👉 https://www.youtube.com/@ElzeroWebSchool/playlists (look for **تعلم PHP**)

There's no shame in learning the concept in Arabic and the vocabulary in English. Do both.

---

## 🎯 One video per lesson

Watch **before** our Zoom call. Come with questions.

| Lesson | Search for | Time |
|---|---|---|
| 0 — Setup | [install XAMPP for PHP beginners](https://www.youtube.com/results?search_query=install+xampp+php+beginners) | 10 min |
| 1 — Basics | [PHP echo and variables tutorial](https://www.youtube.com/results?search_query=php+echo+variables+tutorial+beginners) | 15 min |
| 2 — Data types | [PHP data types and strings](https://www.youtube.com/results?search_query=php+data+types+strings+tutorial) | 15 min |
| 3 — Operators | [PHP operators tutorial](https://www.youtube.com/results?search_query=php+operators+tutorial) | 12 min |
| 4 — Conditions | [PHP if else switch tutorial](https://www.youtube.com/results?search_query=php+if+else+switch+tutorial) | 20 min |
| 5 — Loops | [PHP loops for while foreach](https://www.youtube.com/results?search_query=php+loops+for+while+foreach+tutorial) | 20 min |
| 6 — Arrays | [PHP arrays tutorial for beginners](https://www.youtube.com/results?search_query=php+arrays+tutorial+beginners) | 25 min |
| 7 — Functions | [PHP functions tutorial](https://www.youtube.com/results?search_query=php+functions+tutorial+beginners) | 20 min |
| 8 — Forms | [PHP form handling POST GET](https://www.youtube.com/results?search_query=php+form+handling+post+get+tutorial) | 25 min |
| 9 — MySQL | [MySQL tutorial for beginners phpMyAdmin](https://www.youtube.com/results?search_query=mysql+tutorial+beginners+phpmyadmin) | 30 min |
| 10 — Dynamic page | [PHP MySQL CRUD tutorial](https://www.youtube.com/results?search_query=php+mysql+crud+tutorial+beginners) | 40 min |

---

## 📖 Your textbook's other chapters

Your course book also covers CMS and WordPress (chapters 8 and 9) *before* PHP. Those chapters
are about using a ready-made system; our lessons are about building one yourself. Useful context:

- [What is a CMS?](https://www.youtube.com/results?search_query=what+is+a+cms+content+management+system+explained) — 10 min
- [WordPress themes and plugins explained](https://www.youtube.com/results?search_query=wordpress+themes+plugins+explained+beginners) — 15 min
- [WordPress security basics](https://www.youtube.com/results?search_query=wordpress+security+basics) — 15 min

Worth knowing: **WordPress is written in PHP.** Everything you learn in lessons 1–10 is what's
running under the hood of every WordPress site. That connection is a likely exam question.

---

## 🔖 Not videos, but keep these open while you code

- **[W3Schools PHP](https://www.w3schools.com/php/)** — the fastest way to look up "how do I do X".
  Every page has a "Try it Yourself" button.
- **[PHP official manual](https://www.php.net/manual/en/)** — the real documentation. Harder to
  read, but it's the truth. Tip: to look up any function, go straight to
  `php.net/strlen`, `php.net/foreach`, etc.
- **[W3Schools SQL](https://www.w3schools.com/sql/)** — for chapters 11 and 12.

---

## ⚠️ A warning about tutorials

A lot of older PHP videos teach things that are now **wrong or dangerous**:

- `mysql_connect()` — dead and removed. Use `mysqli_` or PDO.
- Putting `$_POST` straight into SQL — that's the SQL injection hole.
- `<?` instead of `<?php` — off by default in modern PHP.

**If a video is older than about 2018, check anything it says about databases against
[php.net](https://www.php.net/manual/en/).** The lesson files in this folder are all modern PHP 8.
