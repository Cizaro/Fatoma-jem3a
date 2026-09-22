<?php
/*
 * Lesson 5 — examples
 * Run:  php 05-loops/examples.php
 */

echo "===== 1. basic for =====\n";
for ($i = 1; $i <= 5; $i++) {
    echo "round $i\n";
}


echo "\n===== 2. counting backwards =====\n";
for ($i = 5; $i >= 1; $i--) {
    echo "$i ";
}
echo "LIFT OFF!\n";


echo "\n===== 3. steps of 5 =====\n";
for ($i = 0; $i <= 20; $i += 5) {
    echo "$i ";
}
echo "\n";


echo "\n===== 4. while =====\n";
$count = 3;
while ($count > 0) {
    echo "$count...\n";
    $count--;            // without this line -> infinite loop
}
echo "Go!\n";


echo "\n===== 5. do...while (runs at least once) =====\n";
$n = 100;
do {
    echo "this printed even though 100 <= 5 is false\n";
    $n++;
} while ($n <= 5);


echo "\n===== 6. foreach =====\n";
$names = ["Fatima", "Sara", "Lina", "Nour"];
foreach ($names as $name) {
    echo "Hello $name\n";
}


echo "\n===== 7. break and continue =====\n";
echo "break at 5   : ";
for ($i = 1; $i <= 10; $i++) {
    if ($i == 5) break;
    echo "$i ";
}
echo "\ncontinue at 3: ";
for ($i = 1; $i <= 5; $i++) {
    if ($i == 3) continue;
    echo "$i ";
}
echo "\n";


echo "\n===== 8. sum of 1..10 =====\n";
$sum = 0;
for ($i = 1; $i <= 10; $i++) {
    $sum += $i;
}
echo "sum = $sum\n";


echo "\n===== 9. multiplication table of 7 =====\n";
$table = 7;
for ($i = 1; $i <= 10; $i++) {
    printf("%2d x %2d = %3d\n", $table, $i, $table * $i);
}


echo "\n===== 10. nested loops: full table =====\n";
echo "    ";
for ($c = 1; $c <= 9; $c++) printf("%4d", $c);
echo "\n    " . str_repeat("-", 36) . "\n";
for ($row = 1; $row <= 9; $row++) {
    printf("%2d |", $row);
    for ($col = 1; $col <= 9; $col++) {
        printf("%4d", $row * $col);
    }
    echo "\n";
}


echo "\n===== 11. nested loops: a pyramid =====\n";
for ($i = 1; $i <= 5; $i++) {
    echo str_repeat(" ", 5 - $i);
    echo str_repeat("*", 2 * $i - 1);
    echo "\n";
}


echo "\n===== 12. even numbers only =====\n";
for ($i = 1; $i <= 20; $i++) {
    if ($i % 2 != 0) continue;     // skip odd
    echo "$i ";
}
echo "\n";
