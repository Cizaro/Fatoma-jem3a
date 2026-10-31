# Case study: the price filter that only looks at two prices

This is a real attempt at Problem 2, with five faults in it. Four of them
are invisible on the numbers printed in the exercise sheet, which is the
reason it is worth a page of its own.

Work through it before reading the answers. Everything below was found by
running the file, not by reading it.

## What it does

| The five prices | It says | It should say |
|---|---|---|
| 14.50, 3.99, 27.00, 8.25, 19.99 | highest **27.00**, lowest **3.99** | highest 27.00, lowest 3.99 &nbsp;✓ |
| 1, 2, 3, 4, 5 | highest **2** | highest **5** |
| 5, 4, 3, 2, 1 | lowest **4** | lowest **1** |

**The first row is the one from the exercise sheet, and it is right.**
That is the trap. Tested only with the given numbers, this looks finished.

---

## Fault 1 — `else if` stops at the first match

```php
$Largest = $n1;
if ($n2 > $Largest)      { $Largest = $n2; }
else if ($n3 > $Largest) { $Largest = $n3; }
else if ($n4 > $Largest) { $Largest = $n4; }
else if ($n5 > $Largest) { $Largest = $n5; }
```

A ladder answers **once**. The moment one branch is taken, every branch
below it is skipped for good.

Trace 1, 2, 3, 4, 5:

```
$Largest = 1
is 2 > 1 ?  yes -> $Largest = 2   and the rest of the ladder is skipped
                                   3, 4 and 5 are never looked at
```

The sheet's numbers hide it because the largest, 27.00, happens to be
compared before anything else can short-circuit the chain.

**The fix is to delete four words.** Each price needs its own question:

```php
if ($n2 > $Largest) { $Largest = $n2; }
if ($n3 > $Largest) { $Largest = $n3; }
if ($n4 > $Largest) { $Largest = $n4; }
if ($n5 > $Largest) { $Largest = $n5; }
```

> **When is a ladder right, then?** When the branches are alternatives and
> only one can be true &mdash; a grade is A *or* B *or* C. Here they are not
> alternatives: several prices can each be bigger than the one before, and
> every one of them has to get its turn.

## Fault 2 — a brace in the wrong place sends two prices somewhere unreachable

```php
if ($action == "Res") {
    $Smallest = $n1;
    if ($n2 < $Smallest) { $Smallest = $n2; }
    else if ($n3 < $Smallest) { $Smallest = $n3; }
}                                   <-- this closes the "Res" block
else if ($n4 < $Smallest) { ... }   <-- so this is the ELSE of "Res"
else if ($n5 < $Smallest) { ... }
```

Those last two tests now belong to `if ($action == "Res")`, not to the
search. They run **only when the button was not pressed** &mdash; which is
never. The 4th and 5th prices are dead code.

It parses, so nothing warns you. Indentation is how you catch this: the
`else if` is further left than the `if` it appears to belong to.

## Fault 3 — the wrong variable, three times

```php
else if ($n4 < $Smallest) { $Smallest = $n3; }   // should be $n4
else if ($n5 < $Smallest) { $Smallest = $n3; }   // should be $n5
```

A copy-paste that was never finished. Even with faults 1 and 2 fixed, the
answer would still be wrong.

## Fault 4 — reading `$_POST` before checking it is there

```php
$action = $_POST["action"];      // line 34
if (isset($_POST["action"])) {   // line 36
```

The check is one line too late. On the first visit, before anybody has
pressed anything, line 34 reaches for a key that is not there:

```
Warning: Undefined array key "action"
```

Move the read inside the `if`. This is the same fault as in `revision/index.php`
and in `ProblemI.php` &mdash; the rule is **isset first, read second**.

## Fault 5 — the form posts to a file that does not exist

```php
<form action="Ecommerce.php" method="POST">
```

The file is called `Problem2_Ecommerce.php`. Pressing the button asks the
server for a page that is not there. Use `action=""` to post back to the
same file, and the name can never drift again.

---

## The whole thing, corrected

```php
<?php
if (isset($_POST["action"])) {

    $n1 = $_POST["n1"];
    $n2 = $_POST["n2"];
    $n3 = $_POST["n3"];
    $n4 = $_POST["n4"];
    $n5 = $_POST["n5"];

    // Assume the first price is both, then let the others challenge it.
    $Largest  = $n1;
    $Smallest = $n1;

    // A separate question per price - not a ladder.
    if ($n2 > $Largest) { $Largest = $n2; }
    if ($n3 > $Largest) { $Largest = $n3; }
    if ($n4 > $Largest) { $Largest = $n4; }
    if ($n5 > $Largest) { $Largest = $n5; }

    if ($n2 < $Smallest) { $Smallest = $n2; }
    if ($n3 < $Smallest) { $Smallest = $n3; }
    if ($n4 < $Smallest) { $Smallest = $n4; }
    if ($n5 < $Smallest) { $Smallest = $n5; }

    echo "<p style='color: green'>The highest price = $" . $Largest . "</p>";
    echo "<p style='color: red'>The smallest price = $" . $Smallest . "</p>";
}
```

Checked: 1, 2, 3, 4, 5 gives 5 and 1. 5, 4, 3, 2, 1 gives 5 and 1. The
sheet's own numbers still give 27.00 and 3.99.

---

## The lesson, which is bigger than this question

**The test data in a question is chosen to show you what the question
means. It is not chosen to find your mistakes.**

Four of these five faults survive the sheet's own numbers. Before handing
anything in, run it on data designed to break it:

- the answer **first** in the list
- the answer **last** in the list
- everything **the same**
- the boxes left **empty**

Two of those take ten seconds and would have caught this.

> This is why Problem 2 on the practice page is run against *two* sets of
> prices, one with the lowest at the end. That second set was weak when it
> was written &mdash; it checked for the text `1`, which also appears inside
> `100`, so this very answer slipped through it. It now checks the number
> with a boundary, and a third set has been added with the highest last.
