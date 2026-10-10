/* ---------------------------------------------------------------
   Problem sets — the ones she was actually given.

   Set I is the problem sheet handed out in class. The last two come
   from the practice slides at the end of the Introduction to PHP
   deck. The wording is rewritten in plain language; the task and the
   constraints are the ones on the sheet.

   Each problem is:
     id, set, title      where it belongs and what it is called
     context, task       why anyone would write it, and what to write
     reqs[]              the rules it has to obey, shown as a checklist
     inputs              a plain sentence saying what the fake form sent
     runs[]              {vars, label, has[] | out}  - the code is run
                         once per entry, so a hard-coded answer that
                         happens to suit one input fails the next
     code[]              {re|noRe, msg} rules about the code itself
     starter, sol, why   the empty page, the worked answer, the reason
--------------------------------------------------------------- */
const PROBLEMS_SET1 = [

/* ============================ Problem 1 ============================ */
{
  id: "p1a", set: "Set I · your problem sheet", n: "1 · A",
  title: "Calculator — numbers written in the code",
  context: `A calculator is the smallest possible program that still has an
    input, a process and an output. You will write it three times, and only
    the <b>input</b> changes each time. That is the whole point of the problem.`,
  task: `Put two numbers in variables, work out all four results, and print
    them into the page.`,
  reqs: [
    "Two variables called <code>$num1</code> and <code>$num2</code>",
    "Print the sum, the product, the difference and the quotient",
    "Use these exact labels, one per line: <code>Sum: </code>, <code>Product: </code>, <code>Difference: </code>, <code>Quotient: </code>"
  ],
  inputs: "No form. The numbers are written by you, inside the code.",
  runs: [{ vars: {}, label: "no input",
           has: ["Sum: 110", "Product: 1000", "Difference: 90", "Quotient: 10"] }],
  code: [
    { re: /\$num1\s*=/, msg: "Put the first number in a variable called $num1" },
    { re: /\$num2\s*=/, msg: "Put the second number in a variable called $num2" },
    { re: /\$num1\s*[-+*\/]\s*\$num2|\$num1\s*\.|\(\s*\$num1/,
      msg: "Work the answers out from the variables — don't type 110 yourself" }
  ],
  starter: `<?php\n$num1 = 100;\n$num2 = 10;\n\n// your four lines here\n`,
  sol: `<?php
$num1 = 100;
$num2 = 10;

echo "Sum: " . ($num1 + $num2) . "<br>";
echo "Product: " . ($num1 * $num2) . "<br>";
echo "Difference: " . ($num1 - $num2) . "<br>";
echo "Quotient: " . ($num1 / $num2) . "<br>";
`,
  why: `The brackets around <code>($num1 + $num2)</code> are not decoration. In
    PHP 8 the dot binds <i>looser</i> than plus, so without them the line still
    works — but the habit saves you the day you write
    <code>"Total: " . $a + $b</code> and get something strange. Note the
    quotient is <code>10</code>, not <code>10.0</code>: PHP prints a float with
    no fractional part as a plain number.`
},

{
  id: "p1b", set: "Set I · your problem sheet", n: "1 · B",
  title: "Calculator — numbers from the address bar",
  context: `Same calculator, but now the numbers come from outside the file.
    This is the gentlest possible version of "a user gave me something":
    the values sit in the URL, where you can see them.`,
  task: `Read the two numbers out of the URL with <code>$_GET</code> and print
    the same four results.`,
  reqs: [
    "Read <code>$_GET[\"num1\"]</code> and <code>$_GET[\"num2\"]</code>",
    "Same four labels as before",
    "Nothing is typed into the page by you — the numbers only come from the URL"
  ],
  inputs: `The page was opened as
    <code>calc.php?num1=100&amp;num2=10</code>. Press <b>Check</b> and it is
    opened a second time with different numbers.`,
  runs: [
    { vars: { _GET: { num1: "100", num2: "10" } }, label: "?num1=100&num2=10",
      has: ["Sum: 110", "Product: 1000", "Difference: 90", "Quotient: 10"] },
    { vars: { _GET: { num1: "7", num2: "2" } }, label: "?num1=7&num2=2",
      has: ["Sum: 9", "Product: 14", "Difference: 5", "Quotient: 3.5"] }
  ],
  code: [
    { re: /\$_GET\s*\[/, msg: "The numbers must come from $_GET" },
    { noRe: /\$num1\s*=\s*\d/, msg: "Don't set $num1 to a number yourself — take it from $_GET" }
  ],
  starter: `<?php\n$num1 = $_GET["num1"];\n$num2 = $_GET["num2"];\n\n`,
  sol: `<?php
$num1 = $_GET["num1"];
$num2 = $_GET["num2"];

echo "Sum: " . ($num1 + $num2) . "<br>";
echo "Product: " . ($num1 * $num2) . "<br>";
echo "Difference: " . ($num1 - $num2) . "<br>";
echo "Quotient: " . ($num1 / $num2) . "<br>";
`,
  why: `<code>$_GET["num1"]</code> is the <b>string</b> "100", not the number
    100 — everything that arrives from a browser is text. PHP converts it the
    moment you do arithmetic on it, which is why <code>+</code> gives 110 and
    not "10010". That silent conversion is the thing to remember, because the
    day you want to join two numbers you will reach for <code>+</code> and get
    the wrong answer.`
},

{
  id: "p1c", set: "Set I · your problem sheet", n: "1 · C",
  title: "Calculator — a real form with four buttons",
  context: `The version from the lecture. The page shows a form with two
    boxes and four buttons — ADD, SUB, MULT, DIV — and which button was
    pressed decides the sum.`,
  task: `Read the two numbers from <code>$_POST</code>, work out which button
    was pressed, and print the one result.`,
  reqs: [
    "Read <code>$_POST[\"num1\"]</code> and <code>$_POST[\"num2\"]</code>",
    "Each button has its own name: <code>ADD</code>, <code>SUB</code>, <code>MULT</code>, <code>DIV</code>",
    "Use <code>isset()</code> to find which one arrived",
    "Print exactly <code>The result = 115</code> (with that number replaced by the real one)"
  ],
  inputs: `The form was filled in and one button was pressed. Check runs your
    code once for each of the four buttons.`,
  runs: [
    { vars: { _POST: { num1: "100", num2: "15", ADD: "ADD" } }, label: "100, 15, ADD",
      out: "The result = 115" },
    { vars: { _POST: { num1: "100", num2: "15", SUB: "SUB" } }, label: "100, 15, SUB",
      out: "The result = 85" },
    { vars: { _POST: { num1: "7", num2: "3", MULT: "MULT" } }, label: "7, 3, MULT",
      out: "The result = 21" },
    { vars: { _POST: { num1: "9", num2: "2", DIV: "DIV" } }, label: "9, 2, DIV",
      out: "The result = 4.5" }
  ],
  code: [
    { re: /isset\s*\(/, msg: "Use isset() to see which button was pressed" },
    { re: /\$_POST\s*\[/, msg: "The numbers must come from $_POST" }
  ],
  starter: `<?php\n$num1 = $_POST["num1"];\n$num2 = $_POST["num2"];\n\nif (isset($_POST["ADD"])) {\n\n}\n`,
  sol: `<?php
$num1 = $_POST["num1"];
$num2 = $_POST["num2"];

if (isset($_POST["ADD"])) {
    echo "The result = " . ($num1 + $num2);
} elseif (isset($_POST["SUB"])) {
    echo "The result = " . ($num1 - $num2);
} elseif (isset($_POST["MULT"])) {
    echo "The result = " . ($num1 * $num2);
} elseif (isset($_POST["DIV"])) {
    echo "The result = " . ($num1 / $num2);
}
`,
  why: `A submit button sends its <code>name</code> too, and only the button
    that was actually clicked is sent. So four buttons with four names means
    <code>isset()</code> can tell them apart without any extra field. This is
    exactly the <code>isset($_POST['Sum'])</code> line from the lecture — one
    button there, four here.
    <br><br>Watch the <code>elseif</code> chain: once one matches, the rest are
    skipped. Four separate <code>if</code> statements would also work here, but
    they would keep testing after the answer was already found.`
},

/* ============================ Problem 2 ============================ */
{
  id: "p2", set: "Set I · your problem sheet", n: "2",
  title: "The e-commerce price filter",
  context: `A shopping cart that points out the dearest and the cheapest
    item. Shops really do this — it is how "best value" badges work.`,
  task: `Five prices arrive from a form. Find the highest and the lowest, and
    print the highest in green and the lowest in red.`,
  reqs: [
    "Five prices: <code>$_POST[\"price1\"]</code> … <code>$_POST[\"price5\"]</code>",
    "<b>No <code>min()</code>, <code>max()</code> or <code>sort()</code>.</b> Only <code>if</code> and the comparison operators",
    "Highest printed in green, lowest printed in red, using a <code>style</code> attribute"
  ],
  inputs: "Five price boxes were filled in and the form was submitted.",
  runs: [
    { vars: { _POST: { price1: "14.50", price2: "3.99", price3: "27.00", price4: "8.25", price5: "19.99" } },
      label: "14.50, 3.99, 27.00, 8.25, 19.99", has: ["27", "3.99"], outRe: /green/i },
    { vars: { _POST: { price1: "5", price2: "100", price3: "2.5", price4: "60", price5: "1" } },
      label: "5, 100, 2.5, 60, 1  (lowest is last)", has: ["100", "1"], outRe: /red/i }
  ],
  code: [
    { noRe: /\b(min|max)\s*\(/, msg: "The sheet forbids min() and max() — use if and < >" },
    { noRe: /\b(sort|rsort|asort|arsort)\s*\(/, msg: "Sorting is not allowed either — compare them yourself" },
    { re: /if\s*\(/, msg: "You need if statements to do the comparing" }
  ],
  starter: `<?php\n$p1 = $_POST["price1"];\n$p2 = $_POST["price2"];\n$p3 = $_POST["price3"];\n$p4 = $_POST["price4"];\n$p5 = $_POST["price5"];\n\n$highest = $p1;\n$lowest  = $p1;\n\n// now compare the other four\n`,
  sol: `<?php
$p1 = $_POST["price1"];
$p2 = $_POST["price2"];
$p3 = $_POST["price3"];
$p4 = $_POST["price4"];
$p5 = $_POST["price5"];

// start by assuming the first one is both
$highest = $p1;
$lowest  = $p1;

if ($p2 > $highest) { $highest = $p2; }
if ($p3 > $highest) { $highest = $p3; }
if ($p4 > $highest) { $highest = $p4; }
if ($p5 > $highest) { $highest = $p5; }

if ($p2 < $lowest) { $lowest = $p2; }
if ($p3 < $lowest) { $lowest = $p3; }
if ($p4 < $lowest) { $lowest = $p4; }
if ($p5 < $lowest) { $lowest = $p5; }

echo "<p style='color: green'>Highest price: $" . $highest . "</p>";
echo "<p style='color: red'>Lowest price: $" . $lowest . "</p>";
`,
  why: `The trick is the two lines before any comparing:
    <code>$highest = $p1;</code> and <code>$lowest = $p1;</code>. You have to
    start somewhere, and the first price is the only honest starting guess.
    Starting <code>$highest = 0</code> looks tidier and is wrong the moment
    every price is negative; starting <code>$lowest = 0</code> is wrong
    <i>always</i>, because nothing is ever below zero.
    <br><br>This is the same shape as the <code>largest</code> exercise from
    Lesson 1 — hold the best answer so far, and replace it when you meet a
    better one. Five prices or five thousand, the idea does not change.`
},

/* ============================ Problem 3 ============================ */
{
  id: "p3", set: "Set I · your problem sheet", n: "3",
  title: "Smart-home smart plug",
  context: `A plug that gives appliances extra power on even-numbered days and
    saves energy on odd ones. Silly rule, real technique: almost every
    "every other one" problem in computing is this.`,
  task: `One number arrives — the day of the month. Say whether it is odd or
    even and print the matching status line.`,
  reqs: [
    "Read <code>$_POST[\"day\"]</code>",
    "Use the modulus operator <code>%</code> to decide",
    "Even → <code>Day 14 is EVEN: Extra power mode active!</code>",
    "Odd → <code>Day 15 is ODD: Eco-conservation mode active!</code>"
  ],
  inputs: "One number box. Check runs your code for three different days.",
  runs: [
    { vars: { _POST: { day: "14" } }, label: "day 14", out: "Day 14 is EVEN: Extra power mode active!" },
    { vars: { _POST: { day: "15" } }, label: "day 15", out: "Day 15 is ODD: Eco-conservation mode active!" },
    { vars: { _POST: { day: "30" } }, label: "day 30", out: "Day 30 is EVEN: Extra power mode active!" }
  ],
  code: [{ re: /%/, msg: "The sheet asks for the modulus operator %" }],
  starter: `<?php\n$day = $_POST["day"];\n\nif ($day % 2 == 0) {\n\n}\n`,
  sol: `<?php
$day = $_POST["day"];

if ($day % 2 == 0) {
    echo "Day $day is EVEN: Extra power mode active!";
} else {
    echo "Day $day is ODD: Eco-conservation mode active!";
}
`,
  why: `<code>%</code> gives the <b>remainder</b> after dividing.
    <code>14 % 2</code> is 0, <code>15 % 2</code> is 1. So "is it even?" is
    always <code>$n % 2 == 0</code>, and that one line is the whole problem.
    <br><br>Notice <code>"Day $day is EVEN"</code> — inside double quotes PHP
    swaps the variable for its value. Inside single quotes it would print the
    literal text <code>$day</code>, which is the most common first-week bug in
    the language.`
},

/* ============================ Problem 4 ============================ */
{
  id: "p4", set: "Set I · your problem sheet", n: "4",
  title: "The data science dashboard",
  context: `A dashboard panel showing each number alongside its square and its
    cube. No one types anything — it draws itself when the page loads.`,
  task: `For every whole number from 0 to 5, work out N² and N³ and put the
    three values in a row of an HTML table.`,
  reqs: [
    "No input at all — it runs on its own",
    "Use a <b>loop</b>, not six copies of the same line",
    "Output a real <code>&lt;table&gt;</code> with a row per number"
  ],
  inputs: "Nothing. This one takes no input.",
  runs: [{ vars: {}, label: "page load",
           has: ["<table", "</table>", "125", "64", "27", "16"], outRe: /<tr/i }],
  code: [{ re: /for\s*\(|while\s*\(|foreach\s*\(/, msg: "Use a loop — the sheet asks for one" }],
  starter: `<?php\necho "<table border='1'>";\necho "<tr><th>N</th><th>N squared</th><th>N cubed</th></tr>";\n\nfor ($n = 0; $n <= 5; $n++) {\n\n}\n\necho "</table>";\n`,
  sol: `<?php
echo "<table border='1'>";
echo "<tr><th>N</th><th>N squared</th><th>N cubed</th></tr>";

for ($n = 0; $n <= 5; $n++) {
    echo "<tr>";
    echo "<td>" . $n . "</td>";
    echo "<td>" . ($n * $n) . "</td>";
    echo "<td>" . ($n * $n * $n) . "</td>";
    echo "</tr>";
}

echo "</table>";
`,
  why: `The header row is printed <b>once, outside</b> the loop, and the data
    rows <b>inside</b> it. Getting that wrong gives you six header rows, and it
    is the first thing to check when a generated table looks odd.
    <br><br><code>$n * $n * $n</code> or <code>pow($n, 3)</code> — both are
    fine. The loop running from 0 means the first row really is all zeros,
    which is correct and looks like a bug until you check.`
},

/* ============================ Problem 5 ============================ */
{
  id: "p5", set: "Set I · your problem sheet", n: "5",
  title: "Cloud storage pricing tiers",
  context: `A pricing page that works out what each tier includes. Exactly the
    same machinery as the last problem, which is why it follows it — if you
    can do one, this is ten minutes.`,
  task: `For node counts 1 to 6, work out 10 × N gigabytes of storage,
    100 × N terabytes of bandwidth and 1000 × N API requests, in a table.`,
  reqs: [
    "No input — it runs on page load",
    "Loop from 1 to 6",
    "Three calculated columns in an HTML <code>&lt;table&gt;</code>"
  ],
  inputs: "Nothing. This one takes no input.",
  runs: [{ vars: {}, label: "page load",
           has: ["<table", "</table>", "60", "600", "6000", "10", "100", "1000"], outRe: /<tr/i }],
  code: [{ re: /for\s*\(|while\s*\(|foreach\s*\(/, msg: "Use a loop" }],
  starter: `<?php\necho "<table border='1'>";\necho "<tr><th>Nodes</th><th>Storage GB</th><th>Bandwidth TB</th><th>API requests</th></tr>";\n\nfor ($n = 1; $n <= 6; $n++) {\n\n}\n\necho "</table>";\n`,
  sol: `<?php
echo "<table border='1'>";
echo "<tr><th>Nodes</th><th>Storage GB</th><th>Bandwidth TB</th><th>API requests</th></tr>";

for ($n = 1; $n <= 6; $n++) {
    echo "<tr>";
    echo "<td>" . $n . "</td>";
    echo "<td>" . (10 * $n) . "</td>";
    echo "<td>" . (100 * $n) . "</td>";
    echo "<td>" . (1000 * $n) . "</td>";
    echo "</tr>";
}

echo "</table>";
`,
  why: `This one starts at <b>1</b>, not 0 — nobody buys zero servers. The
    loop header is where that decision lives, and changing one character there
    changes the whole table. That is the argument for loops over copy-paste:
    one place to be right, one place to be wrong.`
},

/* ====================== from the lecture slides ====================== */
{
  id: "d1", set: "From the lecture slides", n: "A",
  title: "Circle area and sphere volume — fixed radius",
  context: `The practice exercise at the end of the Introduction to PHP deck.
    Part 1 of 2: the developer picks the radius.`,
  task: `With a radius you choose, work out the area of a circle
    (A = π r²) and the volume of a sphere (V = ⁴⁄₃ π r³), and show both
    rounded to 2 decimal places alongside the radius.`,
  reqs: [
    "A variable <code>$radius</code> with a value you set (use 5)",
    "Use <code>M_PI</code> for π",
    "Round both answers to <b>2 decimal places</b>",
    "Print the radius as well as the two results"
  ],
  inputs: "No form. The radius is written in the code.",
  runs: [{ vars: {}, label: "radius 5", has: ["5"], outRe: /78\.54[\s\S]*523\.6/ }],
  code: [
    { re: /\$radius\s*=/, msg: "Call the variable $radius, as the slide does" },
    { re: /M_PI|pi\s*\(/i, msg: "Use M_PI for π rather than typing 3.14" }
  ],
  starter: `<?php\n$radius = 5;\n\n`,
  sol: `<?php
$radius = 5;

$area   = M_PI * $radius * $radius;
$volume = (4 / 3) * M_PI * $radius * $radius * $radius;

echo "Radius: " . $radius . "<br>";
echo "Circle area: " . round($area, 2) . "<br>";
echo "Sphere volume: " . round($volume, 2) . "<br>";
`,
  why: `Two things bite here. <b>First</b>, <code>4 / 3</code> must stay as a
    division — write <code>1.33</code> and the volume is wrong in the third
    digit. <b>Second</b>, <code>round($volume, 2)</code> gives
    <code>523.6</code>, not <code>523.60</code>, because a trailing zero is not
    a different number. If you want the zero shown, that is
    <code>number_format($volume, 2)</code> — rounding and formatting are two
    different jobs.`
},

{
  id: "d2", set: "From the lecture slides", n: "B",
  title: "Circle area and sphere volume — radius from a form",
  context: `Part 2 of 2. Same mathematics, but a visitor types the radius —
    so now the code has to cope with them typing nothing, or a minus number.`,
  task: `Read the radius from the form. If it is a positive number, show the
    area and the volume to 2 decimal places. If it is not, show an error
    instead.`,
  reqs: [
    "Read <code>$_POST[\"radius\"]</code>",
    "Accept decimals, not just whole numbers",
    "If it is missing, empty, not a number, or not above zero, print exactly:<br><code>Please enter a positive number.</code>",
    "Otherwise print the area and the volume, rounded to 2 decimal places"
  ],
  inputs: "One number box. Check runs your code with a good value and three bad ones.",
  runs: [
    { vars: { _POST: { radius: "2" } }, label: "radius 2", outRe: /12\.57[\s\S]*33\.51/ },
    { vars: { _POST: { radius: "1.5" } }, label: "radius 1.5", outRe: /7\.07[\s\S]*14\.14/ },
    { vars: { _POST: { radius: "-3" } }, label: "radius -3", out: "Please enter a positive number." },
    { vars: { _POST: { radius: "" } }, label: "empty box", out: "Please enter a positive number." },
    { vars: { _POST: { radius: "abc" } }, label: "typed letters", out: "Please enter a positive number." }
  ],
  code: [
    { re: /\$_POST\s*\[/, msg: "The radius must come from $_POST" },
    { re: /if\s*\(/, msg: "You need an if to separate good input from bad" }
  ],
  starter: `<?php\n$radius = $_POST["radius"];\n\nif (is_numeric($radius) && $radius > 0) {\n\n} else {\n    echo "Please enter a positive number.";\n}\n`,
  sol: `<?php
$radius = $_POST["radius"];

if (is_numeric($radius) && $radius > 0) {
    $area   = M_PI * $radius * $radius;
    $volume = (4 / 3) * M_PI * $radius * $radius * $radius;

    echo "Radius: " . $radius . "<br>";
    echo "Circle area: " . round($area, 2) . "<br>";
    echo "Sphere volume: " . round($volume, 2) . "<br>";
} else {
    echo "Please enter a positive number.";
}
`,
  why: `<code>is_numeric($radius) && $radius > 0</code> does both jobs in one
    line, and the order matters: check it <i>is</i> a number before asking
    whether it is big enough. The empty box is the case people forget — an
    empty string is not numeric, so <code>is_numeric</code> catches it along
    with the letters.
    <br><br>This is the difference between a script and a program. The
    mathematics is identical to part A; everything you added is about a person
    being on the other end.`
}

];
