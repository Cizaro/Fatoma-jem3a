# Mock Exam - Answers

Every traced output in Section 3 was produced by running the snippet through PHP 8.2, not by reading it. Where PHP 8 changed a behaviour that older notes still teach, it is called out.

## Section 1 - Multiple Choice

**1.** Where does PHP code run?

**b) on the server, before the HTML is sent to the browser**

The browser never sees PHP. It receives only what the script printed.

**2.** Which of these is a VALID PHP variable name?

**c) $_total**

A name may start with a letter or an underscore, never a digit; a hyphen is a minus sign; and without the $ it is not a variable at all.

**3.** What does  echo 10 . 5;  print?

**b) 105**

The dot joins. It turns both numbers into text and sticks them together.

**4.** In PHP 8, what does  echo "Total: " . 5 + 3;  print?

**b) Total: 8**

PHP 8 changed the precedence: + now binds tighter than the dot, so the addition happens first. In PHP 7 this was an error.

**5.** var_dump((int) "12abc");  gives:

**b) int(12)**

Casting to int reads digits from the front and stops at the first character that is not one.

**6.** Which comparison is TRUE?

**c) "1" == "01"**

Two numeric strings are compared as numbers, and 1 equals 01. The first and last were true in PHP 7 and are false in PHP 8.

**7.** What does  7 / 2  produce?

**b) float(3.5)**

Division always produces a float in PHP unless you ask for intdiv().

**8.** Which loop is guaranteed to run at least once?

**c) do-while**

Its test is at the bottom, so the body has already run before anything is checked.

**9.** Inside a loop, continue:

**b) skips the rest of this pass and starts the next**

break ends the loop; continue only ends the current pass.

**10.** Which is a valid PHP comment?

**c) # note**

PHP takes //, # and /* ... */. The first is an HTML comment, which PHP ignores and the browser shows in the source.

## Section 2 - True or False

**1.** Every PHP variable name must begin with a $ sign.

**TRUE** - No exceptions. Leaving it off makes PHP read a bare word instead.

**2.** $Name and $name refer to the same variable.

**FALSE** - Variable names are case sensitive. (Function names are not.)

**3.** The === operator compares the value AND the data type.

**TRUE** - That is the whole difference between === and ==.

**4.** "5" === 5 evaluates to true.

**FALSE** - Same value, different types - string against integer - so === says no.

**5.** The + operator joins two strings together in PHP.

**FALSE** - The dot joins. + tries to add, converting the text to numbers first.

**6.** (bool) "0.0" evaluates to false.

**FALSE** - It is TRUE. Only the empty string and the single character "0" are falsy strings; "0.0" is neither.

**7.** empty("0") returns true.

**TRUE** - empty() counts "0" as empty, which is exactly why it is the wrong check for a quantity box someone legitimately typed 0 into.

**8.** Changing $v inside  foreach ($arr as $v)  changes the array.

**FALSE** - $v is a copy. Changing the array needs a reference: foreach ($arr as &$v).

## Section 3 - Code Output and Tracing

**1.**

```php
<?php
$a = "5";
$b = 5;
var_dump($a == $b);
var_dump($a === $b);
```

Output:

```
bool(true)
bool(false)
```

== converts the string to a number and finds them equal. === compares the types first and stops there.

**2.**

```php
<?php
for ($i = 1; $i <= 6; $i++) {
    if ($i % 2 == 0) continue;
    if ($i == 5) break;
    echo $i . " ";
}
```

Output:

```
1 3 
```

2, 4 and 6 are skipped by continue. At 5 the loop breaks before the echo, so 5 is never printed.

**3.**

```php
<?php
$n = 10;
do {
    echo "run ";
    $n++;
} while ($n < 5);
```

Output:

```
run 
```

The test is at the bottom, so the body runs once even though 10 was never less than 5.

**4.**

```php
<?php
$s = "PHP";
$s .= " is";
$s .= " fun";
echo $s . " (" . strlen($s) . ")";
```

Output:

```
PHP is fun (10)
```

.= adds to the end of what is already there. "PHP is fun" is ten characters including the two spaces.

**5.**

```php
<?php
$cart = ["pen" => 3, "book" => 12, "bag" => 25];
$t = 0;
foreach ($cart as $item => $price) {
    if ($price < 5) continue;
    $t += $price;
}
echo $t;
```

Output:

```
37
```

The pen at 3 is skipped, so 12 + 25.

**6.**

```php
<?php
$x = 10;
$y = $x++;
$z = ++$x;
echo "$x $y $z";
```

Output:

```
12 10 12
```

$x++ hands back the old value and then adds; ++$x adds first and hands back the new one. $x is raised twice either way.

**7.** The three faults:

- Line 2 has no semicolon at the end.
- The if uses = (which puts a value in and is always true) instead of ==.
- The output uses + to join text to a number; it should be the dot.

Only the first stops the script from parsing. The other two run happily and give a wrong answer, which is the point of the question.

## Section 4 - Main Exercise

A tutor types **five marks out of 20** into a form, one box per student,
and presses **Show results**. The page must then display a table of the five marks
with a letter grade beside each one, and underneath it the total, the average to two
decimal places, the highest mark, and how many students passed (a pass is 10 or more).
If any box is empty or holds something that is not a number from 0 to 20, the page must
say so and show no table.

