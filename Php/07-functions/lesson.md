# Lesson 7 — Functions

A function is **your own command**. You write the recipe once, then call it whenever you want.

Why bother?
- Write once, use 100 times
- Fix a bug in **one** place instead of 100
- Your code gets a name for each idea, so it reads like English

## 1. Making and calling a function

```php
function sayHello() {
    echo "Hello!";
}

sayHello();     // <- calling it. Nothing happens until you call it.
sayHello();     // call it again, why not
```

- `function` keyword, then the name, then `()`, then `{ }`
- Defining a function runs nothing. **Calling** it runs the body.

## 2. Parameters — giving the function information

```php
function greet($name) {
    echo "Hello $name!";
}

greet("Fatima");    // Hello Fatima!
greet("Sara");      // Hello Sara!
```

`$name` is a **parameter** (the empty slot). `"Fatima"` is the **argument** (what you actually pass).

Several parameters, separated by commas:

```php
function add($a, $b) {
    echo $a + $b;
}
add(3, 5);      // 8
```

**Order matters:** `add(3, 5)` puts 3 in `$a` and 5 in `$b`.

## 3. `return` — getting an answer back

`echo` *prints*. `return` *gives the value back* so you can use it.

```php
function add($a, $b) {
    return $a + $b;
}

$result = add(3, 5);      // $result is now 8
echo add(2, 2) * 10;      // 40  - you can use it in an expression
```

⚠️ `return` **ends the function immediately**. Any code after it never runs.

```php
function test() {
    return 1;
    echo "never printed";
}
```

**Rule of thumb:** make functions `return` values, and `echo` outside. That keeps them reusable.

## 4. Default values

```php
function greet($name = "guest") {
    echo "Hello $name";
}

greet();            // Hello guest
greet("Fatima");    // Hello Fatima
```

Parameters with defaults must come **last** in the list.

## 5. Scope — the rule that confuses everyone

Variables inside a function live **only** inside it. Variables outside are **invisible** inside.

```php
$x = 10;

function show() {
    echo $x;      // ERROR - the function cannot see $x
}
```

The fix is to **pass it in**:

```php
function show($x) {
    echo $x;
}
show(10);        // works
```

This is a feature, not a bug: functions stay independent and can't break each other.

## 6. Type hints (nice, modern PHP)

```php
function add(int $a, int $b): int {
    return $a + $b;
}
```

`int $a` says "this must be a whole number", and `: int` says "I give back a whole number".
Your teacher may not require it, but it catches mistakes early.

## 7. Built-in vs your own

You've been calling functions all along: `strlen()`, `count()`, `round()`, `implode()`.
Those are PHP's built-in functions. Now you can build your own with exactly the same shape.

---

## Watch out

| Mistake | Result |
|---|---|
| defining but never calling | nothing happens |
| `echo` instead of `return` | you can't reuse the value |
| using an outside variable inside | undefined variable error |
| two functions with the same name | fatal error - names must be unique |
| wrong number of arguments | ArgumentCountError |

---

Next: `examples.php` then `exercises.php` then play `games/hangman.php`
