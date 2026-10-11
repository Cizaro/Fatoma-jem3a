<?php
/*
 * Problem 2: the e-commerce price filter.
 *
 * Constraint from the sheet: only if / else and the comparison operators.
 * No min(), no max(), no sort().
 */

$prices  = [];
$sent    = isset($_POST["check"]);
$highest = null;
$lowest  = null;
$error   = "";

if ($sent) {
    for ($i = 1; $i <= 5; $i++) {
        $prices[] = $_POST["price" . $i] ?? "";
    }

    $allNumbers = true;
    foreach ($prices as $p) {
        if (!is_numeric($p)) { $allNumbers = false; }
    }

    if (!$allNumbers) {
        $error = "All five boxes need a price.";
    } else {
        /* Start by assuming the FIRST price is both the highest and the
           lowest. That is the only honest starting guess: $highest = 0
           breaks on negative numbers, and $lowest = 0 breaks always,
           because no price is ever below zero. */
        $highest = $prices[0];
        $lowest  = $prices[0];

        for ($i = 1; $i < 5; $i++) {
            if ($prices[$i] > $highest) { $highest = $prices[$i]; }
            if ($prices[$i] < $lowest)  { $lowest  = $prices[$i]; }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 2 - price filter</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 2 &mdash; the e-commerce price filter</h1>
<p class="sub">Five prices in, dearest in green and cheapest in red out &mdash;
   found by comparing, not by calling a built-in.</p>

<form action="" method="POST">
    <?php for ($i = 1; $i <= 5; $i++): ?>
        <label for="p<?php echo $i; ?>">Price <?php echo $i; ?></label>
        <input type="number" step="0.01" id="p<?php echo $i; ?>" name="price<?php echo $i; ?>"
               value="<?php echo htmlspecialchars($_POST["price" . $i] ?? ""); ?>">
    <?php endfor; ?>
    <button type="submit" name="check" value="1">Find the highest and lowest</button>
</form>

<?php if ($error): ?>
    <div class="result"><p><?php echo htmlspecialchars($error); ?></p></div>
<?php elseif ($sent): ?>
    <div class="result">
        <h2>Out of <?php echo implode(", ", array_map("htmlspecialchars", $prices)); ?></h2>
        <p style="color: green; font-weight: 700">Highest price: $<?php echo $highest; ?></p>
        <p style="color: red; font-weight: 700">Lowest price: $<?php echo $lowest; ?></p>
    </div>
<?php endif; ?>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
