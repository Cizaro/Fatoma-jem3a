# Lesson 5 — Loops (repeat without repeating yourself)

Imagine printing numbers 1 to 100. You will not write 100 `echo` lines. You write a loop.

## 1. `for` — when you know how many times

```php
for ($i = 1; $i <= 5; $i++) {
    echo $i;
}
// 12345
```

The three parts inside `( )`, separated by `;`:

| Part | Code | When it runs |
|---|---|---|
| 1. start | `$i = 1` | **once**, at the beginning |
| 2. condition | `$i <= 5` | before every round — if false, the loop stops |
| 3. step | `$i++` | after every round |

Trace it out loud:
`i=1` → 1 ≤ 5 ✓ print 1 → i becomes 2 → 2 ≤ 5 ✓ print 2 → ... → i becomes 6 → 6 ≤ 5 ✗ **stop**.

`$i` is just a variable name (i = index). You can call it `$row` or `$n`.

### Counting backwards, or in steps

```php
for ($i = 10; $i >= 1; $i--)  { ... }   // 10 down to 1
for ($i = 0; $i <= 20; $i += 5) { ... } // 0, 5, 10, 15, 20
```

## 2. `while` — when you don't know how many times

```php
$i = 1;
while ($i <= 5) {
    echo $i;
    $i++;          // ← IF YOU FORGET THIS, THE LOOP NEVER ENDS
}
```

"Keep going **while** this is true."

🚨 **Infinite loop:** if nothing inside changes the condition, the loop runs forever and freezes
the page. Press `Ctrl + C` in the terminal to kill it. Every beginner does this once.

## 3. `do...while` — runs at least once

```php
$i = 10;
do {
    echo $i;
    $i++;
} while ($i <= 5);     // prints 10 once, THEN checks
```

The check is at the **end**, so the body always runs one time minimum. Rare, but exams love it.

## 4. `foreach` — for arrays (full detail in Lesson 6)

```php
$names = ["Fatima", "Sara", "Lina"];
foreach ($names as $name) {
    echo $name;
}
```

The cleanest way to walk through a list. No counter, no off-by-one mistakes.

## 5. `break` and `continue`

```php
for ($i = 1; $i <= 10; $i++) {
    if ($i == 5) break;      // leave the loop completely
    echo $i;                 // 1234
}

for ($i = 1; $i <= 5; $i++) {
    if ($i == 3) continue;   // skip THIS round only
    echo $i;                 // 1245
}
```

## 6. Nested loops (a loop inside a loop)

```php
for ($row = 1; $row <= 3; $row++) {
    for ($col = 1; $col <= 3; $col++) {
        echo "$row$col ";
    }
    echo "\n";
}
// 11 12 13
// 21 22 23
// 31 32 33
```

The inner loop finishes **completely** for every single round of the outer loop.
This is how you print tables, grids, and pyramids.

---

## Watch out ⚠️

| Mistake | Result |
|---|---|
| forgetting `$i++` in `while` | infinite loop 💀 |
| `$i < 5` vs `$i <= 5` | one round missing (off-by-one) |
| using `,` instead of `;` inside `for()` | parse error |
| changing `$i` inside the body by accident | chaos |

---

➡️ `examples.php` → `exercises.php` → then play `games/guess-number.php`

---

## 💡 Did you know

There is a tiny exercise called **FizzBuzz** that has been used in real job interviews for
twenty years. Count to 100: say "Fizz" for multiples of 3, "Buzz" for multiples of 5,
"FizzBuzz" for both, otherwise the number.

It sounds trivial. It became famous because a surprising number of people who *called*
themselves programmers couldn't write it. Everything it needs is in this lesson: a loop,
`%`, and conditions in the right order.

It's exercise 11 in your `exercises.php`. Do it, and you've passed a test that real job
candidates have failed.

## 🎮 Play with it

1. **The countdown.** 10 down to 1, then `LIFT OFF`. Then make it count down in 2s.
2. **Times tables.** Print the 7 times table. Then put the number in a variable and try 13.
   You wrote one loop and got every table there is.
3. **Draw something.** A square of stars. Then a triangle. Then a pyramid. Then a **diamond** —
   which is just a pyramid with an upside-down one underneath.
4. **Guess first.** Before running a loop to 1,000,000, guess how long it will take. Then
   measure it: `$t = microtime(true);` before, `echo microtime(true) - $t;` after.
   Computers are faster than your intuition.

## 🏆 Boss challenge

Print a **calendar month** — the numbers 1 to 30 in 7 columns, lined up:

```
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
...
```

One loop, `printf("%3d", $i)` for the spacing, and a line break every time `$i % 7 == 0`.
Tiny program, real-looking result.

## ▶ Practise this lesson

`games/php-arcade.html` → **Code Builder** · `games/guess-number.php` (binary search) ·
`flashcards.html` → deck 4 *Loops & conditions* · `quizzes/mini-quizzes/lesson-05.md`
