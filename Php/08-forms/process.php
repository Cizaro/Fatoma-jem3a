<?php
/*
 * This file RECEIVES the data. It has no form of its own.
 * Try opening it directly in the browser: you get nothing, because nothing was sent.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Processing...</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>process.php</h1>

<div class="card result">
<?php if (!empty($_POST)): ?>

    <strong>Arrived by POST</strong>
    <p>City: <?= htmlspecialchars($_POST["city"] ?? "(empty)") ?></p>
    <p>Language: <?= htmlspecialchars($_POST["lang"] ?? "(empty)") ?></p>
    <p>Notice the URL has no data in it.</p>

<?php elseif (!empty($_GET)): ?>

    <strong>Arrived by GET</strong>
    <p>You searched for: <?= htmlspecialchars($_GET["q"] ?? "(empty)") ?></p>
    <p>Now look at the address bar - your data is sitting in the URL.
       That is why passwords never go through GET.</p>

<?php else: ?>

    <strong>Nothing was sent.</strong>
    <p>You opened this file directly, so both <code>$_POST</code> and <code>$_GET</code> are empty.</p>

<?php endif; ?>
</div>

<div class="card">
    <p><strong>$_POST contains:</strong></p>
    <pre><?php print_r($_POST); ?></pre>
    <p><strong>$_GET contains:</strong></p>
    <pre><?php print_r($_GET); ?></pre>
</div>

<p><a href="form-separate.php">&larr; try again</a></p>

</body>
</html>
