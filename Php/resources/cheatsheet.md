# PHP Cheat Sheet — print this and keep it next to you

## The tags

```php
<?php  ... ?>        // a block of PHP
<?= $name ?>         // short for <?php echo $name; ?>
```

## Output

```php
echo "text";              print_r($array);        // arrays, readable
echo $a . " " . $b;       var_dump($x);           // value + type
echo "Hello $name";       printf("%-10s %d\n", $name, $age);
```

## Variables & types

```php
$name   = "Fatima";   // string      "20" is a STRING, 20 is an INT
$age    = 20;         // int
$grade  = 15.5;       // float
$passed = true;       // bool        echo true -> 1, echo false -> nothing
$list   = [1, 2, 3];  // array
```

## Strings

```php
strlen($s)              strtoupper($s)          trim($s)
strtolower($s)          ucfirst($s)             strrev($s)
substr($s, 0, 3)        strpos($s, "a")         str_replace("a","b",$s)
str_repeat("-", 10)     str_split($s)           nl2br($s)
"double quotes read $variables"     'single quotes do not'
```

## Numbers

```php
+  -  *  /  %  **        // % = remainder, ** = power
round(3.7)  floor(3.7)  ceil(3.2)  abs(-5)
max(1,2)  min(1,2)  rand(1,6)  intdiv(7,2)  number_format(1234.5, 2)
$n % 2 == 0              // <- the "is it even" trick
```

## Comparison & logic

```php
==   equal value            ===  equal value AND type
!=   not equal              !==  not identical
>  <  >=  <=
&&   and          ||   or          !   not
```

## Conditions

```php
if ($a > $b) {
    ...
} elseif ($a == $b) {      // strictest condition FIRST
    ...
} else {
    ...
}

$x = ($age >= 18) ? "adult" : "child";     // ternary

switch ($day) {
    case "Mon": echo "..."; break;         // don't forget break
    default:    echo "...";
}
```

**Falsy in PHP:** `false 0 0.0 "" "0" [] null` — everything else is true.

## Loops

```php
for ($i = 0; $i < 5; $i++) { }         // known number of times
while ($i < 5) { $i++; }               // must change $i or it's infinite
do { } while ($i < 5);                 // runs at least once
foreach ($array as $item) { }          // for arrays
foreach ($array as $key => $value) { }

break;      // leave the loop
continue;   // skip this round only
```

## Arrays

```php
$a = ["x", "y"];                       // indexed, starts at 0
$a = ["name" => "Fatima"];             // associative
$a[] = "z";                            // add to the end
$a["age"] = 20;                        // add/change a key
unset($a[0]);                          // remove

count($a)        in_array("x", $a)     array_search("x", $a)
sort($a)         rsort($a)             asort($a)      ksort($a)
array_push()     array_pop()           array_shift()  array_unshift()
array_keys($a)   array_values($a)      array_sum($a)  array_reverse($a)
implode(", ",$a) explode(",", $s)      array_unique($a)
```

## Functions

```php
function name($param, $optional = "default") {
    return $value;          // return ENDS the function
}
$x = name("hello");

// variables inside a function cannot see variables outside. Pass them in.
```

## Forms

```php
$_POST["field"]        // from method="post"
$_GET["field"]         // from method="get" / the URL
$_SESSION["key"]       // needs session_start() at the very top
$_SERVER["REQUEST_METHOD"] === "POST"

$v = $_POST["x"] ?? "";        // or "" if missing
isset($_POST["x"])             // does it exist?
empty($_POST["x"])             // missing, "", 0, or null?
trim()                         // cut the spaces at the edges
filter_var($e, FILTER_VALIDATE_EMAIL)
is_numeric($n)
htmlspecialchars($v)           // ALWAYS before printing user text

header("Location: page.php");  exit;    // redirect, then always exit
```

## MySQL

```php
$conn = mysqli_connect("localhost", "root", "", "dbname");

$result = mysqli_query($conn, "SELECT * FROM students");
while ($row = mysqli_fetch_assoc($result)) {
    echo $row["name"];
}
mysqli_num_rows($result)    mysqli_affected_rows($conn)    mysqli_insert_id($conn)
mysqli_close($conn);

// ALWAYS use this for anything a user typed:
$stmt = mysqli_prepare($conn, "SELECT * FROM students WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);       // i int, s string, d decimal
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
```

## SQL

```sql
SELECT * FROM t;                      SELECT name, grade FROM t;
SELECT * FROM t WHERE grade >= 10;    SELECT * FROM t WHERE name LIKE 'F%';
SELECT * FROM t ORDER BY grade DESC;  SELECT * FROM t LIMIT 5;
SELECT COUNT(*), AVG(grade), MAX(grade) FROM t;

INSERT INTO t (name, grade) VALUES ('Sara', 14);
UPDATE t SET grade = 19 WHERE id = 1;     -- never forget WHERE
DELETE FROM t WHERE id = 3;               -- never forget WHERE
```

## Including files

```php
require "includes/db.php";      // fatal error if missing
include "sidebar.php";          // warning only
require_once "config.php";      // never loads twice
```

## Run it

```bash
php file.php                 # terminal
php -S localhost:8000        # a web server in this folder
php -l file.php              # check the syntax without running
```

---

## The 8 mistakes you will make (everyone does)

1. Missing `;` at the end of a line
2. Missing `$` on a variable
3. `=` instead of `==` in an `if`
4. Forgetting `$i++` in a `while` → infinite loop
5. `$array[3]` when the array only has 3 items (last index is 2)
6. Single quotes when you wanted the variable to be read
7. `echo` instead of `return` inside a function
8. Forgetting `break` in a `switch`
