# 🔵 World 2 — Boxes
### Stages 6–10 · about 25 minutes

A variable is a box with a name. You put something in, you take it out later. That's the
entire idea — everything else in this world is about typing it correctly.

Practice file: `stages/practice/world-2.php`

---

## 🔵 Stage 6 — Your first box

**🎯 Goal:** store a value and print it back.

**⌨️ The syntax**

```php
$name = "Fatima";
echo $name;
```

Read `$name = "Fatima";` out loud as **"put Fatima into name"**. Not "name equals Fatima".

That wording matters more than it looks. In World 4 you'll meet `==`, which really *does* mean
"equals", and people who learned to read `=` as "equals" mix the two up for months.

| Piece | Rule |
|---|---|
| `$` | every variable starts with it. No exceptions. |
| `name` | your choice of name |
| `=` | "put into" |
| `"Fatima"` | the value |
| `;` | full stop |

**✅ Clear the stage**
Make a variable with your name in it, then print it.

**💀 If it breaks**
`Undefined variable $nmae` → a typo. PHP doesn't guess; the name has to match exactly.

---

## 🔵 Stage 7 — Naming the box

**🎯 Goal:** know which names are legal.

**⌨️ The syntax**

```php
$name      // ✅
$my_age    // ✅
$myAge     // ✅
$_id       // ✅
$age2      // ✅

age        // ❌ no $
$2fast     // ❌ can't start with a number
$my age    // ❌ no spaces
$my-age    // ❌ no dashes (PHP reads that as minus)
```

And the one that catches everybody:

```php
$name = "Sara";
echo $Name;     // ❌ different variable. PHP is case sensitive.
```

**✅ Clear the stage**
Make three variables: `$firstName`, `$age`, `$city`. Print all three.
Then deliberately print `$City` with a capital and read the warning. Fix it.

**💀 If it breaks**
`Undefined variable` almost always means capitals or a typo. Check both.

---

## 🔵 Stage 8 — Quotes matter

**🎯 Goal:** understand the single difference between `'` and `"`.

**⌨️ The syntax**

```php
$city = "Beirut";

echo "I live in $city";     // I live in Beirut
echo 'I live in $city';     // I live in $city
```

**Double quotes are smart** — they look inside for variables and replace them.
**Single quotes are literal** — they print exactly what's between them.

That's it. That's the whole difference. `\n` follows the same rule: it only works in doubles.

**✅ Clear the stage**
Print the same sentence twice, once each way, and look at the two outputs side by side.
Write a comment saying which one you'd use and why.

**💀 If it breaks**
Want to print an actual `$`? Escape it: `echo "costs \$5";`

---

## 🔵 Stage 9 — Joining text

**🎯 Goal:** glue pieces together.

**⌨️ The syntax**

```php
$first = "Fatima";
$last  = "Hassan";

echo $first . " " . $last;      // Fatima Hassan
echo "$first $last";            // Fatima Hassan  (same result)
```

The dot `.` means "stick these together". Notice the `" "` in the middle — **you have to
supply the space yourself**. `$first . $last` gives `FatimaHassan`.

There's also `.=` which adds onto the end of what's already there:

```php
$msg = "Hello";
$msg .= " world";
$msg .= "!";
echo $msg;          // Hello world!
```

**✅ Clear the stage**
Build a full sentence from three separate variables using `.` — and get the spaces right.
Then build the same sentence again using `.=`, one piece at a time.

**💀 If it breaks**
Words stuck together? You forgot the `" "`.
`+` doesn't join text — that's for numbers, and on strings it'll error.

---

## 🔵 Stage 10 — Boxes change

**🎯 Goal:** understand that a variable holds only the *last* thing you put in it.

**⌨️ The syntax**

```php
$score = 10;
echo $score;      // 10

$score = 50;
echo $score;      // 50  - the 10 is gone forever
```

And a variable can be built from itself:

```php
$score = 10;
$score = $score + 5;    // read: put (what's in score, plus 5) back into score
echo $score;            // 15
```

That line looks impossible in maths — `x = x + 5` is nonsense. In code it's normal, because
`=` is "put into", not "equals". This is the moment that wording pays off.

**✅ Clear the stage**
Start `$money = 100;`. Change it four times (add, subtract, double, halve), printing after
each change. Predict each number *before* you run it.

**💀 If it breaks**
Getting the old value? Check you actually saved the file before running.

---

## 👑 WORLD 2 BOSS

Build a **student ID card** using only variables, `echo`, `.` and `\n`:

```
+----------------------------+
| NAME  : Fatima Hassan      |
| AGE   : 20                 |
| CITY  : Beirut             |
| MAJOR : Computer Science   |
+----------------------------+
```

Rules:
- Every value comes from a variable — no typing the words into the output text.
- The full name must be built from `$firstName` and `$lastName` with a `.`
- Add a line at the end that prints their age next year, worked out from `$age`.

**Cleared it?** ▶ [World 3 — Numbers](world-3-numbers.md)

---

◀ [World 1](world-1-the-tag.md) · [the map](README.md)
