# Lesson 1 — echo, Variables, Comments

## 1. `echo` — how PHP talks

`echo` means "print this out".

```php
<?php
echo "Hello world";
```

Two small things that matter:

- `"Hello world"` is a **string** — text wrapped in quotes.
- The `;` at the end ends the statement. Like a full stop in a sentence.

`\n` inside double quotes means "new line":

```php
echo "Line one\n";
echo "Line two\n";
```

## 2. Variables — boxes with names

A variable stores a value so you can use it later.

```php
$name = "Fatima";
$age  = 20;
```

Rules for variable names:

| Rule | Good | Bad |
|---|---|---|
| Must start with `$` | `$name` | `name` |
| After `$`: letter or `_` | `$age`, `$_id` | `$2days` |
| No spaces | `$first_name` | `$first name` |
| **Case sensitive** | `$name` and `$Name` are two *different* variables | |

`=` means **"put into"**, not "equals". Read `$age = 20;` as *"put 20 into age"*.

## 3. Printing variables

Three ways, all correct:

```php
$name = "Fatima";

echo $name;                      // just the variable
echo "Hello " . $name;           // . glues strings together (concatenation)
echo "Hello $name";              // inside DOUBLE quotes, PHP reads the variable
```

⚠️ **Single quotes don't read variables:**

```php
echo "Hello $name";   // Hello Fatima
echo 'Hello $name';   // Hello $name      <- literally!
```

Remember: **double quotes = smart, single quotes = literal.**

## 4. Comments — notes for humans

PHP ignores these. They're for you and your teacher.

```php
// one-line comment

# also a one-line comment

/*
   multi-line
   comment
*/
```

Use them to explain **why**, not what. `// add 1 to i` is useless. `// skip the header row` is useful.

## 5. Changing a variable

A variable holds the **last** thing you put in it:

```php
$x = 5;
$x = 9;
echo $x;   // 9   — the 5 is gone forever
```

---

## Watch out ⚠️

| Mistake | What happens |
|---|---|
| Forgetting `;` | `Parse error` — whole page dies |
| Forgetting `$` | `Undefined constant` error |
| `echo 'Hi $name'` | prints `$name` literally |
| `$Name` vs `$name` | two different boxes |

---

➡️ Run `examples.php`, then do `exercises.php`.
