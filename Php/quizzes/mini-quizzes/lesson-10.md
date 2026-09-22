# Mini-quiz — Lesson 10: Dynamic Pages
**8 questions · 5 minutes · the last one before the project**

Score: ____ / 8

---

**1.** In one sentence: what is the difference between a static page and a dynamic page?

Answer: ______________________________________

**2.** Difference between `include` and `require`?

Answer: ______________________________________

**3.** Why do we put the header in its own file?

Answer: ______________________________________

**4.** This link sends an id to another page. Write the PHP that reads it **safely**:

```html
<a href="detail.php?id=7">See more</a>
```

```php
$id = _________________________________
```

Why the `(int)`? ______________________________________

**5.** Where do the `%` signs go in a LIKE search — in the SQL string or in the PHP variable?

Answer: ______  Why: ______________________

**6.** The search finds nothing. What must the page show?

Answer: ______________________________________

**7.** What do these two lines do together, and why is the second one needed?

```php
header("Location: index.php");
exit;
```

Answer: ______________________________________

**8.** List the four rules from the lesson checklist that protect a dynamic page:

1. ______________________________________
2. ______________________________________
3. ______________________________________
4. ______________________________________

---
✅ 7–8 → start project 3 · 5–6 → rebuild `detail.php` from scratch first · under 5 → redo lesson 9 + 10 together

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

1. A static page shows everyone the same thing. A dynamic page builds itself from the
   database every time it's opened — change a row, refresh, the page changed.
2. `include` gives a warning and carries on if the file is missing.
   `require` stops the page completely. Use `require` for anything the page can't live without.
3. So it's written once and used by every page. Change the menu in one file and every
   page updates.
4. `$id = (int)($_GET["id"] ?? 0);`
   The `(int)` forces it to a number, so `?id=abc` or an injection attempt becomes a
   harmless `0` instead of reaching your query.
5. In the **PHP variable**: `$term = "%" . $search . "%";`
   The SQL itself only ever contains `?` — that's what keeps the statement safe.
6. A friendly "nothing found" message. A blank page makes the user think the site is broken.
7. `header()` tells the browser to go to another page; `exit` stops the rest of the script
   from running. Together they also stop a refresh from saving the same thing twice.
8. Any four: prepared statements for every user value · `htmlspecialchars()` on every
   printed value · `(int)` on every id from a URL · a friendly empty-result message ·
   redirect after saving · close the connection at the end.

</details>
