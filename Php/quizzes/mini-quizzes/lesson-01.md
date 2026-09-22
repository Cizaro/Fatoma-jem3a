# Mini-quiz — Lesson 1: echo, Variables, Comments
**8 questions · 5 minutes · close the lesson file first**

Score: ____ / 8

---

**1.** What does `echo` do?

______________________________________

**2.** Circle the valid variable names:

`$name` · `age` · `$2fast` · `$my_age` · `$myAge` · `$my age`

**3.** What does this print?

```php
$city = "Tyre";
echo "I love $city";
```

Answer: ______________________________________

**4.** And this one?

```php
$city = "Tyre";
echo 'I love $city';
```

Answer: ______________________________________

**5.** What is printed here, and why?

```php
$x = 3;
$x = 8;
echo $x;
```

Answer: ______  Why: ______________________________________

**6.** Write one line that joins `$a = "Good"` and `$b = "Night"` into `Good Night`:

```php
_________________________________
```

**7.** There are 2 mistakes. Find them:

```php
$name = "Rana"
echo "Hi $nmae";
```

Mistake 1: ______________________  Mistake 2: ______________________

**8.** Write a comment in PHP that says `this is my first program`:

```php
_________________________________
```

---
✅ 7–8 → straight to lesson 2 · 5–6 → redo exercises 3 and 4 · under 5 → we go through it again together

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

1. It prints / outputs something.
2. Valid: `$name`, `$my_age`, `$myAge`.
   Invalid: `age` (no `$`), `$2fast` (starts with a digit), `$my age` (has a space).
3. `I love Tyre`
4. `I love $city` — single quotes are literal, they don't read variables.
5. `8`. A variable only keeps the **last** thing you put in it; the 3 is gone.
6. `echo $a . " " . $b;`  (or `echo "$a $b";`) — the space matters.
7. Missing `;` at the end of line 1, and `$nmae` is a typo for `$name`.
8. `// this is my first program`  (`#` or `/* */` also correct)

</details>
