# Every question in her own PDFs

Thirteen. Nothing here is invented — each one is copied from a page of her
own material, with the source named. Her three lecture decks and the Set I
sheet were searched end to end for every `Exercise`, `Problem`, `Example`,
`Task` and *"write an algorithm"*.

**Two of them are table-and-loop questions, and they were already in her
Set I sheet** — Problems 4 and 5. If she does nothing else tonight, do those.

---

## ⭐ Do these tonight, in this order

| # | Question | Why first |
|---|---|---|
| 1 | **Set I, Problem 4** — squares and cubes table | loop **+** HTML table, runs with no input. The simplest possible Section 4. |
| 2 | **Set I, Problem 5** — storage tiers table | same shape, three columns instead of two. Proves the shape stuck. |
| 3 | **Lesson 01, Exercise 2** — largest of two numbers | pseudocode + flowchart + code, and it is short |
| 4 | **Lesson 01, Exercise 4** — odd or even | one decision, one diamond. Ten minutes. |
| 5 | **Lesson 01, Exercise 1** — sum up to n | a loop with a running total, which is the other Section 4 pattern |

Everything below that line is revision if there is time. There will not be.

---

# Lesson 01 — the five Exercises

> *"For the following exercises, design pseudo-code, a flowchart, and an
> algorithm."*

**These are the only questions in her decks that he does not answer for her.**
They are also the exact shape of Section 4 — pseudocode, flowchart, and the
logic. Written for paper, not for PHP, but every one of them is three lines
away from being a PHP question.

### Exercise 1 — Sum of Natural Numbers
> Write a program to calculate the sum of natural numbers up to a given
> number **n**.

### Exercise 2 — Find the Largest of Two Numbers
> Write a program to find the largest of two given numbers.

### Exercise 3 — Calculate the Average of Three Numbers
> Write a program that takes three numbers as input and calculates their
> average.

### Exercise 4 — Check if a Number is Even or Odd
> Write a program that takes an integer as input and determines whether it
> is even or odd.

### Exercise 5 — Calculate the Factorial of a Number (Iterative)
> Write a program that calculates the factorial of a given positive integer
> **using a loop**.

---

# Lesson 01 — the four worked Examples

He gives the answers to these in the deck. **Do not solve them — check
yourself against them.** Cover his answer, write yours, compare. It is the
fastest honest feedback available tonight, because the marking scheme is
literally his own slide.

### Example 1 — Add 10 and 20
Answer on his slide: four steps, and a flowchart of six boxes with an oval
at each end.

### Example 2 — Student's final grade *(the important one)*
> Write an algorithm to determine a student's final grade and indicate
> whether it is passing or failing. The final grade is calculated as the
> average of four marks.

His pseudocode, word for word:

```
Input M1,M2,M3,M4
GRADE  (M1+M2+M3+M4)/4
If (GRADE < 60) then
    Print "FAIL"
Else
    Print "PASS"
Endif
```

**This is the single most likely source for Section 4.** It is the only
worked example in any deck that has input, a calculation and a decision
together, and the announcement says Section 4 is a practical scenario needing
exactly those.

### Example 3 — Log in to a school email account
> Write an algorithm to log in to school's email account.

A four-step algorithm with no numbers in it. Worth two minutes, because it
proves an algorithm does not have to be arithmetic.

### Example with a loop — The sum of five numbers
His slide gives the flowchart only. **Write the pseudocode for it yourself**
— this is the loop-with-a-running-total pattern, and it is Exercise 1 with
the count fixed at five.

---

# Lesson 03 — the Exercise

### Circle Area and Sphere Volume Calculator

> Write PHP code to calculate the surface area of a circle (A = π·r²) and the
> volume of a sphere (V = ⁴⁄₃·π·r³) using a given radius (r). You will
> implement this solution using two different approaches.

**Part 1 — Static / Developer-Defined**
- A script named `part1_static.php`
- A variable `$radius` with a hardcoded value (e.g. `$radius = 5`)
- Calculate the circle area and the sphere volume
- Display the radius with both results **rounded to 2 decimal places**

