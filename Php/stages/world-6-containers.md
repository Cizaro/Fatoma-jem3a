# 🟣 World 6 — Containers & Commands
### Stages 26–30 · about 35 minutes

The last world, and the two biggest ideas: **arrays** (many values in one box) and
**functions** (your own commands). Everything in the real lessons is built on these two.

Take this world slowly. It's the one that decides whether the rest feels easy or impossible.

Practice file: `stages/practice/world-6.php`

---

## 🟣 Stage 26 — Many in one

**🎯 Goal:** put a list in a single variable.

**⌨️ The syntax**

```php
$colors = ["red", "green", "blue"];
//            0        1        2      ← the INDEX
```

Getting things out:

```php
echo $colors[0];        // red
echo $colors[2];        // blue
echo count($colors);    // 3
```

🚨 **Counting starts at 0.** Always. So a list of 3 things has indexes **0, 1, 2** — and the
last index is always `count - 1`.

That single fact causes more beginner errors than anything else in this world. Draw it on
paper once:

```
  [  "red"  ][ "green" ][  "blue"  ]
      0          1           2
```

Changing and adding:

```php
$colors[1] = "yellow";     // replace item 1
$colors[]  = "purple";     // add to the end — no index needed
```

**✅ Clear the stage**
Make an array of your 5 favourite foods. Print the first, the last (using `count`), and how
many there are. Then add a sixth and print the count again.

**💀 If it breaks**
`Undefined array key 3` on a 3-item array → you asked for the 4th. The last one is `[2]`.

---

## 🟣 Stage 27 — Names instead of numbers

**🎯 Goal:** use your own labels as keys.

**⌨️ The syntax**

```php
$student = [
    "name"  => "Fatima",
    "age"   => 20,
    "major" => "Computer Science"
];

echo $student["name"];     // Fatima
```

`=>` means "points at". Instead of `[0]` and `[1]` you use `["name"]` and `["age"]` — which
you can actually read six months later.

This shape — a set of `key => value` pairs describing one thing — is what **every** row in a
database looks like. Get comfortable here and lesson 9 costs you nothing.

🚨 The keys need **quotes**: `$student["name"]`, never `$student[name]`.

**✅ Clear the stage**
Make an associative array about yourself with keys `name`, `age`, `university`, `city`.
Print each one on its own labelled line.

**💀 If it breaks**
`Undefined constant "name"` → you left the quotes off the key.

---

## 🟣 Stage 28 — Walking through

**🎯 Goal:** do something to every item without counting anything.

**⌨️ The syntax**

```php
foreach ($colors as $color) {
    echo $color . "\n";
}
```

Read it: *"for each item in `$colors`, call it `$color`, and do this"*.

No counter, no `$i`, no chance of going one too far. For arrays, `foreach` is almost always
the right choice over `for`.

With the key as well:

```php
foreach ($student as $key => $value) {
    echo "$key: $value\n";
}
```

**✅ Clear the stage**
1. `foreach` your foods array and print each one on its own line.
2. `foreach` your associative array with `$key => $value` and print both.
3. Sum an array of numbers with a `foreach` and a running total (start it at 0 **before**
   the loop — a classic slip is starting it inside).

**💀 If it breaks**
`foreach` only works on arrays. On a plain string or number you'll get a warning.

---

## 🟣 Stage 29 — Your own command

**🎯 Goal:** write something once and use it many times.

**⌨️ The syntax**

```php
function greet($name) {
    echo "Hello $name";
}

greet("Fatima");     // ← calling it. Nothing happens until you do this.
greet("Sara");
```

The shape:

```
function  name ( what it needs )  {  what it does  }
```

🚨 **Writing a function runs nothing.** It's a recipe sitting on a shelf. It only happens when
you *call* it. "My function doesn't work" almost always means "I never called it".

**✅ Clear the stage**
1. Write `sayHello()` with no parameters and call it 3 times.
2. Write `greet($name)` and call it with three different names.
3. Write `add($a, $b)` that **echoes** the sum, and call it twice.

**💀 If it breaks**
Nothing happening at all? You defined it and never called it. Add the call.

---

## 🟣 Stage 30 — Giving an answer back

**🎯 Goal:** the difference between `echo` and `return`, which is the last big idea in this track.

**⌨️ The syntax**

```php
function addAndPrint($a, $b) {
    echo $a + $b;           // prints it. Hands back nothing.
}

function addAndReturn($a, $b) {
    return $a + $b;         // hands the value back to you.
}

addAndPrint(2, 3);              // prints 5
$result = addAndReturn(2, 3);   // $result is now 5
echo $result * 10;              // 50 — you can keep using it
```

`echo` puts it on the screen and it's gone. `return` **gives it to you**, so you can store it,
do maths with it, or pass it into another function.

🚨 `return` also **ends the function immediately**:

```php
function test() {
    return "done";
    echo "this never prints";
}
```

**Rule of thumb:** make functions `return`, and `echo` outside. That's what makes them reusable.

And one more thing to know exists — **scope**:

```php
$x = 10;
function show() {
    echo $x;      // ❌ ERROR - a function can't see outside itself
}
```

The fix is to pass it in: `function show($x)` then `show(10);`. Functions are sealed boxes,
on purpose, so they can't break each other.

**✅ Clear the stage**
1. Write `square($n)` that **returns** `$n * $n`. Print `square(4)`, `square(7)`, `square(12)`.
2. Then print `square(3) + square(4)` — that only works because it returns.
3. Write `isEven($n)` that returns `true` or `false`, and test it with `var_dump`.

**💀 If it breaks**
`echo square(4);` printing nothing? Your function `echo`s instead of `return`s.

---

## 👑 WORLD 6 BOSS — and the end of the track

Build a **class report**, using everything from all six worlds:

```php
$class = [
    ["name" => "Fatima", "mark" => 17],
    ["name" => "Sara",   "mark" => 8],
    ["name" => "Lina",   "mark" => 12],
    ["name" => "Nour",   "mark" => 19],
];
```

Write **two functions**:
- `letterGrade($mark)` — returns A (18+), B (16+), C (14+), D (10+), F otherwise
- `hasPassed($mark)` — returns true or false

Then `foreach` the class and print a lined-up table:

```
NAME       MARK  GRADE  RESULT
------------------------------
Fatima      17     B     Pass
Sara         8     F     Fail
Lina        12     D     Pass
Nour        19     A     Pass
------------------------------
Average: 14   Passed: 3 of 4
```

The average and the pass count must be **calculated**, not typed.

---

## 🎓 Track complete

If you can do that boss, you have the syntax. All of it — tags, variables, quotes, maths,
conditions, loops, arrays and functions.

That's lessons 1 to 7 of the real course, in your hands rather than in your head.

**Where to go now:**
- Go back to `../01-basics/` and work through the real lessons — they'll feel like revision now
- Or jump straight to `../08-forms/` and put your syntax on an actual web page
- Tick World 6 in `../stages.html` and see the whole map lit up

You didn't learn to code by understanding it. You learned by typing it 200 times.
That's how everyone does it.

---

◀ [World 5](world-5-repeats.md) · [the map](README.md)
