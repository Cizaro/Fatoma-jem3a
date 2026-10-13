<?php
/* =====================================================================
 * PHP - Exercises - Set I : the circle calculator
 * Answered the way the lecturer answers it.
 *
 * PSEUDOCODE
 *   START
 *     [the form has already been filled in]
 *     R <-- the radius from the form
 *     IF R is not a number OR R <= 0 THEN
 *         PRINT "enter a positive number"
 *     ELSE
 *         A <-- PI * R * R
 *         C <-- 2 * PI * R
 *         V <-- (4 / 3) * PI * R * R * R
 *         PRINT "Shape: Circle"
 *         PRINT "Radius: " , R
 *         PRINT the formula and the result for the button that was pressed
 *     ENDIF
 *   STOP
 *
 * FLOWCHART
 *   ( START ) -> / read R / -> < R > 0 ? >
 *                                  | no  -> / print error / -> ( STOP )
 *                                  | yes -> [ A <-- PI*R*R ]
 *                                        -> [ C <-- 2*PI*R ]
 *                                        -> [ V <-- 4/3*PI*R^3 ]
 *                                        -> / print A, C, V / -> ( STOP )
 * ===================================================================== */
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Circle calculator</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="sheet">

<h1>Enter the Radius</h1>

<!-- HTML FORM - exactly the shape from the board -->
<form action="radius.php" method="POST">
    <label> Enter the Radius: </label>
    <input type="number" step="any" name="rad"
           value="<?php echo isset($_POST["rad"]) ? htmlspecialchars($_POST["rad"]) : ""; ?>">

    <!-- three submit buttons, because the sheet says "identify which button
         was pressed" and asks for the area, circumference OR volume -->
    <input type="submit" name="area"   value="Area">
    <input type="submit" name="circum" value="Circumference">
    <input type="submit" name="volume" value="Volume">
    <input type="submit" name="all"    value="Calculate">

    <!-- type="reset" empties the boxes in the browser. It sends nothing, so
         PHP can never know it was pressed. That is what reset is for. -->
    <input type="reset" value="Clear">
</form>

<?php
// ---------------------------------------------------------------------
// PHP SCRIPT
// ---------------------------------------------------------------------

// isset() tells us the form was submitted. Without it the page warns on
// its very first load, before anybody has typed anything.
if (isset($_POST["rad"])) {

    $R = $_POST["rad"];                 // Radius

    if (!is_numeric($R) || $R <= 0) {
        echo "<p class='error'>Please enter a positive number.</p>";
    } else {

        $A = pi() * $R * $R;            // Area          = PI x r^2
        $C = 2 * pi() * $R;             // Circumference = 2 x PI x r
        $V = (4 / 3) * pi() * pow($R, 3);   // Volume    = 4/3 PI r^3

        echo "<div class='result'>";
        echo "<p>Shape: Circle</p>";
        echo "<p>Radius: " . $R . "</p>";

        // which button was pressed decides what is shown.
        // The sheet asks for the FORMULA as well as the answer.
        if (isset($_POST["area"])) {
            echo "<p>Area = &pi; x r&sup2; = " . round($A, 2) . "</p>";

        } elseif (isset($_POST["circum"])) {
            echo "<p>Circumference = 2 x &pi; x r = " . round($C, 2) . "</p>";

        } elseif (isset($_POST["volume"])) {
            echo "<p>Volume = 4/3 &pi; r&sup3; = " . round($V, 2) . "</p>";

        } else {
            // the plain Calculate button: show all three, as on the board
            echo "<p>Area = &pi; x r&sup2; = " . $A . "</p>";
            echo "<p>Circumference = 2 x &pi; x r = " . $C . "</p>";
            echo "<p>Volume = 4/3 &pi; r&sup3; = " . $V . "</p>";
        }

        echo "</div>";
    }
}
?>

<p class="sub">Radius 5 gives 78.539816339745, 31.415926535898 and
   523.5987755983 &mdash; the three numbers printed on the exercise sheet.</p>

</div>
</body>
</html>
