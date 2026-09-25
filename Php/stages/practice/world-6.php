<?php
/*
 * WORLD 6 — CONTAINERS & COMMANDS     practice file
 * Run:  php stages/practice/world-6.php
 *
 * The last world. Take it slowly - arrays and functions hold up everything after this.
 */


// ============================================
// 🟣 STAGE 26 — Many in one
// ============================================
// An array of your 5 favourite foods.
// Print the first, the last (use count), and how many there are.
// Then add a sixth and print the count again.

echo "STAGE 26:\n";



// ============================================
// 🟣 STAGE 27 — Names instead of numbers
// ============================================
// An associative array about you: name, age, university, city.
// Print each one on its own labelled line.

echo "\nSTAGE 27:\n";



// ============================================
// 🟣 STAGE 28 — Walking through
// ============================================
// 1. foreach your foods, one per line
// 2. foreach your assoc array with $key => $value
// 3. Sum [10, 25, 5, 60] with a foreach and a running total
//    (start the total at 0 BEFORE the loop)

echo "\nSTAGE 28:\n";



// ============================================
// 🟣 STAGE 29 — Your own command
// ============================================
// 1. sayHello() with no parameters - call it 3 times
// 2. greet($name) - call it with three different names
// 3. add($a, $b) that ECHOES the sum - call it twice

echo "\nSTAGE 29:\n";



// ============================================
// 🟣 STAGE 30 — Giving an answer back
// ============================================
// 1. square($n) that RETURNS $n * $n. Print square(4), square(7), square(12).
// 2. Print square(3) + square(4)   <- only works because it returns
// 3. isEven($n) that returns true/false. Test it with var_dump.

echo "\nSTAGE 30:\n";



// ============================================
// 👑 WORLD 6 BOSS — the class report
// ============================================
$class = [
    ["name" => "Fatima", "mark" => 17],
    ["name" => "Sara",   "mark" => 8],
    ["name" => "Lina",   "mark" => 12],
    ["name" => "Nour",   "mark" => 19],
];

// Write TWO functions:
//   letterGrade($mark) -> A 18+, B 16+, C 14+, D 10+, else F
//   hasPassed($mark)   -> true / false  (pass = 10 or more)
//
// Then foreach the class and print a lined-up table with
// NAME  MARK  GRADE  RESULT, and at the bottom the average and
// how many passed. Both CALCULATED, not typed.
//
// printf("%-10s %4d %5s %7s\n", ...) will line the columns up.

echo "\nBOSS:\n";



echo "\n";
