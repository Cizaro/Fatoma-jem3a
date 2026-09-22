# When PHP Shouts At You

Errors are not a punishment. They are PHP telling you exactly where to look. Read them like this:

```
Parse error: syntax error, unexpected token "echo" in C:\...\test.php on line 7
   ^ the type        ^ what confused it                              ^ THE LINE NUMBER
```

**Always go to the line number first.** And a tip that saves hours: when line 7 looks perfect,
**the mistake is usually on line 6** — a missing `;` or `}` only becomes a problem on the next line.

---

## Parse error: syntax error, unexpected ...

**Meaning:** PHP couldn't even read your file. Nothing ran at all.

**Causes, in order of likelihood:**
1. Missing `;` at the end of the previous line
2. Missing `}` to close an `if`, loop or function
3. Missing a closing quote `"` or bracket `)`
4. A stray character you typed by accident

**Fix:** look at the line number and the line **above** it. Count your brackets.

---

## Warning: Undefined variable $name

**Meaning:** you used a variable that was never given a value.

```php
echo $nmae;      // typo - you defined $name
```

**Causes:** a typo, wrong capitals (`$Name` ≠ `$name`), or using a variable from outside a
function without passing it in.

---

## Warning: Undefined array key "name"

**Meaning:** that key isn't in the array.

```php
$a = ["title" => "x"];
echo $a["name"];              // there is no "name"
```

**Fix:** `print_r($a)` and look at what keys actually exist. Guard it:
```php
echo $a["name"] ?? "not set";
```

---

## Warning: Undefined array key "email" (on a form)

**Meaning:** the form field didn't arrive.

**Check:**
1. Does the input have `name="email"`? (`id` is not enough!)
2. Is the form `method="post"` and are you reading `$_POST`? They must match.
3. Did you open the page directly instead of submitting the form?

**Fix:** `$email = $_POST["email"] ?? "";`

---

## Fatal error: Uncaught Error: Call to undefined function

**Meaning:** you called a function that doesn't exist.

**Causes:** a spelling mistake (`strlenght` instead of `strlen`), or you forgot to `require`
the file where you wrote it, or you defined it *after* trying to use it in another file.

---

## Fatal error: Cannot redeclare function

**Meaning:** two functions have the same name — often because you used `include` twice.

**Fix:** rename one, or use `require_once`.

---

## Warning: Cannot modify header information — headers already sent

**Meaning:** you called `header("Location: ...")` **after** something was already printed.

**Causes:** an `echo` before it, HTML above the `<?php`, or — the sneaky one — a blank line or
a single space **before** `<?php` at the top of the file.

**Fix:** move all `header()` calls to the very top, before any output.

---

## The page is blank / white

**Meaning:** a fatal error happened but errors are hidden.

**Fix:** put this at the top of the file while you're developing:
```php
ini_set('display_errors', 1);
error_reporting(E_ALL);
```
Then the real error appears. (Remove it before handing in.)

---

## The browser shows my PHP code as text

**Meaning:** the file wasn't run by PHP.

**Causes:**
1. You double-clicked the file instead of using a server → use `php -S localhost:8000` or XAMPP
2. The file is `.html` instead of `.php`
3. You opened `file:///C:/...` instead of `http://localhost/...`

---

## The page freezes / never finishes

**Meaning:** infinite loop.

```php
$i = 1;
while ($i < 5) {
    echo $i;      // nothing ever changes $i
}
```

**Fix:** `Ctrl + C` in the terminal. Then make sure something inside the loop moves the
condition toward false.

---

## Connection failed / Access denied for user 'root'

**Meaning:** PHP can't reach MySQL.

**Check, in this order:**
1. Is **MySQL** started in the XAMPP control panel? (Apache alone is not enough)
2. Is the database name spelled right in `db.php`?
3. Did you import the `.sql` file in phpMyAdmin?
4. On XAMPP the user is `root` with an **empty** password.

---

## Unknown column 'x' in 'field list'

**Meaning:** your SQL names a column that isn't in the table.

**Fix:** open the table in phpMyAdmin and read the real column names. Watch for `grade` vs
`grades`, and for capital letters.

---

## My INSERT runs but nothing appears in the table

**Check:**
1. Are you looking at the right database? (you may have two)
2. Did you `mysqli_query()` the string, or just build it and never send it?
3. Print the error: `echo mysqli_error($conn);` right after the query.

---

## Array to string conversion

**Meaning:** you tried to `echo` a whole array.

**Fix:** use `print_r($a)` to inspect it, `implode(", ", $a)` to print it,
or a `foreach` to go item by item.

---

# The debugging method (use this, not guessing)

1. **Read the error.** Type, message, line number.
2. **Go to that line.** Then check the line above it.
3. **Print what you actually have**, not what you think you have:
   ```php
   var_dump($variable);   die();
   ```
   `die()` stops everything there so you can see the value.
4. **Cut the problem in half.** Comment out the second half of the file. Still broken? The bug
   is in the first half. Repeat.
5. **Copy the exact error message into Google.** Someone had it in 2013.
6. **Explain the code out loud, line by line**, to the wall, to me on Zoom, to anyone. You will
   very often find it yourself halfway through the sentence. This genuinely works and
   professional developers do it every day.

> Never sit stuck for more than 20 minutes without either changing your approach or asking.
> Being stuck is normal. Staying stuck silently is the only real mistake.
