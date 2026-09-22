# Mini-quiz — Lesson 2: Data Types & Strings
**8 questions · 5 minutes**

Score: ____ / 8

---

**1.** Name the type of each value:

| Value | Type |
|---|---|
| `"Rana"` | ______ |
| `19` | ______ |
| `14.5` | ______ |
| `true` | ______ |
| `"19"` | ______ |

*(that last one is the interesting one)*

**2.** Which function tells you the value **and** the type?

- a) `echo`  b) `print`  c) `var_dump`  d) `count`

**3.** What does `strlen("Beirut")` give?

Answer: ______

**4.** What does `echo false;` print?

Answer: ______

**5.** Predict these:

```php
echo 10 % 4;        // ______
echo "3" + 4;       // ______
echo "3" . 4;       // ______
echo round(2.6);    // ______
```

**6.** Write the code that prints `HELLO` starting from the variable `$word = "hello";`

```php
_________________________________
```

**7.** `$price = 80;` — write the code that prints the price after a 25% discount.
(The answer should be 60.)

```php
_________________________________
```

**8.** In the word `"Fatima"`, what position is the letter `t`?

Answer: ______  *(careful!)*

---
✅ 7–8 → lesson 3 · 5–6 → redo the string functions · under 5 → re-run `examples.php` line by line

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

1. `"Rana"` string · `19` int · `14.5` float · `true` bool · `"19"` **string** —
   it's in quotes, so it's text, even though it looks like a number.
2. **c** — `var_dump`
3. `6`
4. Nothing at all. `echo false;` prints an empty string — that's why we use `var_dump()`.
5. `2` · `7` · `34` · `3`
6. `echo strtoupper($word);`
7. `echo $price - ($price * 25 / 100);`  (or `$price * 0.75`)
8. `2` — counting starts at **0**, so F=0, a=1, t=2.

</details>
