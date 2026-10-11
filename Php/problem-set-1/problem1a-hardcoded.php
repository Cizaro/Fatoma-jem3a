<?php
/*
 * Problem 1, approach 1: hardcoded inputs, server-side HTML output.
 * The numbers are written by the developer, inside the script.
 */

$num1 = 100;
$num2 = 10;

// Work the answers out from the variables. Never type 110 yourself - the
// whole point is that changing $num1 above changes all four lines below.
$sum        = $num1 + $num2;
$product    = $num1 * $num2;
$difference = $num1 - $num2;
$quotient   = $num1 / $num2;
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 1A - hardcoded calculator</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 1 &middot; A &mdash; numbers written in the code</h1>
<p class="sub">No form. Edit <code>$num1</code> and <code>$num2</code> at the top of the file
   and refresh.</p>

<div class="result">
    <h2>Working with <?php echo $num1; ?> and <?php echo $num2; ?></h2>
    <p>Sum: <?php echo $sum; ?></p>
    <p>Product: <?php echo $product; ?></p>
    <p>Difference: <?php echo $difference; ?></p>
    <p>Quotient: <?php echo $quotient; ?></p>
</div>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
