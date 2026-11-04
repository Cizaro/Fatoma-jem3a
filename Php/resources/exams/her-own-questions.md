# Questions from her PDFs

Thirteen questions, copied from her own material. Nothing added.

---

## Lesson 01 — Exercises

*For the following exercises, design pseudo-code, a flowchart, and an algorithm.*

**Exercise 1: Sum of Natural Numbers**
Write a program to calculate the sum of natural numbers up to a given number n.

**Exercise 2: Find the Largest of Two Numbers**
Write a program to find the largest of two given numbers.

**Exercise 3: Calculate the Average of Three Numbers**
Write a program that takes three numbers as input and calculates their average.

**Exercise 4: Check if a Number is Even or Odd**
Write a program that takes an integer as input and determines whether it is even or odd.

**Exercise 5: Calculate the Factorial of a Number (Iterative)**
Write a program that calculates the factorial of a given positive integer using a loop.

---

## Lesson 01 — Examples

**Example 1**
Problem: Add 10 and 20.

**Example 2**
Write an algorithm to determine a student's final grade and indicate whether it is passing or failing. The final grade is calculated as the average of four marks.

**Example 3**
Write an algorithm to log in to school's email account.

**Example with loop**
Find the sum of five numbers.

---

## Lesson 03 — Exercise

**Circle Area and Sphere Volume Calculator**

Write PHP code to calculate the surface area of a circle (A = π·r²) and the volume of a sphere (V = ⁴⁄₃·π·r³) using a given radius (r). You will implement this solution using two different approaches.

**Part 1: Static / Developer-Defined Calculation**

- Create a PHP script named `part1_static.php`.
- Define a variable `$radius` with a default hardcoded value assigned directly by the developer (e.g., `$radius = 5`).
- Calculate: Circle Area (A = π·r²), Sphere Volume (V = ⁴⁄₃·π·r³).
- Display the original radius along with the calculated area and volume rounded to 2 decimal places.

**Part 2: Dynamic Calculation using HTML Form**

- Create an HTML file (`index.html`) with a form containing: an `<input>` field of type number (with `step="any"` to allow decimals) for the user to enter a radius, and a submit button.
- The form should submit data using the POST method to `part2_dynamic.php`.
- Create a PHP script named `part2_dynamic.php` that:
  - Checks if the form has been submitted via POST.
  - Validates that the radius input is set and is a positive number.
  - Computes the Circle Area and Sphere Volume based on the user's input.
  - Displays a clean output with the results or an error message if the input is invalid/empty.

---

## PHP Problems — Set I

**Problem I: Basic Arithmetic Calculator**

Objective: Write a PHP script that prompts or receives input for numbers, performs basic arithmetic operations, and renders the sum, product, difference, and quotient.

- **Approach 1: Hardcoded Inputs & Server-Side HTML Output**
  - Input: Define two numbers as standard variables (e.g., `$num1` and `$num2`) directly inside your PHP script.
  - Output: Dynamically render and display the arithmetic results directly into the webpage's HTML structure using PHP echo statements.
- **Approach 2: URL Parameters (GET Method Input)**
  - Input: Accept two numbers passed via URL query parameters (e.g., `&num1=100&num2=10`) using PHP's `$_GET` superglobal array.
  - Output: Read the values from `$_GET`, compute the calculations server-side, and display the formatted results on the webpage.
- **Approach 3: HTML Forms & Server POST Handling**
  - Input: Create an HTML `<form method="POST">` containing text fields for user inputs alongside calculation action buttons (e.g., ADD, SUB, MULT, DIV).
  - Output: Process the submitted form data in PHP via `$_POST`, perform the calculation, and output the result (e.g., "The result = 115").

**Problem 2: The E-Commerce Price Filter**

- Context: Shopping cart component highlighting cheapest and most expensive items.
- Task: Write a PHP script that receives five item prices in dollars via an HTML `<form method="POST">`.
- Requirements:
  - Determine the minimum and maximum item prices.
  - Constraint: Use only basic `if` / `else` conditional statements and comparison operators (`<`, `>`). Do not use built-in functions like `min()` or `max()`.
  - Output HTML with dynamic CSS styling to display the highest price in green text and the lowest price in red text.

**Problem 3: Smart-Home Smart Plug**

- Context: Power allocation algorithm allocating extra voltage on even-numbered days and conserving energy on odd-numbered days.
- Task: Write a PHP script that processes a single integer input representing the current day of the month.
- Requirements:
  - Check if the day is Odd or Even using the modulus operator (`%`).
  - Render an HTML status message (e.g., "Day 14 is EVEN: Extra power mode active!" or "Day 15 is ODD: Eco-conservation mode active!").

**Problem 4: The Data Science Dashboard (Grid Array Math)**

- Context: Dashboard grid component computing exponential numbers (N² and N³).
- Task: Write a PHP script that automatically calculates the square and cube for all integers from 0 to 5 using a loop.
- Requirements:
  - Runs automatically on server load without user input.
  - Dynamically generates an HTML5 `<table>` rendering the sequence.

**Problem 5: The Cloud Storage Pricing Tier Generator**

- Context: Administrative dashboard calculating enterprise storage limits based on purchased server nodes (N).
- Task: Write a PHP script that loops through node counts from 1 to 6.
- Requirements:
  - Runs automatically on page load.
  - For each node step, calculate 10 × N (Storage GB), 100 × N (Bandwidth TB), and 1000 × N (API Requests).
  - Output results inside an HTML5 `<table>`.
