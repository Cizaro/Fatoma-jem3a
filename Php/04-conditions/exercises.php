<?php
/*
 * Lesson 4 — YOUR TURN
 * Run:  php 04-conditions/exercises.php
 */

echo "===== Exercise 1 =====\n";
// TODO 1: $age = 16;
// print "You can vote" if age >= 18, otherwise "Too young"



echo "\n===== Exercise 2 =====\n";
// TODO 2: $number = -4;
// print whether the number is positive, negative, or zero (3 cases!)



echo "\n===== Exercise 3 =====\n";
// TODO 3: $mark = 13;
// print the letter grade:
//   >= 18 -> A     >= 16 -> B     >= 14 -> C     >= 10 -> D     else -> F
// careful with the ORDER



echo "\n===== Exercise 4 =====\n";
// TODO 4: $username = "fatima"; $password = "1234";
// if the username is "fatima" AND the password is "1234" print "Login success"
// otherwise print "Wrong username or password"
// then change the password to something else and run again



echo "\n===== Exercise 5 =====\n";
// TODO 5: write a switch for $fruit = "apple"
//   apple  -> "Red fruit"
//   banana -> "Yellow fruit"
//   grape  -> "Purple fruit"
//   anything else -> "Unknown fruit"
// don't forget the break;



echo "\n===== Exercise 6: find the bug =====\n";
// TODO 6: this code should print "big" only when x is greater than 100.
// It prints it always. Find the 2 bugs and fix them.
$x = 5;
if ($x = 200); {
    echo "big\n";
}



echo "\n===== Exercise 7 (challenge) =====\n";
// TODO 7: BMI calculator
// $weight = 70;  $height = 1.75;
// bmi = weight / (height * height)
// print the bmi rounded to 1 decimal (round($bmi, 1)) and the category:
//   under 18.5      -> "Underweight"
//   18.5 to 24.9    -> "Normal"
//   25 to 29.9      -> "Overweight"
//   30 and above    -> "Obese"



echo "\n===== Exercise 8 (challenge) =====\n";
// TODO 8: leap year
// A year is a leap year if it's divisible by 4, EXCEPT years divisible by 100,
// UNLESS they are also divisible by 400.
// Test with 2024 (yes), 1900 (no), 2000 (yes), 2023 (no).



echo "\nDone! 🎉\n";
