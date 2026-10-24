/* ---------------------------------------------------------------
   Set II — three inputs, a decision, and a generated table.

   Built from Problem IV of the Main Problems sheet (the quadratic
   solver) and from the three mistakes that turned up in her first
   attempt at it: brackets round the whole numerator, 2*a and not
   2*b, and an empty box crashing the arithmetic.

   The last three are the ones that put a loop, a form and an HTML
   table in the same file, which is the shape every "generate a
   table from what the user typed" question takes.

   Same fields as problems-data.js; see the comment there.
--------------------------------------------------------------- */
const PROBLEMS_SET2 = [

/* ===================== the sheet's own question ===================== */
{
  id: "q1", set: "Set II · decisions and tables", n: "1",
  title: "Solve the quadratic equation",
  context: `Problem IV from the Main Problems sheet. Three numbers in, and
    the answer is not one formula but a <b>choice</b> of three, decided by a
    number you work out first.`,
  task: `Read the two coefficients and the constant. Work out the
    discriminant D = b&sup2; &minus; 4ac, and print the solutions &mdash; two,
    one, or none.`,
  reqs: [
    "Read <code>a</code>, <code>b</code> and <code>c</code> from <code>$_POST</code>",
    "D = b&sup2; &minus; 4ac",
    "D &gt; 0 &rarr; <code>Two solutions: 3 and 2</code>",
    "D = 0 &rarr; <code>One solution: 2</code>",
    "D &lt; 0 &rarr; <code>No real solution</code>",
    "If <code>a</code> is 0 it is not a quadratic at all &rarr; <code>Not a quadratic equation.</code>"
  ],
  inputs: "Three number boxes and a Solve button.",
  runs: [
    { vars: { _POST: { a: "1", b: "-5", c: "6", solve: "1" } }, label: "x² − 5x + 6",
      out: "Two solutions: 3 and 2" },
    { vars: { _POST: { a: "2", b: "-7", c: "3", solve: "1" } }, label: "2x² − 7x + 3",
      out: "Two solutions: 3 and 0.5" },
    { vars: { _POST: { a: "1", b: "-4", c: "4", solve: "1" } }, label: "x² − 4x + 4  (D = 0)",
      out: "One solution: 2" },
    { vars: { _POST: { a: "1", b: "2", c: "5", solve: "1" } }, label: "x² + 2x + 5  (D < 0)",
      out: "No real solution" },
    { vars: { _POST: { a: "0", b: "4", c: "8", solve: "1" } }, label: "a = 0",
      out: "Not a quadratic equation." }
  ],
  code: [
    { re: /sqrt\s*\(/, msg: "Use sqrt() for the square root" },
    { re: /elseif|else\s+if/, msg: "Three outcomes means a ladder, not three separate ifs" }
  ],
  starter: `<?php\n$a = $_POST["a"];\n$b = $_POST["b"];\n$c = $_POST["c"];\n\n$D = $b * $b - 4 * $a * $c;\n\n`,
  sol: `<?php
$a = $_POST["a"];
$b = $_POST["b"];
$c = $_POST["c"];

if ($a == 0) {
    echo "Not a quadratic equation.";
} else {
    $D = $b * $b - 4 * $a * $c;

    if ($D > 0) {
        $x1 = (-$b + sqrt($D)) / (2 * $a);
        $x2 = (-$b - sqrt($D)) / (2 * $a);
        echo "Two solutions: " . $x1 . " and " . $x2;
    } elseif ($D == 0) {
        $x = -$b / (2 * $a);
        echo "One solution: " . $x;
    } else {
        echo "No real solution";
    }
}
`,
  why: `Three things decide whether this works, and all three are easy to get
    wrong by one character.
    <br><br><b>Brackets round the whole top.</b>
    <code>(-$b + sqrt($D)) / (2 * $a)</code>. Written as
    <code>(-$b + sqrt($D) / 2 * $a)</code> it divides only the square root,
    and x² − 5x + 6 comes out as 5.5 and 4.5 instead of 3 and 2 — numbers
    that look plausible enough to hand in.
    <br><br><b>2 &times; a, not 2 &times; b.</b> In the D = 0 branch especially,
    where <code>-$b / (2 * $b)</code> always gives −0.5 whatever you type.
    <br><br><b>a = 0 first.</b> If a is zero there is no x² term, it is not a
    quadratic, and dividing by 2a divides by zero. Check it before anything
    else touches it.`
},

/* ===================== same shape, new story ===================== */
{
  id: "q2", set: "Set II · decisions and tables", n: "2",
  title: "What kind of triangle is it?",
  context: `Three numbers in, and again the answer is a choice rather than a
    formula. Before you can classify it you have to decide whether it is a
    triangle at all.`,
  task: `Read three side lengths. Say whether they make a triangle, and if
    they do, which kind.`,
  reqs: [
    "Read <code>a</code>, <code>b</code>, <code>c</code> from <code>$_POST</code>",
    "Three sides make a triangle only if every two of them add up to more than the third",
    "All three equal &rarr; <code>Triangle type: Equilateral</code>",
    "Exactly two equal &rarr; <code>Triangle type: Isosceles</code>",
    "All different &rarr; <code>Triangle type: Scalene</code>",
    "Otherwise &rarr; <code>Not a triangle</code>"
  ],
  inputs: "Three number boxes and a Check button.",
  runs: [
    { vars: { _POST: { a: "3", b: "3", c: "3", check: "1" } }, label: "3, 3, 3",
      out: "Triangle type: Equilateral" },
    { vars: { _POST: { a: "3", b: "3", c: "5", check: "1" } }, label: "3, 3, 5",
      out: "Triangle type: Isosceles" },
    { vars: { _POST: { a: "3", b: "4", c: "5", check: "1" } }, label: "3, 4, 5",
      out: "Triangle type: Scalene" },
    { vars: { _POST: { a: "1", b: "2", c: "9", check: "1" } }, label: "1, 2, 9",
      out: "Not a triangle" },
    { vars: { _POST: { a: "1", b: "2", c: "3", check: "1" } }, label: "1, 2, 3  (flat)",
      out: "Not a triangle" }
  ],
  code: [{ re: /elseif|else\s+if/, msg: "Use a ladder for the three kinds" }],
  starter: `<?php\n$a = $_POST["a"];\n$b = $_POST["b"];\n$c = $_POST["c"];\n\n`,
  sol: `<?php
$a = $_POST["a"];
$b = $_POST["b"];
$c = $_POST["c"];

if ($a + $b <= $c || $a + $c <= $b || $b + $c <= $a) {
    echo "Not a triangle";
} elseif ($a == $b && $b == $c) {
    echo "Triangle type: Equilateral";
} elseif ($a == $b || $b == $c || $a == $c) {
    echo "Triangle type: Isosceles";
} else {
    echo "Triangle type: Scalene";
}
`,
  why: `1, 2, 3 is in the tests on purpose. The two short sides add up to
    <i>exactly</i> the long one, so the "triangle" is a flat line. That is why
    the test is <code>&lt;=</code> and not <code>&lt;</code> — one character,
    and the only input that shows the difference.
    <br><br>Order matters again: equilateral is tested before isosceles,
    because 3, 3, 3 also satisfies "two are equal". Written the other way
    round, nothing is ever equilateral.`
},

{
  id: "q3", set: "Set II · decisions and tables", n: "3",
  title: "Solve ax + b = 0",
  context: `The quadratic's little brother, and the one where the awkward case
    is the whole question.`,
  task: `Read a and b and solve ax + b = 0.`,
  reqs: [
    "Read <code>a</code> and <code>b</code> from <code>$_POST</code>",
    "Normally &rarr; <code>x = 4</code>",
    "a is 0 and b is not &rarr; <code>No solution</code>",
    "a is 0 and b is 0 &rarr; <code>Infinite solutions</code>"
  ],
  inputs: "Two number boxes and a Solve button.",
  runs: [
    { vars: { _POST: { a: "2", b: "-8", solve: "1" } }, label: "2x − 8 = 0", out: "x = 4" },
    { vars: { _POST: { a: "5", b: "0", solve: "1" } }, label: "5x = 0", out: "x = 0" },
    { vars: { _POST: { a: "0", b: "5", solve: "1" } }, label: "0x + 5 = 0", out: "No solution" },
    { vars: { _POST: { a: "0", b: "0", solve: "1" } }, label: "0x + 0 = 0", out: "Infinite solutions" }
  ],
  code: [{ re: /\$a\s*==\s*0/, msg: "Check whether a is zero before you divide by it" }],
  starter: `<?php\n$a = $_POST["a"];\n$b = $_POST["b"];\n\n`,
  sol: `<?php
$a = $_POST["a"];
$b = $_POST["b"];

if ($a == 0 && $b == 0) {
    echo "Infinite solutions";
} elseif ($a == 0) {
    echo "No solution";
} else {
    echo "x = " . (-$b / $a);
}
`,
  why: `Dividing by a is the obvious move and it is the one that breaks.
    <code>a = 0</code> has to be answered before the division exists in the
    code at all — not after, and not inside the same line.
    <br><br>Both zero-cases are tested because they give opposite answers:
    0x + 5 = 0 can never be true, 0x + 0 = 0 is always true. Same
    <code>a == 0</code>, different reply.`
},

/* ============ the form, the loop and the table in one file ============ */
{
  id: "q4", set: "Set II · decisions and tables", n: "4",
  title: "Times table, as many rows as asked for",
  context: `The one that puts everything together: a form takes what the user
    typed, a loop runs that many times, and every pass prints a row of an HTML
    table. Nearly every "show me a table of..." question is this.`,
  task: `Read a number and a row count. Build an HTML table with that many
    rows of that number's times table.`,
  reqs: [
    "Read <code>$_POST[\"n\"]</code> and <code>$_POST[\"rows\"]</code>",
    "Use a <b>loop</b> — not one <code>echo</code> per row",
    "Output a real <code>&lt;table&gt;</code>, header row printed <b>once</b>, outside the loop",
    "Each row reads <code>7 x 3 = 21</code>"
  ],
  inputs: "A number box, a rows box, and a Build button.",
  runs: [
    { vars: { _POST: { n: "7", rows: "10", build: "1" } }, label: "7, ten rows",
      has: ["<table", "</table>", "7 x 1 = 7", "7 x 3 = 21", "7 x 10 = 70"],
      counts: [{ text: "<th", times: 2 }, { text: "<tr", times: 11 }, { text: "<table", times: 1 }] },
    { vars: { _POST: { n: "3", rows: "4", build: "1" } }, label: "3, four rows",
      has: ["<table", "3 x 1 = 3", "3 x 4 = 12"],
      counts: [{ text: "<tr", times: 5 }] }
  ],
  code: [
    { re: /for\s*\(|while\s*\(|foreach\s*\(/, msg: "Use a loop" },
    { re: /\$_POST\s*\[\s*["']rows["']\s*\]/, msg: "The number of rows must come from the form" }
  ],
  starter: `<?php\n$n    = $_POST["n"];\n$rows = $_POST["rows"];\n\necho "<table border='1'>";\necho "<tr><th>Calculation</th><th>Answer</th></tr>";\n\n\necho "</table>";\n`,
  sol: `<?php
$n    = $_POST["n"];
$rows = $_POST["rows"];

echo "<table border='1'>";
echo "<tr><th>Calculation</th><th>Answer</th></tr>";

for ($i = 1; $i <= $rows; $i++) {
    echo "<tr>";
    echo "<td>" . $n . " x " . $i . " = " . ($n * $i) . "</td>";
    echo "<td>" . ($n * $i) . "</td>";
    echo "</tr>";
}

echo "</table>";
`,
  why: `Three pieces, each already familiar, used together for the first time.
    <br><br><b>The form decides how long the loop runs.</b>
    <code>$i &lt;= $rows</code> — the stopping point is something the user
    typed, not a number you wrote. That one substitution is what makes it a
    program rather than a page.
    <br><br><b>The header row is printed once, outside the loop.</b> Inside it,
    you get a header above every row. It is the first thing to check when a
    generated table looks strange.
    <br><br><b>Open the table before the loop and close it after.</b> Opening
    it inside gives you ten separate one-row tables, which look almost right
    and are not.`
},

{
  id: "q5", set: "Set II · decisions and tables", n: "5",
  title: "Multiplication grid, any size",
  context: `The same idea with a loop inside a loop — the outer one walks the
    rows, the inner one walks the cells across a row.`,
  task: `Read a width and a height and build that grid, with each cell holding
    row &times; column.`,
  reqs: [
    "Read <code>$_POST[\"rows\"]</code> and <code>$_POST[\"cols\"]</code>",
    "One loop inside another",
    "An HTML <code>&lt;table&gt;</code>, one <code>&lt;tr&gt;</code> per row"
  ],
  inputs: "A rows box, a columns box, and a Build button.",
  runs: [
    { vars: { _POST: { rows: "3", cols: "4", build: "1" } }, label: "3 by 4",
      has: ["<table", "<td>12</td>", "<td>1</td>", "<td>6</td>"],
      counts: [{ text: "<tr", times: 3 }, { text: "<td", times: 12 }] },
    { vars: { _POST: { rows: "2", cols: "2", build: "1" } }, label: "2 by 2",
      has: ["<td>4</td>", "<td>2</td>"],
      counts: [{ text: "<tr", times: 2 }, { text: "<td", times: 4 }] }
  ],
  code: [{ re: /(for|while)[\s\S]*(for|while)/, msg: "This one needs a loop inside a loop" }],
  starter: `<?php\n$rows = $_POST["rows"];\n$cols = $_POST["cols"];\n\necho "<table border='1'>";\n\n\necho "</table>";\n`,
  sol: `<?php
$rows = $_POST["rows"];
$cols = $_POST["cols"];

echo "<table border='1'>";

for ($r = 1; $r <= $rows; $r++) {
    echo "<tr>";
    for ($c = 1; $c <= $cols; $c++) {
        echo "<td>" . ($r * $c) . "</td>";
    }
    echo "</tr>";
}

echo "</table>";
`,
  why: `The rule that keeps nested loops straight: <b>whatever the outer loop
    opens, the outer loop closes.</b> <code>&lt;tr&gt;</code> belongs to the
    outer loop, <code>&lt;td&gt;</code> to the inner one. Put the
    <code>&lt;/tr&gt;</code> inside the inner loop and every cell becomes its
    own row.
    <br><br>Two counters need two names. <code>$r</code> and <code>$c</code>
    rather than <code>$i</code> twice — reusing the same name makes the inner
    loop destroy the outer one's place and the page hangs.`
},

{
  id: "q6", set: "Set II · decisions and tables", n: "6",
  title: "Savings, year by year",
  context: `A table where each row depends on the row above it, which is what
    makes it worth more than a times table. The balance carries forward.`,
  task: `Read an amount, an interest rate and a number of years. Print one row
    per year showing the interest earned and the balance after it.`,
  reqs: [
    "Read <code>amount</code>, <code>rate</code> and <code>years</code> from <code>$_POST</code>",
    "Each year: interest = balance &times; rate &divide; 100, then balance = balance + interest",
    "Money to two decimal places with <code>number_format()</code>",
    "One <code>&lt;table&gt;</code>, one row per year"
  ],
  inputs: "Three boxes and a Show button.",
  runs: [
    { vars: { _POST: { amount: "1000", rate: "5", years: "3", show: "1" } },
      label: "1000 at 5% for 3 years",
      has: ["<table", "<td>50.00</td>", "<td>1,050.00</td>", "<td>52.50</td>",
            "<td>1,102.50</td>", "<td>55.13</td>", "<td>1,157.63</td>"],
      counts: [{ text: "<tr", times: 4 }] },
    { vars: { _POST: { amount: "500", rate: "10", years: "2", show: "1" } },
      label: "500 at 10% for 2 years",
      has: ["<td>50.00</td>", "<td>550.00</td>", "<td>55.00</td>", "<td>605.00</td>"] }
  ],
  code: [
    { re: /for\s*\(|while\s*\(/, msg: "Use a loop" },
    { re: /number_format\s*\(/, msg: "Money needs number_format so the pennies always show" }
  ],
  starter: `<?php\n$balance = $_POST["amount"];\n$rate    = $_POST["rate"];\n$years   = $_POST["years"];\n\necho "<table border='1'>";\necho "<tr><th>Year</th><th>Interest</th><th>Balance</th></tr>";\n\n\necho "</table>";\n`,
  sol: `<?php
$balance = $_POST["amount"];
$rate    = $_POST["rate"];
$years   = $_POST["years"];

echo "<table border='1'>";
echo "<tr><th>Year</th><th>Interest</th><th>Balance</th></tr>";

for ($y = 1; $y <= $years; $y++) {
    $interest = $balance * $rate / 100;
    $balance  = $balance + $interest;

    echo "<tr>";
    echo "<td>" . $y . "</td>";
    echo "<td>" . number_format($interest, 2) . "</td>";
    echo "<td>" . number_format($balance, 2) . "</td>";
    echo "</tr>";
}

echo "</table>";
`,
  why: `<b>$balance lives outside the loop.</b> That is the whole lesson. It is
    set before the loop starts and changed on every pass, so year 2 earns
    interest on year 1's balance — which is what compound interest means.
    Declare it inside the loop and it resets every year, and you have
    reinvented simple interest without noticing.
    <br><br>Notice the interest is worked out <i>before</i> the balance
    changes. Swap those two lines and every year earns interest on money it
    has not got yet.
    <br><br><code>number_format</code> and not <code>round</code>: 1157.625
    has to print as 1,157.63, and a balance that shows as 1157.6 looks broken
    on a bank page.`
}

];