### (a) Pseudocode

```
START
  IF the Show results button was pressed THEN
      TOTAL   <-- 0
      HIGHEST <-- nothing yet          [not 0: zero is a legal mark]
      PASSES  <-- 0
      PRINT the table heading row      [once, outside the loop]
      I <-- 1
      WHILE I <= 5
          MARK <-- the mark typed for student I
          IF MARK is not a number OR MARK < 0 OR MARK > 20 THEN
              PRINT "Every mark must be a number from 0 to 20."
              STOP
          ENDIF
          TOTAL <-- TOTAL + MARK
          IF MARK >= 10 THEN PASSES <-- PASSES + 1 ENDIF
          IF HIGHEST is nothing OR MARK > HIGHEST THEN HIGHEST <-- MARK ENDIF
          PRINT a row holding I, MARK and the letter grade for MARK
          I <-- I + 1
      ENDWHILE
      PRINT the end of the table
      PRINT TOTAL
      PRINT TOTAL / 5 to two decimal places
      PRINT HIGHEST
      PRINT PASSES
  ENDIF
STOP
```

### (b) Flowchart

```
( START )
    |
< Show results pressed ? > --no--> ( STOP )
    | yes
[ TOTAL <-- 0 , HIGHEST <-- none , PASSES <-- 0 ]
    |
/ print the heading row ONCE /
    |
[ I <-- 1 ]
    |
< I <= 5 ? > --no--> / print total, average, highest, passes / --> ( STOP )
    | yes
/ read MARK for student I /
    |
< MARK valid ? > --no--> / print the error / --> ( STOP )
    | yes
[ TOTAL <-- TOTAL + MARK ]
    |
< MARK >= 10 ? > --yes--> [ PASSES <-- PASSES + 1 ]
    |
< MARK > HIGHEST ? > --yes--> [ HIGHEST <-- MARK ]
    |
/ print the row for student I /
    |
[ I <-- I + 1 ]
    |
    +---- back up to < I <= 5 ? >
```

### (c) PHP

```php
<?php
/**
 * Exam results dashboard.
 *
 * Reads five marks out of 20 from a POST form, grades each one, and
 * reports the total, the average, the highest mark and the pass count.
 *
 * @author  Fatima Al-Helou
 * @version 1.0
 */

/**
 * Turn a mark out of 20 into a letter grade.
 *
 * @param  int|float $mark The mark to grade, 0 to 20.
 * @return string          A, B, C, D or F.
 */
function letterGrade($mark) {
    if ($mark >= 18)     { return "A"; }
    elseif ($mark >= 16) { return "B"; }
    elseif ($mark >= 14) { return "C"; }
    elseif ($mark >= 10) { return "D"; }
    return "F";
}

// Nothing below runs until the button has actually been pressed.
if (isset($_POST["show"])) {

    $total   = 0;      // running sum of every mark
    $highest = null;   // null, not 0 - a mark of 0 is legal
    $passes  = 0;      // how many reached 10

    echo "<table border='1'>";
    echo "<tr><th>Student</th><th>Mark</th><th>Grade</th></tr>";

    // One pass per student; $i doubles as the student number shown.
    for ($i = 1; $i <= 5; $i++) {

        $mark = $_POST["mark" . $i];

        // Everything from a form is text, and the box may be empty.
        if (!is_numeric($mark) || $mark < 0 || $mark > 20) {
            echo "</table>";
            echo "<p>Every mark must be a number from 0 to 20.</p>";
            return;
        }

        $total += $mark;
        if ($mark >= 10) { $passes++; }
        if ($highest === null || $mark > $highest) { $highest = $mark; }

        echo "<tr>";
        echo "<td>Student " . $i . "</td>";
        echo "<td>" . $mark . "</td>";
        echo "<td>" . letterGrade($mark) . "</td>";
        echo "</tr>";
    }

    echo "</table>";

    // Worked out after the loop, never inside it.
    echo "<p>Total: "   . $total . "</p>";
    echo "<p>Average: " . number_format($total / 5, 2) . "</p>";
    echo "<p>Highest: " . $highest . "</p>";
    echo "<p>Passed: "  . $passes . " out of 5</p>";
}
```

### Marking

| What | Marks | Look for |
|---|---|---|
| Pseudocode | 5 | Counter set before the loop; the loop tests up to and including 5; the totals are printed after it, not inside. CAPITALS and <-- are his conventions and are expected. |
| Flowchart | 5 | Start AND Stop both drawn; input and output in parallelograms; every decision a diamond with both ways labelled; the arrow back up to the loop test present. An unconnected box loses a mark. |
| PHP, working | 6 | Loop runs exactly five times, total and pass count accumulate outside the loop, average divides after it. |
| PHP, documented | 4 | One PHPDoc block for the script and one for the function, with @param and @return, plus inline // comments that say WHY rather than restating the line. |

### Say these out loud before she sits it

- Write the $ on every variable. It is the single most common lost mark.
- Join text with the dot. The + will quietly turn your words into numbers.
- === checks the value AND the type; == checks the value after converting.
- In an if, == asks a question. A single = puts a value in and is always true.
- A PHPDoc block is /** on its own line, a one-line summary, then @param and @return. Section 4 asks for it by name.
