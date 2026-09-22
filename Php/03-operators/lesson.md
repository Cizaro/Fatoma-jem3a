# Lesson 3 — Operators

An operator is a symbol that does something to values. You already used `+` and `.`.

## 1. Arithmetic (math)

| Op | Name | `$a = 10, $b = 3` |
|---|---|---|
| `+` | add | `13` |
| `-` | subtract | `7` |
| `*` | multiply | `30` |
| `/` | divide | `3.333...` |
| `%` | modulo (remainder) | `1` |
| `**` | power | `10 ** 3` = `1000` |

## 2. Assignment (putting values in)

| Op | Example | Same as |
|---|---|---|
| `=` | `$x = 5` | — |
| `+=` | `$x += 3` | `$x = $x + 3` |
| `-=` | `$x -= 3` | `$x = $x - 3` |
| `*=` | `$x *= 2` | `$x = $x * 2` |
| `/=` | `$x /= 2` | `$x = $x / 2` |
| `.=` | `$s .= "hi"` | `$s = $s . "hi"` |

### `++` and `--`

```php
$i = 5;
$i++;   // now 6   ("increment")
$i--;   // now 5   ("decrement")
```

You will see `$i++` in **every loop** next lesson.

## 3. Comparison — these give `true` or `false`

| Op | Means | Example |
|---|---|---|
| `==` | equal **in value** | `5 == "5"` → true |
| `===` | equal in value **AND type** | `5 === "5"` → **false** |
| `!=` | not equal | `5 != 3` → true |
| `!==` | not identical | `5 !== "5"` → true |
| `>` | greater | `5 > 3` → true |
| `<` | smaller | `5 < 3` → false |
| `>=` | greater or equal | `5 >= 5` → true |
| `<=` | smaller or equal | `4 <= 5` → true |

### 🚨 The #1 beginner bug: `=` vs `==`

```php
$x = 5;     // PUT 5 into x        (assignment)
$x == 5;    // IS x equal to 5?    (question → true/false)
```

Writing `if ($x = 5)` instead of `if ($x == 5)` **changes** `$x` and the `if` is always true.
When your `if` behaves insanely, check this first.

### `==` vs `===`

```php
5 == "5"    // true   — same value, PHP ignores the type
5 === "5"   // false  — one is int, one is string
```

Use `===` when you want to be strict and safe. Many bugs disappear when you use `===`.

## 4. Logical — combining conditions

| Op | Name | True when |
|---|---|---|
| `&&` | AND | **both** sides are true |
| `\|\|` | OR | **at least one** side is true |
| `!` | NOT | flips it: `!true` → false |

```php
$age = 20;
$hasCard = true;

$age >= 18 && $hasCard   // true  — both conditions pass
$age >= 18 || $hasCard   // true  — one is enough
!$hasCard                // false
```

Think of it in normal language:
*"You can enter **if** you are 18 **and** you have a card."*

## 5. Order (who goes first)

Same as in math class: `*` and `/` before `+` and `-`. Comparison happens after math.
Logical `&&` / `||` come last.

```php
echo 2 + 3 * 4;      // 14   (not 20)
echo (2 + 3) * 4;    // 20
```

**Use brackets when unsure.** Nobody has ever been fired for writing extra brackets.

## 6. Bonus: the ternary (a tiny if)

```php
$age = 20;
$status = ($age >= 18) ? "adult" : "child";
```

Read it as: *condition `?` value-if-true `:` value-if-false*. Handy, but don't overuse it.

---

➡️ `examples.php` → `exercises.php`

---

## 💡 Did you know

PHP has an operator officially called the **spaceship**: `<=>`. It returns `-1`, `0` or `1`
depending on whether the left side is smaller than, equal to, or bigger than the right.

```php
echo 1 <=> 2;   // -1
echo 2 <=> 2;   //  0
echo 3 <=> 2;   //  1
```

It exists because sorting functions need exactly those three answers. It arrived in PHP 7,
and yes, that is its real name — because it looks like a little spaceship.

## 🎮 Play with it

1. **Dice.** `echo rand(1, 6);` — run it ten times. Then roll two dice and print the total.
2. **The odd/even machine.** Print `$n % 2` for the numbers 1 to 10 in a row.
   You get `1 0 1 0 1 0...` — that alternating pattern is the trick behind striped table
   rows on real websites.
3. **Clock maths.** It is 21:00. What time is it 7 hours later? `(21 + 7) % 24`.
   The same `%` you use for even numbers, doing something completely different.

## 🏆 Boss challenge

**Seconds into a readable time.** From `$seconds = 9384;` print `2h 36m 24s`.

You need `intdiv()` and `%` working together, and you have to think about what is left over
after each step. This is the exact logic behind every video player's progress bar.

## ▶ Practise this lesson

`games/php-arcade.html` → **Speed Round** ·
`flashcards.html` → deck 1 *Syntax & symbols* · `quizzes/mini-quizzes/lesson-03.md`
