# Lesson 8 — YOUR TURN

Start the server first:

```bash
php -S localhost:8000
```

### Exercise 1 — a greeting form
Make a new file `my-form.php`. It asks for a **first name** and a **country**,
and when you press the button it prints: `Hello <name>, so you are from <country>!`
Use one file (self-submitting).

### Exercise 2 — a calculator
`calculator.php`: two number inputs and a `<select>` with `+ - * /`.
When submitted, show the result. Handle division by zero with a clear message instead of an error.

### Exercise 3 — validation
Add validation to Exercise 1: both fields are required, and the name must be at least 2 letters.
Show the errors in a red box, like `register.php` does.

### Exercise 4 — GET instead of POST
Copy Exercise 1 into `my-form-get.php`, change the method to `get`, and watch the URL.
Then answer in a comment: why is POST better for a password?

### Exercise 5 — keep the values
Make sure that when there is an error, whatever the user typed is still in the inputs.
(hint: `value="<?= htmlspecialchars($name) ?>"`)

### Exercise 6 (challenge) — a grade form
A form takes a student name and 3 marks. On submit it shows:
the average (2 decimals), the letter grade, and Pass/Fail.
Use **functions** from Lesson 7 for the average and the grade — do not put the logic in the HTML.

### Exercise 7 (challenge) — a quiz page
5 multiple-choice PHP questions with radio buttons. On submit, show the score out of 5
and which ones were wrong. Store the correct answers in an **array** (Lesson 6).
