# Mini-quiz — Lesson 0A: Algorithms, Flowcharts and Pseudocode
**8 questions · 5 minutes · close the lesson file first**

This is MIT320 Lesson 1 material. No PHP needed for any of it.

Score: ____ / 8

---

**1.** Define an algorithm in one sentence.

______________________________________________________________

**2.** An algorithm must do three things to count as one. Name them.

1. ______________________________________
2. ______________________________________
3. ______________________________________

**3.** Name the six phases of the Program Development Life Cycle, in order.

1. ____________________  4. ____________________
2. ____________________  5. ____________________
3. ____________________  6. ____________________

**4.** Which flowchart symbol is used for each job?

| Job | Symbol |
|---|---|
| Start of the program | ____________ |
| Reading a number in | ____________ |
| Working out an average | ____________ |
| Deciding if A is bigger than B | ____________ |

**5.** Two rules every flowchart must obey. What are they?

______________________________________________________________

______________________________________________________________

**6.** Write this as pseudocode, using your lecturer's notation:

> Read two marks. Average them. If the average is 50 or more print "PASS",
> otherwise print "FAIL".

```
____________________________________________
____________________________________________
____________________________________________
____________________________________________
____________________________________________
```

**7.** In pseudocode, what is the difference between `<--` and `=` ?

______________________________________________________________

**8.** Trace Euclid's GCD for **A = 20, B = 12**. Fill the table in and give the answer.

| Step | X | Y |
|---|---|---|
| start | 20 | 12 |
| 1 | ____ | ____ |
| 2 | ____ | ____ |
| 3 | ____ | ____ |

GCD = ________

---

**7 or 8** — move on to `00-setup/` and start writing PHP.
**5 or 6** — re-read sections 4 and 5 of the lesson, then redo questions 6 and 8.
**under 5** — do the lesson again with a pen. This one is all recall, and recall needs writing,
not reading.

---

<details>
<summary><b>✅ Check your answers</b></summary>

<br>

**1.** A step-by-step procedure for solving a problem. *(Any wording with "steps" and
"solve a problem" in it is fine.)*

**2.** It must have data to work on · it must produce at least one result · it must
terminate after a finite number of steps.

**3.** Problem definition · Problem analysis · Algorithm development · Coding and
documentation · Testing and debugging · Maintenance.

**4.**

| Job | Symbol |
|---|---|
| Start of the program | oval |
| Reading a number in | parallelogram |
| Working out an average | rectangle |
| Deciding if A is bigger than B | diamond |

**5.** It must have a start and a stop · every step must be connected, nothing left hanging.

**6.** Any pseudocode with these four ideas, for example:

```
Input M1, M2
AVG <-- (M1 + M2) / 2
if (AVG >= 50) then
    Print "PASS"
else
    Print "FAIL"
endif
```

Marks are for: reading both marks, the arrow assignment, the condition the right way
round, and both branches. Note `>= 50` and `< 50` are both correct here, as long as the
PASS and FAIL are on the matching sides.

**7.** `<--` puts a value into a variable (assignment). `=` asks whether two things are
equal (comparison). In PHP they become `=` and `==`, which is the swap that catches
everybody.

**8.**

| Step | X | Y |
|---|---|---|
| start | 20 | 12 |
| 1 | 8 | 12 |
| 2 | 8 | 4 |
| 3 | 4 | 4 |

**GCD = 4.** Check: 4 divides 20 five times and 12 three times.

</details>
