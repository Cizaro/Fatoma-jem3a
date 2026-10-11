<?php
/*
 * Problem 5: the cloud storage pricing tier generator.
 *
 * Same machinery as problem 4 with different numbers, which is the point of
 * it following straight on. Note the loop starts at 1, not 0 - nobody buys
 * zero servers - and that decision lives in one character of the loop header.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 5 - pricing tiers</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 5 &mdash; cloud storage pricing tiers</h1>
<p class="sub">What each tier includes, worked out from the node count.</p>

<table>
    <tr>
        <th>Nodes</th><th>Storage GB</th><th>Bandwidth TB</th><th>API requests</th>
    </tr>
    <?php for ($n = 1; $n <= 6; $n++): ?>
        <tr>
            <td><?php echo $n; ?></td>
            <td><?php echo 10 * $n; ?></td>
            <td><?php echo 100 * $n; ?></td>
            <td><?php echo number_format(1000 * $n); ?></td>
        </tr>
    <?php endfor; ?>
</table>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
