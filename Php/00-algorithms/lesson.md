# Lesson 0A — Algorithms, Flowcharts and Pseudocode

> **This is MIT320 Lesson 1.** It is the first thing your lecturer teaches, and there is
> **no PHP in it at all**. That is on purpose: you design the solution first, then you type it.
>
> Everything here is examinable. "Draw the flowchart", "write the pseudocode" and
> "what is an algorithm" are the easiest marks on the paper, because they are the only
> questions where a correct answer needs no working code.

---

## 1. What an algorithm is

An **algorithm** is a step-by-step procedure for solving a problem.

That is the definition to write in the exam. But a definition you can repeat is not the same
as one you can use, so here is the test. In computer science, something only counts as an
algorithm if all three of these are true:

| Rule | In plain words |
|---|---|
| It has **data to work on** | you give it something: two numbers, four marks, a word |
| It produces **at least one result** | it tells you something back. A procedure that answers nothing is not an algorithm |
| It **terminates** after a finite number of steps | it stops. A recipe that never ends is not a recipe |

That third one is the interesting one. `while ($x > 0)` where nothing ever changes `$x` is not
a slow algorithm. It is **not an algorithm at all**.

A recipe is the comparison everybody uses, and it is a good one. "Beat two eggs, add flour,
bake for 20 minutes" has data (eggs, flour), a result (a cake) and an end (20 minutes).

---

## 2. The Program Development Life Cycle (PDLC)

Six phases. Expect "list the phases of the PDLC" as a written question, so learn them in order.

| # | Phase | What happens |
|---|---|---|
| 1 | **Problem definition** | say clearly what problem the software must solve |
| 2 | **Problem analysis** | work out the inputs, the processes and the outputs. Find the constraints |
| 3 | **Algorithm development** | design the steps. This is where flowcharts and pseudocode live |
| 4 | **Coding and documentation** | turn the algorithm into a real language, and write down how it works |
| 5 | **Testing and debugging** | run it, find the bugs, fix them |
| 6 | **Maintenance** | keep fixing and improving it after people are using it |

Notice where coding sits: **phase 4 of 6**. Most of the work happens before you type, and a
good chunk happens after you think you are finished.

Another way to say the same thing, which your slides also use: programming has a
**problem solving phase** (produce the algorithm) and an **implementation phase** (write it in
a language). Design is the most important part, because a program built on a wrong design is
wrong no matter how neatly it is typed.

---

## 3. Writing an algorithm in plain English

The first way to express an algorithm is ordinary language, using a small set of verbs so
each line does exactly one thing:

- **read**, **write**, **compute**, **set** — for input, output and assignment
- **add**, **subtract**, **multiply**, **divide** — for the maths
- **equal to**, **less than**, **greater than** — for the comparisons
- **repeat for**, **while**, **if**, **halt**, **exit** — for the control

Example, the one from your slides:

```
1. Initialize sum to 0
2. Enter the two numbers
3. Add them and store the result in sum
4. Print sum
```

Four lines, each doing one thing, in order. That is a complete algorithm.

---

## 4. Pseudocode, and the notation your lecturer uses

Plain English gets wordy. **Pseudocode** is the middle ground: part English, part programming
notation. It is *fake code*.

- It has **no syntax rules**, so it cannot give you a syntax error
- It is **never compiled or run**
- It can be translated into **any** language afterwards: PHP, Python, C, anything

The point is that you get to think about the logic without fighting semicolons.

**Use your lecturer's conventions**, because those are what the marker is reading:

| Convention | How it is written |
|---|---|
| The algorithm has a **name** | `Algorithm GCD` |
| **Comments** go in square brackets | `[this returns the greatest common divisor]` |
| **Variable names in CAPITALS** | `GRADE`, `M1`, `X` |
| **Assignment uses a left arrow** | `GRADE <-- (M1+M2+M3+M4)/4` |
| **Operators are the algebraic ones** | `+ - * / < > = !=` |
| **Decisions** | `if-then`, `if-then-else`, `endif` |
| **Repetition** | `Repeat`, `for`, `while`, `until` |

