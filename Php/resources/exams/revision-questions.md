# Three questions to solve tonight

Sit these with no notes. The answers are underneath — **do not read down
until you have written something.** Every output below was produced by
running the code on PHP 8.2.12.

Question 1 is the one with a table, and it needs a loop.

---

## Question 1 — the times table *(a table, built with a loop)*

A teacher types **one number** into a form and presses **Show the table**.

The page must then print a **table with three columns** and **ten rows**:

| Number | Answer | Even or odd |
|---|---|---|
| 7 x 1 | 7 | Odd |
| 7 x 2 | 14 | Even |
| … | … | … |

- Column 1 is the sum being done, like `7 x 3`.
- Column 2 is the answer.
- Column 3 says **Even** or **Odd** about that answer.

If the box is empty or does not hold a number, print a message and no table.

Give the **pseudocode**, the **flowchart** and the **PHP**, with `//`
comments and a PHPDoc block.

---

## Question 2 — the largest of two numbers

A form takes **two numbers**. When the button is pressed the page says which
one is larger — and if they are the same, says that instead.

If either box does not hold a number, print a message.

Give the **pseudocode**, the **flowchart** and the **PHP**.

---

## Question 3 — what does it print?

Write the **exact** output. Spaces matter.

```php
<?php
$x = 12;
$y = 15 + $x++;
echo "x is $x and y is $y";
echo "\n";

$out = "Hello";
$out .= " ";
$out .= "World!";
echo $out;
echo "\n";

for ($c = 1; $c <= 6; $c++) {
    if ($c % 2 == 0) continue;
    if ($c == 5) break;
    echo "Count: $c ";
}
echo "\n";

echo "A" . FALSE . "B";
echo "\n";
echo 10 . 5;
echo "\n";
echo (int) 9.9 - 1;
echo "\n";

$n = 3;
do {
    echo "go ";
    $n++;
} while ($n < 3);
```

---
---

# Answers

---

## Answer 1 — the times table

### (a) Pseudocode

```
START
  IF the Show the table button was pressed THEN
      NUM <-- the number typed
      IF NUM is not a number THEN
          PRINT "Please type a number."
      ELSE
          PRINT the heading row        [once, OUTSIDE the loop]
          I <-- 1
          WHILE I <= 10
              ANSWER <-- NUM * I
              IF ANSWER / 2 has no remainder THEN
                  TYPE <-- "Even"
              ELSE
                  TYPE <-- "Odd"
              ENDIF
              PRINT a row holding NUM x I, ANSWER and TYPE
              I <-- I + 1
          ENDWHILE
          PRINT the end of the table
      ENDIF
  ENDIF
STOP
```

### (b) Flowchart

```
          ( START )
              |
    < button pressed ? > --no--> ( STOP )
              | yes
       / read NUM /
              |
    < NUM is a number ? > --no--> / print the message / --> ( STOP )
              | yes
   / print the heading row /          <- ONCE, before the loop
              |
         [ I <-- 1 ]
              |
   +--------->|
   |          |
   |    < I <= 10 ? > --no--> / print the end of the table / --> ( STOP )
   |          | yes
   |  [ ANSWER <-- NUM * I ]
   |          |
   |  < ANSWER even ? > --yes--> [ TYPE <-- "Even" ]
   |          | no                        |
   |  [ TYPE <-- "Odd" ]                  |
   |          |                           |
   |          +<--------------------------+
   |          |
   |  / print the row /
   |          |
   |    [ I <-- I + 1 ]
   |          |
   +----------+          <- the back-arrow. THIS is the loop.
```

### (c) PHP

