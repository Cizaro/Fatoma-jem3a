<?php
/*
 * PHP Problems - Set I: the seven solutions.
 *
 * Put this folder inside C:\xampp\htdocs\, start Apache, and open
 * http://localhost/problem-set-1/
 */
$files = [
    ["problem1a-hardcoded.php", "1 &middot; A", "Calculator, numbers written in the code",
     "Two variables, four results, printed into the page. No input."],
    ["problem1b-get.php", "1 &middot; B", "Calculator by GET",
     "The same sums, with the numbers arriving in the URL."],
    ["problem1c-post.php", "1 &middot; C", "Calculator by POST, four buttons",
     "ADD, SUB, MULT, DIV. isset() works out which one was pressed."],
    ["problem2-prices.php", "2", "The e-commerce price filter",
     "Five prices, highest in green and lowest in red, without min() or max()."],
    ["problem3-smartplug.php", "3", "Smart-home smart plug",
     "Odd or even, decided with the modulus operator."],
    ["problem4-dashboard.php", "4", "The data science dashboard",
     "Squares and cubes from 0 to 5, in a generated table."],
    ["problem5-tiers.php", "5", "Cloud storage pricing tiers",
     "Storage, bandwidth and requests for one to six nodes."],
];
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>PHP Problems, Set I - solutions</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>PHP Problems &mdash; Set I</h1>
<p class="sub">Seven working solutions. Each file is commented with the reason it
   is written the way it is, not just what it does.</p>

<?php foreach ($files as [$file, $n, $title, $blurb]): ?>
    <div class="result">
        <h2><?php echo $n; ?> &mdash; <a href="<?php echo $file; ?>"><?php echo $title; ?></a></h2>
        <p><?php echo $blurb; ?></p>
        <p><code><?php echo $file; ?></code></p>
    </div>
<?php endforeach; ?>

<p class="sub">Problems 4 and 5 need no input and no form. The other five do,
   so they only work with a server running &mdash; Apache in XAMPP, or
   <code>php -S localhost:8000</code>.</p>
</div></body></html>