Written out, one of your slide examples looks like this:

```
Input M1, M2, M3, M4
GRADE <-- (M1 + M2 + M3 + M4) / 4
if (GRADE < 60) then
    Print "FAIL"
else
    Print "PASS"
endif
```

**Watch the arrow.** In pseudocode `<--` means *put this value in here*, and a single `=`
means *is it equal?*. In PHP those swap round: `=` puts a value in, and `==` compares.
Mixing them up is the single most common mark lost on this topic.

---

## 5. Flowcharts

A flowchart is the same algorithm drawn as a picture. It shows the logic, the individual
steps, and how they connect.

### The symbols

| Symbol | Shape | What it means |
|---|---|---|
| **Oval** | rounded box | start or end of the program (a *terminal*) |
| **Parallelogram** | leaning box | input or output. `Input M1` or `Print SUM` |
| **Rectangle** | plain box | a process. Doing maths, assigning a value |
| **Diamond** | turned square | a decision. Two ways out: yes and no |
| **Flow line** | arrow | the direction the logic travels |

### The two rules that cost marks

1. **A flowchart must have a start and a stop.** Both of them. Ovals.
2. **Every step must connect.** Nothing left hanging with an arrow going nowhere.

Those two are easy to check before you hand the paper in, and easy to lose a mark on if
you do not.

### The decision structure

A diamond holds a **logical expression**: a question with a yes/no answer, like `A > B`.

```
        +-----------+
   Yes  |  is A>B ? |  No
   <----+-----------+---->
   |                     |
+--------+          +--------+
|Print A |          |Print B |
+--------+          +--------+
```

which is exactly this pseudocode:

```
if A > B then
    print A
else
    print B
endif
```

If the condition is **true** you take the left branch. If it is **false** you take the right one.
Only one of the two ever runs.

### Relational operators

These are the questions a diamond is allowed to ask:

| Pseudocode | Means | In PHP |
|---|---|---|
| `>` | greater than | `>` |
| `<` | less than | `<` |
| `=` | equal to | `==` (or `===`) |
| `>=` | greater than or equal to | `>=` |
| `<=` | less than or equal to | `<=` |
| `!=` | not equal to | `!=` (or `!==`) |

The middle row is the trap. Pseudocode `=` is PHP `==`.

---

## 6. Euclid's algorithm, the one you will be asked to trace

Finding the **greatest common divisor** of two positive numbers, written by Euclid in
ancient Greece and still correct today. This one appears in your slides three times over
(English, pseudocode, flowchart), which is a strong hint about the exam.

```
Algorithm GCD [returns the greatest common divisor of two positive integers]

1. Read : A, B
2. X <-- A, Y <-- B
3. Repeat steps 4 to 5 while (X != Y)
4. if X > Y then X <-- X - Y
5. if Y > X then Y <-- Y - X
6. Write : "Greatest common divisor: ", X
7. Exit
```

The idea in one sentence: **keep subtracting the smaller from the larger until they are equal,
and that value is the answer.**

Trace it for GCD(48, 18) and show the table. Markers love the table:

| Step | X | Y | What happened |
|---|---|---|---|
| start | 48 | 18 | |
| 1 | 30 | 18 | X was bigger, so X <-- 48 - 18 |
| 2 | 12 | 18 | X was bigger, so X <-- 30 - 18 |
| 3 | 12 | 6 | Y was bigger, so Y <-- 18 - 12 |
| 4 | 6 | 6 | X was bigger, so X <-- 12 - 6 |
| stop | 6 | 6 | X equals Y. **GCD is 6** |

Check it yourself: 6 divides 48 (eight times) and 6 divides 18 (three times), and nothing
bigger does both.

---

## 7. From algorithm to PHP

This is the part your slides do not show, and it is the reason this lesson exists inside a
PHP course. The algorithm is the design. PHP is one way of building it.

