# Mini-quiz — Lesson 9: MySQL
**8 questions · 5 minutes**

Score: ____ / 8

---

**1.** Match the database word to the Excel word:

| Database | Excel |
|---|---|
| table | ______ |
| row | ______ |
| column | ______ |

**2.** What does `AUTO_INCREMENT PRIMARY KEY` give you?

Answer: ______________________________________

**3.** Write the SQL for each:

Read every student: `_________________________________`

Read only those with grade 10 or more: `_________________________________`

Sort by grade, biggest first: `_________________________________`

**4.** Write the SQL that adds a student called Rana with grade 16:

```sql
_________________________________
```

**5.** What is the danger in this line?

```sql
DELETE FROM students;
```

Answer: ______________________________________

**6.** Write the PHP loop that prints every row's name from `$result`:

```php
_________________________________
_________________________________
_________________________________
```

**7.** What is wrong with this, and what should replace it?

```php
mysqli_query($conn, "SELECT * FROM users WHERE id = " . $_GET["id"]);
```

Wrong: ______________________  Replace with: ______________________

**8.** In `mysqli_stmt_bind_param($stmt, "si", $name, $age)` — what do `s` and `i` mean,
and what must match?

Answer: ______________________________________

---
✅ 7–8 → lesson 10 · 5–6 → redo `03-insert.php` from memory · under 5 → practise SQL in phpMyAdmin first, no PHP
