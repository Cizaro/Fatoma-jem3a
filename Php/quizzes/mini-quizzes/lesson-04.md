# Mini-quiz — Lesson 4: Conditions
**8 questions · 5 minutes**

Score: ____ / 8

---

**1.** What goes in the round brackets of an `if`, and what goes in the curly ones?

Round `( )`: ______________________  Curly `{ }`: ______________________

**2.** What does this print, and why is it a bug?

```php
$mark = 19;
if ($mark >= 10) {
    echo "Pass";
} elseif ($mark >= 18) {
    echo "Excellent";
}
```

Prints: ______  The bug: ______________________________________

**3.** Which of these are **false** in PHP? (tick them)

- [ ] `0`
- [ ] `"0"`
- [ ] `"hello"`
- [ ] `""`
- [ ] `-1`
- [ ] `"false"`

**4.** What is missing here?

```php
switch ($fruit) {
    case "apple":
        echo "red";
    case "lemon":
        echo "yellow";
}
```

Answer: ______________________  What happens without it: ______________________

**5.** Spot the bug:

```php
if ($age > 18);
{
    echo "adult";
}
```

Answer: ______________________________________

**6.** Write an `if`/`else` that prints `Even` or `Odd` for `$n`:

```php
_________________________________
_________________________________
_________________________________
```

**7.** Put these in the correct order for a grading `if` chain:
`>= 10` · `>= 16` · `>= 18` · `>= 14`

Answer: ______________________  Why that order: ______________________

**8.** When do you use `switch` instead of `if`?

Answer: ______________________________________

---
✅ 7–8 → lesson 5 · 5–6 → redo the BMI exercise · under 5 → stop, we redo conditions next call
