# Quiz 3 — Loops, Arrays & Functions
**Covers lessons 5–7 · 15 questions**

Name: ______________  Score: ____ / 15

---

### Part A — Multiple choice (1 point each)

**1.** Which loop is made for walking through an array?
- a) `for`
- b) `while`
- c) `foreach`
- d) `do...while`

**2.** In `for ($i = 0; $i < 5; $i++)`, how many times does the body run?
- a) 4
- b) 5
- c) 6
- d) forever

**3.** What is the index of the **first** item of an array?
- a) 1
- b) 0
- c) -1
- d) it depends

**4.** `$a = ["x","y","z"];` — what is `count($a)`?
- a) 2
- b) 3
- c) 4
- d) `x,y,z`

**5.** Which one leaves a loop completely?
- a) `continue`
- b) `stop`
- c) `break`
- d) `exit loop`

**6.** What is the difference between `echo` and `return` inside a function?
- a) None
- b) `echo` prints, `return` gives the value back to be used
- c) `return` prints, `echo` gives the value back
- d) `return` only works with numbers

**7.** What causes an infinite loop in a `while`?
- a) Using `$i++`
- b) Nothing inside changes the condition
- c) Starting at 0
- d) Using a `foreach`

**8.** `$student = ["name" => "Lina"];` — how do you print Lina?
- a) `echo $student[0];`
- b) `echo $student[name];`
- c) `echo $student["name"];`
- d) `echo $student->name;`

---

### Part B — What does it print? (1 point each)

**9.**
```php
for ($i = 1; $i <= 5; $i++) {
    if ($i == 3) continue;
    echo $i;
}
```
Answer: ______

**10.**
```php
$n = [4, 8, 2];
echo array_sum($n) / count($n);
```
Answer: ______

**11.**
```php
function f($x) {
    return $x * 3;
    echo "hello";
}
echo f(2);
```
Answer: ______

**12.**
```php
$a = ["b", "a", "c"];
sort($a);
echo implode("", $a);
```
Answer: ______

---

### Part C — Write the code (1 point each)

**13.** Write a `for` loop that prints the numbers 1 to 5 separated by spaces.

```php
_________________________________
_________________________________
_________________________________
```

**14.** Write a function `triple($n)` that **returns** `$n * 3`, then call it with 7 and print the result.

```php
_________________________________
_________________________________
_________________________________
_________________________________
```

**15.** Given this array, write a `foreach` that prints each name and its grade:

```php
$class = [
    ["name" => "Fatima", "grade" => 17],
    ["name" => "Sara",   "grade" => 8],
];

_________________________________
_________________________________
_________________________________
```

---

**Bonus (+1):** Why does this give an error, and what is the fix?

```php
$x = 10;
function show() {
    echo $x;
}
show();
```
