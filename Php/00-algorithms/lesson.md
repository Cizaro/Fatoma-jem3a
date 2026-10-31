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

### The program development cycle

The PDLC is the whole life of a piece of software. Inside it sits a shorter loop, the one you
personally go round every time you write a program. Your slides list it as five steps:

1. **Design the program**
2. **Write the code**
3. **Correct the syntax errors**
4. **Test the program**
5. **Correct the logic errors**

Steps 3 and 5 are two different jobs and it is worth knowing why.

A **syntax error** means PHP cannot read what you typed: a missing semicolon, an unclosed
quote. The program refuses to run and tells you the line. Annoying, but honest.

A **logic error** means PHP understood you perfectly and did exactly what you said, which was
not what you meant. It runs, it prints something, and the something is wrong. Nothing tells
you. `if ($grade > 60)` when you meant `>= 60` is a logic error, and the only way to find it
is to test with a grade of exactly 60.

> **Designing it means asking first.** Before any of that: understand the task, work with
> whoever wants the program until you know what it is supposed to do, ask about the details,
> and write the requirements down. Then break the task into a series of steps. That list of
> steps is your algorithm.

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

Four lines, each doing one thing, in order. That is a complete algorithm. On the slide it is
the problem *add 10 and 20*, and its flowchart is Start → `sum = 0` → `Enter 10, 20` →
`sum = 10 + 20` → `Print sum` → Stop. Six boxes, one of them an oval at each end.

### An algorithm does not have to be about numbers

Your lecturer's third example is this one, and it catches people out because there is no
maths in it at all:

> **Write an algorithm to log in to your school email account.**

```
1. Go to the school website
2. Click the Office 365 for Students and Teachers link
3. Enter the email ID and the password
4. Click Sign in
```

That is a complete, correct answer. Four steps, in order, each doing one thing, and it
terminates. If a question like this comes up, do not go hunting for a formula: write the
steps you would actually perform, in the order you would actually perform them, and stop
when the task is done.

The trap is being too vague. "Log into the website" is one step to a human and about nine to
a computer. Break it down until each line is a single action somebody could follow without
asking you a question.

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

### The symbols — what each one looks like

<style>
.shapekey{display:grid;gap:14px;margin:0 0 22px;
  grid-template-columns:repeat(auto-fit,minmax(208px,1fr))}
.shapekey figure{margin:0;background:var(--surface);border:1px solid var(--line);
  border-radius:var(--r);padding:14px 14px 15px;text-align:center}
.shapekey svg{display:block;width:100%;height:auto;margin-bottom:9px}
.shapekey .sh{fill:var(--accent-soft);stroke:var(--accent);stroke-width:3;stroke-linejoin:round}
.shapekey .in{fill:var(--accent);font-family:var(--mono),monospace;font-size:17px;
  font-weight:700;text-anchor:middle}
.shapekey .nm{display:block;font-family:var(--display),sans-serif;font-size:16px;
  font-weight:700;color:var(--ink)}
.shapekey .ds{display:block;font-size:13.5px;color:var(--ink-2);margin-top:3px;line-height:1.45}
.shapekey .no{border-color:var(--warm)}
.shapekey .no .sh{fill:var(--warm-soft);stroke:var(--warm);stroke-dasharray:7 5}
.shapekey .no .in{fill:var(--warm);font-size:15px}
.shapekey .no .nm{color:var(--warm)}
</style>
<div class="shapekey">
<figure>
<svg viewBox="0 0 200 104" role="img" aria-label="An oval">
<ellipse class="sh" cx="100" cy="52" rx="82" ry="36"></ellipse>
<text class="in" x="100" y="59">START</text>
</svg>
<b class="nm">Oval</b>
<span class="ds">Where the program <b>begins</b> and where it <b>ends</b>. You need both of them.</span>
</figure>
<figure>
<svg viewBox="0 0 200 104" role="img" aria-label="A parallelogram">
<polygon class="sh" points="44,16 180,16 156,88 20,88"></polygon>
<text class="in" x="100" y="59">READ X</text>
</svg>
<b class="nm">Parallelogram</b>
<span class="ds">Anything a <b>person types in</b>, and anything <b>printed on the screen</b>.</span>
</figure>
<figure>
<svg viewBox="0 0 200 104" role="img" aria-label="A rectangle">
<rect class="sh" x="22" y="16" width="156" height="72" rx="4"></rect>
<text class="in" x="100" y="59">X &#8592; X + 1</text>
</svg>
<b class="nm">Rectangle</b>
<span class="ds">A step the program <b>works out on its own</b> — a sum, or storing a value.</span>
</figure>
<figure>
<svg viewBox="0 0 200 104" role="img" aria-label="A diamond">
<polygon class="sh" points="100,10 188,52 100,94 12,52"></polygon>
<text class="in" x="100" y="59">X &gt; 9 ?</text>
</svg>
<b class="nm">Diamond</b>
<span class="ds">A question with a <b>yes / no</b> answer. The only shape with <b>two</b> ways out.</span>
</figure>
<figure>
<svg viewBox="0 0 200 104" role="img" aria-label="An arrow">
<line x1="22" y1="52" x2="150" y2="52" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"></line>
<polygon points="146,32 186,52 146,72" fill="var(--accent)"></polygon>
</svg>
<b class="nm">Arrow</b>
<span class="ds">Joins one shape to the next. The head shows <b>which way</b> the logic runs.</span>
</figure>
<figure class="no">
<svg viewBox="0 0 200 104" role="img" aria-label="A circle">
<circle class="sh" cx="100" cy="52" r="40"></circle>
<text class="in" x="100" y="58">A</text>
</svg>
<b class="nm">Circle — not one of his five</b>
<span class="ds">A <b>connector</b>, for a chart too long for one page. You will not need it. <b>Start and stop are ovals, not circles.</b></span>
</figure>
</div>

