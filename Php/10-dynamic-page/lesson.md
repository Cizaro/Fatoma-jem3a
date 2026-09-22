# Lesson 10 — Building a Dynamic Webpage with a MySQL Database

Matches **Chapter 12** in your textbook. This is where everything you learned joins together.

A **static** page shows the same thing to everybody. A **dynamic** page builds itself from the
database every time someone opens it. Change a row in MySQL, refresh — the page changed. Nobody
edited HTML.

## 1. The shape of a real PHP site

```
index.php      the list page (with search)
detail.php     one item, chosen by ?id=
admin.php      add / edit / delete
includes/
    db.php     the connection
    header.php the top of every page
    footer.php the bottom of every page
```

## 2. `include` and `require` — stop repeating yourself

```php
require "includes/header.php";   // paste that file in, right here
```

| | Difference |
|---|---|
| `include` | if the file is missing: warning, page continues |
| `require` | if the file is missing: fatal error, page stops |
| `require_once` | same, but never loads it twice |

Use `require` for things the page cannot live without (the database). Write your header once
and every page gets the same menu. Change it once and all pages change.

## 3. Passing data through the URL

```php
<a href="detail.php?id=3">See more</a>
```

`detail.php` reads it with `$_GET["id"]`. That is how every product page, article page and
profile page on the internet works.

**Always validate what arrives:**

```php
$id = (int)($_GET["id"] ?? 0);     // force it to be a number
if ($id <= 0) { die("Bad id"); }
```

## 4. Search: form + `LIKE` + prepared statement

```php
$search = trim($_GET["search"] ?? "");

if ($search !== "") {
    $stmt = mysqli_prepare($conn, "SELECT * FROM courses WHERE title LIKE ?");
    $term = "%" . $search . "%";                 // % means "anything"
    mysqli_stmt_bind_param($stmt, "s", $term);
} else {
    $stmt = mysqli_prepare($conn, "SELECT * FROM courses");
}
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
```

The `%` wildcards go in the **PHP variable**, not in the SQL string. That keeps the statement safe.

## 5. "No results" — never show an empty page

```php
if (mysqli_num_rows($result) === 0) {
    echo "<p>Nothing found.</p>";
} else {
    while ($row = mysqli_fetch_assoc($result)) { ... }
}
```

A blank page makes a user think the site is broken. Always say *something*.

## 6. Redirect after saving (the PRG pattern)

After an INSERT, send the browser somewhere else:

```php
header("Location: index.php?added=1");
exit;                     // ALWAYS exit after a header redirect
```

Without this, pressing F5 re-submits the form and inserts the row twice. You have seen
"Confirm Form Resubmission" on real websites — that is exactly this bug.

⚠️ `header()` must run **before any HTML is printed**. Not even a space before `<?php`.

## 7. The checklist of a good dynamic page

- [ ] Every user value goes through a **prepared statement**
- [ ] Every printed value goes through **`htmlspecialchars()`**
- [ ] Every id from a URL is forced with **`(int)`**
- [ ] An empty result shows a friendly message
- [ ] Forms redirect after saving
- [ ] The connection is closed at the end

---

## Files here

Run the server from the `Php` folder (`php -S localhost:8000`) or put the folder in XAMPP's
`htdocs`, then import `courses.sql` in phpMyAdmin and open `index.php`.

- `courses.sql` — the database for this mini site
- `includes/` — db, header, footer
- `index.php` — the catalogue with a search box
- `detail.php` — one course page
- `admin.php` — add and delete courses

---

## Your turn

1. Add a **price** column and show it on both pages.
2. Add a `<select>` to filter by level (beginner / advanced).
3. Sort by newest first.
4. Add an "edit" button to `admin.php` (you did this in Lesson 9 — reuse it).
5. Show *"Showing X courses"* above the list.
