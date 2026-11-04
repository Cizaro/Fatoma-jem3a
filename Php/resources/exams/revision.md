# Partial I — everything, in six parts

Everything below is traced to a page of her own slides. Where a thing is
**not** in her decks it says so, because revision time the night before is
too expensive to spend on something that cannot be asked.

Every output on this page was produced by **running** the code on PHP 8.2.12,
not by reading it.

---

## Part 1 — Algorithms, pseudocode, flowcharts

*Lesson 01, all 20 pages.*

### The key points

- An **algorithm** is a step-by-step procedure for solving a problem. It must
  have data to work on, must produce at least one result, and **must stop
  after a finite number of steps**.
- **Pseudocode** is "fake code" — informal, no syntax rules, never compiled.
  You write it so you can think about the design without fighting syntax.
- A **flowchart** is the same algorithm drawn as a picture.
- The **PDLC** has six phases: Problem Definition → Problem Analysis →
  Algorithm Development → Coding & Documentation → Testing & Debugging →
  Maintenance.

### His pseudocode conventions — these are marked

| Convention | What it means |
|---|---|
| The algorithm has a **name** | `Algorithm GCD` |
| `[square brackets]` | a comment to the reader |
| **CAPITAL LETTERS** | variable names |
| `<--` | assignment (a left arrow) |
| `+ - * / < > = !=` | the operators |
| `if-then`, `if-then-else`, `endif` | the decision |
| `Repeat`, `for`, `while`, `until` | the repetition |

### The five flowchart shapes

| Shape | Use |
|---|---|
| **Oval** | the beginning or the end of the program |
| **Parallelogram** | an input operation **and** an output operation |
| **Rectangle** | a process — addition, subtraction, division, assigning |
| **Diamond** | a decision; the program continues along one of two routes |
| **Flow line** | the direction the logic flows |

**Two rules he states outright, and both lose marks:**

1. *"A flowchart must have a start and stop."* Both of them.
2. *"All steps in a flowchart must connect. Can't leave a step hanging with
   no connection."*

A loop has **no shape of its own**. It is a diamond, a body, and an arrow
going back up to the diamond. That back-arrow *is* the loop.

### Solved question — his own Example 2

> Write an algorithm to determine a student's final grade and say whether it
> is passing or failing. The final grade is the average of four marks.

**Pseudocode:**

```
Input M1, M2, M3, M4
GRADE <-- (M1 + M2 + M3 + M4) / 4
If (GRADE < 60) then
    Print "FAIL"
Else
    Print "PASS"
Endif
```

**Flowchart:**

```
   ( START )
       |
/ Input M1,M2,M3,M4 /          <- parallelogram, one input symbol
       |
[ GRADE <-- (M1+M2+M3+M4)/4 ]  <- rectangle, it works this out itself
       |
  < IS GRADE < 60 ? >          <- diamond, two routes
     Y /        \ N
/ PRINT "FAIL" /  / PRINT "PASS" /
       \        /
        ( STOP )
```

**Why it is written like this**

- The four marks come in through **one** parallelogram, not four. That is how
  his slide draws it.
- The average is a **rectangle**: nobody typed it and nobody saw it, the
  program worked it out.
- The two branches **join back together** before STOP. Leaving two separate
  STOP ovals is also accepted, but nothing may be left hanging.
- `<` is used, so exactly 60 is a **PASS**. Read the boundary in the question
  and write the comparison that matches it — this is where marks go.

---

## Part 2 — What PHP is, and how it runs

*Lesson 02, all 22 pages.*

### The key points

- **PHP stands for Hypertext Preprocessor.**
- It is **interpreted** — there is no compilation step.
- It is a **server-side** scripting language. The code runs on the server and
  the browser receives only what was printed. The browser never sees PHP.
- It is **open-source** and **object-oriented**, and it can be **embedded
  into HTML**.
- Created by **Rasmus Lerdorf in 1994**, released **1995**. Current version
  **PHP 8.2**.
- PHP itself is written in **C**, and has three modules: **PHP core**, the
  **Extension layer**, and the **Zend Engine** (which reads, compiles and
  executes the file).

### XAMPP

