<?php
/*
 * Problem 1, approach 2: input through the URL, read with $_GET.
 * Try:  problem1b-get.php?num1=100&num2=10
 *
 * The form is written as HTML because the sheet asks for an HTML form.
 * Everything PHP works out is echoed.
 */

// Everything arriving from a browser is a STRING. PHP converts it the moment
// arithmetic touches it, which is why + gives 110 and not "10010".
$num1 = $_GET["num1"] ?? null;
$num2 = $_GET["num2"] ?? null;

// is_numeric also rejects an empty box, which isset() on its own would not
$ready = is_numeric($num1) && is_numeric($num2);
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 1B - calculator by GET</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 1 &middot; B &mdash; numbers from the address bar</h1>
<p class="sub">The values travel in the URL where you can see them. That is what
   makes GET shareable, and what makes it wrong for a password.</p>

<!-- method="GET" puts the fields into the URL as ?num1=...&num2=... -->
<form action="" method="GET">
    <label for="a">First number</label>
    <input type="text" id="a" name="num1"
           value="<?php echo htmlspecialchars($num1 ?? ""); ?>">

    <label for="b">Second number</label>
    <input type="text" id="b" name="num2"
           value="<?php echo htmlspecialchars($num2 ?? ""); ?>">

    <button type="submit">Calculate</button>
</form>

<?php
// ---- the output, echoed ----
if ($ready) {
    echo "<div class='result'>";
    echo "<h2>Working with " . htmlspecialchars($num1) . " and " . htmlspecialchars($num2) . "</h2>";
    echo "<p>Sum: " . ($num1 + $num2) . "</p>";
    echo "<p>Product: " . ($num1 * $num2) . "</p>";
    echo "<p>Difference: " . ($num1 - $num2) . "</p>";

    if ($num2 == 0) {
        echo "<p>Quotient: cannot divide by zero</p>";
    } else {
        echo "<p>Quotient: " . ($num1 / $num2) . "</p>";
    }
    echo "</div>";
    echo "<p class='sub'>Look at the address bar. Everything you typed is in it.</p>";

} elseif ($num1 !== null || $num2 !== null) {
    echo "<div class='result'><p>Both boxes need a number.</p></div>";
}

echo "<p><a href='index.php'>&larr; all seven solutions</a></p>";
?>
</div></body></html>
