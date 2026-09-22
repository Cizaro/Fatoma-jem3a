# Answers — Quiz 0 and the Mini-Quizzes 🔒
*Instructor only. The mini-quizzes are 5-minute exit tickets — mark them out loud together
at the end of the call, and only discuss the wrong ones.*

---

## Quiz 0 — Before You Write Any Code

1. **b** — on the server
2. **b** — the HTML that PHP produced
3. HTML = **skeleton**, CSS = **clothes**, PHP = **brain**
4. **c** — `.php`
5. Login ✔ · button colour ✘ (that's CSS) · saving to a database ✔ · different price per customer ✔ ·
   scroll animation ✘ (that's JavaScript)
6. `<?php` and `?>`
7. A semicolon `;`
8. **False** — PHP variable names are case sensitive
9. "Put the value 20 into a variable called age." Accept anything that says *store / put in*,
   not "age equals 20" — push back gently on "equals", it's the root of the `=` vs `==` bug later.
10. `php hello.php`
11. Because no server ran the PHP. Double-clicking opens the file itself (`file:///`), so the
    browser just shows the text. It needs `php -S` or XAMPP.
12. **b** — `php -S localhost:8000`

> The two unmarked questions matter more than the score. If she writes something like
> "I'm scared I'm too slow" — address it directly in session 1, don't skip past it.

---

## Lesson 1 — echo, Variables, Comments

1. Prints / outputs something to the page or terminal.
2. Valid: `$name`, `$my_age`, `$myAge`. Invalid: `age` (no `$`), `$2fast` (starts with a digit),
   `$my age` (space).
3. `I love Tyre`
4. `I love $city` — single quotes are literal
5. `8` — a variable only keeps the last value put into it
6. `echo $a . " " . $b;` (accept `echo "$a $b";`)
7. Missing `;` on line 1, and `$nmae` is a typo for `$name`
8. `// this is my first program` (accept `#` or `/* */`)

---

## Lesson 2 — Data Types & Strings

1. string · int · float · bool · **string** (the last one is in quotes, so it's text)
2. **c** — `var_dump`
3. `6`
4. Nothing at all
5. `2` · `7` · `34` · `3`
6. `echo strtoupper($word);`
7. `echo $price - ($price * 25 / 100);` (accept `$price * 0.75`)
8. `2` — counting starts at 0, so F=0, a=1, t=2

---

## Lesson 3 — Operators

1. `=` puts a value into a variable. `==` asks whether two things are equal.
2. `13` · `20` · `1` · `8`
3. `30` — (20 − 5) × 2
4. true · false · true
5. It adds 1, so `$i` becomes 8.
6. `$age >= 18 && $hasPassport`
7. `$day == "Saturday" || $day == "Sunday"`
8. `$result = ($mark >= 10) ? "Pass" : "Fail";`

---

## Lesson 4 — Conditions

1. Round = the condition (the question). Curly = the code that runs if it's true.
2. Prints `Pass`. The bug: `>= 10` catches 19 first and PHP stops at the first true branch,
   so `Excellent` is unreachable. Conditions must go strictest first.
3. False: `0`, `"0"`, `""`. True: `"hello"`, `-1`, `"false"`.
4. `break;` — without it PHP falls through and prints `redyellow`.
5. The `;` right after the `if(...)` ends the statement, so the block is no longer attached
   and always runs.
6. ```php
   if ($n % 2 == 0) { echo "Even"; } else { echo "Odd"; }
   ```
7. `>= 18`, `>= 16`, `>= 14`, `>= 10`. Because PHP takes the **first** true branch, so the
   hardest condition has to be checked first.
8. When comparing one variable against several **exact** values. Use `if` for ranges.

---

## Lesson 5 — Loops

1. Start (`$i = 0`) — once at the beginning · Condition (`$i < 4`) — before every round ·
   Step (`$i++`) — after every round
2. `4` times (0, 1, 2, 3)
3. `321`
4. Nothing changes `$n`, so the condition never becomes false → infinite loop, the page/terminal
   freezes. `Ctrl + C` stops it.
5. `break` leaves the loop completely. `continue` skips only the current round.
6. `123`
7. ```php
   for ($i = 2; $i <= 10; $i += 2) { echo $i . " "; }
   ```
   (accept the `if ($i % 2 == 0)` version)
8. The **inner** loop finishes completely for every single round of the outer one.

---

## Lesson 6 — Arrays

1. `red` · `blue` · `3` · index **2**
2. A warning: undefined array key 3. There is no index 3 — the last one is 2.
3. `$a[] = "yellow";`
4. `echo $user["name"];`
5. The key needs quotes. Without them PHP looks for a constant called `name`.
6. ```php
   foreach ($a as $colour) { echo $colour . "\n"; }
   ```
7. `20`
8. `echo $class[1]["name"];`

> If she got 1 or 2 wrong here, stop and redo arrays. This is the load-bearing lesson.

---

## Lesson 7 — Functions

1. ```php
   function hello() { echo "Hi"; }
   ```
2. She defined it but never **called** it. Defining runs nothing.
3. Parameters.
4. `echo` prints it and gives nothing back. `return` hands the value back so it can be stored
   or used in another calculation.
5. Prints `6`. `return` ends the function immediately, so the `echo` never runs.
6. **Scope** — a function can't see variables from outside itself.
   Fix: pass it in — `function show($x) { echo $x; } show(10);`
7. ```php
   function half($n) { return $n / 2; }
   echo half(50);
   ```
8. It's a **default value**: used when the caller doesn't pass that argument.
   `discount(100)` → 10%. `discount(100, 30)` → 30%.

---

## Lesson 8 — Forms

1. `method` = how the data travels (GET or POST) · `action` = which file receives it ·
   `name` = the key you read in PHP
2. `$email = $_POST["email"];`
3. GET: in the URL / visible / never for a password. POST: in the request body / hidden / yes.
4. Any two of: the input has no `name` attribute · the method and the superglobal don't match
   (`method="get"` but reading `$_POST`) · the page was opened directly without submitting ·
   the field name is spelled differently
5. It converts `<` `>` `"` `&` into harmless entities so user text is displayed, not executed.
   Use it **every single time** you print something a user typed.
6. `$name = $_POST["name"] ?? "";`
7. HTML validation runs in the browser and can be switched off, bypassed, or skipped entirely
   by sending the request directly. Never trust the browser.
8. It stops the handling code from running on the first visit, before anything was submitted.
   Without it you get undefined-key warnings the moment the page loads.

---

## Lesson 9 — MySQL

1. table = sheet · row = row (one record) · column = column (one field)
2. MySQL gives every new row the next unique number automatically, and that number identifies
   the row. You never set it yourself.
3. `SELECT * FROM students;` ·
   `SELECT * FROM students WHERE grade >= 10;` ·
   `SELECT * FROM students ORDER BY grade DESC;`
4. `INSERT INTO students (name, grade) VALUES ('Rana', 16);`
5. No `WHERE` — it deletes **every row in the table**, with no undo.
6. ```php
   while ($row = mysqli_fetch_assoc($result)) {
       echo $row["name"] . "<br>";
   }
   ```
7. The URL value is glued straight into the SQL → **SQL injection**.
   Replace with a prepared statement using `?` and `mysqli_stmt_bind_param`.
8. `s` = string, `i` = integer. The number of letters must match the number of `?` in the query,
   and their order must match the order of the variables.

---

## Lesson 10 — Dynamic Pages

1. A static page shows the same thing to everyone; a dynamic page builds itself from the
   database (or from input) every time it is opened.
2. `include` warns and carries on if the file is missing; `require` stops the page completely.
3. So it is written once and used by every page — change the menu in one file and every page
   updates.
4. `$id = (int)($_GET["id"] ?? 0);` — the `(int)` forces it to a number, so `?id=abc` or an
   injection attempt becomes harmless `0`.
5. In the **PHP variable** (`$term = "%" . $search . "%";`). The SQL only ever sees `?`, which
   is what keeps the statement safe.
6. A friendly "nothing found" message — never a blank page, which looks broken.
7. `header()` tells the browser to go elsewhere; `exit` stops the rest of the script running,
   and the redirect also prevents a refresh from re-submitting the form (the PRG pattern).
8. Prepared statements for every user value · `htmlspecialchars()` on every printed value ·
   `(int)` on every id from a URL · a friendly empty-result message ·
   redirect-after-save · close the connection. *(any four)*