- **X**-platform, **A**pache, **M**ySQL/MariaDB, **P**HP, **P**erl.
- Files must be saved inside **`C:\xampp\htdocs`**.
- You reach them at **`localhost`** (which is **127.0.0.1**).
- **Apache must be started** before a `.php` file will run.
- Apache runs as a **daemon** — a process waiting in the background for a
  request — and uses **modules** (also called handlers) to decide how to
  answer one.

### Solved question

> Why does opening `firstPHP.php` by double-clicking it show the code instead
> of the result?

**Answer.** Double-clicking opens the file straight from the disk, so no
server is involved. PHP is a *server-side* language: the code only runs when
Apache hands the file to the PHP module. The fix is the three steps from his
slide — put the file inside `C:\xampp\htdocs`, press **Start** on Apache in
the XAMPP control panel, then visit **`localhost/PHPfiles/firstPHP.php`**.

**Why this is the answer.** It is the same fact as "where does PHP code run",
asked backwards. If you can say *the browser never sees PHP*, you can answer
either version.

---

## Part 3 — Variables, strings, comments, output

*Lesson 03, pages 7 to 15.*

### Variable names — he gives the rule and the counter-examples

> Start with a dollar sign `$` followed by a letter or underscore, followed by
> any number of letters, numbers, or underscores. **Case matters.**

| Valid | Invalid | Why |
|---|---|---|
| `$abc` | `abc = 12;` | no `$` — it is not a variable at all |
| `$total` | `$2php = 0;` | starts with a digit |
| `$largest_so_far` | `$bad-punc = 0;` | the hyphen is a minus sign |

**Case matters** means `$Name` and `$name` are two different variables. This
is the single most common lost mark.

Leaving the `$` off is not a small thing:

```php
$x = 2;
y = $x + 5;     // Parse error
print $x;
```

### Strings

- Single quotes **or** double quotes.
- **In double quotes, variables expand.** In single quotes they do not.
- The backslash `\` is the escape character.
- A string may span several lines; the newline is part of the string.

```php
$expand = 12;
echo "Variables do $expand";      // Variables do 12
echo 'Variables do not $expand';  // Variables do not $expand
```

### Comments — all three are valid

```php
echo 'test';  // a C++ style comment
/* a multi line comment
   another line */
