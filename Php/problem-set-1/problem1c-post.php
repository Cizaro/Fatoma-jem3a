<?php
/*
 * Problem 1, approach 3: an HTML form with four action buttons, read with $_POST.
 *
 * Each button carries its own name. Only the button actually clicked is sent,
 * so isset() can tell which one it was without any extra field. This is the
 * same shape as isset($_POST['Sum']) from the lecture, with four buttons
 * instead of one.
 */

$num1   = $_POST["num1"] ?? "";
$num2   = $_POST["num2"] ?? "";
$result = null;
$error  = "";

if (isset($_POST["ADD"]) || isset($_POST["SUB"]) || isset($_POST["MULT"]) || isset($_POST["DIV"])) {

    if (!is_numeric($num1) || !is_numeric($num2)) {
        $error = "Both boxes need a number.";
    } elseif (isset($_POST["ADD"])) {
        $result = $num1 + $num2;
    } elseif (isset($_POST["SUB"])) {
        $result = $num1 - $num2;
    } elseif (isset($_POST["MULT"])) {
        $result = $num1 * $num2;
    } elseif (isset($_POST["DIV"])) {
        $result = $num2 == 0 ? null : $num1 / $num2;
        if ($result === null) { $error = "You cannot divide by zero."; }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 1C - calculator by POST</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 1 &middot; C &mdash; a form with four buttons</h1>
<p class="sub">POST hides the values in the request body. Nothing appears in the
   address bar.</p>

<!-- action="" sends it back to this same file -->
<form action="" method="POST">
    <label for="a">First number</label>
    <input type="number" id="a" name="num1" step="any"
           value="<?php echo htmlspecialchars($num1); ?>">

    <label for="b">Second number</label>
    <input type="number" id="b" name="num2" step="any"
           value="<?php echo htmlspecialchars($num2); ?>">

    <!-- type must be submit. type="button" does nothing without JavaScript. -->
    <button type="submit" name="ADD"  value="1">ADD</button>
    <button type="submit" name="SUB"  value="1">SUB</button>
    <button type="submit" name="MULT" value="1">MULT</button>
    <button type="submit" name="DIV"  value="1">DIV</button>
</form>

<?php if ($error): ?>
    <div class="result"><p><?php echo htmlspecialchars($error); ?></p></div>
<?php elseif ($result !== null): ?>
    <div class="result"><h2>The result = <?php echo $result; ?></h2></div>
<?php endif; ?>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
