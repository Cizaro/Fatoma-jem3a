<?php
/* =====================================================================
 * <QUESTION TITLE>
 *
 * Copy this file, keep the four parts, fill them in. An answer without
 * all four is an incomplete answer in this module.
 *
 * ---------------------------------------------------------------------
 * 1. PSEUDOCODE          CAPITALS, <-- to put a value in, [comments]
 * ---------------------------------------------------------------------
 *   START
 *     X <-- the value from the form
 *     IF <the thing that could be wrong> THEN
 *         PRINT "<the message>"
 *     ELSE
 *         <RESULT> <-- <the formula>
 *         PRINT <the formula used> , <the result>
 *     ENDIF
 *   STOP
 *
 * ---------------------------------------------------------------------
 * 2. FLOWCHART           drawn on paper and scanned; sketched here
 * ---------------------------------------------------------------------
 *   ( START ) -> / read X / -> < is X valid ? >
 *                                  | no  -> / print error / -> ( STOP )
 *                                  | yes -> [ RESULT <-- formula ]
 *                                        -> / print RESULT / -> ( STOP )
 * ===================================================================== */
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title><QUESTION TITLE></title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="sheet">

<h1><QUESTION TITLE></h1>

<!-- ------------------------------------------------------------------
     3. HTML FORM
     - one input per value the question asks the user for
     - name="..." is the only part PHP ever sees
     - a button that PHP must detect has to be type="submit" WITH a name;
       type="reset" only empties the boxes and sends nothing
     ------------------------------------------------------------------ -->
<form action="<THIS FILE>.php" method="POST">
    <label> <the label> </label>
    <input type="number" step="any" name="<name>">

    <input type="submit" name="<button1>" value="<Button 1>">
    <input type="reset" value="Clear">
</form>

<?php
/* ------------------------------------------------------------------
   4. PHP SCRIPT
   ------------------------------------------------------------------ */

if (isset($_POST["<name>"])) {

    $X = $_POST["<name>"];          // one short capital per quantity

    if (!is_numeric($X)) {
        echo "<p class='error'>Please enter a number.</p>";
    } else {

        $RESULT = $X;               // <-- the formula goes here

        echo "<div class='result'>";
        echo "<p><the formula written out> = " . $RESULT . "</p>";
        echo "</div>";
    }
}
?>

</div>
</body>
</html>
