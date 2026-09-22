<?php
/*
 * Lesson 1 — examples
 * Run:  php 01-basics/examples.php
 *
 * BEFORE you run: read each block and GUESS what it prints.
 * Then run and compare. The surprises are where you learn.
 */

echo "===== 1. echo =====\n";
echo "Hello world\n";
echo "PHP is fun\n";


echo "\n===== 2. variables =====\n";
$name    = "Fatima";
$age     = 20;
$city    = "Beirut";
$average = 15.75;

echo $name;
echo "\n";
echo $age;
echo "\n";


echo "\n===== 3. three ways to print =====\n";
echo $name . "\n";                      // just the variable
echo "Hello " . $name . "\n";           // glue with .
echo "Hello $name\n";                   // double quotes read variables


echo "\n===== 4. single vs double quotes =====\n";
echo "Double quotes: $city\n";
echo 'Single quotes: $city';            // prints the $city literally
echo "\n";


echo "\n===== 5. a variable can change =====\n";
$score = 10;
echo "score is $score\n";
$score = 90;
echo "score is now $score\n";           // the 10 is gone


echo "\n===== 6. case sensitivity =====\n";
$fruit = "apple";
$Fruit = "banana";
echo "\$fruit is $fruit and \$Fruit is $Fruit\n";   // \$ prints a literal $


echo "\n===== 7. a small profile =====\n";
echo "-------------------------\n";
echo "Name    : $name\n";
echo "Age     : $age\n";
echo "City    : $city\n";
echo "Average : $average\n";
echo "-------------------------\n";
