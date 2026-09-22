<?php
/*
 * The self-submitting form: the form and the code that handles it in ONE file.
 * Open:  http://localhost:8000/08-forms/form.php
 */

// These start empty so the page works on the first visit too.
$name = "";
$age  = "";
$submitted = false;

// This block runs ONLY after the user pressed the button.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $submitted = true;
    $name = $_POST["name"] ?? "";     // ?? "" means: or empty if it is missing
    $age  = $_POST["age"]  ?? "";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Form + PHP</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Lesson 8 - a form talking to PHP</h1>
<p class="sub">One file does both jobs: it shows the form, and it reads the answer.</p>

<form method="post">
    <label for="name">Your name</label>
    <input type="text" id="name" name="name" placeholder="Fatima" value="<?= htmlspecialchars($name) ?>">

    <label for="age">Your age</label>
    <input type="number" id="age" name="age" placeholder="20" value="<?= htmlspecialchars($age) ?>">

    <button type="submit">Send to PHP</button>
</form>

<?php if ($submitted): ?>
    <div class="card result">
        <strong>PHP received this:</strong>
        <p>
            Hello <?= htmlspecialchars($name) ?>!
            <?php if (is_numeric($age)): ?>
                Next year you will be <?= (int)$age + 1 ?>.
            <?php endif; ?>
        </p>
        <p>The raw <code>$_POST</code> array:</p>
        <pre><?php print_r($_POST); ?></pre>
    </div>
<?php endif; ?>

<div class="card">
    <strong>Look at the code and notice:</strong>
    <ul>
        <li>Each input has a <code>name</code> - that is the key in <code>$_POST</code>.</li>
        <li><code>value="&lt;?= ... ?&gt;"</code> keeps what you typed after sending.</li>
        <li><code>htmlspecialchars()</code> protects the page. Try typing
            <code>&lt;b&gt;hi&lt;/b&gt;</code> as your name - it shows as text, it does not become bold.</li>
    </ul>
    <p><a href="form-separate.php">Next: the two-file version &rarr;</a></p>
</div>

</body>
</html>
