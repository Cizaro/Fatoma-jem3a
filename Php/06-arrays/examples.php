<?php
/*
 * Lesson 6 - examples
 * Run:  php 06-arrays/examples.php
 */

echo "===== 1. indexed array =====\n";
$students = ["Fatima", "Sara", "Lina"];
echo "item 0      : $students[0]\n";
echo "item 2      : $students[2]\n";
echo "how many    : " . count($students) . "\n";
echo "the last one: " . $students[count($students) - 1] . "\n";
print_r($students);


echo "\n===== 2. changing an array =====\n";
$students[1] = "Maya";          // change
$students[]  = "Nour";          // add at the end
print_r($students);

array_pop($students);           // remove the last one
echo "after array_pop:\n";
print_r($students);


echo "\n===== 3. associative array =====\n";
$student = [
    "name"  => "Fatima",
    "age"   => 20,
    "major" => "Computer Science",
    "gpa"   => 3.6,
];
echo "name : " . $student["name"] . "\n";
echo "major: " . $student["major"] . "\n";
print_r($student);


echo "\n===== 4. foreach on an indexed array =====\n";
$fruits = ["apple", "banana", "grape"];
foreach ($fruits as $fruit) {
    echo "- $fruit\n";
}


echo "\n===== 5. foreach with the key =====\n";
foreach ($student as $key => $value) {
    printf("%-6s : %s\n", $key, $value);
}


echo "\n===== 6. multidimensional (a table!) =====\n";
$classroom = [
    ["name" => "Fatima", "grade" => 18],
    ["name" => "Sara",   "grade" => 14],
    ["name" => "Lina",   "grade" => 9],
    ["name" => "Nour",   "grade" => 11],
];

echo "direct access: " . $classroom[0]["name"] . "\n\n";
printf("%-10s %-7s %s\n", "NAME", "GRADE", "RESULT");
echo str_repeat("-", 28) . "\n";
foreach ($classroom as $s) {
    $result = $s["grade"] >= 10 ? "Pass" : "Fail";
    printf("%-10s %-7d %s\n", $s["name"], $s["grade"], $result);
}


echo "\n===== 7. calculating with arrays =====\n";
$grades = [18, 14, 9, 11, 16];
echo "grades  : " . implode(", ", $grades) . "\n";
echo "count   : " . count($grades) . "\n";
echo "sum     : " . array_sum($grades) . "\n";
echo "average : " . round(array_sum($grades) / count($grades), 2) . "\n";
echo "highest : " . max($grades) . "\n";
echo "lowest  : " . min($grades) . "\n";


echo "\n===== 8. searching =====\n";
$names = ["Fatima", "Sara", "Lina"];
var_dump(in_array("Sara", $names));
var_dump(in_array("Ahmad", $names));
echo "Sara is at index " . array_search("Sara", $names) . "\n";


echo "\n===== 9. sorting =====\n";
$numbers = [5, 3, 9, 1, 7];
sort($numbers);
echo "sorted  : " . implode(", ", $numbers) . "\n";
rsort($numbers);
echo "reversed: " . implode(", ", $numbers) . "\n";

$words = ["banana", "apple", "cherry"];
sort($words);
echo "words   : " . implode(", ", $words) . "\n";


echo "\n===== 10. string to array and back =====\n";
$csv = "red,green,blue";
$colors = explode(",", $csv);
print_r($colors);
echo "back to string: " . implode(" | ", $colors) . "\n";


echo "\n===== 11. keys and values =====\n";
print_r(array_keys($student));
print_r(array_values($student));
