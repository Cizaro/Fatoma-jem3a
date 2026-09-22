<?php
/*
 * PROJECT 1 - GRADE CALCULATOR   (starter file)
 * Run:  php projects/project-1-grades/grades.php
 *
 * The data and the first function are given to you.
 * Everything marked TODO is yours. Do them in order and run after each one.
 */

// ---------------------------------------------------------------
// THE DATA - a multidimensional array. Each student is one row.
// ---------------------------------------------------------------
$students = [
    ["name" => "Fatima", "marks" => [18, 15, 17]],
    ["name" => "Sara",   "marks" => [8,  12, 9]],
    ["name" => "Lina",   "marks" => [14, 13, 16]],
    ["name" => "Nour",   "marks" => [6,  9,  7]],
    ["name" => "Maya",   "marks" => [19, 18, 20]],
];


// ---------------------------------------------------------------
// GIVEN TO YOU - study this function, then write the others like it
// ---------------------------------------------------------------
function average($marks) {
    if (count($marks) === 0) {
        return 0;                     // never divide by zero
    }
    return round(array_sum($marks) / count($marks), 2);
}


// ---------------------------------------------------------------
// TODO 1: write letterGrade($average)
//   18 and up -> "A"   16 -> "B"   14 -> "C"   10 -> "D"   else "F"
//   Remember: biggest condition FIRST.
// ---------------------------------------------------------------



// ---------------------------------------------------------------
// TODO 2: write hasPassed($average)  -> returns true if 10 or more
// ---------------------------------------------------------------



// ---------------------------------------------------------------
// TODO 3: print the table.
// Use a foreach over $students. For each one print:
//   name | the 3 marks | average | letter | Pass or Fail
// printf("%-10s %-14s %-8s %-3s %s\n", ...) makes the columns line up.
// implode(", ", $s["marks"]) turns [18,15,17] into "18, 15, 17".
// ---------------------------------------------------------------

echo str_repeat("=", 52) . "\n";
printf("%-10s %-14s %-8s %-3s %s\n", "NAME", "MARKS", "AVERAGE", "GR", "RESULT");
echo str_repeat("=", 52) . "\n";

// your foreach here



echo str_repeat("=", 52) . "\n";


// ---------------------------------------------------------------
// TODO 4: class statistics. Print:
//   - the class average (the average of all the students' averages)
//   - the highest average and the lowest
//   - how many passed and how many failed
// Hint: build an array of averages first, then use array_sum/max/min on it.
// ---------------------------------------------------------------



// ---------------------------------------------------------------
// TODO 5: print the name of the best student.
// Hint: keep two variables, $bestName and $bestAvg, and update them
// inside a loop whenever you find something higher.
// ---------------------------------------------------------------



// ---------------------------------------------------------------
// STRETCH (only when everything above works)
//   A) sort the table by average, best first
//   B) draw a bar:  str_repeat("#", round($avg)) next to each student
//   C) weights: the 3 marks count 20%, 30%, 50% instead of equally
// ---------------------------------------------------------------
