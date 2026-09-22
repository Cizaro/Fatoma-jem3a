<?php
/*
 * Lesson 2 — examples
 * Run:  php 02-datatypes/examples.php
 */

echo "===== 1. the four types =====\n";
$name   = "Fatima";
$age    = 20;
$grade  = 15.75;
$passed = true;

var_dump($name);
var_dump($age);
var_dump($grade);
var_dump($passed);


echo "\n===== 2. a number in quotes is a STRING =====\n";
$realNumber  = 20;
$fakeNumber  = "20";
var_dump($realNumber);
var_dump($fakeNumber);
echo "but PHP still adds them: " . ($realNumber + $fakeNumber) . "\n";


echo "\n===== 3. printing booleans =====\n";
echo "true prints as ->" . true . "<-\n";
echo "false prints as ->" . false . "<-  (nothing!)\n";


echo "\n===== 4. joining strings =====\n";
$first = "Fatima";
$last  = "Ali";
$full  = $first . " " . $last;
echo "$full\n";

$msg = "Hello";
$msg .= ", welcome";
$msg .= " to PHP!";
echo "$msg\n";


echo "\n===== 5. string functions =====\n";
$word = "  Programming  ";
echo "original   : '$word'\n";
echo "trim       : '" . trim($word) . "'\n";
echo "length     : " . strlen(trim($word)) . "\n";
echo "upper      : " . strtoupper(trim($word)) . "\n";
echo "lower      : " . strtolower(trim($word)) . "\n";
echo "reversed   : " . strrev(trim($word)) . "\n";
echo "first 7    : " . substr(trim($word), 0, 7) . "\n";
echo "replace    : " . str_replace("gram", "GRAM", trim($word)) . "\n";
echo "position of 'g': " . strpos(trim($word), "g") . "\n";
echo str_repeat("=", 20) . "\n";


echo "\n===== 6. math =====\n";
$a = 17;
$b = 5;
echo "$a + $b = " . ($a + $b) . "\n";
echo "$a - $b = " . ($a - $b) . "\n";
echo "$a * $b = " . ($a * $b) . "\n";
echo "$a / $b = " . ($a / $b) . "\n";
echo "$a % $b = " . ($a % $b) . "   <- remainder\n";
echo "round(3.7)  = " . round(3.7) . "\n";
echo "floor(3.7)  = " . floor(3.7) . "\n";
echo "ceil(3.2)   = " . ceil(3.2) . "\n";
echo "max(4,9,2)  = " . max(4, 9, 2) . "\n";


echo "\n===== 7. the modulo trick: even or odd =====\n";
$n = 8;
echo "$n % 2 = " . ($n % 2) . "  -> 0 means EVEN\n";
$n = 7;
echo "$n % 2 = " . ($n % 2) . "  -> 1 means ODD\n";


echo "\n===== 8. converting =====\n";
$text = "42";
var_dump($text);
var_dump((int) $text);
var_dump((float) "9.99");
var_dump((string) 100);
