# Lesson 0 — Setup (20 minutes)

## What is PHP, in one paragraph?

PHP is a language that runs **on the server**, not in your browser. When you open a `.php`
page, the server runs the PHP code first, the code produces HTML, and only that HTML travels
to your browser. So the visitor never sees your PHP — they see the result. That's why PHP is
used for logins, databases, shopping carts: the secret work happens where the user can't touch it.

HTML = the skeleton. CSS = the clothes. **PHP = the brain.**

## Two ways to run PHP

### Way 1 — Terminal (we use this for lessons 1–7) ✅

PHP is already installed on the computer. Open a terminal in this folder and type:

```bash
php 01-basics/examples.php
```

The output appears right in the terminal. Fast, simple, no setup.

To check PHP is there:

```bash
php -v
```

You should see something like `PHP 8.2.12`.

### Way 2 — Browser with a server (we need this for lesson 8 + the games)

**XAMPP — this is what your class uses.** XAMPP is Apache + PHP + MySQL in one
install, and Apache is the part that serves pages.

1. Open the **XAMPP Control Panel**.
2. Press **Start** next to **Apache**. It goes green. That's it.
3. Put your file inside `C:\xampp\htdocs\`, ideally in a folder of your own:
   `C:\xampp\htdocs\Fatima\hello.php`.
4. Open `http://localhost/Fatima/hello.php`.

`localhost` **is** the `htdocs` folder. So the folders you make inside `htdocs`
become the address — you never type `C:\xampp\htdocs` into the browser.
Start **MySQL** too once you reach lessons 9 and 10; before that, Apache alone.

**Or, without XAMPP.** PHP has a small server built in. Run this **inside the
Php folder**:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000`. Leave the terminal open while you use it —
closing it stops the server. `Ctrl + C` stops it.

## The rules of a PHP file

1. The file must end with **`.php`** — not `.txt`, not `.html`.
2. PHP code lives between `<?php` and `?>`. Anything outside those tags is sent out as plain text.
3. Every statement ends with a **semicolon `;`**. Forgetting it is error #1 for beginners.

```php
<?php
echo "Hello";   // <- this semicolon is not optional
?>
```

## Your first file

Run it now:

```bash
php 00-setup/hello.php
```

If you see a greeting — you are officially a PHP developer. 🎉

## Which editor?

**VS Code** (free). Open the whole `Php` folder in it (File → Open Folder), not one file at a time.
Install the extension called **PHP Intelephense** — it will underline your mistakes before you even run.

---

➡️ Next: **Lesson 1 — echo, variables, comments**, in the rail on the left.
