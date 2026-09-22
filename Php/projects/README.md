# Projects

Three projects, getting harder. Each one is something you could actually show someone.

| # | Project | Needs | Time |
|---|---|---|---|
| 1 | Grade Calculator | Lessons 1–7 (terminal only) | 2–3 h |
| 2 | To-Do List | Lesson 8 (forms + sessions) | 3–4 h |
| 3 | Student Management System | Lessons 9–10 (MySQL) | 6–8 h |

**Rule: no copying from the lesson files while you build.** Look at them if you're stuck,
close them, then write it yourself. The looking-up is fine; the copy-pasting is what stops you learning.

---

## Project 1 — Grade Calculator
📁 `project-1-grades/`

A terminal program that takes a class of students and produces a full report.

**It must:**
- [ ] Store at least 5 students with a name and 3 marks each (multidimensional array)
- [ ] Use a **function** to calculate each student's average
- [ ] Use a **function** to turn an average into a letter grade (A/B/C/D/F)
- [ ] Print a neat table: name, the 3 marks, the average, the letter, Pass/Fail
- [ ] Print class statistics: class average, highest, lowest, how many passed
- [ ] Show the name of the best student

**Stretch goals:**
- Sort the table by average, best first
- Add a `$weights` array so the 3 marks count differently (e.g. 20%, 30%, 50%)
- Draw a little bar of `#` next to each average, one `#` per point

Run it with `php project-1-grades/grades.php`.

---

## Project 2 — To-Do List
📁 `project-2-todo/`

A web page where you add tasks, tick them off, and delete them. No database yet — it uses
`$_SESSION`, which remembers things while your browser is open.

**It must:**
- [ ] A form to add a task
- [ ] Show all the tasks in a list
- [ ] A "done" button that crosses a task out
- [ ] A "delete" button that removes it
- [ ] Show a counter: "3 of 7 done"
- [ ] Refuse to add an empty task (with an error message)
- [ ] Escape every task with `htmlspecialchars()` — try adding `<b>test</b>` to prove it

**Stretch goals:**
- A "clear all done" button
- Filter buttons: all / active / done
- A priority (low/normal/high) with a different colour each

Run the server (`php -S localhost:8000`) and open `project-2-todo/index.php`.

---

## Project 3 — Student Management System ⭐
📁 `project-3-students/`

The real one. This is the shape of the project your teacher will ask for, and it covers
chapters 10, 11 and 12 of your textbook in one go.

**It must:**
- [ ] A MySQL table `students` (id, name, email, major, grade)
- [ ] A list page showing every student from the database
- [ ] Add a student through a form, with validation
- [ ] Edit an existing student
- [ ] Delete a student, with a confirmation
- [ ] Search by name
- [ ] A statistics box: total students, class average, how many passed
- [ ] **Every** query uses a prepared statement
- [ ] **Every** printed value uses `htmlspecialchars()`
- [ ] A shared header and footer with `require`

**Stretch goals:**
- Filter by major with a `<select>`
- Sort by clicking a column heading
- A simple login page before the admin part
- Pagination: 5 students per page

**Hand-in checklist** (read this before you say you're finished):

- [ ] Nothing crashes when a field is left empty
- [ ] Nothing crashes on `detail.php?id=999999` or `?id=abc`
- [ ] The search finds nothing gracefully — a message, not a blank page
- [ ] Refreshing after adding a student does not add it twice
- [ ] `<script>alert(1)</script>` as a name shows as text, not a popup
- [ ] The code has comments explaining the tricky parts
- [ ] The file names are sensible and lowercase

---

## How to show your work

For each project, write a short `NOTES.md` in its folder answering:

1. What was the hardest part?
2. What error took you longest to fix, and what was it in the end?
3. What would you add if you had another week?

That's not busywork — explaining your own code is exactly what an exam asks for.
