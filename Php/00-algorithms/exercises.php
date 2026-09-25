<?php
/*
 * Lesson 0A — YOUR TURN
 * Run:  php 00-algorithms/exercises.php
 *
 * These are the five exercises from the end of your MIT320 Lesson 1 slides.
 * Your lecturer asks for THREE things for each one: an algorithm, pseudocode
 * and a flowchart. So each exercise here has three parts:
 *
 *   (a) the algorithm in plain English   -> write it in the comment block
 *   (b) the pseudocode                    -> write it in the comment block too,
 *                                            with CAPITAL variables and <-- arrows
 *   (c) the PHP                           -> write it as real code
 *
 * Draw the flowchart on PAPER. You cannot draw a diamond in a .php file, and
 * the exam will not let you either.
 *
 * Do one exercise at a time and run the file after each one.
 */

echo "===== Exercise 1: sum of natural numbers up to n =====\n";
/*
 * Problem: calculate the sum of the natural numbers up to a given number N.
 *          (natural numbers are 1, 2, 3, ... so for N = 5 the answer is 15)
 *
 * TODO 1a — algorithm in plain English:
 *   1.
 *   2.
 *   3.
 *
 * TODO 1b — pseudocode:
 *
 *
 *
 * Hint: you need a running total that starts at 0, and a counter that climbs to N.
 *       Look at example 5 in examples.php if you are stuck on the shape.
 */
$n = 5;
// TODO 1c: write the PHP. Print the sum. For n = 5 it should print 15.



echo "\n===== Exercise 2: the largest of two numbers =====\n";
/*
 * Problem: find the largest of two given numbers.
 *
 * TODO 2a — algorithm in plain English:
 *
 * TODO 2b — pseudocode (this one is the if-then-else structure from the slides):
 *
 *
 * On paper: one diamond, two branches, both ending at a Stop oval.
 */
$first  = 34;
$second = 71;
// TODO 2c: write the PHP. Print the larger one.



echo "\n===== Exercise 3: average of three numbers =====\n";
/*
 * Problem: take three numbers and calculate their average.
 *
 * TODO 3a — algorithm in plain English:
 *
 * TODO 3b — pseudocode:
 *
 *
 * Careful: add all three FIRST, then divide. AVG <-- A + B + C / 3 is wrong,
 * and it is wrong for the same reason in pseudocode and in PHP.
 */
$p = 14;
$q = 19;
$r = 12;
// TODO 3c: write the PHP. Print the average.



echo "\n===== Exercise 4: even or odd =====\n";
/*
 * Problem: take an integer and say whether it is even or odd.
 *
 * TODO 4a — algorithm in plain English:
 *
 * TODO 4b — pseudocode:
 *
 *
 * Hint: a number is even when dividing by 2 leaves nothing behind.
 *       The operator that gives you what is left over is % (the remainder).
 *       In the diamond, the question is: is NUMBER % 2 = 0 ?
 */
$number = 7;
// TODO 4c: write the PHP. Print "Even" or "Odd".



echo "\n===== Exercise 5: factorial, using a loop =====\n";
/*
 * Problem: calculate the factorial of a positive integer using a loop.
 *          Factorial of 5 is written 5! and means 5 x 4 x 3 x 2 x 1 = 120.
 *
 * TODO 5a — algorithm in plain English:
 *
 * TODO 5b — pseudocode:
 *
 *
 * Two traps, and both of them also appear in the exam version:
 *   - the running total starts at 1, NOT 0. Anything times 0 is 0 forever.
 *   - the factorial of 0 is 1. Decide what your algorithm does about that.
 */
$value = 5;
// TODO 5c: write the PHP. For 5 it should print 120.



echo "\n===== Challenge: Euclid, from memory =====\n";
/*
 * Not from the slides. Do this one only when the five above all work.
 *
 * TODO 6: write the GCD algorithm from Lesson 0A WITHOUT looking at examples.php.
 *         Print the greatest common divisor of 1071 and 462.
 *         Then check it by hand: the answer is 21.
 *
 *         If your loop never stops, press Ctrl + C. Then ask yourself the
 *         "terminates" question: what is getting smaller on every pass?
 */
$g1 = 1071;
$g2 = 462;
// TODO 6: write the PHP.