The grade example, side by side:

| Pseudocode | PHP |
|---|---|
| `Input M1, M2, M3, M4` | `$m1 = 15; $m2 = 12; ...` |
| `GRADE <-- (M1+M2+M3+M4)/4` | `$grade = ($m1 + $m2 + $m3 + $m4) / 4;` |
| `if (GRADE < 60) then` | `if ($grade < 60) {` |
| `Print "FAIL"` | `echo "FAIL";` |
| `else` | `} else {` |
| `Print "PASS"` | `echo "PASS";` |
| `endif` | `}` |

Line for line. Every pseudocode line became exactly one PHP line. That is what a good
algorithm buys you: the hard thinking is already done, and typing it is mechanical.

`examples.php` in this folder runs all of it for real.

> **Careful with the pass mark.** MIT320's example marks out of 100 and fails below **60**.
> The rest of this course marks out of 20 and passes at **10**, because that is what your
> other material uses. Neither is wrong. Read the question and use the number it gives you.

---

## Watch out ⚠️

| Mistake | What happens |
|---|---|
| Flowchart with no Stop oval | marked wrong, even if the logic is perfect |
| An arrow that connects to nothing | same. Every step must join up |
| Using `=` for comparison in PHP | `if ($x = 5)` assigns 5 and is always true |
| Writing PHP syntax in a pseudocode answer | `$` and `;` do not belong in pseudocode |
| A loop where nothing changes | not a slow algorithm, not an algorithm at all |
| Putting a decision in a rectangle | decisions are diamonds. Always |

---

## 💡 Did you know

The word **algorithm** is somebody's name. **Muhammad ibn Musa al-Khwarizmi** was a
mathematician working in Baghdad in the 800s. When his book on calculation reached Europe
in Latin translation, his name came with it, got mangled into *algorismus*, and ended up
meaning "the steps you follow to calculate something".

His other book gave us a second word. Its title contains *al-jabr*, the operation of moving
a term to the other side of an equation. In English that became **algebra**.

So in a lesson about algorithms in algebra you are saying one man's name twice, and his
name is on your exam paper more often than your lecturer's.

Euclid, whose GCD algorithm you just traced, was even earlier: roughly 300 BC. His method
is still the one your computer uses to reduce a fraction. Over two thousand years, and
nobody has found a better way to do it.

## 🎮 Play with it

1. **Write the algorithm for making tea.** Properly. Every step. Then hand it to somebody
   and make them follow it *exactly*, doing nothing you did not write. They will end up
   holding a kettle with no water in it. That is what a computer does with your code.
2. **Trace Euclid backwards.** GCD(1071, 462) with the subtraction method. Draw the table.
   It takes a while. Then look up how the *division* version does it in three lines, and you
   will understand why algorithms get improved.
3. **Draw the flowchart for something silly** that has a decision in it: "should I go to the
   lecture?" Diamond for the condition, two branches, a stop on each. The shapes stick
   faster when the content is daft.
4. **The 60 vs 10 trap.** Take the grade flowchart and redraw it for marks out of 20 passing
   at 10. One number changes. Prove to yourself that the *structure* is the answer, not
   the numbers in it.

## 🏆 Boss challenge

Take the **sum of five numbers** problem, the one with a loop, and produce all three forms
on one page:

1. the algorithm in plain English
2. the pseudocode, using the arrow and CAPITAL variables
3. the flowchart, with a proper start, stop and a loop arrow going back up

Then write it in PHP and check the PHP and the pseudocode agree line for line.

If your flowchart's loop arrow does not go *back* to an earlier box, you have not drawn
a loop. You have drawn five boxes.

## ▶ Practise this lesson

`quizzes/mini-quizzes/lesson-00-algorithms.md` · `games/php-arcade.html` → **Match the Words**
(the algorithm set) · then `exercises.php` in this folder, which is your lecturer's own five
exercises.
