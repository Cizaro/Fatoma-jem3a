# Quiz 4 — Forms, MySQL & Dynamic Pages
**Covers lessons 8–10 (textbook chapters 10–12) · 15 questions**

Name: ______________  Score: ____ / 15

---

### Part A — Multiple choice (1 point each)

**1.** Which attribute of an `<input>` becomes the key in `$_POST`?
- a) `id`
- b) `type`
- c) `name`
- d) `value`

**2.** Where does GET data travel?
- a) Hidden in the request body
- b) In the URL
- c) In a cookie
- d) In the database

**3.** Which should you use for a password field?
- a) GET
- b) POST
- c) Either
- d) Neither

**4.** What does `htmlspecialchars()` protect against?
- a) SQL injection
- b) XSS (injected scripts)
- c) Slow pages
- d) Wrong passwords

**5.** In SQL, which command **reads** rows?
- a) `GET`
- b) `SELECT`
- c) `READ`
- d) `FETCH`

**6.** What happens if you run `DELETE FROM students;` with no `WHERE`?
- a) Nothing
- b) Error
- c) Every row is deleted
- d) Only the first row is deleted

**7.** What does `AUTO_INCREMENT` do?
- a) Increases a grade automatically
- b) Gives each new row the next id number
- c) Sorts the table
- d) Backs up the database

**8.** Which one stops SQL injection?
- a) `htmlspecialchars()`
- b) A prepared statement with `?`
- c) Using GET instead of POST
- d) Closing the connection

---

### Part B — Short answers (1 point each)

**9.** Write the SQL that selects all students whose grade is 10 or more:

```sql
_________________________________
```

**10.** Write the SQL that adds one student called Sara with grade 14:

```sql
_________________________________
```

**11.** What is wrong with this line, and what should replace it?

```php
mysqli_query($conn, "SELECT * FROM users WHERE id = " . $_GET["id"]);
```

Answer: ____________________________________________

**12.** Why do we write `exit;` right after `header("Location: index.php");`?

Answer: ____________________________________________

---

### Part C — Write the code (1 point each)

**13.** Write a form that sends a field named `email` to `save.php` using POST.

```html
_________________________________
_________________________________
_________________________________
```

**14.** Write the PHP that reads that email safely (with a default if it is missing)
and prints it escaped.

```php
_________________________________
_________________________________
```

**15.** Write the loop that prints every row of `$result` (one name per line):

```php
_________________________________
_________________________________
_________________________________
```

---

**Bonus (+1):** Name three things you must always do on a dynamic page that takes user input.

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

**Part A** — 1-c · 2-b · 3-b · 4-b · 5-b · 6-c · 7-b · 8-b

- **4 vs 8** are on purpose: `htmlspecialchars()` protects what you **print** (XSS);
  prepared statements protect what goes **into a query** (SQL injection).

**Part B**
- **9** — `SELECT * FROM students WHERE grade >= 10;`
- **10** — `INSERT INTO students (name, grade) VALUES ('Sara', 14);`
- **11** — the URL value is glued straight into the SQL, so it's open to SQL injection
  (`?id=1 OR 1=1` returns everything). Use a prepared statement:
  ```php
  $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE id = ?");
  mysqli_stmt_bind_param($stmt, "i", $id);
  mysqli_stmt_execute($stmt);
  ```
- **12** — `header()` only *asks* the browser to move; without `exit` the rest of your script
  keeps running. It also stops a refresh re-submitting the form.

**Part C**
- **13**
  ```html
  <form method="post" action="save.php">
      <input type="text" name="email">
      <button type="submit">Send</button>
  </form>
  ```
- **14**
  ```php
  $email = $_POST["email"] ?? "";
  echo htmlspecialchars($email);
  ```
- **15**
  ```php
  while ($row = mysqli_fetch_assoc($result)) {
      echo $row["name"] . "<br>";
  }
  ```

**Bonus** — any three of: prepared statements for every user value · `htmlspecialchars()`
on every printed value · `(int)` on ids from a URL · validate on the server, never trust
the browser · redirect after saving · handle the empty-result case.

</details>
