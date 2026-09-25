<?php
/*
 * WORLD 4 — DECISIONS        practice file
 * Run:  php stages/practice/world-4.php
 */


// ============================================
// 🟠 STAGE 16 — The shape of an if
// ============================================
// $age = 20;  print "adult" only if 18 or over.
// Then change it to 15 and run again (nothing should print).

echo "STAGE 16: ";



// ============================================
// 🟠 STAGE 17 — The other path
// ============================================
// Write the grade chain: >=18 A, >=14 B, >=10 C, else F.
// Test with 19, 15, 11, 4.
// Then move >=10 to the TOP, run with 19, watch it break, put it back.

echo "\nSTAGE 17:\n";



// ============================================
// 🟠 STAGE 18 — Comparing
// ============================================
// var_dump each of these. Write your GUESS as a comment first.
//   5 == 5     5 == "5"     5 === "5"
//   5 != 4     "abc" == "ABC"     0 == false

echo "\nSTAGE 18:\n";



// ============================================
// 🟠 STAGE 19 — Two conditions at once
// ============================================
// Pass = grade 10 or more AND attendance 75 or more.
// Test all four combinations.

echo "\nSTAGE 19:\n";



// ============================================
// 🟠 STAGE 20 — switch, and the tiny if
// ============================================
// 1. A switch on $fruit: apple / banana / grape / default.
// 2. A ternary that prints "Even" or "Odd" for $n.

echo "\nSTAGE 20:\n";



// ============================================
// 👑 WORLD 4 BOSS — login and access checker
// ============================================
$username = "fatima";
$password = "php2026";
$isAdmin  = false;
$attempts = 1;

// 1. attempts over 3            -> "Account locked" and nothing else
// 2. wrong username OR password -> "Wrong username or password"
// 3. correct + admin            -> "Welcome boss"
// 4. correct + not admin        -> "Welcome fatima"
// Test all four by changing the variables above.

echo "\nBOSS: ";



echo "\n";
