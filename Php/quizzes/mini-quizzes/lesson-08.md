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

---

<details>
<summary><b>✅ Check your answers</b> — open this only when you have finished</summary>

<br>

1. `method` = **how** the data travels (POST or GET).
   `action` = **which file** receives it.
   `name` = **the key you read in PHP**. No `name`, no data.
2. `$email = $_POST["email"];`
3. GET: in the URL · visible to everyone · never for a password.
   POST: in the request body · not visible · yes, use it for passwords.
4. Any two of: the input has no `name` · the form says `get` but you're reading `$_POST`
   (or the other way round) · you opened the page directly without submitting ·
   the name is spelled differently in the form and in the PHP.
5. It turns `<` `>` `"` `&` into harmless codes, so text a user typed is **displayed**
   instead of being run as HTML or JavaScript. Use it every single time you print
   something a user typed.
6. `$name = $_POST["name"] ?? "";`
7. Because HTML validation runs in the **browser**, and the browser is the user's. It can be
   switched off, edited, or skipped completely by sending the request another way.
   Anything that matters is checked again on the server.
8. It stops the handling code running on the first visit, before anything was submitted.
   Without it you get "undefined array key" warnings the moment the page opens.

</details>
