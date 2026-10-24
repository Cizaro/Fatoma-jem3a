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
},

{
  id: "q7", set: "Set II · decisions and tables", n: "7",
  title: "Four students, one form, one table",
  context: `Both loops in one file. One builds the form before anybody has
    typed anything; the other reads what they typed back out. The boxes are
    named <code>username1</code> to <code>username4</code> by the first loop,
    and the second loop asks for those same names back.`,
  task: `Print a form with a username box and a grade box for each of four
    students, and when it is submitted, print their names and grades in a
    table.`,
  reqs: [
    "A <b>loop</b> builds the boxes &mdash; not eight typed-out <code>echo</code> lines",
    "The boxes are named <code>username1</code>&hellip;<code>username4</code> and <code>grade1</code>&hellip;<code>grade4</code>",
    "A second loop reads <code>$_POST[\"username\" . $i]</code> and prints one table row per student",
    "Before Submit is pressed: the form only. <b>No heading and no table.</b>",
    "The table heading row is printed <b>once</b>"
  ],
  inputs: "Nothing on the first visit. Then four names and four grades.",
  runs: [
    { vars: {}, label: "first visit, nothing typed yet",
      has: ["username1", "username4", "grade1", "grade4"],
      counts: [{ text: "<table", times: 0 }, { text: "<th", times: 0 },
               { text: "name=\"username", times: 4 }, { text: "name=\"grade", times: 4 }] },
    { vars: { _POST: { S:"1", username1:"Ali", grade1:"18", username2:"Sara", grade2:"15",
                       username3:"Lina", grade3:"12", username4:"Nour", grade4:"19" } },
      label: "four students submitted",
      has: ["<table", "</table>", "Ali", "18", "Sara", "15", "Lina", "12", "Nour", "19"],
      counts: [{ text: "<th", times: 2 }, { text: "<tr", times: 5 }] },
    { vars: { _POST: { S:"1", username1:"Zara", grade1:"7", username2:"Omar", grade2:"20",
                       username3:"Rim", grade3:"11", username4:"Jad", grade4:"16" } },
      label: "four different students",
      has: ["Zara", "7", "Omar", "20", "Rim", "11", "Jad", "16"],
      counts: [{ text: "<tr", times: 5 }] }
  ],
  code: [
    { re: /for\s*\(|while\s*\(/, msg: "Use a loop to build the boxes" },
    /* a "for" anywhere satisfied the rule above, including the one that
       reads the results back - so this checks the FORM was not typed out */
    { noRe: /username1[\s\S]{0,400}username2/,
      msg: "Build the names from the loop counter, not one typed line per student" },
    { re: /isset\s*\(/, msg: "isset() is what tells you whether Submit was pressed" }
  ],
  starter: `<?php
// the form - one pair of boxes per student
for ($i = 1; $i <= 4; $i++) {

}

// the results, only once Submit has been pressed
if (isset($_POST["S"])) {

}
`,
  sol: `<?php
// ---- the form: a loop builds four pairs of boxes ----
for ($i = 1; $i <= 4; $i++) {
    echo '<input type="text" name="username' . $i . '" placeholder="Username ' . $i . '"><br>';
    echo '<input type="text" name="grade' . $i . '" placeholder="Grade ' . $i . '"><br><br>';
}

// ---- the results: EVERYTHING about them lives inside the if ----
if (isset($_POST["S"])) {

    echo "<h1>Results</h1>";
    echo '<table border="1">';
    echo "<tr><th>Username</th><th>Grade</th></tr>";

    for ($i = 1; $i <= 4; $i++) {
        $username = $_POST["username" . $i];
        $grade    = $_POST["grade" . $i];

        echo "<tr>";
        echo "<td>" . $username . "</td>";
        echo "<td>" . $grade . "</td>";
        echo "</tr>";
    }

    echo "</table>";
}
`,
  why: `<b>The heading and the opening <code>&lt;table&gt;</code> go inside the
    <code>if</code>, with everything else about the results.</b> Left outside,
    they print on the very first visit - so the page opens with the word
    Results and a table that has a header row, no rows, and no closing tag,
    before anybody has typed anything. The closing <code>&lt;/table&gt;</code>
    is inside the if, so it is not even valid HTML until Submit is pressed.
    The rule: if it is part of the answer, it belongs with the answer.
    <br><br><b>The two loops have to agree about the names.</b> The first one
    writes <code>name="username1"</code>; the second asks for
    <code>$_POST["username" . $i]</code>. Change the spelling in one and the
    other quietly reads nothing - no error, just empty cells.
    <br><br><b><code>$i &lt;= 4</code> gives four students.</b>
    <code>$i &lt; 5</code> gives the same four and reads as though it means
    five. Say the number you mean.`
},

{
  id: "q8", set: "Set II · decisions and tables", n: "8",
  title: "Hello world, N times",
  context: `The smallest loop there is, and the one worth getting exactly
    right before any of the others. One number in, the same line out that
    many times. Nothing is calculated &mdash; the only question is how many
    times the loop runs.`,
  task: `Read a number N from the form and print <code>Hello world</code>
    N times, one per line.`,
  reqs: [
    "Read <code>$_POST[\"n\"]</code>",
    "Use a <b>loop</b> &mdash; not N copies of the same <code>echo</code>",
    "Print <code>Hello world</code> exactly N times, each on its own line",
    "If N is missing, not a number, or outside 1 to 100, print exactly:<br><code>Please enter a number from 1 to 100.</code> and nothing else"
  ],
  inputs: "One number box and a Show button.",
  runs: [
    { vars: { _POST: { n: "3", show: "1" } }, label: "N = 3",
      counts: [{ text: "Hello world", times: 3 }] },
    { vars: { _POST: { n: "1", show: "1" } }, label: "N = 1",
      counts: [{ text: "Hello world", times: 1 }] },
    { vars: { _POST: { n: "7", show: "1" } }, label: "N = 7",
      counts: [{ text: "Hello world", times: 7 }] },
    { vars: { _POST: { n: "0", show: "1" } }, label: "N = 0",
      out: "Please enter a number from 1 to 100." },
    { vars: { _POST: { n: "500", show: "1" } }, label: "N = 500",
      out: "Please enter a number from 1 to 100." },
    { vars: { _POST: { n: "abc", show: "1" } }, label: "letters typed",
      out: "Please enter a number from 1 to 100." },
    { vars: { _POST: { n: "", show: "1" } }, label: "empty box",
      out: "Please enter a number from 1 to 100." }
  ],
  code: [
    { re: /for\s*\(|while\s*\(/, msg: "Use a loop" },
    { re: /is_numeric\s*\(/, msg: "Check it is a number before you count with it" }
  ],
  starter: "<?php\n$n = $_POST[\"n\"];\n\nif (!is_numeric($n) || $n < 1 || $n > 100) {\n    echo \"Please enter a number from 1 to 100.\";\n} else {\n\n}\n",
  sol: `<?php
$n = $_POST["n"];

if (!is_numeric($n) || $n < 1 || $n > 100) {
    echo "Please enter a number from 1 to 100.";
} else {
    for ($i = 1; $i <= $n; $i++) {
        echo "Hello world<br>";
    }
}
`,
  why: `<b>The loop runs <code>$i &lt;= $n</code>, not <code>$i &lt; $n</code>.</b>
    Starting at 1 and stopping at <i>less than</i> N gives N&minus;1 lines, and
    with N = 3 you get two &mdash; close enough to look right and wrong every
    time. Start at 1 and go up to and including N, or start at 0 and stop
    below N. Pick one and say it out loud while you write it.
    <br><br><b>The upper limit is not fussiness.</b> Without it, someone types
    1000000 and the page tries to print a million lines. Any number that
    decides how many times a loop runs and comes from outside has to be
    checked before the loop sees it &mdash; this is the smallest example of
    that rule you will ever write.
    <br><br><b>An empty box is not zero.</b> It arrives as <code>""</code>, and
    in PHP 8 comparing it with <code>&lt; 1</code> is not the error-free thing
    you would hope; <code>is_numeric</code> is checked <i>first</i>, and the
    <code>||</code> stops as soon as it is true, so the comparisons never run
    on something that is not a number.`
}

];
