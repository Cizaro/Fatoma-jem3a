<?php

function average3($t1,$t2,$t3){
    return ($t1+$t2+$t3)/3;
}

function letterGrade($mark){
    if($mark >= 90){ return "A"; }
    else if($mark >= 80){ return "B"; }
    else if($mark >= 70){ return "C"; }
    else if($mark >= 60){ return "D"; }
    return "F";
}

?>

<form action="gpa.php" method="POST">

<h3>PHP</h3>
<input type="number" step=0.1 name="php1" placeholder="Test 1">
<input type="number" step=0.1 name="php2" placeholder="Test 2">
<input type="number" step=0.1 name="php3" placeholder="Test 3">

<h3>Data Science</h3>
<input type="number" step=0.1 name="ds1" placeholder="Test 1">
<input type="number" step=0.1 name="ds2" placeholder="Test 2">
<input type="number" step=0.1 name="ds3" placeholder="Test 3">

<h3>English</h3>
<input type="number" step=0.1 name="en1" placeholder="Test 1">
<input type="number" step=0.1 name="en2" placeholder="Test 2">
<input type="number" step=0.1 name="en3" placeholder="Test 3">

<br><br>
<button type="submit" name="bt" value="CALC">Calculate</button>

</form>

<?php

if(isset($_POST["bt"])){

    $php1 = $_POST["php1"];
    $php2 = $_POST["php2"];
    $php3 = $_POST["php3"];
    $ds1 = $_POST["ds1"];
    $ds2 = $_POST["ds2"];
    $ds3 = $_POST["ds3"];
    $en1 = $_POST["en1"];
    $en2 = $_POST["en2"];
    $en3 = $_POST["en3"];

    if(!is_numeric($php1) || !is_numeric($php2) || !is_numeric($php3) ||
       !is_numeric($ds1) || !is_numeric($ds2) || !is_numeric($ds3) ||
       !is_numeric($en1) || !is_numeric($en2) || !is_numeric($en3)){

        echo "Please enter a number in all nine boxes.";

    } else if($php1 < 0 || $php1 > 100 || $php2 < 0 || $php2 > 100 || $php3 < 0 || $php3 > 100 ||
              $ds1 < 0 || $ds1 > 100 || $ds2 < 0 || $ds2 > 100 || $ds3 < 0 || $ds3 > 100 ||
              $en1 < 0 || $en1 > 100 || $en2 < 0 || $en2 > 100 || $en3 < 0 || $en3 > 100){

        echo "Every mark must be from 0 to 100.";

    } else {

        $phpAvg = average3($php1,$php2,$php3);
        $dsAvg = average3($ds1,$ds2,$ds3);
        $enAvg = average3($en1,$en2,$en3);
        $gpa = average3($phpAvg,$dsAvg,$enAvg);

        echo "<table border='1'>";
        echo "<tr><th>Subject</th><th>Test 1</th><th>Test 2</th><th>Test 3</th><th>Average</th><th>Grade</th></tr>";
        echo "<tr><td>PHP</td><td>".$php1."</td><td>".$php2."</td><td>".$php3."</td><td>".number_format($phpAvg,2)."</td><td>".letterGrade($phpAvg)."</td></tr>";
        echo "<tr><td>Data Science</td><td>".$ds1."</td><td>".$ds2."</td><td>".$ds3."</td><td>".number_format($dsAvg,2)."</td><td>".letterGrade($dsAvg)."</td></tr>";
        echo "<tr><td>English</td><td>".$en1."</td><td>".$en2."</td><td>".$en3."</td><td>".number_format($enAvg,2)."</td><td>".letterGrade($enAvg)."</td></tr>";
        echo "</table>";

        echo "<br>GPA = ".number_format($gpa,2);
        echo "<br>Overall grade = ".letterGrade($gpa);
    }
}

?>
