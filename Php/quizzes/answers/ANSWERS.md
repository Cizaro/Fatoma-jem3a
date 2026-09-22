# Answer Key — instructor only 🔒

Keep this closed during the call. Mark together afterwards, and only discuss the wrong ones.

---

## Quiz 1 — Basics & Data Types

**A:** 1-b · 2-c · 3-b · 4-c · 5-c · 6-c · 7-c · 8-c

- **5** — 17 % 5: 5 goes into 17 three times (15), remainder **2**.
- **8** — `"PHP is fun"` = 10 characters, the two spaces count.

**B:**
- **9** — `12`. The 5 is overwritten and gone.
- **10** — `HELLO-5`
- **11** — `bool(true)`. `==` ignores the type. With `===` it would be false.
- **12** — `Prog`

**C:**
- **13** — `$age = 20;`
- **14** — `echo "Hello $name!";` (or `echo "Hello " . $name . "!";`)
- **15** — three mistakes: missing `$`, missing `;` on line 2, and single quotes don't read variables.
```php
<?php
$name = "Sara";
echo "Welcome $name";
```

**Bonus** — `echo true` prints `1` and `echo false` prints nothing at all, so you can't tell
"false" from an error. `var_dump()` shows `bool(false)` clearly.

---

## Quiz 2 — Operators & Conditions

**A:** 1-b · 2-b · 3-b · 4-c · 5-c · 6-c · 7-c · 8-b

- **7** — `"0"` is one of PHP's falsy values. `"false"` is a non-empty string, so it is **true**.

**B:**
- **9** — prints `Pass`. **The problem:** 15 deserves "Very good", but `>= 10` is checked first
  and PHP stops at the first true branch. The conditions are in the wrong order — the
  strictest must come first.
- **10** — `adult`
- **11** — `bool(false)` then `bool(true)`
- **12** — prints `big`. `$x = 100` **assigns** instead of comparing; the assignment returns 100,
  which is truthy, so the `if` always wins. This is the `=` vs `==` bug.

**C:**
- **13**
```php
if ($n % 2 == 0) {
    echo "Even";
} else {
    echo "Odd";
}
```
- **14**
```php
switch ($color) {
    case "red":
        echo "Red";
        break;
    case "blue":
        echo "Blue";
        break;
    default:
        echo "Other";
}
```
- **15** — `if ($grade >= 10 && $attendance >= 75)`

**Bonus** — `>= 16`, then `>= 14`, then `>= 10`. Biggest first, because PHP takes the first
branch that is true and never looks at the rest.

---

## Quiz 3 — Loops, Arrays & Functions

**A:** 1-c · 2-b · 3-b · 4-b · 5-c · 6-b · 7-b · 8-c

**B:**
- **9** — `1245` (3 is skipped by `continue`)
- **10** — `4.6666666666667` — accept `4.67` if they rounded, but ask what `round()` would do.
- **11** — `6`. The `echo` after `return` never runs.
- **12** — `abc`

**C:**
- **13**
```php
for ($i = 1; $i <= 5; $i++) {
    echo $i . " ";
}
```
- **14**
```php
function triple($n) {
    return $n * 3;
}
echo triple(7);     // 21
```
  ⚠️ If they wrote `echo $n * 3;` inside the function, the answer is wrong — it prints but
  returns nothing. Make them explain the difference.
- **15**
```php
foreach ($class as $student) {
    echo $student["name"] . " : " . $student["grade"] . "\n";
}
```

**Bonus** — **scope**. A function cannot see variables from outside itself. Fix it by passing
the value in: `function show($x) { echo $x; } show(10);`

---

## Quiz 4 — Forms, MySQL & Dynamic Pages

**A:** 1-c · 2-b · 3-b · 4-b · 5-b · 6-c · 7-b · 8-b

**B:**
- **9** — `SELECT * FROM students WHERE grade >= 10;`
- **10** — `INSERT INTO students (name, grade) VALUES ('Sara', 14);`
- **11** — The URL value is glued straight into the SQL, so it is open to **SQL injection**
  (`?id=1 OR 1=1` returns everything). Replace it with a prepared statement:
```php
$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);
```
- **12** — `header()` only *asks* the browser to move; the rest of the script keeps running
  without `exit`. It also stops the form being re-submitted on refresh (the PRG pattern).

**C:**
- **13**
```html
<form method="post" action="save.php">
    <input type="text" name="email">
    <button type="submit">Send</button>
</form>
```
- **14**
```php
$email = $_POST["email"] ?? "";
echo htmlspecialchars($email);
```
- **15**
```php
while ($row = mysqli_fetch_assoc($result)) {
    echo $row["name"] . "<br>";
}
```

**Bonus** — any three of: prepared statements for every user value, `htmlspecialchars()` on
every printed value, cast ids with `(int)`, validate server-side (never trust the browser),
redirect after saving, handle the empty-result case.

---

## Marking guide

| Score | Meaning | What to do |
|---|---|---|
| 13–15 | Solid | Move to the next unit, give a challenge exercise |
| 10–12 | Good | Re-do the wrong topics' exercises, then move on |
| 7–9 | Shaky | Re-teach the weak topic on the next call before advancing |
| under 7 | Not there yet | Stop. Redo the lesson slowly with new examples. Don't advance. |

**Never** advance past a failed loops or arrays quiz — everything after depends on them.
