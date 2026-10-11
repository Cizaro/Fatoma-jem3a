<?php
/*
 * Problem 3: the smart-home smart plug.
 *
 * % gives the remainder after dividing. 14 % 2 is 0, 15 % 2 is 1.
 * So "is it even?" is always  $n % 2 == 0  - and that one line is the
 * entire problem.
 */

$day     = $_POST["day"] ?? "";
$message = "";

if (isset($_POST["check"])) {
    if (!is_numeric($day) || $day < 1 || $day > 31) {
        $message = "Give a day of the month, 1 to 31.";
    } elseif ($day % 2 == 0) {
        $message = "Day $day is EVEN: Extra power mode active!";
    } else {
        $message = "Day $day is ODD: Eco-conservation mode active!";
    }
}
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
    <input type="number" id="d" name="day" min="1" max="31"
           value="<?php echo htmlspecialchars($day); ?>">
    <button type="submit" name="check" value="1">Check the day</button>
</form>

<?php if ($message): ?>
    <div class="result"><h2><?php echo htmlspecialchars($message); ?></h2></div>
<?php endif; ?>

<p><a href="index.php">&larr; all seven solutions</a></p>
</div></body></html>
