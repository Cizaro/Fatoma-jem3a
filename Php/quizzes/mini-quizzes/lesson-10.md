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
