<?php
/*
 * The two-file version: this file ONLY shows the form.
 * action="process.php" sends the data to the other file.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Two files: form + process</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>The two-file way</h1>
<p class="sub">This page only shows the form. <code>process.php</code> does the work.</p>

<form method="post" action="process.php">
    <label for="city">Which city do you live in?</label>
    <input type="text" id="city" name="city" placeholder="Beirut">

    <label for="lang">Favourite language</label>
    <select id="lang" name="lang">
        <option value="PHP">PHP</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
    </select>

    <button type="submit">Send with POST</button>
</form>

<form method="get" action="process.php">
    <label for="q">Same thing but with GET - watch the URL change</label>
    <input type="text" id="q" name="q" placeholder="type anything">
    <button type="submit">Send with GET</button>
</form>

<p><a href="form.php">&larr; back to the one-file version</a></p>

</body>
</html>
