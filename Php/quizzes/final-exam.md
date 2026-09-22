# Final Exam — PHP & MySQL
**Covers everything · 40 marks · 90 minutes · closed book**

Do this under real exam conditions: no lesson files, no internet, no phone. Set a timer.
Doing it "roughly" tells you nothing; doing it properly tells you exactly what to revise.

Name: ______________  Time started: ______  Score: ____ / 40

---

## Section A — Multiple choice (10 marks, 1 each)

**1.** PHP code is executed on:
a) the browser b) the server c) the database d) the router

**2.** Which is **not** a valid variable name?
a) `$_id` b) `$myAge` c) `$2nd` d) `$total_price`

**3.** `var_dump(5 === "5")` outputs:
a) `bool(true)` b) `bool(false)` c) `int(5)` d) an error

**4.** `echo 15 % 4;` outputs:
a) `3.75` b) `3` c) `4` d) `60`

**5.** Which loop is designed for arrays?
a) `for` b) `while` c) `foreach` d) `do...while`

**6.** In `$a = ["x","y","z"]`, the value `"z"` is at index:
a) 0 b) 1 c) 2 d) 3

**7.** Which sends form data invisibly?
a) `GET` b) `POST` c) `PUT` d) both the same

**8.** Which SQL command changes existing rows?
a) `SELECT` b) `INSERT` c) `UPDATE` d) `ALTER`

**9.** `htmlspecialchars()` protects against:
a) SQL injection b) XSS c) slow queries d) wrong passwords

**10.** A prepared statement protects against:
a) XSS b) SQL injection c) infinite loops d) parse errors

---

## Section B — What does it print? (8 marks, 2 each)

**11.**
```php
$a = 4;
$b = "4";
if ($a == $b) echo "same ";
if ($a === $b) echo "identical";
```
Output: ______________________

**12.**
```php
for ($i = 1; $i <= 6; $i++) {
    if ($i % 2 != 0) continue;
    echo $i;
}
```
Output: ______________________

**13.**
```php
$marks = [12, 18, 6];
echo count($marks) . "-" . array_sum($marks) . "-" . max($marks);
```
Output: ______________________

**14.**
```php
function f($n) {
    if ($n > 10) return "big";
    return "small";
    echo "never";
}
echo f(11) . f(2);
```
Output: ______________________

---

## Section C — Find and fix the errors (6 marks, 2 each)

**15.** Two errors. Circle them and write the corrected code.

```php
$name = "Rana"
echo "Hello $Name";
```

Corrected: `_________________________________`

**16.** One error, and the code runs forever. What and why?

```php
$i = 0;
while ($i < 5) {
    echo $i;
}
```

Answer: ______________________________________

**17.** One security error. What is it, and what is the fix?

```php
$id = $_GET["id"];
$result = mysqli_query($conn, "SELECT * FROM users WHERE id = $id");
```

Answer: ______________________________________

---

## Section D — Write the code (10 marks)

**18.** *(3 marks)* Write a function `letterGrade($mark)` that returns:
`A` for 18+, `B` for 16+, `C` for 14+, `D` for 10+, and `F` otherwise.

```php
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
```

**19.** *(3 marks)* Given the array below, write a `foreach` that prints each student's name,
their grade, and `Pass` or `Fail` (pass = 10 or more).

```php
$class = [
    ["name" => "Rana", "grade" => 17],
    ["name" => "Sara", "grade" => 8],
];
```

```php
_________________________________
_________________________________
_________________________________
_________________________________
```

**20.** *(4 marks)* Write a complete self-submitting form page that:
asks for a name, checks it is not empty, and prints `Welcome <name>` safely.

```php
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
```

---

## Section E — Database (6 marks)

**21.** *(2 marks)* Write the SQL that creates a table `books` with:
an auto id, a title (max 120 chars), an author, and a year.

```sql
_________________________________
_________________________________
_________________________________
_________________________________
```

**22.** *(2 marks)* Write the SQL that finds every book published after 2020, newest first.

