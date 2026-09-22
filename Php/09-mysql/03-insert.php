<?php
/*
 * Step 3: a form that INSERTs into the database, safely.
 * This combines Lesson 8 (forms) with Lesson 9 (SQL).
 */
require "db.php";

$errors  = [];
$success = "";
$name = $email = $major = $grade = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name  = trim($_POST["name"]  ?? "");
    $email = trim($_POST["email"] ?? "");
    $major = trim($_POST["major"] ?? "");
    $grade =      $_POST["grade"] ?? "";

    if ($name === "")                                 $errors[] = "Name is required.";
    if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL))
                                                      $errors[] = "Invalid email.";
    if ($grade === "" || !is_numeric($grade))         $errors[] = "Grade must be a number.";
    elseif ($grade < 0 || $grade > 20)                $errors[] = "Grade must be between 0 and 20.";

    if (count($errors) === 0) {

        // PREPARED STATEMENT - the safe way
        $stmt = mysqli_prepare($conn,
            "INSERT INTO students (name, email, major, grade) VALUES (?, ?, ?, ?)");

        // "sssd" describes the 4 values: string, string, string, decimal
        mysqli_stmt_bind_param($stmt, "sssd", $name, $email, $major, $grade);

        if (mysqli_stmt_execute($stmt)) {
            $newId = mysqli_insert_id($conn);       // the id MySQL just created
            $success = "Added $name with id $newId.";
            $name = $email = $major = $grade = "";  // clear the form
        } else {
            $errors[] = "Database error: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Add a student</title>
<link rel="stylesheet" href="../08-forms/style.css"></head>
<body>

<h1>Add a student</h1>
<p class="sub">Form (Lesson 8) + INSERT (Lesson 9), with a prepared statement.</p>

<?php if ($success): ?>
    <div class="card result"><?= htmlspecialchars($success) ?></div>
<?php endif; ?>

<?php if ($errors): ?>
    <div class="card errors">
        <ul><?php foreach ($errors as $e): ?><li><?= htmlspecialchars($e) ?></li><?php endforeach; ?></ul>
    </div>
<?php endif; ?>

<form method="post">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" value="<?= htmlspecialchars($name) ?>">

    <label for="email">Email</label>
    <input type="text" id="email" name="email" value="<?= htmlspecialchars($email) ?>">

    <label for="major">Major</label>
    <input type="text" id="major" name="major" value="<?= htmlspecialchars($major) ?>">

    <label for="grade">Grade (0 - 20)</label>
    <input type="text" id="grade" name="grade" value="<?= htmlspecialchars($grade) ?>">

    <button type="submit">Save to database</button>
</form>

<div class="card">
    <strong>The important line:</strong>
    <pre>mysqli_stmt_bind_param($stmt, "sssd", $name, $email, $major, $grade);</pre>
    <p>Each letter describes one value: <code>s</code> string, <code>i</code> integer,
       <code>d</code> decimal. The count of letters must match the count of <code>?</code>.</p>
</div>

<p><a href="02-select.php">&larr; see the list</a> &nbsp;|&nbsp; <a href="04-crud.php">full CRUD page &rarr;</a></p>

<?php mysqli_close($conn); ?>
</body>
</html>
