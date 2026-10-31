# MIT320 Partial I - Mock Exam

Lessons 1 to 3 &middot; 60 minutes &middot; 50 marks. Sit it with no notes and no computer, then mark it from the answers page.

> There is a printable PDF of this paper, and a separate one with the answers, built by `scripts/build-mock-exam.py`.

## Section 1 - Multiple Choice

*Circle one. 10 marks, about 12 minutes.*

**1.** Where does PHP code run?

- a) in the browser
- b) on the server, before the HTML is sent to the browser
- c) in the browser, after the HTML has loaded
- d) inside the database

**2.** Which of these is a VALID PHP variable name?

- a) $2php
- b) $my-var
- c) $_total
- d) my_var

**3.** What does  echo 10 . 5;  print?

- a) 15
- b) 105
- c) 10.5
- d) a syntax error

**4.** In PHP 8, what does  echo "Total: " . 5 + 3;  print?

- a) Total: 53
- b) Total: 8
- c) 8
- d) a syntax error

**5.** var_dump((int) "12abc");  gives:

- a) int(0)
- b) int(12)
- c) string(5) "12abc"
- d) a fatal error

**6.** Which comparison is TRUE?

- a) 0 == "a"
- b) null === false
- c) "1" == "01"
- d) "abc" == 0

**7.** What does  7 / 2  produce?

- a) int(3)
- b) float(3.5)
- c) int(4)
- d) string("3.5")

**8.** Which loop is guaranteed to run at least once?

- a) for
- b) while
- c) do-while
- d) foreach

**9.** Inside a loop, continue:

- a) ends the loop completely
- b) skips the rest of this pass and starts the next
- c) starts the loop again from the first pass
- d) stops the whole script

**10.** Which is a valid PHP comment?

- a) <!-- note -->
- b) ** note **
- c) # note
- d) ' note

## Section 2 - True or False

*8 marks, about 6 minutes.*

**1.** Every PHP variable name must begin with a $ sign.
**2.** $Name and $name refer to the same variable.
**3.** The === operator compares the value AND the data type.
**4.** "5" === 5 evaluates to true.
**5.** The + operator joins two strings together in PHP.
**6.** (bool) "0.0" evaluates to false.
**7.** empty("0") returns true.
**8.** Changing $v inside  foreach ($arr as $v)  changes the array.

## Section 3 - Code Output and Tracing

*Write the EXACT output. Spaces matter. 12 marks, about 17 minutes.*

**1.** What is printed?

```php
<?php
$a = "5";
$b = 5;
var_dump($a == $b);
var_dump($a === $b);
```

**2.** What is printed?

```php
<?php
for ($i = 1; $i <= 6; $i++) {
    if ($i % 2 == 0) continue;
    if ($i == 5) break;
    echo $i . " ";
}
```

**3.** What is printed?

```php
<?php
$n = 10;
do {
    echo "run ";
    $n++;
} while ($n < 5);
```

**4.** What is printed?

```php
<?php
$s = "PHP";
$s .= " is";
$s .= " fun";
echo $s . " (" . strlen($s) . ")";
```

**5.** What is printed?

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

**6.** What is printed?

```php
<?php
$x = 10;
$y = $x++;
$z = ++$x;
echo "$x $y $z";
```

**7.** This script has **three** faults. Name each one and give the correction.

```php
<?php
$price = 10
$qty = "3";
if ($price = 10) {
    echo "Total: " + $price * $qty;
}
```

## Section 4 - Main Algorithmic and Coding Exercise

*20 marks, about 25 minutes. All three deliverables are required.*

A tutor types **five marks out of 20** into a form, one box per student,
and presses **Show results**. The page must then display a table of the five marks
with a letter grade beside each one, and underneath it the total, the average to two
decimal places, the highest mark, and how many students passed (a pass is 10 or more).
If any box is empty or holds something that is not a number from 0 to 20, the page must
say so and show no table.

**Grades:** 18 and over = A  |  16 = B  |  14 = C  |  10 = D  |  under 10 = F

**(a) Pseudocode** - 5 marks

**(b) Flowchart** - 5 marks, showing the inputs, the decisions and the loop

**(c) PHP code** - 10 marks, with inline `//` comments and a PHPDoc block (`/** ... */`)
