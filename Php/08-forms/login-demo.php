<?php
/*
 * A login form, as a SHOWCASE of $_POST and associative arrays.
 *
 * Open:  http://localhost/<your folder>/login-demo.php   (XAMPP, Apache started)
 *    or: php -S localhost:8000  then  /08-forms/login-demo.php
 *
 * ---------------------------------------------------------------------
 * READ THIS BEFORE YOU COPY IT ANYWHERE
 *
 * This page prints the password back on the screen. That is the whole
 * point of the demo - it shows that whatever was typed into the form
 * arrives in PHP - and it is also the one thing a real login must never
 * do. A real one hashes the password with password_hash(), compares with
 * password_verify(), prints it nowhere, and keeps the user signed in with
 * $_SESSION. None of that is here, on purpose: this is lesson 8, and all
 * of it belongs to a later lesson.
 * ---------------------------------------------------------------------
 */

// Empty on the first visit, so every line below works before anyone types.
$username = "";
$password = "";
$sent     = false;
$problems = [];

// isset() asks: did this key arrive at all?
// It is how the page knows which of its two runs this is.
if (isset($_POST["login"])) {
    $sent     = true;
    $username = $_POST["username"] ?? "";
    $password = $_POST["password"] ?? "";

    // empty() asks: did it arrive with nothing useful in it?
    // "" and "0" and a missing key are all empty. isset() is NOT the same:
    // a box submitted blank is set, and empty.
    if (empty($username)) { $problems[] = "You did not type a username."; }
    if (empty($password)) { $problems[] = "You did not type a password."; }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login demo - $_POST and associative arrays</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>A login form, taken apart</h1>
<p class="sub">Type anything. Nothing is checked against a real account and
   nothing is stored - this page exists to show you where the words you typed
   end up.</p>

<!-- action="" means: send it back to this same file -->
<form action="" method="POST">
    <label for="u">Username</label>
    <!-- name="username" is the only part PHP ever sees. id is for CSS and JS. -->
    <input type="text" id="u" name="username" value="<?php echo htmlspecialchars($username); ?>">

    <label for="p">Password</label>
    <input type="password" id="p" name="password">

    <!-- the button has a name too, which is what isset() looks for above -->
    <button type="submit" name="login" value="1">Log in</button>
</form>

<?php if ($sent): ?>

    <?php if ($problems): ?>
        <div class="box bad">
            <h2>Not so fast</h2>
            <ul>
                <?php foreach ($problems as $p): ?>
                    <li><?php echo htmlspecialchars($p); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php else: ?>
        <div class="box good">
            <h2>What the server received</h2>
            <p>Username: <strong><?php echo htmlspecialchars($username); ?></strong></p>
            <p>Password: <strong><?php echo htmlspecialchars($password); ?></strong></p>
            <p class="warn">Printing a password is a demonstration, never a design.</p>
        </div>
    <?php endif; ?>

    <div class="box">
        <h2>$_POST is just an associative array</h2>
        <p>Nothing magic happened. PHP built an array out of the form, using
           each input's <code>name</code> as the key:</p>
        <pre><?php print_r($_POST); ?></pre>

        <p>So all three of these are the same idea, and the last one is the
           one you have been writing since lesson 6:</p>
        <pre><?php
        echo '$_POST["username"]        gives  ' . htmlspecialchars($username) . "\n";
        echo 'count($_POST)             gives  ' . count($_POST) . "\n";
        echo 'array_keys($_POST)        gives  ' . implode(", ", array_keys($_POST)) . "\n";
        ?></pre>

        <p>And because it is an array, you can walk it:</p>
        <pre><?php
        foreach ($_POST as $key => $value) {
            echo str_pad($key, 12) . " => " . htmlspecialchars($value) . "\n";
        }
        ?></pre>
    </div>

<?php endif; ?>

<div class="box">
    <h2>The same page with GET instead</h2>
    <p>Change <code>method="POST"</code> to <code>method="GET"</code> and
       <code>$_POST</code> to <code>$_GET</code>, press the button, and look at
       the address bar. Everything you typed is now in the URL - including the
       password. That is the difference, and it is the reason a login is always
       POST.</p>
    <p>You can try it without editing anything:
       <a href="?username=fatima&amp;password=hunter2">open this page with GET values in the link</a>
       and then print them with <code>$_GET</code>.</p>
    <?php if (!empty($_GET)): ?>
        <p>Right now <code>$_GET</code> holds:</p>
        <pre><?php print_r($_GET); ?></pre>
    <?php endif; ?>
</div>

<p><a href="form.php">&larr; back to the simple form</a></p>

</body>
</html>
