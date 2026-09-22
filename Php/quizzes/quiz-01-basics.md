# Quiz 1 — Basics & Data Types
**Covers lessons 1–2 · 15 questions · no looking at the lessons!**

Name: ______________  Score: ____ / 15

---

### Part A — Multiple choice (1 point each)

**1.** Which one prints text in PHP?
- a) `print_text()`
- b) `echo`
- c) `write`
- d) `console.log`

**2.** Which is a valid variable name?
- a) `$2name`
- b) `name`
- c) `$first_name`
- d) `$first name`

**3.** What does this print?
```php
$city = "Beirut";
echo 'I live in $city';
```
- a) `I live in Beirut`
- b) `I live in $city`
- c) `I live in`
- d) Error

**4.** What is the type of `"25"`?
- a) int
- b) float
- c) string
- d) bool

**5.** What does `echo 17 % 5;` print?
- a) `3.4`
- b) `3`
- c) `2`
- d) `85`

**6.** Which symbol joins two strings together?
- a) `+`
- b) `&`
- c) `.`
- d) `,`

**7.** What does `echo false;` print?
- a) `false`
- b) `0`
- c) nothing
- d) Error

**8.** `strlen("PHP is fun")` gives:
- a) `8`
- b) `9`
- c) `10`
- d) `3`

---

### Part B — What does it print? (1 point each)

**9.**
```php
$x = 5;
$x = 12;
echo $x;
```
Answer: ______

**10.**
```php
echo strtoupper("hello") . "-" . strlen("hello");
```
Answer: ______

**11.**
```php
$a = 10;
$b = "10";
var_dump($a == $b);
```
Answer: ______

**12.**
```php
echo substr("Programming", 0, 4);
```
Answer: ______

---

### Part C — Write the code (1 point each)

**13.** Write one line that stores your age in a variable called `$age`.

```php
_________________________________
```

**14.** Write a line that prints `Hello Fatima!` using a variable `$name = "Fatima";`

```php
_________________________________
```

**15.** Find the 3 mistakes in this code and rewrite it correctly:

```php
<?php
name = "Sara"
echo 'Welcome $name'
```

Corrected:
```php
_________________________________
_________________________________
```

---

**Bonus (+1):** Why do we use `var_dump()` instead of `echo` when checking a boolean?
