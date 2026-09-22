# Lesson 9 — Database Basics with MySQL

Matches **Chapter 11 - Database Basics with MySQL** in your textbook.

Until now everything disappeared when the page reloaded. A **database** is where data stays.

## 1. The vocabulary

| Word | What it is | Compare to |
|---|---|---|
| **Database** | the whole box | an Excel file |
| **Table** | one set of data | one sheet |
| **Column / field** | one piece of info (name, age) | a column |
| **Row / record** | one complete entry (one student) | a row |
| **Primary key** | the unique id of a row | the student number |

An associative array from Lesson 6 **is** a row:
`["name" => "Fatima", "grade" => 18]`. A multidimensional array is a table. You already know the shape.

## 2. Getting MySQL

Install **XAMPP**, open the control panel, press **Start** on `Apache` and on `MySQL`.
Then open `http://localhost/phpmyadmin` — that is your visual tool for the database.

## 3. Column types (the ones you need)

| Type | For |
|---|---|
| `INT` | whole numbers, ids |
| `VARCHAR(100)` | short text, max 100 characters |
| `TEXT` | long text |
| `DECIMAL(6,2)` | money, marks (6 digits, 2 after the dot) |
| `DATE` / `DATETIME` | dates |
| `BOOLEAN` | true / false |

## 4. SQL — the language of databases

SQL is not PHP. It is a separate little language you write **inside** PHP strings.

### Create

```sql
CREATE DATABASE school;

CREATE TABLE students (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    email   VARCHAR(100),
    grade   DECIMAL(4,2),
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

`AUTO_INCREMENT` = MySQL gives each new row the next number by itself. You never set the id.

### The four operations you will use forever (CRUD)

```sql
-- CREATE
INSERT INTO students (name, email, grade) VALUES ('Fatima', 'f@mail.com', 18);

-- READ
SELECT * FROM students;
SELECT name, grade FROM students WHERE grade >= 10;
SELECT * FROM students ORDER BY grade DESC;
SELECT * FROM students WHERE name LIKE 'F%';     -- starts with F
SELECT * FROM students LIMIT 5;

-- UPDATE
UPDATE students SET grade = 19 WHERE id = 1;

-- DELETE
DELETE FROM students WHERE id = 3;
```

🚨 **`UPDATE` and `DELETE` without `WHERE` hit every single row.** There is no undo.
Write the `WHERE` first, then the rest.

### Useful extras

```sql
SELECT COUNT(*) FROM students;
SELECT AVG(grade) FROM students;
SELECT MAX(grade), MIN(grade) FROM students;
SELECT * FROM students WHERE grade BETWEEN 10 AND 16;
SELECT * FROM students WHERE name LIKE '%a%';    -- contains an a
```

## 5. Connecting from PHP (mysqli)

```php
$conn = mysqli_connect("localhost", "root", "", "school");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
```

On XAMPP the defaults are: host `localhost`, user `root`, password **empty**.

### Reading rows

```php
$result = mysqli_query($conn, "SELECT * FROM students");

while ($row = mysqli_fetch_assoc($result)) {
    echo $row["name"] . " - " . $row["grade"] . "<br>";
}
```

`mysqli_fetch_assoc()` gives you **one row as an associative array**, then moves to the next.
When there are no rows left it gives `false` and the `while` stops. That is the whole trick.

### Writing

```php
mysqli_query($conn, "INSERT INTO students (name, grade) VALUES ('Sara', 14)");
echo mysqli_affected_rows($conn) . " row added";
```

## 6. 🚨 SQL injection — the one security rule

**Never** glue user input straight into SQL:

```php
// DANGEROUS - never do this
$id = $_GET["id"];
mysqli_query($conn, "SELECT * FROM students WHERE id = $id");
```

If someone visits `?id=1 OR 1=1` they get every row. Worse things are possible.

Use a **prepared statement** — the values travel separately from the SQL:

```php
$stmt = mysqli_prepare($conn, "SELECT * FROM students WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);      // i = integer, s = string, d = decimal
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
```

The `?` is a placeholder. MySQL now treats the value as *data*, never as commands.

**Rule: any value that came from a user goes through a prepared statement. No exceptions.**

## 7. Always close

```php
mysqli_close($conn);
```

---

## Files here

- `school.sql` — import this in phpMyAdmin to create the database with sample data
- `01-connect.php` — test your connection
- `02-select.php` — read and display rows
- `03-insert.php` — add a row safely with a prepared statement
- `04-crud.php` — all four operations in one page

---

## Watch out

| Mistake | Result |
|---|---|
| MySQL not started in XAMPP | "Connection refused" |
| wrong database name | "Unknown database" |
| `UPDATE`/`DELETE` with no `WHERE` | you destroy the table |
| gluing `$_GET` into SQL | SQL injection |
| `=` in SQL means compare (not `==`) | SQL is not PHP |

---

Next: `../10-dynamic-page/`

---

## 💡 Did you know — Little Bobby Tables

There is a famous cartoon (xkcd #327) where a school calls a mother to say their student
database has been wiped. Her son's registered name was:

```
Robert'); DROP TABLE Students;--
```

The school's code glued that name straight into its SQL, so the database read it as a command
and deleted the table. The mother's reply: *"And I hope you've learned to sanitise your
database inputs."*

It's a joke, but it's an exact description of **SQL injection**, and versions of it have
caused real breaches at real companies. A prepared statement is what makes the name just a
name — even that one.

Bonus fact: **MySQL is named after a person.** Co-founder Monty Widenius named it after his
daughter, My.

## 🎮 Play with it

1. **Talk to the database directly.** In phpMyAdmin, open the SQL tab and run
   `SELECT * FROM students WHERE name LIKE 'F%'`. Change the letter. Change it to `%a%`.
   No PHP at all — just you and the data.
2. **Sort things.** `ORDER BY grade DESC`, then `ASC`, then `ORDER BY name`.
   Three words, three completely different pages.
3. **Ask real questions.** `SELECT AVG(grade) FROM students;` then
   `SELECT major, COUNT(*) FROM students GROUP BY major;`
   That second one is a report a manager would pay for.
4. **Break something safely.** `UPDATE students SET grade = 20;` — with no `WHERE`. Look at
   what happened to every row. Then re-import `school.sql` to undo it. Do this *once*, on
   purpose, in practice — so you never do it by accident on something that matters.

## 🏆 Boss challenge

Add a **`courses` table** to the `school` database with an id, a title and a teacher.
Fill it with five rows using `INSERT`. Then write a PHP page that shows both tables,
side by side, each in its own HTML table.

You've now got two tables. Joining them is lesson W on the roadmap.

## ▶ Practise this lesson

`games/php-arcade.html` → **Match the Words** (SQL set) + **Code Builder** ·
`games/php-quest.php` (door 6) · `flashcards.html` → deck 6 *SQL & MySQL* ·
`quizzes/mini-quizzes/lesson-09.md`
