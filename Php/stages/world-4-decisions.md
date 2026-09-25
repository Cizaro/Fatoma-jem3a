# 🟠 World 4 — Decisions
### Stages 16–20 · about 30 minutes

Everything so far ran top to bottom, every time. From here your code can **choose**.
This is where programming actually starts.

Practice file: `stages/practice/world-4.php`

---

## 🟠 Stage 16 — The shape of an if

**🎯 Goal:** get the brackets in the right places.

**⌨️ The syntax**

```php
if ($age >= 18) {
    echo "adult";
}
```

Learn the **shape** before the meaning:

```
if  ( condition )  {  code  }
    └─ round ──┘      └ curly ┘
```

- Round brackets `( )` hold the **question**
- Curly brackets `{ }` hold the **code that runs if the answer is yes**
- **No semicolon after the `)`** — the block is the statement

**✅ Clear the stage**
Set `$age = 20;` and print "adult" only if they're 18 or over.
Then change it to `15` and run again — nothing prints, which is correct.

**💀 If it breaks**
`if ($age >= 18);` with a semicolon → the block detaches and **always** runs.
This is a silent bug: no error, just wrong behaviour. Watch for it.

---

## 🟠 Stage 17 — The other path

**🎯 Goal:** do something when the answer is no.

**⌨️ The syntax**

```php
if ($age >= 18) {
    echo "adult";
} else {
    echo "child";
}
```

`else` has no condition of its own — it means "in every other case". The `}` of the `if` and
the `else` sit on the same line. That's convention, but matching everyone else's convention
is how your code stays readable.

For more than two paths:

```php
if ($mark >= 18) {
    echo "A";
} elseif ($mark >= 14) {
    echo "B";
} elseif ($mark >= 10) {
    echo "C";
} else {
    echo "F";
}
```

🚨 **Order is everything.** PHP checks top to bottom and **stops at the first true one**.
Put `>= 10` first and a mark of 19 prints "C" — because 19 *is* ≥ 10, and PHP never looks any
further. **Strictest condition first.**

**✅ Clear the stage**
Write the grade chain above and test it with 19, 15, 11 and 4.
Then deliberately move `>= 10` to the top, run it with 19, and watch it break. Put it back.

**💀 If it breaks**
Everything getting the same answer? Your conditions are in the wrong order.

---

## 🟠 Stage 18 — Comparing

**🎯 Goal:** ask the right question.

**⌨️ The syntax**

| Symbol | Asks |
|---|---|
| `==` | are these the same value? |
| `===` | same value **and** same type? |
| `!=` | are they different? |
| `>` `<` | bigger / smaller |
| `>=` `<=` | bigger or equal / smaller or equal |

🚨 **The single most common beginner bug in any language:**

```php
$x = 5;      // PUT 5 into x
$x == 5;     // IS x equal to 5?
```

One `=` **changes** the variable. Two `==` **ask a question**. And this runs fine:

```php
if ($x = 100) {      // ← assigns 100, then treats 100 as "true"
    echo "always prints";
}
```

No error. Just permanently wrong. When an `if` behaves insanely, check this first.

And the `===` difference:

```php
var_dump(5 == "5");    // true  — same value
var_dump(5 === "5");   // false — int vs string
```

**✅ Clear the stage**
`var_dump()` each of these, predicting first:
`5 == 5` · `5 == "5"` · `5 === "5"` · `5 != 4` · `"abc" == "ABC"` · `0 == false`

**💀 If it breaks**
Nothing here errors — which is exactly why these bugs are dangerous.

---

## 🟠 Stage 19 — Two conditions at once

**🎯 Goal:** combine questions.

**⌨️ The syntax**

```php
if ($age >= 18 && $hasCard) {           // BOTH must be true
    echo "come in";
}

if ($day == "Sat" || $day == "Sun") {   // AT LEAST ONE must be true
    echo "weekend";
}

if (!$isBanned) {                       // NOT — flips true and false
    echo "allowed";
}
```

Read them as English: *"if the age is 18 or more **and** they have a card"*. That's exactly
how the code reads, which is the point.

**✅ Clear the stage**
A student passes if the grade is 10 or more **AND** attendance is 75 or more.
Write it, then test all four combinations: pass/pass, pass/fail, fail/pass, fail/fail.

**💀 If it breaks**
`and` and `or` also exist as words in PHP, but they behave differently in edge cases.
Stick to `&&` and `||`.

---

## 🟠 Stage 20 — switch, and the tiny if

**🎯 Goal:** two shortcuts worth knowing.

**⌨️ The syntax — switch**

```php
switch ($day) {
    case "Mon":
        echo "Start of the week";
        break;
    case "Sat":
    case "Sun":
        echo "Weekend!";
        break;
    default:
        echo "A normal day";
}
```

- Use `switch` when you're comparing **one variable** against **exact values**
- Use `if` for ranges (`>= 10`)
- 🚨 **`break` is not optional.** Leave it out and PHP carries on into the next case.
  (Stacking `"Sat"` and `"Sun"` above uses that on purpose — the one time it's deliberate.)

**⌨️ The syntax — the ternary**

```php
$result = ($mark >= 10) ? "Pass" : "Fail";
```

Read it: *condition* `?` *if true* `:` *if false*. A whole if/else on one line.
Great for short things, terrible for long ones.

**✅ Clear the stage**
Write a switch on `$fruit` for apple / banana / grape with a default.
Then write a ternary that prints "Even" or "Odd" for `$n`.

**💀 If it breaks**
Two cases both printing? Missing `break;`.

---

## 👑 WORLD 4 BOSS

Build a **login and access checker**:

```php
$username = "fatima";
$password = "php2026";
$isAdmin  = false;
$attempts = 1;
```

Rules to implement:
1. If the account is locked (`$attempts` over 3) → `Account locked` and nothing else.
2. Wrong username **or** wrong password → `Wrong username or password`.
3. Correct, and admin → `Welcome boss`.
4. Correct, not admin → `Welcome fatima`.

Then test all four paths by changing the variables.

**Extra:** add a grade chain that prints a letter grade from `$mark` — and make sure a mark
of 19 gets an A, not a C.

**Cleared it?** ▶ [World 5 — Repeats](world-5-repeats.md)

---

◀ [World 3](world-3-numbers.md) · [the map](README.md)
