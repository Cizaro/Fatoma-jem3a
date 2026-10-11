<?php
/*
 * Problem 1, approach 2: input through the URL, read with $_GET.
 * Try:  problem1b-get.php?num1=100&num2=10
 */

// Everything that arrives from a browser is a STRING. PHP converts it the
// moment arithmetic is done on it, which is why + gives 110 and not "10010".
$num1 = $_GET["num1"] ?? null;
$num2 = $_GET["num2"] ?? null;

// is_numeric also rejects an empty box, which isset on its own would not
$ready = is_numeric($num1) && is_numeric($num2);
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 1B - calculator by GET</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 1 &middot; B &mdash; numbers from the address bar</h1>
<p class="sub">The values travel in the URL, where you can see them. That is what
   makes GET shareable, and what makes it wrong for a password.</p>

<!-- method="get" puts the fields into the URL as ?num1=...&num2=... -->
<form action="" method="GET">
    <label for="a">First number</label>
    <input type="number" id="a" name="num1" step="any"
           value="<?php echo htmlspecialchars($num1 ?? ""); ?>">

    <label for="b">Second number</label>
    <input type="number" id="b" name="num2" step="any"
           value="<?php echo htmlspecialchars($num2 ?? ""); ?>">

    <button type="submit">Calculate</button>
</form>

<?php if ($ready): ?>
    <div class="result">
        <h2>Working with <?php echo $num1; ?> and <?php echo $num2; ?></h2>
        <p>Sum: <?php echo $num1 + $num2; ?></p>
        <p>Product: <?php echo $num1 * $num2; ?></p>
        <p>Difference: <?php echo $num1 - $num2; ?></p>
        <p>Quotient: <?php echo $num2 == 0 ? "cannot divide by zero" : $num1 / $num2; ?></p>
    </div>
    <p class="sub">Look at the address bar. Everything you typed is in it.</p>
<?php elseif ($num1 !== null || $num2 !== null): ?>
    <div class="result"><p>Both boxes need a number.</p></div>
<?php endif; ?>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
