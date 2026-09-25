# 🟡 World 3 — Numbers
### Stages 11–15 · about 25 minutes

Text was World 2. Now the other half of everything: numbers, and the symbols that push them
around. Nothing here is harder than school maths — the only new things are `%` and the shortcuts.

Practice file: `stages/practice/world-3.php`

---

## 🟡 Stage 11 — Maths

**🎯 Goal:** do arithmetic and print the answer.

**⌨️ The syntax**

```php
echo 10 + 3;     // 13
echo 10 - 3;     // 7
echo 10 * 3;     // 30
echo 10 / 3;     // 3.3333333333333
echo 10 ** 3;    // 1000   (10 to the power of 3)
```

Two things that trip people up:

```php
$a = 5;
$b = 3;
echo "$a + $b";        // 5 + 3      ← prints the text, doesn't do the maths!
echo $a + $b;          // 8
echo "sum: " . ($a + $b);   // sum: 8  ← brackets, or the dot grabs it wrong
```

Inside quotes, maths doesn't happen. **Do the maths outside, in brackets.**

**✅ Clear the stage**
Make `$a = 24` and `$b = 7`. Print all five operations, each on its own line, labelled:

```
24 + 7 = 31
24 - 7 = 17
...
```

**💀 If it breaks**
Getting `5 + 3` printed as text? Your maths is inside the quotes. Pull it out and wrap it
in `( )`.

---

## 🟡 Stage 12 — The remainder

**🎯 Goal:** learn `%`, the most useful symbol you've never used.

**⌨️ The syntax**

```php
echo 10 % 3;     // 1   — 3 goes into 10 three times, 1 left over
echo 10 % 5;     // 0   — nothing left over
echo 7 % 2;      // 1
echo 8 % 2;      // 0
```

`%` is not percent. It's **what's left over after dividing**.

Why you'll use it constantly:

```php
$n % 2 == 0     // $n is EVEN
$n % 2 == 1     // $n is ODD
$i % 3 == 0     // every third one
(21 + 7) % 24   // what time is it 7 hours after 21:00?  → 4
```

**✅ Clear the stage**
Print `$n % 2` for the numbers 1 to 8, each on its own line. Look at the pattern:
`1 0 1 0 1 0 1 0`. That alternating pattern is how websites stripe their table rows.

**💀 If it breaks**
`%` on decimals behaves oddly — it's built for whole numbers. Keep it to integers for now.

---

## 🟡 Stage 13 — Shortcuts

**🎯 Goal:** stop writing `$x = $x + 1`.

**⌨️ The syntax**

```php
$x = 10;

$x += 5;    // same as  $x = $x + 5    → 15
$x -= 3;    // same as  $x = $x - 3    → 12
$x *= 2;    // same as  $x = $x * 2    → 24
$x /= 4;    // same as  $x = $x / 4    → 6
```

And the two you'll see in every loop you ever write:

```php
$i = 5;
$i++;       // add 1     → 6
$i--;       // minus 1   → 5
```

`$i++` is so common that it's basically part of the `for` loop's grammar. You'll meet it
properly in World 5.

**✅ Clear the stage**
Start at `$score = 50`. Use **only** shortcut operators to reach exactly `100`, printing after
each step. There's more than one right answer.

**💀 If it breaks**
`$x =+ 5` is not the same as `$x += 5`. The first one just puts 5 into `$x`. The order of
those two characters matters and this typo is genuinely hard to spot.

---

## 🟡 Stage 14 — Rounding and tidying

**🎯 Goal:** make ugly numbers look like real numbers.

**⌨️ The syntax**

```php
echo round(3.7);        // 4
echo round(3.2);        // 3
echo round(3.14159, 2); // 3.14   ← 2 decimal places
echo floor(3.9);        // 3      ← always down
echo ceil(3.1);         // 4      ← always up
echo abs(-5);           // 5      ← no minus sign
echo intdiv(17, 5);     // 3      ← whole division
echo max(4, 9, 2);      // 9
echo min(4, 9, 2);      // 2
echo rand(1, 6);        // a random number, like a dice
```

Notice the shape: **a name, then brackets, then what you're giving it**. That shape is called
calling a function, and it's the same shape for all thousand-odd built-in PHP functions.

**✅ Clear the stage**
`$price = 19.9876;` — print it rounded to 2 decimal places.
Then roll two dice with `rand(1, 6)` and print the total.

**💀 If it breaks**
`round 3.7` without brackets is an error. Functions always need their `( )`.

---

## 🟡 Stage 15 — Numbers that are secretly text

**🎯 Goal:** see the difference between `20` and `"20"`.

**⌨️ The syntax**

```php
$real = 20;
$fake = "20";

var_dump($real);    // int(20)
var_dump($fake);    // string(2) "20"
```

`var_dump()` is the tool that tells you the **truth** about a value — what it is, not just
what it looks like. You'll use it every time something behaves strangely.

PHP is usually helpful about this:

```php
echo "20" + 5;      // 25  — PHP converts the text to a number
```

But when you want to be sure, cast it yourself:

```php
$n = (int) "20";        // a real integer 20
$f = (float) "9.99";    // a real 9.99
$s = (string) 100;      // the text "100"
```

**✅ Clear the stage**
`var_dump()` these five, one per line, predicting each first:
`20` · `"20"` · `20.5` · `"20" + 5` · `(int) "20"`

**💀 If it breaks**
`var_dump` prints extra detail like `int(20)` — that's not an error, that's the whole point of it.

---

## 👑 WORLD 3 BOSS

Build a **shop receipt calculator**. Given:

```php
$item     = "Notebook";
$price    = 4.75;
$quantity = 3;
$discount = 10;      // percent
$taxRate  = 11;      // percent
```

Print:

```
Item      : Notebook
Price     : 4.75
Quantity  : 3
Subtotal  : 14.25
Discount  : -1.43
Tax       : 1.41
------------------------
TOTAL     : 14.23
```

Every number must be **calculated**, rounded to 2 decimal places, and printed from a variable.
Change `$quantity` to 7 and check every line updates on its own — if one doesn't, you typed a
number where a calculation should be.

**Cleared it?** ▶ [World 4 — Decisions](world-4-decisions.md)

---

◀ [World 2](world-2-boxes.md) · [the map](README.md)
