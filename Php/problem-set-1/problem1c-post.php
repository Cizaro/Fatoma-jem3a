<?php
/*
 * Problem 1, approach 3: an HTML form with text fields and four action
 * buttons, processed in PHP via $_POST.
 *
 * Each button carries its own name, and only the button actually clicked
 * is sent - so isset() can tell which one it was with no extra field.
 * Same shape as isset($_POST['Sum']) from the lecture, with four buttons.
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
        if ($num2 == 0) {
            $error = "You cannot divide by zero.";
        } else {
            $result = $num1 / $num2;
        }
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
    <label for="a">First Number</label>
    <input type="text" id="a" name="num1" value="<?php echo htmlspecialchars($num1); ?>">

    <label for="b">Second Number</label>
    <input type="text" id="b" name="num2" value="<?php echo htmlspecialchars($num2); ?>">

    <!-- type must be submit. type="button" does nothing without JavaScript. -->
    <button type="submit" name="ADD"  value="1">ADD</button>
    <button type="submit" name="SUB"  value="1">SUB</button>
    <button type="submit" name="MULT" value="1">MULT</button>
    <button type="submit" name="DIV"  value="1">DIV</button>
</form>

<?php
// ---- the output, echoed ----
if ($error !== "") {
    echo "<div class='result'><p>" . htmlspecialchars($error) . "</p></div>";
} elseif ($result !== null) {
    echo "<div class='result'><h2>The result = " . $result . "</h2></div>";
}

echo "<p><a href='index.php'>&larr; all seven solutions</a></p>";
?>
</div></body></html>
