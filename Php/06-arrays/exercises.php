<?php
/*
 * Lesson 6 - YOUR TURN
 * Run:  php 06-arrays/exercises.php
 */

echo "===== Exercise 1 =====\n";
// TODO 1: make an array of your 5 favourite foods.
// Print the first one, the last one, and how many there are.



echo "\n===== Exercise 2 =====\n";
$colors = ["red", "green", "blue", "yellow"];
// TODO 2: print every item with a foreach, numbered like:   1. red
// hint: foreach ($colors as $i => $c)   - $i starts at 0, so print $i + 1



echo "\n===== Exercise 3 =====\n";
// TODO 3: make an associative array about yourself with the keys:
//   name, age, university, city
// then print it with a foreach showing "key : value"



echo "\n===== Exercise 4 =====\n";
$numbers = [12, 7, 45, 3, 28, 19];
// TODO 4: print the sum, the average (2 decimals), the biggest, the smallest,
//         and the array sorted from small to big



echo "\n===== Exercise 5 =====\n";
// TODO 5: add "orange" to the end of $colors, remove the FIRST colour,
// then print the array as one line separated by " - "



echo "\n===== Exercise 6 =====\n";
$sentence = "PHP is a server side language";
// TODO 6: turn it into an array of words (explode), print how many words,
// then print each word in UPPERCASE on its own line



echo "\n===== Exercise 7 =====\n";
$class = [
    ["name" => "Fatima", "grade" => 17],
    ["name" => "Sara",   "grade" => 8],
    ["name" => "Lina",   "grade" => 12],
    ["name" => "Nour",   "grade" => 5],
];
// TODO 7: print a table with name, grade, and "Pass"/"Fail" (pass = 10 or more)



echo "\n===== Exercise 8 (challenge) =====\n";
// TODO 8: using the same $class array, calculate and print:
//   - the class average
//   - how many passed and how many failed
//   - the name of the student with the highest grade



echo "\n===== Exercise 9 (challenge) =====\n";
// TODO 9: count how many times each letter appears in the word "programming"
// expected: p=1 r=2 o=1 g=2 a=1 m=2 i=1 n=1
// hints: str_split("programming") gives an array of letters
//        build an associative array:  $count[$letter] = ...
//        isset($count[$letter]) tells you if that key exists yet



echo "\nDone!\n";
