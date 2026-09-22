<?php
/*
 * Lesson 4 — examples
 * Run:  php 04-conditions/examples.php
 */

echo "===== 1. simple if =====\n";
$age = 20;
if ($age >= 18) {
    echo "You are an adult\n";
}
echo "(this line always runs)\n";


echo "\n===== 2. if / else =====\n";
$temperature = 12;
if ($temperature > 25) {
    echo "It's hot, wear a t-shirt\n";
} else {
    echo "It's cold, take a jacket\n";
}


echo "\n===== 3. if / elseif / else — grades =====\n";
$grades = [18, 15, 11, 6];          // we test 4 grades
foreach ($grades as $grade) {       // (foreach comes in lesson 6, just watch)
    echo "grade $grade -> ";
    if ($grade >= 16) {
        echo "Excellent\n";
    } elseif ($grade >= 14) {
        echo "Very good\n";
    } elseif ($grade >= 10) {
        echo "Pass\n";
    } else {
        echo "Fail\n";
    }
}


echo "\n===== 4. WRONG order (the classic mistake) =====\n";
$grade = 18;
if ($grade >= 10) {                 // <- too early! catches everything
    echo "Pass\n";
} elseif ($grade >= 16) {
    echo "Excellent (never reached!)\n";
}
echo "^ 18 should be Excellent, but 'Pass' was checked first.\n";


echo "\n===== 5. nested if =====\n";
$isLoggedIn = true;
$isAdmin    = false;
if ($isLoggedIn) {
    if ($isAdmin) {
        echo "Welcome boss\n";
    } else {
        echo "Welcome user\n";
    }
} else {
    echo "Please log in\n";
}


echo "\n===== 6. the same thing with && =====\n";
if ($isLoggedIn && $isAdmin) {
    echo "Welcome boss\n";
} elseif ($isLoggedIn) {
    echo "Welcome user\n";
} else {
    echo "Please log in\n";
}


echo "\n===== 7. switch =====\n";
$days = ["Monday", "Friday", "Sunday"];
foreach ($days as $day) {
    echo "$day -> ";
    switch ($day) {
        case "Saturday":
        case "Sunday":
            echo "Weekend!\n";
            break;
        case "Monday":
            echo "Start of the week\n";
            break;
        default:
            echo "A normal day\n";
    }
}


echo "\n===== 8. what PHP calls false =====\n";
$values = [0, 1, -5, "", "0", "hello", "false", null];
foreach ($values as $v) {
    $shown = var_export($v, true);          // shows the value nicely
    echo str_pad($shown, 10) . " is " . ($v ? "TRUE" : "FALSE") . "\n";
}


echo "\n===== 9. mini app: even or odd =====\n";
$number = 7;
if ($number % 2 == 0) {
    echo "$number is even\n";
} else {
    echo "$number is odd\n";
}