**Part 2 — Dynamic, using an HTML Form**
- An `index.html` with a form: an `<input type="number">` with `step="any"`
  for the radius, and a submit button
- The form submits by **POST** to `part2_dynamic.php`
- `part2_dynamic.php` must:
  - check the form was submitted via POST
  - validate that the radius **is set and is a positive number**
  - compute both values from the user's input
  - display a clean output, **or an error message** if the input is invalid
    or empty

**Those four bullets in Part 2 are a marking scheme.** Submitted check,
validation, computation, error message. Section 4 asks for the same four
things whatever the scenario.

---

# PHP Problems — Set I

Five problems. All five already have runnable worked solutions in
`Php/problem-set-1/`, and the self-marking versions are on the practice page.

### Problem I — Basic Arithmetic Calculator
> Write a PHP script that prompts or receives input for numbers, performs
> basic arithmetic operations, and renders the sum, product, difference, and
> quotient.

Three approaches, and the three are the point:

- **Approach 1 — hardcoded.** Two variables defined in the script. Output
  rendered into the HTML with `echo`.
- **Approach 2 — GET.** Two numbers from URL parameters
  (`&num1=100&num2=10`) read with **`$_GET`**.
- **Approach 3 — POST.** An HTML `<form method="POST">` with text fields and
  action buttons (ADD, SUB, MULT, DIV), handled with **`$_POST`**, printing
  e.g. `The result = 115`.

### Problem 2 — The E-Commerce Price Filter
> Write a PHP script that receives **five item prices** in dollars via an
> HTML `<form method="POST">`.
>
> - Determine the minimum and maximum item prices.
> - **Constraint: use only basic `if` / `else` and the comparison operators
>   (`<`, `>`). Do not use built-in functions like `min()` or `max()`.**
> - Output HTML with dynamic CSS styling — the highest price in **green**,
>   the lowest in **red**.

⚠ This is the one with the case study. The obvious answer — an `else if`
ladder — is wrong, and it is wrong in a way that passes the sheet's own
numbers. See **Bug case study** in the rail before writing it.

### Problem 3 — Smart-Home Smart Plug
> Write a PHP script that processes a single integer input representing the
> current day of the month.
>
> - Check if the day is Odd or Even using the **modulus operator (%)**.
> - Render an HTML status message, e.g. *"Day 14 is EVEN: Extra power mode
>   active!"* or *"Day 15 is ODD: Eco-conservation mode active!"*

### ⭐ Problem 4 — The Data Science Dashboard
> Write a PHP script that automatically calculates **the square and the cube
> for all integers from 0 to 5** using a **loop**.
>
> - Runs automatically on server load, **without user input**.
> - Dynamically generates an HTML5 `<table>` rendering the sequence.

**Start here tonight.** No form, no validation, no input — just a loop that
builds a table. It is Section 4 with the hard parts removed, and the table
shape is identical to anything he can set.

Watch the boundary: **0 to 5 is six rows**, not five.

### ⭐ Problem 5 — The Cloud Storage Pricing Tier Generator
> Write a PHP script that **loops through node counts from 1 to 6**.
>
> - Runs automatically on page load.
> - For each node step, calculate **10 × N** (Storage GB), **100 × N**
>   (Bandwidth TB) and **1000 × N** (API Requests).
> - Output the results inside an HTML5 `<table>`.

Same shape as Problem 4 with three computed columns instead of two. Do it
straight after, from blank, without looking back.

Boundary again: **1 to 6 is six rows.**

---

## The thing both table problems are teaching

Everything that happens **once** goes outside the loop — `<table>`, the
heading `<tr>`, `</table>`. Everything that happens **per row** goes inside —
and that is only ever one `<tr>…</tr>`.

Putting the heading row inside the loop is the commonest mistake in a table
question, and it is instantly visible in the output: six heading rows.
