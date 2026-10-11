<?php
/*
 * Problem 5: the cloud storage pricing tier generator.
 *
 * Same machinery as problem 4 with different numbers, which is why it
 * follows straight on. The whole table is echoed from the loop.
 *
 * Note it starts at 1, not 0 - nobody buys zero servers - and that
 * decision lives in one character of the loop header.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 5 - pricing tiers</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 5 &mdash; cloud storage pricing tiers</h1>
<p class="sub">What each tier includes, worked out from the node count.</p>

<?php
echo "<table>
";
echo "<tr><th>Nodes</th><th>Storage GB</th><th>Bandwidth TB</th><th>API requests</th></tr>
";

for ($n = 1; $n <= 6; $n++) {
    $storage   = 10   * $n;
    $bandwidth = 100  * $n;
    $requests  = 1000 * $n;

    echo "<tr>
";
    echo "<td>" . $n . "</td>";
    echo "<td>" . $storage . "</td>";
    echo "<td>" . $bandwidth . "</td>";
    echo "<td>" . number_format($requests) . "</td>";
    echo "</tr>
";
}

echo "</table>
";
echo "<p><a href='index.php'>&larr; all seven solutions</a></p>
";
?>
</div></body></html>
