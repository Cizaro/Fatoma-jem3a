# Mini-quiz — Lesson 5: Loops
**8 questions · 5 minutes**

Score: ____ / 8

---

**1.** Name the three parts inside `for ( ; ; )` and say when each one runs:

1. ______________________ runs ______________________
2. ______________________ runs ______________________
3. ______________________ runs ______________________

**2.** How many times does the body run?

```php
for ($i = 0; $i < 4; $i++) { }
```

Answer: ______

**3.** What does this print?

```php
for ($i = 3; $i >= 1; $i--) {
    echo $i;
}
```

Answer: ______

**4.** What is wrong here, and what happens if you run it?

```php
$n = 1;
while ($n <= 3) {
    echo $n;
}
```

Wrong: ______________________  Happens: ______________________

**5.** Difference between `break` and `continue`:

`break`: ______________________________________

`continue`: ______________________________________

**6.** What does this print?

```php
for ($i = 1; $i <= 6; $i++) {
    if ($i == 4) break;
    echo $i;
}
```

Answer: ______

**7.** Write a loop that prints every even number from 2 to 10:

```php
_________________________________
_________________________________
_________________________________
```

**8.** In a nested loop, which one finishes first — the inner or the outer?

Answer: ______________________

---
✅ 7–8 → lesson 6 · 5–6 → redo the pyramid exercise · under 5 → trace a 3-round loop out loud together

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

1. Start (`$i = 0`) — runs **once**, at the beginning.
   Condition (`$i < 4`) — runs **before every round**; if false, the loop stops.
   Step (`$i++`) — runs **after every round**.
2. `4` times — 0, 1, 2, 3.
3. `321`
4. Nothing inside changes `$n`, so the condition never becomes false: an **infinite loop**.
   The terminal or page freezes. `Ctrl + C` stops it.
5. `break` leaves the loop completely. `continue` skips only the current round and carries on.
6. `123` — it stops before printing 4.
7. ```php
   for ($i = 2; $i <= 10; $i += 2) { echo $i . " "; }
   ```
   (checking `if ($i % 2 == 0)` inside a normal loop is equally correct)
8. The **inner** one. It finishes completely for every single round of the outer loop.

</details>
