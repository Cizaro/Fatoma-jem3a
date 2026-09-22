# Lesson 6 — Arrays

One variable holds one value. An **array** holds many values under one name.

Instead of:

```php
$student1 = "Fatima";
$student2 = "Sara";
$student3 = "Lina";      // ...and if there are 200 students?
```

You write:

```php
$students = ["Fatima", "Sara", "Lina"];
```

## 1. Indexed arrays (a numbered list)

```php
$students = ["Fatima", "Sara", "Lina"];
//              0         1       2        <- the INDEX
```

**Counting starts at 0.** Always. Forever.

```php
echo $students[0];       // Fatima
echo $students[2];       // Lina
echo count($students);   // 3   - how many items
```

The **last** item is always at index `count - 1`. Here: index 2.

### Change / add / remove

```php
$students[1] = "Maya";       // change
$students[] = "Nour";        // add at the end (no index needed!)
unset($students[0]);         // remove
```

## 2. Associative arrays (key => value)

Instead of numbers, use your own names as keys:

```php
$student = [
    "name"  => "Fatima",
    "age"   => 20,
    "major" => "Computer Science"
];

echo $student["name"];    // Fatima
```

This is the shape of nearly all real data: a user, a product, a row from a database.
The `=>` is read as "points to".

## 3. Looping through arrays with foreach

**Indexed:**

```php
foreach ($students as $student) {
    echo $student;
}
```

**With the key too:**

```php
foreach ($student as $key => $value) {
    echo "$key: $value\n";
}
```

Read it as: *"for each item in the array, call it `$value`, and call its key `$key`"*.

## 4. Multidimensional arrays (an array of arrays)

```php
$students = [
    ["name" => "Fatima", "grade" => 18],
    ["name" => "Sara",   "grade" => 14],
];

echo $students[0]["name"];    // Fatima

foreach ($students as $s) {
    echo $s["name"] . " got " . $s["grade"] . "\n";
}
```

This is exactly what a database table looks like. Get comfortable here and the MySQL
chapters become easy.

## 5. Useful array functions

```php
count($a)                 // number of items
in_array("Sara", $a)      // true/false - is it inside?
array_search("Sara", $a)  // gives its index
sort($a)                  // sort small->big / A->Z (renumbers keys)
rsort($a)                 // reverse sort
asort($a) / ksort($a)     // sort assoc by value / by key
array_push($a, "x")       // add to the end
array_pop($a)             // remove the LAST and return it
array_shift($a)           // remove the FIRST
array_unshift($a, "x")    // add at the beginning
array_keys($a)            // all the keys
array_values($a)          // all the values
array_sum($a)             // total of numbers
array_reverse($a)         // flip the order
implode(", ", $a)         // array  -> string
explode(",", "a,b,c")     // string -> array
array_unique($a)          // remove duplicates
print_r($a)               // print the array nicely (for debugging)
```

`print_r()` and `var_dump()` are how you look inside an array. Use them constantly.

---

## Watch out

| Mistake | Result |
|---|---|
| `$a[3]` when there are 3 items | Warning: undefined key (the last one is `[2]`) |
| `echo $array;` | "Array to string conversion" - use `print_r()` |
| forgetting quotes in `$a[name]` | error - write `$a["name"]` |
| `sort()` on an associative array | your keys are destroyed |

---

Next: `examples.php` then `exercises.php` then quiz-03
