# Mini-quiz — Lesson 8: Forms
**8 questions · 5 minutes**

Score: ____ / 8

---

**1.** Label the three attributes:

```html
<form method="post" action="save.php">
    <input type="text" name="email">
</form>
```

`method` decides ______________________
`action` decides ______________________
`name` decides ______________________

**2.** The form above is submitted. Write the PHP that reads the email:

```php
_________________________________
```

**3.** Fill the table:

| | GET | POST |
|---|---|---|
| Where does the data go? | ______ | ______ |
| Can the user see it? | ______ | ______ |
| Use it for a password? | ______ | ______ |

**4.** Your form sends but PHP says "Undefined array key". Name two possible causes.

1. ______________________  2. ______________________

**5.** What does `htmlspecialchars()` do, and when must you use it?

Answer: ______________________________________

**6.** Write the safe way to read a field that might not be there:

```php
$name = _________________________________
```

**7.** Why do we check the data again in PHP when the HTML already had `required`?

Answer: ______________________________________

**8.** What is this `if` for, and what breaks without it?

```php
if ($_SERVER["REQUEST_METHOD"] === "POST") { ... }
```

Answer: ______________________________________

---
✅ 7–8 → lesson 9 · 5–6 → redo `register.php` and try to break it · under 5 → rebuild the simple form from scratch
