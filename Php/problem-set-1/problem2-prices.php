<?php
/*
 * Problem 2: the e-commerce price filter.
 *
 * Constraint from the sheet: only if / else and the comparison operators.
 * No min(), no max(), no sort().
 *
 * The sheet asks for "HTML with dynamic CSS styling" - so the colour is
 * decided in PHP and echoed into a style attribute, rather than written
 * into the stylesheet.
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
<?php
// the five boxes are themselves echoed in a loop, rather than typed out
// five times with only the number changing
for ($i = 1; $i <= 5; $i++) {
    $value = htmlspecialchars($_POST["price" . $i] ?? "");
    echo "<label for='p" . $i . "'>Price " . $i . "</label>";
    echo "<input type='text' id='p" . $i . "' name='price" . $i . "' value='" . $value . "'>";
}
echo "<button type='submit' name='check' value='1'>Find the highest and lowest</button>";
?>
</form>

<?php
// ---- the output, echoed, with the colour chosen in PHP ----
if ($error !== "") {
    echo "<div class='result'><p>" . htmlspecialchars($error) . "</p></div>";

} elseif ($sent) {
    $green = "color: green; font-weight: 700";
    $red   = "color: red; font-weight: 700";

    echo "<div class='result'>";
    echo "<h2>Out of " . htmlspecialchars(implode(", ", $prices)) . "</h2>";
    echo "<p style='" . $green . "'>Highest price: $" . $highest . "</p>";
    echo "<p style='" . $red   . "'>Lowest price: $"  . $lowest  . "</p>";

    // every price listed, each one coloured by what it turned out to be
    echo "<table>";
    echo "<tr><th>Item</th><th>Price</th><th>Verdict</th></tr>";
    for ($i = 0; $i < 5; $i++) {
        $p = $prices[$i];
        if ($p == $highest) {
            $style = $green; $label = "most expensive";
        } elseif ($p == $lowest) {
            $style = $red;   $label = "cheapest";
        } else {
            $style = "";     $label = "";
        }
        echo "<tr>";
        echo "<td>Item " . ($i + 1) . "</td>";
        echo "<td style='" . $style . "'>$" . htmlspecialchars($p) . "</td>";
        echo "<td style='" . $style . "'>" . $label . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";
}

echo "<p><a href='index.php'>&larr; all seven solutions</a></p>";
?>
</div></body></html>