```php
<?php
/**
 * The times table.
 *
 * Reads one number from a POST form and prints a table of that number
 * times 1 to 10, saying for each row whether the answer is even or odd.
 *
 * @author  Fatima Al-Helou
 * @version 1.0
 */
?>
<form action="" method="POST">
    <label>Enter a number </label>
    <input type="text" name="num">
    <button type="submit" name="show" value="1">Show the table</button>
</form>

<?php
// isset first, read second - nothing has been posted on the first visit.
if (isset($_POST["show"])) {

    $num = $_POST["num"];

    // Everything a form sends is text, and the box may be left empty.
    if (!is_numeric($num)) {

        echo "<p>Please type a number.</p>";

    } else {

        echo "<table border='1'>";
        echo "<tr><th>Number</th><th>Answer</th><th>Even or odd</th></tr>";

        // One pass per row. $i is both the counter and the number shown.
        for ($i = 1; $i <= 10; $i++) {

            $answer = $num * $i;

            // % gives the remainder. A remainder of 0 means it divides evenly.
            if ($answer % 2 == 0) {
                $type = "Even";
            } else {
                $type = "Odd";
            }

            echo "<tr>";
            echo "<td>" . $num . " x " . $i . "</td>";
            echo "<td>" . $answer . "</td>";
            echo "<td>" . $type . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    }
}
```

**Run with 7, this prints:**

```
Number | Answer | Even or odd
7 x 1  | 7      | Odd
7 x 2  | 14     | Even
7 x 3  | 21     | Odd
7 x 4  | 28     | Even
7 x 5  | 35     | Odd
7 x 6  | 42     | Even
7 x 7  | 49     | Odd
7 x 8  | 56     | Even
7 x 9  | 63     | Odd
7 x 10 | 70     | Even
```

### Why it is written this way

**The heading row is printed once, outside the loop.** This is the single
commonest mistake in a table question. Putting
`echo "<tr><th>Number</th>..."` inside the `for` gives you ten heading rows.
Anything that happens **once** belongs outside; anything that happens **per
row** belongs inside.

**`<table>` and `</table>` are outside too**, for the same reason. The loop
only ever prints `<tr>...</tr>`.

**`$i` does two jobs.** It counts the passes *and* it is the number shown in
the first column. That is why it starts at 1 and not at 0 — the table starts
at `7 x 1`.

**`<= 10`, not `< 10`.** Ten rows means the counter has to reach 10. `< 10`
gives nine rows, and that is a lost mark for an answer that otherwise works.

**The even test is `% 2 == 0`.** `%` is the remainder. `14 % 2` is 0, so 14
is even. `21 % 2` is 1, so 21 is odd. Note `==`, not `=`.

**`$type` is worked out before the row is printed**, not inside the `echo`.
It keeps the decision and the printing separate, which is easier to read and
easier to mark.

---

## Answer 2 — the largest of two numbers

### (a) Pseudocode

```
START
  IF the button was pressed THEN
      READ A, B
      IF A or B is not a number THEN
          PRINT "Please type a number in both boxes."
      ELSE IF A > B THEN
          PRINT "The largest is ", A
      ELSE IF B > A THEN
          PRINT "The largest is ", B
      ELSE
          PRINT "Both numbers are equal"
      ENDIF
  ENDIF
STOP
```

### (b) Flowchart

```
      ( START )
          |
    / read A, B /
          |
  < A and B numbers ? > --no--> / print the message / --> ( STOP )
          | yes
     < IS A > B ? > --yes--> / print A / ----+
          | no                               |
     < IS B > A ? > --yes--> / print B / ----+
          | no                               |
  / print "Both numbers are equal" / --------+
                                             |
                                        ( STOP )
```

### (c) PHP

```php
<?php
/**
 * The largest of two numbers.
 *
 * Reads two numbers from a POST form and reports which is larger, or
 * says so when they are equal.
 *
 * @author  Fatima Al-Helou
 * @version 1.0
 */
?>
<form action="" method="POST">
    <label>First number </label>
    <input type="text" name="a"><br><br>
    <label>Second number </label>
    <input type="text" name="b"><br><br>
    <button type="submit" name="show" value="1">Find the largest</button>
</form>

<?php
if (isset($_POST["show"])) {

    $a = $_POST["a"];
    $b = $_POST["b"];

    if (!is_numeric($a) || !is_numeric($b)) {

        echo "<p>Please type a number in both boxes.</p>";

    } elseif ($a > $b) {

        // The dot joins. A + here would try to add the words together.
        echo "<p>The largest is " . $a . "</p>";

    } elseif ($b > $a) {

        echo "<p>The largest is " . $b . "</p>";

    } else {

        // Neither is bigger, so they must be the same.
        echo "<p>Both numbers are equal</p>";
    }
}
```

