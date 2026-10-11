<?php
/*
 * Problem 1, approach 1: hardcoded inputs, server-side HTML output.
 *
 * The sheet asks for the results to be rendered "directly into the
 * webpage's HTML structure using PHP echo statements" - so every tag
 * below is printed BY PHP. Nothing is typed as static markup.
 */

$num1 = 100;
$num2 = 10;

// Work the answers out from the variables. Never type 110 yourself: the
// whole point is that changing $num1 above changes every line below.
$sum        = $num1 + $num2;
$product    = $num1 * $num2;
$difference = $num1 - $num2;
$quotient   = $num1 / $num2;

// ---- the page, echoed ----
echo "<!DOCTYPE html>
";
echo "<html lang='en'>
";
echo "<head>
";
echo "<meta charset='UTF-8'>
";
echo "<title>Problem 1A - hardcoded calculator</title>
";
echo "<link rel='stylesheet' href='style.css'>
";
echo "</head>
";
echo "<body>
";
echo "<div class='sheet'>
";

echo "<h1>Problem 1 &middot; A &mdash; numbers written in the code</h1>
";
echo "<p class='sub'>No form. The numbers live in the script, and PHP builds "
   . "this whole page with echo.</p>";

echo "<div class='result'>
";
echo "<h2>Working with " . $num1 . " and " . $num2 . "</h2>";
echo "<p>Sum: " . $sum . "</p>";
echo "<p>Product: " . $product . "</p>";
echo "<p>Difference: " . $difference . "</p>";
echo "<p>Quotient: " . $quotient . "</p>";
echo "</div>
";

echo "<p><a href='index.php'>&larr; all seven solutions</a></p>
";
echo "</div>
";
echo "</body>
";
echo "</html>
";