```sql
_________________________________
```

**23.** *(2 marks)* Write the PHP that connects to a database called `library` and prints
every book title, using a prepared statement is not required here.

```php
_________________________________
_________________________________
_________________________________
_________________________________
```

---

## Marking

| | |
|---|---|
| 34–40 | Excellent — you're ready |
| 27–33 | Good — revise the sections you lost marks in |
| 20–26 | Pass, but shaky — redo the mini-quizzes for the weak lessons |
| under 20 | Don't panic. Find which *section* you lost marks in and redo that lesson only. |

**Write down which question numbers you got wrong.** That list, not the score, is your revision plan.

---

<details>
<summary><b>✅ Check your answers</b> — after your instructor has marked it</summary>

<br>

**Mark it with your instructor the first time.** Open this only for your second run,
during revision week.

**Section A** — 1-b · 2-c · 3-b · 4-b · 5-c · 6-c · 7-b · 8-c · 9-b · 10-b

Questions 9 and 10 sit together on purpose: `htmlspecialchars()` protects what you
**print** (XSS). Prepared statements protect what goes **into a query** (SQL injection).
If you swapped them, re-read lesson 8 and lesson 9.

**Section B**
- **11** — `same ` only. `4 === "4"` is false, so the second `if` never fires.
- **12** — `246`. `continue` skips the odd numbers.
- **13** — `3-36-18`
- **14** — `bigsmall`. The `echo "never"` after `return` can never run.

**Section C**
- **15** — missing `;` after `"Rana"`, and `$Name` should be `$name` (case sensitive).
- **16** — nothing changes `$i`, so `$i < 5` stays true forever: an infinite loop.
  Add `$i++;` inside the braces.
- **17** — the `$_GET` value goes straight into the SQL: **SQL injection**.
  ```php
  $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE id = ?");
  mysqli_stmt_bind_param($stmt, "i", $id);
  mysqli_stmt_execute($stmt);
  ```

**Section D**
- **18**
  ```php
  function letterGrade($mark) {
      if ($mark >= 18) return "A";
      if ($mark >= 16) return "B";
      if ($mark >= 14) return "C";
      if ($mark >= 10) return "D";
      return "F";
  }
  ```
  The order is part of the answer. Reversed, every mark comes back as `D`.
- **19**
  ```php
  foreach ($class as $student) {
      $result = $student["grade"] >= 10 ? "Pass" : "Fail";
      echo $student["name"] . " - " . $student["grade"] . " - " . $result . "\n";
  }
  ```
- **20** — four things had to be there: a form whose input has a `name`, the
  `REQUEST_METHOD` check, an empty check, and `htmlspecialchars()` on the output.
  ```php
  <?php
  $name = ""; $error = "";
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $name = trim($_POST["name"] ?? "");
      if ($name === "") $error = "Name is required";
  }
  ?>
  <form method="post">
      <input type="text" name="name">
      <button type="submit">Send</button>
  </form>
  <?php
  if ($error) echo $error;
  elseif ($name) echo "Welcome " . htmlspecialchars($name);
  ```
  Any working shape counts. The marks are for the four ideas, not for matching this layout.

**Section E**
- **21**
  ```sql
  CREATE TABLE books (
      id     INT AUTO_INCREMENT PRIMARY KEY,
      title  VARCHAR(120) NOT NULL,
      author VARCHAR(100),
      year   INT
  );
  ```
- **22** — `SELECT * FROM books WHERE year > 2020 ORDER BY year DESC;`
- **23**
  ```php
  $conn = mysqli_connect("localhost", "root", "", "library");
  $result = mysqli_query($conn, "SELECT title FROM books");
  while ($row = mysqli_fetch_assoc($result)) {
      echo $row["title"] . "<br>";
  }
  ```

---

**Now do the part that matters:** write down the numbers you got wrong, and look at which
**section** they came from. That list is your revision plan — much more useful than the score.

</details>
