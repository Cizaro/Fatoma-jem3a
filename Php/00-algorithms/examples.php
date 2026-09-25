<?php
/*
 * Lesson 0A — Algorithms, Flowcharts and Pseudocode
 * Run:  php 00-algorithms/examples.php
 *
 * Every example here is one of the algorithms from the MIT320 slides, written
 * out as pseudocode in a comment and then in real PHP directly underneath.
 *
 * Read the pseudocode first and predict the output. Then run the file.
 * The gap between what you predicted and what printed is the lesson.
 */

echo "===== 1. Add two numbers =====\n";
/*
 * Algorithm ADD [adds two numbers and prints the total]
 *   1. SUM <-- 0
 *   2. Read : A, B
 *   3. SUM <-- A + B
 *   4. Write : SUM
 *   5. Exit
 *
 * Four pseudocode lines, four PHP lines. That is the whole point of designing first.
 */
$sum = 0;                      // 1. SUM <-- 0
$a = 10;                       // 2. Read : A, B   (in a real program these come from a form)
$b = 20;
$sum = $a + $b;                // 3. SUM <-- A + B
echo "$a + $b = $sum\n";       // 4. Write : SUM


echo "\n===== 2. Grade: pass or fail =====\n";
/*
 * Algorithm GRADE [averages four marks and decides pass or fail]
 *   1. Input M1, M2, M3, M4
 *   2. GRADE <-- (M1 + M2 + M3 + M4) / 4
 *   3. if (GRADE < 60) then
 *          Print "FAIL"
 *      else
 *          Print "PASS"
 *      endif
 *
 * Careful: MIT320 marks out of 100 and fails below 60. The rest of this course
 * marks out of 20 and passes at 10. Always use the number the question gives you.
 */
$m1 = 72;
$m2 = 65;
$m3 = 48;
$m4 = 59;

$grade = ($m1 + $m2 + $m3 + $m4) / 4;

echo "Marks: $m1, $m2, $m3, $m4\n";
echo "Average: $grade\n";

// The pseudocode said (GRADE < 60). In PHP that is exactly the same, because
// < is one of the operators that does NOT change between the two.
if ($grade < 60) {
    echo "FAIL\n";
} else {
    echo "PASS\n";
}


echo "\n===== 3. The bigger of two numbers =====\n";
/*
 * The decision structure from the flowchart:
 *
 *   if A > B then
 *       print A
 *   else
 *       print B
 *   endif
 *
 * One diamond, two branches, and only ever one of them runs.
 */
$x = 34;
$y = 71;

if ($x > $y) {
    echo "The bigger one is $x\n";
} else {
    echo "The bigger one is $y\n";
}


echo "\n===== 4. Euclid's GCD, with the trace table =====\n";
/*
 * Algorithm GCD [returns the greatest common divisor of two positive integers]
 *   1. Read : A, B
 *   2. X <-- A, Y <-- B
 *   3. Repeat steps 4 to 5 while (X != Y)
 *   4. if X > Y then X <-- X - Y
 *   5. if Y > X then Y <-- Y - X
 *   6. Write : "Greatest common divisor: ", X
 *   7. Exit
 *
 * Keep taking the smaller away from the larger. When they match, that is the answer.
 * The loop MUST end, because every pass makes one of the two numbers smaller,
 * and they cannot shrink below 1. That is the "terminates" rule from the lesson.
 */
$A = 48;
$B = 18;

$X = $A;                       // 2. X <-- A
$Y = $B;                       //    Y <-- B

echo "Finding GCD($A, $B)\n\n";
printf("%-6s %-5s %-5s %s\n", "step", "X", "Y", "what happened");
echo str_repeat("-", 46) . "\n";
printf("%-6s %-5d %-5d %s\n", "start", $X, $Y, "");

$step = 0;
while ($X != $Y) {             // 3. Repeat while X != Y
    $step++;
    if ($X > $Y) {             // 4. if X > Y then X <-- X - Y
        $was = $X;
        $X = $X - $Y;
        printf("%-6d %-5d %-5d %s\n", $step, $X, $Y, "X was bigger: $was - $Y");
    } else {                   // 5. if Y > X then Y <-- Y - X
        $was = $Y;
        $Y = $Y - $X;
        printf("%-6d %-5d %-5d %s\n", $step, $X, $Y, "Y was bigger: $was - $X");
    }
}

echo str_repeat("-", 46) . "\n";
echo "Greatest common divisor: $X\n";


echo "\n===== 5. Sum of five numbers (the loop example) =====\n";
/*
 * Algorithm SUMFIVE [adds five numbers entered one at a time]
 *   1. SUM <-- 0
 *   2. COUNT <-- 1
 *   3. Repeat steps 4 to 5 while (COUNT <= 5)
 *   4. Read : N
 *   5. SUM <-- SUM + N, COUNT <-- COUNT + 1
 *   6. Write : SUM
 *   7. Exit
 *
 * On paper a flowchart shows this as an arrow going BACK UP to an earlier box.
 * That backwards arrow is the loop. Without it you have just drawn five boxes.
 */
$numbers = [12, 7, 30, 5, 16];  // in a real program these would be typed in one at a time

$sum = 0;                       // 1. SUM <-- 0
$count = 1;                     // 2. COUNT <-- 1

while ($count <= 5) {           // 3. Repeat while COUNT <= 5
    $n = $numbers[$count - 1];  // 4. Read : N   (arrays start at 0, our counter starts at 1)
    $sum = $sum + $n;           // 5. SUM <-- SUM + N
    echo "  read $n, running total is now $sum\n";
    $count = $count + 1;        //    COUNT <-- COUNT + 1
}

echo "Sum of the five numbers: $sum\n";   // 6. Write : SUM


echo "\n===== 6. The same loop, written the PHP way =====\n";
/*
 * Pseudocode keeps the counter by hand because it has to describe any language.
 * PHP has a for loop, which does the same three jobs on one line:
 * start at 1, keep going while <= 5, add 1 each time.
 *
 * Same algorithm. Shorter sentence. Learn the long way first, because the exam
 * asks for the long way.
 */
$sum = 0;
for ($i = 0; $i < 5; $i++) {
    $sum += $numbers[$i];
}
echo "Sum again, using for: $sum\n";

echo "\nDone. Now open exercises.php and do your lecturer's five.\n";
