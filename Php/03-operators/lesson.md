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
