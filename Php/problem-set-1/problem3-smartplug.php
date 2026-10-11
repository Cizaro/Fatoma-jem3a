<?php
/*
 * Problem 3: the smart-home smart plug.
 *
 * % gives the remainder after dividing. 14 % 2 is 0, 15 % 2 is 1.
 * So "is it even?" is always  $n % 2 == 0  - and that one line is the
 * entire problem. The sheet asks for an HTML status message, so the
 * message and its styling are both built in PHP.
 */

$day = $_POST["day"] ?? "";
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Problem 3 - smart plug</title>
<link rel="stylesheet" href="style.css"></head>
<body><div class="sheet">

<h1>Problem 3 &mdash; smart-home smart plug</h1>
<p class="sub">Extra power on even days, conservation on odd ones.</p>

<form action="" method="POST">
    <label for="d">Day of the month</label>
    <input type="text" id="d" name="day" value="<?php echo htmlspecialchars($day); ?>">
    <button type="submit" name="check" value="1">Check the day</button>
</form>

<?php
// ---- the status message, echoed ----
if (isset($_POST["check"])) {

    if (!is_numeric($day) || $day < 1 || $day > 31) {
        echo "<div class='result'><p>Give a day of the month, 1 to 31.</p></div>";

    } elseif ($day % 2 == 0) {
        echo "<div class='result'>";
        echo "<h2 style='color: green'>Day " . $day . " is EVEN: Extra power mode active!</h2>";
        echo "<p>" . $day . " % 2 = 0, so the remainder is nothing and the day is even.</p>";
        echo "</div>";

    } else {
        echo "<div class='result'>";
        echo "<h2 style='color: #b4690e'>Day " . $day . " is ODD: Eco-conservation mode active!</h2>";
        echo "<p>" . $day . " % 2 = 1, so there is one left over and the day is odd.</p>";
        echo "</div>";
    }
}

echo "<p><a href='index.php'>&larr; all seven solutions</a></p>";
?>
</div></body></html>
