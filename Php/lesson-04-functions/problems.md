# Lesson 04 — Problems

The seven problems from his sheet, in his own words. Nothing added.

---

**Problem 1**

Write a PHP program that asks the user to enter two coefficients and one
constant of a quadratic function, obtains the three numbers from the user by
three input fields and outputs text that displays the solutions if it has one
solution, two solutions or no solution.

---

**Problem 2**

Write a function in PHP code called `integerPower(base, exponent)` that
returns the value of base^exponent.

For example, `integerPower(3, 4) = 3 * 3 * 3 * 3`. Assume that exponent and
base are integers. Function `integerPower` should use a `for` or `while`
statement to control the calculation. Incorporate this function into a script
that reads integer values from an HTML5 form for base and exponent and
performs the calculation with the `integerPower` function. The HTML5 form
should consist of two text fields and a button to initiate the calculation.
The user should interact with the program by typing numbers in both text
fields, then clicking the button.

---

**Problem 3**

Create a PHP program to implement the following functions:

a) Function `Celsius` returns the Celsius equivalent of a Fahrenheit
temperature, using the calculation `C = 5.0 / 9.0 * (F - 32);`

b) Function `Fahrenheit` returns the Fahrenheit equivalent of a Celsius
temperature, using the calculation `F = 9.0 / 5.0 * C + 32;`

c) Use these functions to write a script that enables the user to enter
either a Fahrenheit or a Celsius temperature and displays the Celsius or
Fahrenheit equivalent.

Your document should contain two buttons — one to initiate the conversion
from Fahrenheit to Celsius and one to initiate the conversion from Celsius to
Fahrenheit.

---

**Problem 4**

Write a PHP program that asks the user to enter three decimal numbers,
obtains the three numbers from the user by three input fields and displays
the sum, difference, product, division, Maximum, Minimum or Average, of the
three numbers when you click on the button of one of the buttons shown below.

Note: Develop two PHP files and use the `include` function for the processing
stage.

---

**Problem 5**

A palindrome is a number or a text phrase that reads the same backward and
forward. For example, each of the following examples is a palindrome: 12321,
ABCCBA and AB161BA. Write a PHP program that reads text or numbers from the
user and determines whether it's a palindrome or not palindrome.

---

**Problem 6**

Create PHP program contains the following elements:

In this problem you will create a function that determines whether or not a
password is valid. We will define a valid password to be a one that is at
least 8 characters long and contains at least one uppercase letter, at least
one lowercase letter, and at least one number. Your function should return a
text "your password is valid" if the password passed to it as its only
parameter is valid and display the username and the password. Otherwise it
should return a text "Your password is not valid, please try again!"

---

**Problem 7**

Write a PHP program that asks the user to enter the number and allow you to
check this given is Palindrome number, Odd/Even number, Armstrong number or
Prime number.

Hint: each function defines by the following description:

A **palindrome number** is a number which remains same when its digits are
reversed. For example, number 24142 is a palindrome number. On reversing it
will get the same number.

**Even numbers** are those which are divisible by 2. Numbers like 2, 4, 6, 8,
10, etc are even.

**Odd numbers** are those which are not divisible by 2. Numbers Like 1, 3, 5,
7, 9, 11, etc are odd.

An **Armstrong number** is the one whose value is equal to the sum of the
cubes of its digits. Ex: 0, 1, 153, 371, 407, 471, etc are Armstrong numbers.

**Prime number** is a number which is only divisible by 1 and itself is.
Numbers 2, 3, 5, 7, 11, 13, 17, etc. are prime numbers. 2 is the only even
prime number. It is a natural number greater than 1 and so 0 and 1 are not
prime numbers.

---

> **One correction to Problem 7's hint.** 471 is not an Armstrong number:
> its digits cubed come to 4³ + 7³ + 1³ = 64 + 343 + 1 = **408**. The real
> list below 500 is 0, 1, 153, **370**, 371, 407. The written definition —
> "the sum of the cubes of its digits" — is correct; only the example list
> is wrong.

**Answers to 4, 5, 6 and 7** are in `Problems-4-to-7-Answers.txt`, with the
reasoning in `Problems-4-to-7-Notes.txt`.