**Checked:**

| Typed | Prints |
|---|---|
| 9, 4 | The largest is 9 |
| 4, 9 | The largest is 9 |
| 5, 5 | Both numbers are equal |
| -3, -8 | The largest is -3 |
| x, 4 | Please type a number in both boxes. |

### Why it is written this way

**Here an `elseif` ladder is right.** This is the opposite of the price-filter
bug. The three outcomes are genuine **alternatives** — A is bigger, *or* B is
bigger, *or* they are equal. Exactly one can be true, so a ladder is correct
and is the clearest way to write it.

> Compare: when you are hunting the largest of **five** numbers, a ladder is
> wrong, because several numbers can each beat the one before and every one
> of them needs its own turn. Alternatives → ladder. Repeated challenges →
> separate `if`s.

**The third branch is `else`, not `elseif ($a == $b)`.** If A is not bigger
and B is not bigger, they must be equal — there is no fourth possibility. An
`else` says that, and cannot leave a case unhandled by accident.

**Negative numbers work with no extra code**, because `>` compares values and
does not care about signs. `-3 > -8` is true. This is worth testing: an
answer that assumes marks are positive will fail here.

---

## Answer 3 — what it prints

```
x is 13 and y is 27
Hello World!
Count: 1 Count: 3 
AB
105
8
go 
```

### Why, line by line

**`x is 13 and y is 27`** — `$x++` hands back the **old** value and *then*
adds. So `$y = 15 + 12 = 27`, and `$x` becomes 13. This is his slide, word
for word. `++$x` would have given `$y = 28`.

**`Hello World!`** — `.=` adds to the end of what is already there.
`"Hello"` → `"Hello "` → `"Hello World!"`.

**`Count: 1 Count: 3 `** *(with a trailing space)* — 2, 4 and 6 are skipped by
`continue`. At 5 the loop **breaks before the echo**, so 5 never prints.

**`AB`** — joining `FALSE` to a string gives an **empty string**. His slide
puts it nicely: FALSE is "not there" — even smaller than zero when it comes
to width. (`TRUE` would have given `A1B`.)

**`105`** — the dot **joins**, it does not add. `10 . 5` is the text `"10"`
stuck to the text `"5"`. If it had been `10 + 5` the answer would be `15`.

**`8`** — `(int) 9.9` **chops** the decimal part off, it does not round. So
`9 - 1 = 8`. The cast is applied to `9.9` first, before the subtraction.

**`go `** — `do...while` is a **one-trip** loop. The test is at the **bottom**,
so the body has already run once before `$n < 3` is ever checked. `$n` started
at 3, so the test fails immediately — but the `echo` had already happened.

---

## And the `define()` question

**`define()` is not in any of her decks.** No slide mentions constants,
`define()` or `const`, and the exam announcement lists "Variables & Scope",
not constants. **It is very unlikely to be on Partial I.**

For completeness, this is the answer:

```php
define("PASS_MARK", 60);
echo PASS_MARK;        // 60  - no $ sign
```

**Why you would use it.** A constant is a value that must never change while
the script runs. You use `define()` instead of a variable for three reasons:

1. **It cannot be reassigned.** A variable holding the pass mark can be
   overwritten by mistake three hundred lines later. A constant cannot:
   defining it a second time prints
   `Warning: Constant PASS_MARK already defined` and **the value does not
   change**. The mistake announces itself instead of quietly corrupting
   every grade below it.
2. **One place to change it.** If the pass mark moves from 60 to 50, you
   change one line, not every `if ($grade < 60)` scattered through the file.
3. **It is global.** A constant is visible inside every function without
   being passed in. A variable is not — `$passMark` declared at the top of
   the file is invisible inside a function.

Written with `const` instead, at the top level, it means the same thing:

```php
const PASS_MARK = 60;
```

The difference that matters: `define()` runs **when that line executes**, so
it can be inside an `if`. `const` is fixed when the file is **compiled**, so
it cannot be.

**Naming:** constants are written in CAPITALS **with no `$`**. Writing
`$PASS_MARK` makes it a variable again.
