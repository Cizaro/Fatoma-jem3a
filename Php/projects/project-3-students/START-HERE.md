# Project 3 — Student Management System

This is the big one. Build it yourself, in this folder.

## Before you write any PHP

1. Start XAMPP: **Apache** + **MySQL**
2. Open `http://localhost/phpmyadmin`
3. Import `../../09-mysql/school.sql` — that creates the `school` database with 5 students
4. Click through the table in phpMyAdmin so you can *see* the data you are about to code against

## Build it in this order

Do **not** try to build everything at once. Each step must work before you start the next one.

| Step | File | Goal | Stop when |
|---|---|---|---|
| 1 | `includes/db.php` | connect | a page prints "connected" |
| 2 | `index.php` | list all students in a table | you see 5 rows |
| 3 | `includes/header.php` + `footer.php` | shared layout | both pages use them |
| 4 | `add.php` | a form that inserts | a new student appears in the list |
| 5 | `add.php` | validation + error messages | an empty form shows errors, not a crash |
| 6 | `edit.php` | load one student, save changes | you can change a grade |
| 7 | `delete.php` | delete with a confirm | a student disappears |
| 8 | `index.php` | search box | searching "Fat" finds Fatima |
| 9 | `index.php` | statistics box | total / average / passed |

Copy nothing. When you are stuck, open `../../09-mysql/04-crud.php`, understand the line you
need, close it, and write your own.

## The rules you may not break

```php
// every user value -> prepared statement
$stmt = mysqli_prepare($conn, "SELECT * FROM students WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);

// every printed value -> escaped
echo htmlspecialchars($row["name"]);

// every id from a URL -> forced to a number
$id = (int)($_GET["id"] ?? 0);

// after every save -> redirect then exit
header("Location: index.php?saved=1");
exit;
```

## When you think you are done

Go through the hand-in checklist in `../README.md`. Then try to break your own site:
empty forms, `?id=99999`, `?id=abc`, a name of 500 characters, `<script>alert(1)</script>`.
Anything that crashes is a bug you still have to fix.

## Then write NOTES.md

Three questions, honest answers:
1. What was the hardest part?
2. Which error took you longest, and what was it in the end?
3. What would you add with another week?
