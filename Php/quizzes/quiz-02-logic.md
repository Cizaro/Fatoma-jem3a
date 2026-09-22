# Quiz 2 — Operators & Conditions
**Covers lessons 3–4 · 15 questions**

Name: ______________  Score: ____ / 15

---

### Part A — Multiple choice (1 point each)

**1.** What is the difference between `=` and `==`?
- a) No difference
- b) `=` puts a value in, `==` compares
- c) `==` puts a value in, `=` compares
- d) `==` only works with numbers

**2.** `5 === "5"` gives:
- a) `true`
- b) `false`
- c) `1`
- d) Error

**3.** Which operator means AND?
- a) `&`
- b) `&&`
- c) `AND ONLY`
- d) `++`

**4.** `$x = 10; $x += 5;` — what is `$x`?
- a) `5`
- b) `10`
- c) `15`
- d) `105`

**5.** What keyword handles "everything else" in an `if` chain?
- a) `elseif`
- b) `default`
- c) `else`
- d) `otherwise`

**6.** In a `switch`, what happens if you forget `break`?
- a) Nothing, it is optional
- b) Error
- c) The next cases also run
- d) The switch restarts

**7.** Which of these is **false** in PHP?
- a) `"hello"`
- b) `-5`
- c) `"0"`
- d) `"false"`

**8.** What does `echo 2 + 3 * 4;` print?
- a) `20`
- b) `14`
- c) `9`
- d) `24`

---

### Part B — What does it print? (1 point each)

**9.**
```php
$grade = 15;
if ($grade >= 10) {
    echo "Pass";
} elseif ($grade >= 14) {
    echo "Very good";
}
```
Answer: ______ · and **why is that a problem?** ____________________

**10.**
```php
$age = 20;
echo ($age >= 18) ? "adult" : "child";
```
Answer: ______

**11.**
```php
$a = true;
$b = false;
var_dump($a && $b);
var_dump($a || $b);
```
Answer: ______ / ______

**12.**
```php
$x = 5;
if ($x = 100) {
    echo "big";
} else {
    echo "small";
}
```
Answer: ______ · and **why?** ____________________

---

### Part C — Write the code (1 point each)

**13.** Write an `if` that prints `"Even"` when `$n` is even and `"Odd"` otherwise.

```php
_________________________________
_________________________________
_________________________________
```

**14.** Write a `switch` on `$color` with cases `"red"` and `"blue"`, and a default.

```php
_________________________________
_________________________________
_________________________________
_________________________________
```

**15.** A student passes if the grade is 10 or more **AND** attendance is 75 or more.
Write the condition:

```php
if (_________________________________) {
    echo "Passed";
}
```

---

**Bonus (+1):** Put these in the right order for a grade check and explain why:
`>= 10`, `>= 16`, `>= 14`
