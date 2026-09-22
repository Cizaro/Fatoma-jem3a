# Lesson 8 — Forms: HTML talks to PHP

This is the lesson where PHP becomes **web** development. This matches
**Chapter 10 - Building Dynamic Webpages with PHP** in your textbook.

## 1. First: run a server

Forms need a server. In the `Php` folder, run:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000/08-forms/form.php` in your browser.
Keep the terminal open. `Ctrl + C` stops the server.

## 2. Mixing PHP into HTML

A `.php` file can contain both. PHP runs first, HTML is what the visitor sees.

```php
<h1>Hello <?php echo $name; ?></h1>
```

Short version, used everywhere:

```php
<h1>Hello <?= $name ?></h1>
```

`<?=` means `<?php echo`. Very handy inside HTML.

## 3. How a form sends data

```html
<form method="post" action="process.php">
    <input type="text" name="username">
    <button type="submit">Send</button>
</form>
```

Three things do the work:

| Attribute | Meaning |
|---|---|
| `action` | which PHP file receives the data (empty = this same file) |
| `method` | how it travels: `post` or `get` |
| `name` | **the key you read in PHP.** No `name`, no data. |

## 4. Reading the data in PHP

```php
$username = $_POST["username"];   // the name="username" from the form
```

`$_POST` is an array PHP fills for you automatically. So is `$_GET`.

| | `GET` | `POST` |
|---|---|---|
| where the data goes | in the URL: `?name=fatima` | hidden in the request body |
| visible to the user | yes | no |
| size limit | small | large |
| use it for | searches, filters, links | logins, sign-ups, anything private |

**Never send a password with GET.** It would sit in the URL and in the browser history.

## 5. The self-submitting page (the normal pattern)

One file shows the form **and** handles it:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    echo "Hello $name";
}
?>
<form method="post">
    <input type="text" name="name">
    <button>Send</button>
</form>
```

The `if` stops PHP from running the handling code on the first visit, when nothing was submitted yet.

## 6. Checking the data is there

If the key doesn't exist, PHP warns you. Guard it:

```php
if (isset($_POST["name"]) && $_POST["name"] != "") { ... }

// or the short way (PHP 7+): use this value, or "" if it is missing
$name = $_POST["name"] ?? "";

// empty() is true for "", 0, null, and missing
if (empty($_POST["name"])) { $errors[] = "Name is required"; }
```

## 7. Validation — never trust the user

Client-side checks (`required` in HTML) can be bypassed. **Always check again in PHP.**

```php
$errors = [];

if (empty($name))                                    $errors[] = "Name is required";
if (strlen($password) < 6)                           $errors[] = "Password too short";
if (!filter_var($email, FILTER_VALIDATE_EMAIL))      $errors[] = "Invalid email";
if (!is_numeric($age))                               $errors[] = "Age must be a number";

if (count($errors) == 0) {
    // safe to continue
}
```

## 8. Security: escape before you print

If a user types `<script>alert('hacked')</script>` into your form and you echo it straight
back, their script runs in the page. That attack is called **XSS**.

The fix is one function:

```php
echo htmlspecialchars($name);
```

It turns `<` into `&lt;` so the browser shows the text instead of running it.

**Rule: `htmlspecialchars()` every single time you print something a user typed.**

## 9. Where to put forms in this course

- `form.php` - the form + handling in one file (the pattern you'll actually use)
- `process.php` + `form-separate.php` - the two-file version, to see `action` clearly
- `register.php` - a full sign-up form with validation, errors and escaping

---

## Watch out

| Mistake | Result |
|---|---|
| no `name=` on the input | the data never arrives |
| `method="get"` but reading `$_POST` | empty |
| opening the file by double-click | PHP code shows as text - you need the server |
| forgetting `isset` | "Undefined array key" warning |
| forgetting `htmlspecialchars` | XSS hole |

---

Next: the files in this folder, then `../projects/`