echo 'test';  # a shell-style comment
```

`<!-- this -->` is an **HTML** comment. PHP ignores it and the browser shows
it in the page source.

### echo and print

- `echo` is a **language construct**. Without parentheses it takes **several**
  parameters: `echo $x, "\n";`
- `print` is a **function**. One parameter only, parentheses optional.

---

## Part 4 — Operators, casting, equality

*Lesson 03, pages 17 to 31. This is the richest part of his deck and the
likeliest source of Section 1 and Section 3.*

### Concatenation is the dot, never the plus

> *"PHP uses the period character for concatenation, because the plus
> character would instruct PHP to do the best it could to **add** the two
> things together, converting if necessary."*

```php
echo "100" . 25;   // 10025   <- joined
echo "100" + 25;   // 125     <- added
echo 10 . 5;       // 105
```

### Casting — PHP converts silently and aggressively

| Code | Result | Why |
|---|---|---|
| `56 / 12` | `4.666...` | **division always makes a float** |
| `"100" + 36.25 + TRUE` | `137.25` | TRUE counts as 1 |
| `(int) 9.9 - 1` | `8` | casting to int **chops**, it does not round |
| `"sam" . 25` | `sam25` | the dot joins |
| `"A" . FALSE . "B"` | `AB` | FALSE joins as an **empty string** |
| `"X" . TRUE . "Y"` | `X1Y` | TRUE joins as **1** |

### ⚠ One slide of his is out of date

Pages 26 and 27 teach `"sam" + 25` giving **25**. On **PHP 8.2** — the version
his own Lesson 02 deck specifies — that is a **fatal error**:

```
Uncaught TypeError: Unsupported operand types: string + int
```

It gave `25` in PHP 7. If it appears on the paper, **the answer he is marking
from is 25.** Write 25, and know why.

`"100" + 25` still works, because `"100"` converts cleanly to a number. It is
only a string with no number in it that now throws.

### Equality against identity

- `==` is **equality** — it converts first, then compares.
- `===` is **identity** — it compares **the value and the type**.

From his page 29, these are the true ones:

```php
123 == "123"        // true  - the string converts to a number
FALSE == "0"        // true  - both are falsy
(5 < 6) === TRUE    // true  - both are booleans
"5" === 5           // FALSE - same value, different type
```

### Increment — his exact example

```php
$x = 12;
$y = 15 + $x++;
echo "x is $x and y is $y";   // x is 13 and y is 27
```

`$x++` hands back the **old** value (12, so `$y` is 27) and *then* adds one
(so `$x` is 13). `++$x` adds first and hands back the new value.

### `.=` adds to the end

```php
$out = "Hello";
$out .= " ";
$out .= "World!";
echo $out;        // Hello World!
```

---

## Part 5 — Control structures

*Lesson 03, pages 33 to 43.*

### if / elseif / else

```php
$x = 7;
if ($x < 2) {
    print "Small";
} elseif ($x < 10) {
    print "Medium";
} else {
    print "LARGE";
}
```

- Logical operators: `== != < > <= >= && || !`
- **Curly braces are not required** for a single statement — but use them.
- **Whitespace does not matter** to PHP. It matters to the person marking it.

**The trap:** in an `if`, `==` asks a question. A single `=` **puts a value
in** and is always true.

### The three loops

| Loop | His own words | Runs at least once? |
|---|---|---|
| `while` | a **zero-trip** loop, test at the **top** | **no** |
| `do...while` | a **one-trip** loop, test at the **bottom** | **yes** |
| `for` | *"the simplest way to construct a counted loop"* | no |

```php
for ($count = 1; $count <= 6; $count++) { ... }
//   before it starts   runs while true   after each pass
```

### break and continue

- **`break`** ends the loop completely and jumps past it.
- **`continue`** ends only **this pass** and starts the next.

```php
for ($c = 1; $c <= 10; $c++) {
    if (($c % 2) == 0) continue;
    echo "Count: $c ";
}
// Count: 1 Count: 3 Count: 5 Count: 7 Count: 9
```

### Solved question

> What does this print?
>
> ```php
> for ($c = 1; $c <= 6; $c++) {
>     if ($c % 2 == 0) continue;
>     if ($c == 5) break;
>     echo "Count: $c ";
> }
> ```

**Answer:** `Count: 1 Count: 3 `

**Why.** Trace it one pass at a time, which is the only way that works:

| `$c` | even? | is it 5? | prints |
|---|---|---|---|
| 1 | no | no | `Count: 1 ` |
| 2 | **yes → continue** | — | nothing |
| 3 | no | no | `Count: 3 ` |
| 4 | **yes → continue** | — | nothing |
| 5 | no | **yes → break** | nothing, and the loop ends |

5 is never printed, because `break` comes **before** the `echo`. Mind the
trailing space — every `Count: $c ` brings one with it.

---

## Part 6 — Forms

*The announcement, and the exercise on Lesson 03 page 47.*

His exercise asks for exactly four things, and they are the marks:

1. A form whose inputs have a **`name`** attribute, submitting by **POST**.
2. A check that **the form was actually submitted**.
3. **Validation** — that the value is set, and is a sensible number.
4. A **clean output**, or an error message if the input is invalid or empty.

### The shape to memorise

```php
<form action="" method="POST">
    <input type="text" name="num">
    <button type="submit" name="show" value="1">Go</button>
</form>

<?php
if (isset($_POST["show"])) {      // 1. was it submitted?
    $num = $_POST["num"];         // 2. isset FIRST, read SECOND
    if (!is_numeric($num)) {      // 3. validate
        echo "<p>Please type a number.</p>";
    } else {
        echo "<p>You typed " . $num . "</p>";   // 4. output
    }
}
```

**Why `isset` comes first.** On the very first visit nothing has been posted.
Reading `$_POST["num"]` before checking it exists prints
`Warning: Undefined array key "num"` on the page.

**`action=""`** posts back to the same file. Typing a filename there means the
form breaks the moment the file is renamed.

---

## A note on `define()`

**It is not in any of her three decks.** Not one slide mentions constants,
`define()` or `const`. The exam announcement does not mention them either —
it lists "Variables & Scope", not constants.

So: **do not spend tonight on it.** For completeness, the answer is in the
revision questions page.
