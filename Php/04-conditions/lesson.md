# Lesson 4 — Making Decisions: if / else / switch

Until now your code ran straight from top to bottom. Now it can **choose**.

## 1. `if`

```php
$age = 20;

if ($age >= 18) {
    echo "You are an adult";
}
```

Shape:

```php
if (condition) {
    // runs ONLY if the condition is true
}
```

- The condition goes in **round brackets** `( )`
- The code goes in **curly brackets** `{ }`
- **No semicolon after `if (...)`** ← writing `if ($x > 5);` is a classic silent bug

## 2. `if / else`

```php
if ($age >= 18) {
    echo "Adult";
} else {
    echo "Child";
}
```

`else` = "in all other cases". It has no condition of its own.

## 3. `if / elseif / else`

For more than two paths:

```php
$grade = 15;

if ($grade >= 16) {
    echo "Excellent";
} elseif ($grade >= 14) {
    echo "Very good";
} elseif ($grade >= 10) {
    echo "Pass";
} else {
    echo "Fail";
}
```

⚠️ **Order matters!** PHP checks top to bottom and **stops at the first true one**.
If you put `$grade >= 10` first, a grade of 18 would print "Pass" and never reach "Excellent".

## 4. Nested `if` (an if inside an if)

```php
if ($isLoggedIn) {
    if ($isAdmin) {
        echo "Welcome boss";
    } else {
        echo "Welcome user";
    }
} else {
    echo "Please log in";
}
```

Works, but too much nesting gets ugly. Often `&&` is cleaner:

```php
if ($isLoggedIn && $isAdmin) { ... }
```

## 5. `switch` — when you compare ONE variable to many values

```php
$day = "Monday";

switch ($day) {
    case "Saturday":
    case "Sunday":
        echo "Weekend!";
        break;
    case "Monday":
        echo "Start of the week";
        break;
    default:
        echo "A normal day";
}
```

- `break` stops the switch. **Forget it and PHP keeps running the next cases** (this is called
  "fall-through"). Sometimes useful on purpose — like stacking `Saturday` and `Sunday` above.
- `default` is the `else` of switch.

Use `switch` for exact values (a day, a menu choice). Use `if` for ranges (`>= 10`).

## 6. What counts as true?

PHP treats these as **false**: `false`, `0`, `0.0`, `""` (empty string), `"0"`, `[]` (empty array), `null`.
**Everything else is true** — including `"hello"`, `-5`, and `"false"` (a non-empty string!).

```php
if ("0")    // false! surprising but true
if ("hi")   // true
if (-3)     // true
```

---

## Watch out ⚠️

| Mistake | Result |
|---|---|
| `if ($x = 5)` | assigns instead of comparing → always true |
| `if ($x > 5);` | the `;` ends the if — the block always runs |
| missing `break` in switch | several cases run |
| wrong order of `elseif` | wrong branch wins |

---

➡️ `examples.php` → `exercises.php` → quiz-02 → play "Fix the bug" in the arcade
