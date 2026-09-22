# Mini-quiz — Lesson 6: Arrays
**8 questions · 5 minutes · this is the important one**

Score: ____ / 8

---

**1.** Given `$a = ["red", "green", "blue"];`

| Question | Answer |
|---|---|
| What is `$a[0]`? | ______ |
| What is `$a[2]`? | ______ |
| What is `count($a)`? | ______ |
| What is the index of the LAST item? | ______ |

**2.** What happens if you write `echo $a[3];`?

Answer: ______________________________________

**3.** Write the line that adds `"yellow"` to the end of `$a` — without writing an index:

```php
_________________________________
```

**4.** Given `$user = ["name" => "Rana", "age" => 19];` — print the name:

```php
_________________________________
```

**5.** What is wrong with `echo $user[name];`?

Answer: ______________________________________

**6.** Write a `foreach` that prints every colour in `$a`, one per line:

```php
_________________________________
_________________________________
_________________________________
```

**7.** What does this print?

```php
$n = [10, 20, 30];
echo array_sum($n) / count($n);
```

Answer: ______

**8.** Given this array, write the line that prints `Sara`:

```php
$class = [
    ["name" => "Rana", "grade" => 15],
    ["name" => "Sara", "grade" => 18],
];
```

```php
_________________________________
```

---
✅ 7–8 → lesson 7 · 5–6 → redo exercises 7 and 8 · **under 5 → we do NOT move on.** Arrays hold up
everything after this, so we redo them with boxes drawn on the whiteboard.

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

1. `red` · `blue` · `3` · the last index is **2**.
   (count is 3, but the last index is always count − 1)
2. A warning: *undefined array key 3*. There is no index 3 — the last one is 2.
3. `$a[] = "yellow";`
4. `echo $user["name"];`
5. The key needs quotes. Without them PHP looks for a *constant* called `name`, not a key.
6. ```php
   foreach ($a as $colour) {
       echo $colour . "\n";
   }
   ```
7. `20` — sum is 60, count is 3.
8. `echo $class[1]["name"];` — item 1 of the outer array, then its `name` key.

**If you got 1 or 2 of these wrong, tell your instructor before moving on.**
Everything from lesson 8 onwards sits on top of arrays.

</details>