### Which shape? Ask what the step *does*

Work from the step, never from the shape. This is the table to have in your head
when the pen is already on the paper:

| What the step does | Shape | Written inside it |
|---|---|---|
| begins or ends the program | **oval** | `START`, `STOP` |
| asks the person for a value | **parallelogram** | `READ MARK`, `INPUT M1` |
| puts something on the screen | **parallelogram** | `PRINT TOTAL` |
| works a value out, or stores one | **rectangle** | `TOTAL <-- TOTAL + MARK` |
| asks a question with a yes/no answer | **diamond** | `IS MARK >= 10 ?` |
| connects one shape to the next | **arrow** | nothing |

If you only remember one line, remember this one:

> **Did a person type it, or read it off the screen? Parallelogram.**
> **Is the program choosing between two ways to go? Diamond.**
> **Anything else the program does by itself? Rectangle.**

### All five together

The same short algorithm drawn properly, so you can see each shape doing its own
job. Every arrow has a head, the diamond's two exits are both labelled, and the
one running back **up** the left-hand side is the loop.

<style>
.flowdemo{margin:0 0 22px;background:var(--surface);border:1px solid var(--line);
  border-radius:var(--r);padding:18px 12px}
.flowdemo svg{display:block;width:100%;max-width:440px;height:auto;margin:0 auto}
.flowdemo .s{fill:var(--accent-soft);stroke:var(--accent);stroke-width:2.5;stroke-linejoin:round}
.flowdemo .t{fill:var(--ink);font-family:var(--mono),monospace;font-size:13px;text-anchor:middle}
.flowdemo .f{stroke:var(--ink-2);stroke-width:2.2;fill:none}
.flowdemo .yn{fill:var(--ink-3);font-family:var(--mono),monospace;font-size:11.5px;font-weight:700}
</style>
<div class="flowdemo">
<svg viewBox="0 0 440 548" role="img" aria-label="A flowchart using all five shapes, with a loop arrow going back up the left side">
<defs>
<marker id="ah" markerWidth="9" markerHeight="7" refX="7.6" refY="3.2" orient="auto">
<path d="M0,0 L8,3.2 L0,6.4 z" fill="var(--ink-2)"></path>
</marker>
</defs>
<ellipse class="s" cx="210" cy="30" rx="58" ry="22"></ellipse>
<text class="t" x="210" y="35">START</text>
<path class="f" marker-end="url(#ah)" d="M210,52 L210,84"></path>
<rect class="s" x="128" y="86" width="164" height="42" rx="3"></rect>
<text class="t" x="210" y="112">TOTAL &#8592; 0</text>
<path class="f" marker-end="url(#ah)" d="M210,128 L210,160"></path>
<polygon class="s" points="146,162 300,162 274,204 120,204"></polygon>
<text class="t" x="210" y="188">READ MARK</text>
<path class="f" marker-end="url(#ah)" d="M210,204 L210,238"></path>
<polygon class="s" points="210,240 336,292 210,344 84,292"></polygon>
<text class="t" x="210" y="297">MARK &gt; 0 ?</text>
<text class="yn" x="222" y="364">yes</text>
<path class="f" marker-end="url(#ah)" d="M210,344 L210,384"></path>
<rect class="s" x="110" y="386" width="200" height="42" rx="3"></rect>
<text class="t" x="210" y="412">TOTAL &#8592; TOTAL + MARK</text>
<text class="yn" x="344" y="286">no</text>
<path class="f" marker-end="url(#ah)" d="M336,292 L400,292 L400,480 L300,480"></path>
<polygon class="s" points="158,460 298,460 274,500 134,500"></polygon>
<text class="t" x="216" y="485">PRINT TOTAL</text>
<path class="f" marker-end="url(#ah)" d="M216,500 L216,518"></path>
<ellipse class="s" cx="216" cy="534" rx="50" ry="20"></ellipse>
<text class="t" x="216" y="539">STOP</text>
<path class="f" marker-end="url(#ah)" d="M110,407 L44,407 L44,183 L120,183"></path>
<text class="yn" x="8" y="300">loop</text>
</svg>
</div>

That arrow down the left is doing the whole job of a loop. **There is no loop
shape** — a loop is a diamond, a body, and an arrow going back up to the diamond.

### Five mistakes that cost marks

**1. Assignment is a rectangle, not a parallelogram.** `TOTAL <-- 0` feels like it
belongs with the inputs, because it is putting a value somewhere. It does not.
Nobody typed it and nobody saw it, so it is a step the program works out on its
own: rectangle. Same for `I <-- 1` before a loop and `I <-- I + 1` at the end of one.

**2. A loop has no shape of its own.** It is drawn above. If your arrow does not go
*back* to an earlier shape, you have not drawn a loop.

**3. There is no square.** The process symbol is a **rectangle**, drawn wider than
it is tall. One that happens to come out square is not wrong — but when you name it
in writing, call it a rectangle. "Square" is not on his slide.

**4. There is no circle either, and this is the trap.** A circle is a *connector*,
for a chart too long to fit on one page: a letter in a circle at the bottom, the
same letter in a circle at the top of the next column. His slides never use one and
Partial I is never that long. What matters is the other half of it — **start and
stop are ovals.** A circle drawn where an oval belongs loses the mark.

**5. Nothing may be left hanging.** Every shape needs an arrow in and an arrow out
— the only exceptions are START, which has none coming in, and STOP, which has
none going out. A box floating on its own with no line to it loses a mark even
when the logic around it is perfect. It takes ten seconds to check: put your pen
on START and trace every route to a STOP without lifting it.

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
