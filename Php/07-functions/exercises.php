<?php
/*
 * Lesson 7 - YOUR TURN
 * Run:  php 07-functions/exercises.php
 *
 * Remember: writing the function does nothing. You must CALL it.
 */

echo "===== Exercise 1 =====\n";
// TODO 1: write a function sayGoodMorning() that echoes "Good morning!"
// then call it 3 times



echo "\n===== Exercise 2 =====\n";
// TODO 2: write a function square($n) that RETURNS n * n
// print square(4), square(7), square(12)



echo "\n===== Exercise 3 =====\n";
// TODO 3: write a function fullName($first, $last) that RETURNS the two
// names joined with a space and each starting with a capital letter
// test it with ("fatima", "hassan")  ->  Fatima Hassan



echo "\n===== Exercise 4 =====\n";
// TODO 4: write isPositive($n) that returns true or false
// test it with 5, -3 and 0  (use var_dump to see the result clearly)



echo "\n===== Exercise 5 =====\n";
// TODO 5: write biggest($a, $b, $c) that returns the biggest of three numbers
// do it WITHOUT using max() - use if statements
// test: biggest(3, 9, 5) should give 9



echo "\n===== Exercise 6 =====\n";
// TODO 6: write finalPrice($price, $discount = 10) that returns the price
// after taking off the discount percentage.
// finalPrice(200)      -> 180   (default 10%)
// finalPrice(200, 25)  -> 150



echo "\n===== Exercise 7 =====\n";
// TODO 7: write countVowels($word) that returns how many vowels (a e i o u)
// are in a word.
// hints: strtolower(), str_split(), in_array(), and a loop
// countVowels("Programming") should give 3



echo "\n===== Exercise 8 (challenge) =====\n";
// TODO 8: write isPrime($n) - returns true if n is a prime number.
// A prime is only divisible by 1 and itself. 1 is NOT prime.
// Then print all the primes from 1 to 50 using your function in a loop.



echo "\n===== Exercise 9 (challenge) =====\n";
// TODO 9: write classReport($students) that takes this array
$students = [
    ["name" => "Fatima", "grade" => 17],
    ["name" => "Sara",   "grade" => 8],
    ["name" => "Lina",   "grade" => 12],
];
// and prints a nice table plus the average at the bottom.
// Use at least 2 functions: one for the average, one for pass/fail.



echo "\nDone!\n";
