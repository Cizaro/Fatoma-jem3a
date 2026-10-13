<?php
/*
 * PHP Exercises - Set I : Circle Calculator
 * MIT320 assignment. Run it with the server:
 *     http://localhost/fatoma/Php/assignments/set-1-circle/circle.php
 *
 * What the sheet asked for:
 *   - an HTML form with a radius box, a Calculate button and a Clear button
 *   - PHP that reads the radius AND works out which button was pressed
 *   - the right formula for the chosen calculation
 *   - the formula used AND the result, both displayed
 */

// ---------------------------------------------------------------
// 1. DEFAULTS - these run on the very first visit, before anything
//    has been submitted. Without them the form would error on load.
// ---------------------------------------------------------------
$radius  = "";          // what is sitting in the input box
$choice  = "area";      // which calculation is ticked
$formula = "";          // the formula text we will show
$result  = "";          // the number we worked out
$error   = "";          // a message if the radius is no good

// ---------------------------------------------------------------
// 2. DID SOMEBODY PRESS A BUTTON?
//    Each button has its own name, so isset() tells us which one.
//    This is the part the question is really testing.
// ---------------------------------------------------------------
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // ---- the Clear button: throw everything away and start again ----
    if (isset($_POST["clear"])) {
        $radius  = "";
        $choice  = "area";
        $formula = "";
        $result  = "";
        $error   = "";
    }

    // ---- the Calculate button ----
    elseif (isset($_POST["calculate"])) {

        $radius = trim($_POST["radius"] ?? "");
        $choice = $_POST["choice"] ?? "area";

        // 2a. VALIDATE. Never trust what arrives from a form.
        if ($radius === "") {
            $error = "Please enter the radius.";
        } elseif (!is_numeric($radius)) {
            $error = "The radius has to be a number.";
        } elseif ($radius <= 0) {
            $error = "The radius has to be bigger than zero.";
        } else {

            // 2b. CALCULATE. pi() is built into PHP - we never type 3.14159.
            $r = (float) $radius;

            if ($choice === "area") {
                $result  = pi() * $r * $r;                 // pi x r squared
                $formula = "Area = &pi; &times; r&sup2;";
            } elseif ($choice === "circumference") {
                $result  = 2 * pi() * $r;                  // 2 x pi x r
                $formula = "Circumference = 2 &times; &pi; &times; r";
            } else {
                $result  = (4 / 3) * pi() * $r * $r * $r;  // 4/3 x pi x r cubed
                $formula = "Volume = 4/3 &times; &pi; &times; r&sup3;";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Circle Calculator</title>
<style>
  body{font-family:system-ui,"Segoe UI",sans-serif;background:#f3f5fb;color:#151a2e;
       max-width:620px;margin:40px auto;padding:0 20px;line-height:1.6}
  h1{font-size:25px;margin-bottom:4px}
  .sub{color:#6b7490;margin-bottom:22px;font-size:14px}
  .box{background:#fff;border:1px solid #e2e7f4;border-radius:12px;padding:22px;margin-bottom:16px}
  label{font-weight:600}
  input[type=text]{padding:9px 12px;border:1px solid #ccd3e5;border-radius:7px;
       font-size:15px;width:190px;font-family:inherit}
  .choices{margin:16px 0}
  .choices label{display:block;font-weight:400;margin:6px 0;cursor:pointer}
  button{padding:9px 20px;border:0;border-radius:7px;font-size:15px;font-weight:600;
       cursor:pointer;font-family:inherit;margin-right:8px}
  .calc{background:#3b5bdb;color:#fff}
  .calc:hover{background:#2f4bc0}
  .clear{background:#eef1f8;color:#444c66}
  .clear:hover{background:#e2e7f4}
  .result{background:#e7f6ec;border-left:4px solid #2f9e44}
  .error{background:#fdeaea;border-left:4px solid #e03131;color:#c92a2a;
       padding:12px 16px;border-radius:8px;margin-bottom:16px}
  .line{margin:6px 0;font-size:16px}
  .big{font-size:19px;font-weight:700}
  .exact{color:#6b7490;font-size:13.5px;margin-top:10px}
  code{background:#eef1f8;padding:2px 6px;border-radius:4px;font-size:13px;
       font-family:ui-monospace,Consolas,monospace}
</style>
</head>
<body>

<h1>Circle Calculator</h1>
<p class="sub">PHP Exercises &ndash; Set I</p>

<?php if ($error): ?>
    <div class="error"><?= htmlspecialchars($error) ?></div>
<?php endif; ?>

<div class="box">
<form method="post">

    <label for="radius">Enter the Radius:</label>
    <input type="text" id="radius" name="radius" value="<?= htmlspecialchars($radius) ?>">

    <div class="choices">
        <label>
            <input type="radio" name="choice" value="area"
                   <?= $choice === "area" ? "checked" : "" ?>>
            Area &nbsp; <code>&pi; &times; r&sup2;</code>
        </label>
        <label>
            <input type="radio" name="choice" value="circumference"
                   <?= $choice === "circumference" ? "checked" : "" ?>>
            Circumference &nbsp; <code>2 &times; &pi; &times; r</code>
        </label>
        <label>
            <input type="radio" name="choice" value="volume"
                   <?= $choice === "volume" ? "checked" : "" ?>>
            Volume &nbsp; <code>4/3 &times; &pi; &times; r&sup3;</code>
            &nbsp;<span style="color:#6b7490;font-size:13px">(a sphere, not a flat circle)</span>
        </label>
    </div>

    <!-- TWO buttons, TWO different names. That is how PHP tells them apart. -->
    <button class="calc"  type="submit" name="calculate">Calculate</button>
    <button class="clear" type="submit" name="clear">Clear</button>

</form>
</div>

<?php if ($result !== ""): ?>
    <div class="box result">
        <div class="line">Shape: <strong>Circle</strong></div>
        <div class="line">Radius: <strong><?= htmlspecialchars($radius) ?></strong></div>
        <div class="line big"><?= $formula ?> = <?= round($result, 2) ?></div>
        <div class="exact">exact value: <?= $result ?></div>
    </div>
<?php endif; ?>

</body>
</html>
