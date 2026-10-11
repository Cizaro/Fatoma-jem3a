<?php
/*
 * Problem 4: the data science dashboard.
 *
 * No input at all - it runs on page load. The sheet asks PHP to
 * "dynamically generate an HTML5 <table>", so every tag of that table
 * comes out of echo, inside the loop.
 *
 * The header row is printed ONCE, outside the loop. Put it inside and you
 * get six header rows - the first thing to check when a generated table
 * looks wrong.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 4 - squares and cubes</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 4 &mdash; the data science dashboard</h1>
<p class="sub">Every whole number from 0 to 5, with its square and its cube.
   Nobody types anything; PHP draws the table when the page loads.</p>

<?php
echo "<table>
";

// once, before the loop
echo "<tr><th>N</th><th>N&sup2;</th><th>N&sup3;</th></tr>
";

// and now one row per pass
for ($n = 0; $n <= 5; $n++) {
    echo "<tr>
";
    echo "<td>" . $n . "</td>";
    echo "<td>" . ($n * $n) . "</td>";
    echo "<td>" . ($n * $n * $n) . "</td>";
    echo "</tr>
";
}

echo "</table>
";

echo "<p class='sub'>The first row really is all zeros. That is correct, and it "
   . "looks like a bug until you check it.</p>";
echo "<p><a href='index.php'>&larr; all seven solutions</a></p>
";
?>
</div></body></html>
