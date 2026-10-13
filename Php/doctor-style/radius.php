<?php
/* =====================================================================
 * PHP - Exercises - Set I : the circle calculator
 *
 * The form has exactly what the sheet asks for: a radius field, a
 * Calculate button, a Clear button. Nothing else.
 *
 * PSEUDOCODE
 *   START
 *     [the form has already been filled in]
 *     IF the Clear button was pressed THEN
 *         R <-- empty
 *     ELSE IF the Calculate button was pressed THEN
 *         R <-- the radius from the form
 *         IF R is not a number OR R <= 0 THEN
 *             PRINT "enter a positive number"
 *         ELSE
 *             A <-- PI * R * R
 *             C <-- 2 * PI * R
 *             V <-- (4 / 3) * PI * R * R * R
 *             PRINT "Shape: Circle"
 *             PRINT "Radius: " , R
 *             PRINT "Area = PI x r^2 = " , A
 *             PRINT "Circumference = 2 x PI x r = " , C
 *             PRINT "Volume = 4/3 PI r^3 = " , V
 *         ENDIF
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

// Clear is a submit button too, so PHP can identify it. Pressing it comes
// back with an empty box and no results - which is what "or cancel it"
// means in the example output on the sheet.
$R = "";
if (isset($_POST["calculate"])) {
    $R = $_POST["rad"];
}
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

<!-- HTML FORM -->
<form action="radius.php" method="POST">
    <label> Enter the Radius: </label>
    <input type="number" step="any" name="rad" value="<?php echo htmlspecialchars($R); ?>">
    <input type="submit" name="calculate" value="Calculate">
    <input type="submit" name="clear" value="Clear">
</form>

<?php
// ---------------------------------------------------------------------
// PHP SCRIPT
// ---------------------------------------------------------------------
if (isset($_POST["calculate"])) {

    if (!is_numeric($R) || $R <= 0) {
        echo "<p class='error'>Please enter a positive number.</p>";
    } else {

        $A = pi() * $R * $R;                // Area
        $C = 2 * pi() * $R;                 // Circumference
        $V = (4 / 3) * pi() * pow($R, 3);   // Volume

        echo "<div class='result'>";
        echo "<p>Shape: Circle</p>";
        echo "<p>Radius: " . $R . "</p>";
        echo "<p>Area = &pi; x r&sup2; = " . $A . "</p>";
        echo "<p>Circumference = 2 x &pi; x r = " . $C . "</p>";
        echo "<p>Volume = 4/3 &pi; r&sup3; = " . $V . "</p>";
        echo "</div>";
    }
}
?>

</div>
</body>
</html>
