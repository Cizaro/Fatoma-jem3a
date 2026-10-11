<?php
/*
 * Problem 4: the data science dashboard.
 *
 * No input at all - it runs on page load. The header row is printed ONCE,
 * outside the loop; the data rows go inside it. Getting that the wrong way
 * round gives you six header rows, and it is the first thing to check when
 * a generated table looks odd.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 4 - squares and cubes</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 4 &mdash; the data science dashboard</h1>
<p class="sub">Every whole number from 0 to 5, with its square and its cube.
   Nobody types anything; the page draws itself.</p>

<table>
    <tr><th>N</th><th>N squared</th><th>N cubed</th></tr>
    <?php for ($n = 0; $n <= 5; $n++): ?>
        <tr>
            <td><?php echo $n; ?></td>
            <td><?php echo $n * $n; ?></td>
            <td><?php echo $n * $n * $n; ?></td>
        </tr>
    <?php endfor; ?>
</table>

<p class="sub">The first row really is all zeros. That is correct, and it looks
   like a bug until you check it.</p>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
