# Final Exam — Answer Key & Marking Scheme 🔒
*Instructor only. 40 marks.*

---

## Section A — Multiple choice (10 marks)

| Q | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **A** | b | c | b | b | c | c | b | c | b | b |

Notes on the ones people lose:
- **3** — `===` compares type too, and `int` ≠ `string`, so `false`.
- **9 vs 10** — these two are deliberately next to each other. `htmlspecialchars()` = XSS
  (output). Prepared statements = SQL injection (input into a query). If she swapped them,
  that's a real gap, not a slip.

---

## Section B — What does it print? (8 marks, 2 each)

**11.** `same ` — only the first `if` passes, because `4 === "4"` is false.
*(1 mark for `same`, 1 for not also printing `identical`)*

**12.** `246` — `continue` skips the odd numbers.

**13.** `3-36-18`

**14.** `bigsmall` — `f(11)` returns `big`, `f(2)` returns `small`, and the `echo` after
`return` never runs.

---

## Section C — Find and fix (6 marks, 2 each)

**15.** Missing `;` after `"Rana"`, and `$Name` should be `$name` (case sensitive).
```php
$name = "Rana";
echo "Hello $name";
```

**16.** Nothing inside the loop changes `$i`, so `$i < 5` is true forever — an infinite loop.
Fix: add `$i++;` inside the braces.
*(1 mark for spotting it, 1 for explaining why)*

**17.** The `$_GET` value goes straight into the SQL → **SQL injection**
(`?id=1 OR 1=1` returns every row).
Fix — a prepared statement:
```php
$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);
```
*(1 mark for naming SQL injection, 1 for the prepared statement)*

---

## Section D — Write the code (10 marks)

**18.** *(3 marks — 1 for `function`+`return`, 1 for correct thresholds, 1 for correct order)*
```php
function letterGrade($mark) {
    if ($mark >= 18) return "A";
    if ($mark >= 16) return "B";
    if ($mark >= 14) return "C";
    if ($mark >= 10) return "D";
    return "F";
}
```
Accept `elseif` chains. **Deduct 1 if the order is reversed** — that's the classic bug and it
must cost a mark here.

**19.** *(3 marks — 1 foreach syntax, 1 correct array keys, 1 pass/fail logic)*
```php
foreach ($class as $student) {
    $result = $student["grade"] >= 10 ? "Pass" : "Fail";
    echo $student["name"] . " - " . $student["grade"] . " - " . $result . "\n";
}
```

**20.** *(4 marks — 1 form with `name`, 1 REQUEST_METHOD check, 1 empty check, 1 `htmlspecialchars`)*
```php
<?php
$name = "";
$error = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    if ($name === "") {
        $error = "Name is required";
    }
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
Any working shape is fine. The 4 marks are for the four *ideas*, not for matching this layout.

---

## Section E — Database (6 marks)

**21.** *(2 marks — 1 for the auto id + primary key, 1 for sensible types)*
```sql
CREATE TABLE books (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    title  VARCHAR(120) NOT NULL,
    author VARCHAR(100),
    year   INT
);
```

**22.** *(2 marks — 1 for `WHERE`, 1 for `ORDER BY ... DESC`)*
```sql
SELECT * FROM books WHERE year > 2020 ORDER BY year DESC;
```

**23.** *(2 marks — 1 connect, 1 fetch loop)*
```php
$conn = mysqli_connect("localhost", "root", "", "library");
$result = mysqli_query($conn, "SELECT title FROM books");
while ($row = mysqli_fetch_assoc($result)) {
    echo $row["title"] . "<br>";
}
```

---

## Reading the result

Don't look at the total first — **look at which section lost the marks.** The total tells you
how she feels; the section tells you what to do.

| Weak section | What it means | Do this |
|---|---|---|
| A | vocabulary not settled | mini-quizzes, 10 min per call, no new material |
| B | can't trace code in her head | more "predict then run" on `examples.php` |
| C | doesn't read error messages | debug together on purpose — break files and fix them |
| D | can't produce code from blank | she writes, you watch silently. This is the one that needs reps. |
| E | SQL/PHP boundary unclear | practise SQL in phpMyAdmin alone, then add PHP |

**Section D weak but A and B strong is the most common pattern**, and it is not a knowledge
problem — it's a practice problem. The fix is writing from blank more often, not re-reading.
