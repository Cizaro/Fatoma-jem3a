# Lesson 2 — Data Types & Strings

PHP values come in types. You never declare the type — PHP looks at the value and decides.

## The 4 types you'll use every day

| Type | Means | Example |
|---|---|---|
| **string** | text | `"Fatima"`, `'hello'`, `"123"` |
| **int** | whole number | `20`, `-5`, `0` |
| **float** | decimal number | `15.75`, `3.14` |
| **bool** | true or false | `true`, `false` |

Two more you'll meet later: **array** (Lesson 6) and **null** (= empty, nothing).

```php
$name   = "Fatima";   // string
$age    = 20;         // int
$grade  = 15.5;       // float
$passed = true;       // bool
```

### Check a type

```php
var_dump($age);     // int(20)
echo gettype($age); // integer
```

`var_dump()` is your best friend when something behaves weirdly — it shows the type *and* the value.

⚠️ `"20"` (with quotes) is a **string**, not a number. It usually still works in math because PHP
converts it automatically, but `var_dump` will show you the truth.

### Printing a bool surprises everyone

```php
echo true;    // prints 1
echo false;   // prints NOTHING (empty)
```

That's why we use `var_dump()` for booleans.

## Strings — the things you'll touch most

### Glue them: `.`

```php
$first = "Fatima";
$last  = "Ali";
$full  = $first . " " . $last;   // "Fatima Ali"
```

`.=` adds to the end of an existing string:

```php
$s = "Hello";
$s .= " world";   // "Hello world"
```

### Useful string functions

```php
strlen("Fatima")               // 6      - how many characters
strtoupper("fatima")           // FATIMA
strtolower("FATIMA")           // fatima
ucfirst("fatima")              // Fatima - capital first letter
trim("  hi  ")                 // "hi"   - removes spaces at the edges
strrev("abc")                  // cba    - reversed
str_replace("a", "@", "cat")   // c@t
substr("Fatima", 0, 3)         // Fat    - cut from position 0, 3 chars
strpos("Fatima", "t")          // 2      - where is "t"? (counting from 0!)
str_repeat("-", 10)            // ----------
```

> **Counting starts at 0**, not 1. In `"Fatima"`, `F` is position 0, `a` is 1, `t` is 2.
> This trips up every beginner exactly once. Now it's twice, because I warned you. 🙂

## Numbers

```php
$a = 10;
$b = 3;

echo $a + $b;      // 13
echo $a / $b;      // 3.3333333333333
echo intdiv($a,$b);// 3        - whole division
echo $a % $b;      // 1        - the REMAINDER (modulo)
echo round(3.7);   // 4
echo floor(3.7);   // 3        - always down
echo ceil(3.2);    // 4        - always up
echo abs(-5);      // 5
echo max(4, 9, 2); // 9
echo min(4, 9, 2); // 2
echo rand(1, 6);   // a random number, like rolling a dice
```

**`%` (modulo) is more useful than it looks:** `$n % 2 == 0` means "`$n` is even". You'll use
that trick constantly.

## Converting types

```php
$text   = "42";
$number = (int) $text;      // 42 as a real int
$price  = (float) "9.99";   // 9.99
$s      = (string) 100;     // "100"
```

---

## Watch out ⚠️

- `"5" + 5` gives `10` (PHP converts). But `"abc" + 5` is an error in PHP 8.
- `.` joins text, `+` adds numbers. Using `+` on two strings tries to add them as numbers!
- `echo false;` prints nothing — not the word "false".

---

➡️ `examples.php` → `exercises.php` → quiz-01
