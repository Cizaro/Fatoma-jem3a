<?php
/*
 * Lesson 3 — examples
 * Run:  php 03-operators/examples.php
 */

echo "===== 1. arithmetic =====\n";
$a = 10;
$b = 3;
echo "$a + $b  = " . ($a + $b)  . "\n";
echo "$a - $b  = " . ($a - $b)  . "\n";
echo "$a * $b  = " . ($a * $b)  . "\n";
echo "$a / $b  = " . ($a / $b)  . "\n";
echo "$a % $b  = " . ($a % $b)  . "\n";
echo "$a ** $b = " . ($a ** $b) . "\n";


echo "\n===== 2. shortcuts =====\n";
$x = 10;
echo "start        : $x\n";
$x += 5;  echo "after += 5   : $x\n";
$x -= 3;  echo "after -= 3   : $x\n";
$x *= 2;  echo "after *= 2   : $x\n";
$x /= 4;  echo "after /= 4   : $x\n";

$s = "PHP";
$s .= " is";
$s .= " great";
echo "string .=    : $s\n";


echo "\n===== 3. ++ and -- =====\n";
$i = 5;
echo "i      = $i\n";
$i++;
echo "i++ -> $i\n";
$i++;
echo "i++ -> $i\n";
$i--;
echo "i-- -> $i\n";


echo "\n===== 4. comparison (var_dump shows true/false clearly) =====\n";
var_dump(5 == 5);
var_dump(5 == "5");     // true  - same value
var_dump(5 === "5");    // false - different type!
var_dump(5 != 3);
var_dump(5 !== "5");
var_dump(10 > 3);
var_dump(10 <= 10);


echo "\n===== 5. logical =====\n";
$age     = 20;
$hasCard = true;

echo "age >= 18 AND hasCard : "; var_dump($age >= 18 && $hasCard);
echo "age >= 60 AND hasCard : "; var_dump($age >= 60 && $hasCard);
echo "age >= 60 OR  hasCard : "; var_dump($age >= 60 || $hasCard);
echo "NOT hasCard           : "; var_dump(!$hasCard);


echo "\n===== 6. order of operations =====\n";
echo "2 + 3 * 4   = " . (2 + 3 * 4)   . "   <- multiply first\n";
echo "(2 + 3) * 4 = " . ((2 + 3) * 4) . "   <- brackets win\n";


echo "\n===== 7. ternary =====\n";
$grade = 12;
$result = ($grade >= 10) ? "PASS" : "FAIL";
echo "grade $grade -> $result\n";

$grade = 7;
echo "grade $grade -> " . (($grade >= 10) ? "PASS" : "FAIL") . "\n";


echo "\n===== 8. mini calculator =====\n";
$n1 = 24;
$n2 = 7;
echo str_repeat("-", 24) . "\n";
printf("%-10s %s\n", "sum",       $n1 + $n2);
printf("%-10s %s\n", "diff",      $n1 - $n2);
printf("%-10s %s\n", "product",   $n1 * $n2);
printf("%-10s %.2f\n", "quotient", $n1 / $n2);
printf("%-10s %s\n", "remainder", $n1 % $n2);
echo str_repeat("-", 24) . "\n";
// printf = print with formatting. %s = a string, %.2f = number with 2 decimals.
