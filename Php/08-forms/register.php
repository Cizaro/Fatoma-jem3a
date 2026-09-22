<?php
/*
 * A REAL sign-up form: validation, error messages, keeping the typed values,
 * and escaping the output. This is the pattern you will reuse forever.
 * Open: http://localhost:8000/08-forms/register.php
 */

$errors  = [];
$success = false;

// these hold what the user typed, so the form is not wiped on error
$name  = "";
$email = "";
$age   = "";
$gender = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // 1. collect
    $name     = trim($_POST["name"]     ?? "");
    $email    = trim($_POST["email"]    ?? "");
    $age      = trim($_POST["age"]      ?? "");
    $gender   =      $_POST["gender"]   ?? "";
    $password =      $_POST["password"] ?? "";
    $confirm  =      $_POST["confirm"]  ?? "";

    // 2. validate - every rule adds a message to $errors
    if ($name === "") {
        $errors[] = "Name is required.";
    } elseif (strlen($name) < 3) {
        $errors[] = "Name must be at least 3 characters.";
    }

    if ($email === "") {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "That email does not look valid.";
    }

    if ($age === "") {
        $errors[] = "Age is required.";
    } elseif (!is_numeric($age)) {
        $errors[] = "Age must be a number.";
    } elseif ($age < 16 || $age > 100) {
        $errors[] = "Age must be between 16 and 100.";
    }

    if ($gender === "") {
        $errors[] = "Please choose a gender.";
    }

    if (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }

    if ($password !== $confirm) {
        $errors[] = "The two passwords do not match.";
    }

    // 3. if nothing went wrong -> success
    if (count($errors) === 0) {
        $success = true;
        // In Chapter 11/12 this is where you would INSERT into MySQL.
        // Passwords are never stored as plain text - you would use:
        // $hash = password_hash($password, PASSWORD_DEFAULT);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign up</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Create an account</h1>
<p class="sub">A complete form: validation, errors, and safe output.</p>

<?php if ($success): ?>

    <div class="card result">
        <h2>Welcome, <?= htmlspecialchars($name) ?>!</h2>
        <p>Your account was created (pretend - we have no database yet).</p>
        <ul>
            <li>Email: <?= htmlspecialchars($email) ?></li>
            <li>Age: <?= htmlspecialchars($age) ?></li>
            <li>Gender: <?= htmlspecialchars($gender) ?></li>
        </ul>
        <p><a href="register.php">Register someone else</a></p>
    </div>

<?php else: ?>

    <?php if (count($errors) > 0): ?>
        <div class="card errors">
            <strong>Please fix <?= count($errors) ?> thing(s):</strong>
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= htmlspecialchars($error) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form method="post">
        <label for="name">Full name</label>
        <input type="text" id="name" name="name" value="<?= htmlspecialchars($name) ?>">

        <label for="email">Email</label>
        <input type="text" id="email" name="email" value="<?= htmlspecialchars($email) ?>">

        <label for="age">Age</label>
        <input type="text" id="age" name="age" value="<?= htmlspecialchars($age) ?>">

        <label for="gender">Gender</label>
        <select id="gender" name="gender">
            <option value="">-- choose --</option>
            <option value="Female" <?= $gender === "Female" ? "selected" : "" ?>>Female</option>
            <option value="Male"   <?= $gender === "Male"   ? "selected" : "" ?>>Male</option>
        </select>

        <label for="password">Password (6 characters minimum)</label>
        <input type="password" id="password" name="password">

        <label for="confirm">Confirm password</label>
        <input type="password" id="confirm" name="confirm">

        <button type="submit">Sign up</button>
    </form>

<?php endif; ?>

<div class="card">
    <strong>Try to break it:</strong>
    <ul>
        <li>Send it completely empty - you get 6 errors at once.</li>
        <li>Type <code>abc</code> in the email field.</li>
        <li>Make the passwords different.</li>
        <li>Type <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> as your name and succeed -
            it prints as harmless text thanks to <code>htmlspecialchars()</code>.</li>
    </ul>
</div>

</body>
</html>
