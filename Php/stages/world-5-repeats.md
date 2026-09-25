# 🔴 World 5 — Repeats
### Stages 21–25 · about 30 minutes

You will never write the same line 100 times. You'll write it once and tell PHP how many
times to do it. That's a loop, and it's the point where your code starts doing more than
you typed.

Practice file: `stages/practice/world-5.php`

---

## 🔴 Stage 21 — The three parts

**🎯 Goal:** read a `for` loop out loud.

**⌨️ The syntax**

```php
for ($i = 1; $i <= 5; $i++) {
    echo $i;
}
// 12345
```

Three things inside the round brackets, separated by **semicolons** (not commas):

| Part | Code | Runs |
|---|---|---|
| 1. start | `$i = 1` | **once**, at the very beginning |
| 2. check | `$i <= 5` | **before every round**. False → stop. |
| 3. step | `$i++` | **after every round** |

Trace it out loud, slowly, once:

> i is 1 · is 1 ≤ 5? yes · print 1 · i becomes 2 ·
> is 2 ≤ 5? yes · print 2 · i becomes 3 · … ·
> i becomes 6 · is 6 ≤ 5? **no** · stop.

Do that out loud once and you'll never be confused by a `for` loop again.

`$i` is just a variable name — `i` for "index". You could call it `$row`.

**✅ Clear the stage**
Print 1 to 10, each on its own line. Then change `<=` to `<` and see what you lose.

**💀 If it breaks**
Commas instead of semicolons inside `for(...)` is a parse error. It's `;` between the parts.

---

## 🔴 Stage 22 — Backwards and in steps

**🎯 Goal:** the loop doesn't have to go up by one.

**⌨️ The syntax**

```php
for ($i = 10; $i >= 1; $i--) { }    // 10 down to 1
for ($i = 0; $i <= 20; $i += 5) { } // 0, 5, 10, 15, 20
for ($i = 2; $i <= 10; $i += 2) { } // even numbers
```

When you count down, the **check flips too** — `$i >= 1`, not `<=`. Forgetting that gives you
a loop that never runs at all (which looks like your code did nothing).

**✅ Clear the stage**
Print a countdown from 5 to 1 on one line, then `LIFT OFF`.
Then print every multiple of 3 from 3 to 30.

**💀 If it breaks**
Nothing printing? Your start and check disagree — you're counting down with `<=`, or up with `>=`.

---

## 🔴 Stage 23 — while, and the frozen laptop

**🎯 Goal:** loop when you don't know how many times.

**⌨️ The syntax**

```php
$i = 1;
while ($i <= 3) {
    echo $i;
    $i++;          // ← IF YOU FORGET THIS, IT NEVER STOPS
}
```

A `for` loop keeps its three parts together where you can see them. A `while` loop scatters
them: the start is above, the check is in the brackets, and **the step is your job**, inside
the body.

🚨 If nothing inside the loop changes the condition, it runs **forever**. The terminal hangs,
or the page never loads.

**Press `Ctrl + C` in the terminal to kill it.** Every single programmer has done this.
You'll do it today, on purpose, in this stage.

**✅ Clear the stage**
1. Write the loop above and check it prints `123`.
2. Now **delete the `$i++`** and run it. Watch it spin. Press `Ctrl + C`.
3. Put it back.

Meeting the infinite loop deliberately, once, is much better than meeting it by accident at
2am before a deadline.

**💀 If it breaks**
It's supposed to. That's step 2.

---

## 🔴 Stage 24 — Skip and stop

**🎯 Goal:** two words that control the loop from inside.

**⌨️ The syntax**

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

| Word | Means |
|---|---|
| `break` | done, get me out of this loop |
| `continue` | skip the rest of this round, go to the next one |

**✅ Clear the stage**
Print 1 to 20, but skip 13 (`continue`) and stop completely at 18 (`break`).
Expected: `1 2 ... 12 14 15 16 17`.

**💀 If it breaks**
`break` inside a `switch` inside a loop breaks the *switch*, not the loop. Worth knowing
before it confuses you later.

---

## 🔴 Stage 25 — A loop inside a loop

**🎯 Goal:** draw something two-dimensional.

**⌨️ The syntax**

```php
for ($row = 1; $row <= 3; $row++) {
    for ($col = 1; $col <= 3; $col++) {
        echo "*";
    }
    echo "\n";        // ← note: OUTSIDE the inner loop
}
```

```
***
***
***
```

The key idea: **the inner loop finishes completely for every single round of the outer one.**
Outer round 1 → inner runs 3 times → newline. Outer round 2 → inner runs 3 times again.

Where you put that `echo "\n"` decides whether you get a square or one long line. That is the
whole trick, and it's worth moving it around once to see both results.

**✅ Clear the stage**
1. A 5×5 square of stars.
2. Then a triangle:
```
*
**
***
****
*****
```
(hint: make the inner loop run `$row` times instead of a fixed number — or use `str_repeat`)

**💀 If it breaks**
Everything on one line? Your `\n` is inside the inner loop, or missing.

---

## 👑 WORLD 5 BOSS

**Part 1 — the times table.** Print the full 9×9 multiplication table, lined up in columns.
`printf("%4d", $row * $col)` handles the spacing.

**Part 2 — FizzBuzz.** For the numbers 1 to 30:
- divisible by 3 **and** 5 → `FizzBuzz`
- divisible by 3 → `Fizz`
- divisible by 5 → `Buzz`
- otherwise → the number

⚠️ Think hard about the **order** of those conditions. Get it wrong and `15` prints `Fizz`.
This exact question has been used in real job interviews for twenty years.

**Cleared both?** ▶ [World 6 — Containers](world-6-containers.md)

---

◀ [World 4](world-4-decisions.md) · [the map](README.md)
