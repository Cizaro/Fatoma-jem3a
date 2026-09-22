<?php
/*
 * Lesson 7 - examples
 * Run:  php 07-functions/examples.php
 */

echo "===== 1. a function with no parameters =====\n";
function sayHello() {
    echo "Hello from inside a function!\n";
}
sayHello();
sayHello();


echo "\n===== 2. with a parameter =====\n";
function greet($name) {
    echo "Hello $name, welcome to PHP\n";
}
greet("Fatima");
greet("Sara");
greet("Lina");


echo "\n===== 3. several parameters =====\n";
function introduce($name, $age, $city) {
    echo "$name is $age years old and lives in $city\n";
}
introduce("Fatima", 20, "Beirut");


echo "\n===== 4. echo vs return =====\n";
function addAndPrint($a, $b) {
    echo "the sum is " . ($a + $b) . "\n";     // prints, gives nothing back
}
function addAndReturn($a, $b) {
    return $a + $b;                            // gives the value back
}

addAndPrint(3, 5);
$result = addAndReturn(3, 5);
echo "I stored the result: $result\n";
echo "and I can reuse it: " . (addAndReturn(3, 5) * 10) . "\n";


echo "\n===== 5. return stops the function =====\n";
function test() {
    return "I am returned";
    echo "THIS NEVER PRINTS\n";
}
echo test() . "\n";


echo "\n===== 6. default values =====\n";
function welcome($name = "guest") {
    echo "Welcome $name\n";
}
welcome();
welcome("Fatima");


echo "\n===== 7. scope =====\n";
$outside = "I live outside";

function scopeDemo($passedIn) {
    $inside = "I live inside";
    echo "$passedIn / $inside\n";
}
scopeDemo($outside);
// echo $inside;   // <- uncomment this line to see the error. $inside does not exist here.


echo "\n===== 8. useful real functions =====\n";

function circleArea($radius) {
    return round(3.14159 * $radius * $radius, 2);
}

function celsiusToFahrenheit($c) {
    return $c * 9 / 5 + 32;
}

function isEven($number) {
    return $number % 2 == 0;
}

function grade($mark) {
    if ($mark >= 18) return "A";
    if ($mark >= 16) return "B";
    if ($mark >= 14) return "C";
    if ($mark >= 10) return "D";
    return "F";
}

echo "circle r=5 area  : " . circleArea(5) . "\n";
echo "25C in F         : " . celsiusToFahrenheit(25) . "\n";
echo "is 8 even?       : " . (isEven(8) ? "yes" : "no") . "\n";
echo "is 7 even?       : " . (isEven(7) ? "yes" : "no") . "\n";
echo "mark 17 -> grade : " . grade(17) . "\n";


echo "\n===== 9. a function working on an array =====\n";
function average($numbers) {
    if (count($numbers) == 0) {
        return 0;                       // protect against dividing by zero
    }
    return round(array_sum($numbers) / count($numbers), 2);
}
echo "average of 18,14,9,11 = " . average([18, 14, 9, 11]) . "\n";
echo "average of empty list = " . average([]) . "\n";


echo "\n===== 10. functions calling functions =====\n";
function passed($mark) {
    return $mark >= 10;
}
function report($name, $mark) {
    $status = passed($mark) ? "PASSED" : "FAILED";
    return "$name scored $mark and $status (grade " . grade($mark) . ")";
}
echo report("Fatima", 17) . "\n";
echo report("Sara", 8) . "\n";


echo "\n===== 11. type hints =====\n";
function multiply(int $a, int $b): int {
    return $a * $b;
}
echo "6 x 7 = " . multiply(6, 7) . "\n";
