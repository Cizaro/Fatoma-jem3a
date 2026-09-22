# Mini-quiz — Lesson 7: Functions
**8 questions · 5 minutes**

Score: ____ / 8

---

**1.** Write the smallest possible function called `hello()` that echoes `Hi`:

```php
_________________________________
_________________________________
_________________________________
```

**2.** You wrote the function but nothing happened when you ran the file. Why?

Answer: ______________________________________

**3.** In `function add($a, $b)`, what are `$a` and `$b` called?

Answer: ______________________

**4.** What is the difference between `echo` and `return` inside a function?

Answer: ______________________________________

**5.** What does this print?

```php
function f($n) {
    return $n + 1;
    echo "done";
}
echo f(5);
```

Answer: ______  Why: ______________________

**6.** Why does this give an error, and how do you fix it?

```php
$x = 10;
function show() {
    echo $x;
}
show();
```

Error because: ______________________  Fix: ______________________

**7.** Write `half($n)` that **returns** half of a number, then print `half(50)`:

```php
_________________________________
_________________________________
_________________________________
```

**8.** What does the `= 10` do here, and when is it used?

```php
function discount($price, $percent = 10) { }
```

Answer: ______________________________________

---
✅ 7–8 → lesson 8 · 5–6 → redo exercise 5 (`biggest`) · under 5 → practise `return` vs `echo` only
