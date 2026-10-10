/* ---------------------------------------------------------------
   Extra practice — same ideas as the problem sheet, different story.

   Nothing new is introduced here. Each one is deliberately a twin of
   a problem from Set I, so that if she can do the sheet she can do
   these, and if she cannot do these she cannot really do the sheet.

   Same shape as problems-data.js; see the comment at the top of that
   file for what each field means.
--------------------------------------------------------------- */
const PROBLEMS_EXTRA = [

/* twin of 1·B — input from the URL */
{
  id: "x1", set: "Extra practice", n: "1", twin: "like problem 1 · B",
  title: "Temperature converter",
  context: `A weather widget that converts Celsius to Fahrenheit. The
    formula is F = C × 9 / 5 + 32.`,
  task: `Take the temperature out of the URL and print both readings on one
    line.`,
  reqs: [
    "Read <code>$_GET[\"c\"]</code>",
    "Print exactly in this shape: <code>25C = 77F</code>"
  ],
  inputs: "The page was opened as <code>temp.php?c=25</code>.",
  runs: [
    { vars: { _GET: { c: "25" } }, label: "?c=25", out: "25C = 77F" },
    { vars: { _GET: { c: "100" } }, label: "?c=100", out: "100C = 212F" },
    { vars: { _GET: { c: "-40" } }, label: "?c=-40", out: "-40C = -40F" }
  ],
  code: [{ re: /\$_GET\s*\[/, msg: "The temperature must come from $_GET" }],
  starter: `<?php\n$c = $_GET["c"];\n\n`,
  sol: `<?php
$c = $_GET["c"];
$f = $c * 9 / 5 + 32;

echo $c . "C = " . $f . "F";
`,
  why: `−40 is the temperature where both scales agree, which makes it the
    best test there is: a formula with the multiply and the add the wrong way
    round still passes 0 and fails −40.`
},

/* twin of 2 — find the best without a built-in */
{
  id: "x2", set: "Extra practice", n: "2", twin: "like problem 2",
  title: "Largest of three — no shortcuts",
  context: `The same "hold the best so far" idea as the price filter, cut
    down to three numbers so you can see the whole shape at once.`,
  task: `Three numbers arrive from a form. Print the biggest.`,
  reqs: [
    "Read <code>$_POST[\"a\"]</code>, <code>$_POST[\"b\"]</code>, <code>$_POST[\"c\"]</code>",
    "<b>No <code>max()</code></b> — only <code>if</code> and comparisons",
    "Print exactly <code>Largest: 9</code>"
  ],
  inputs: "Three number boxes. Check moves the biggest one around.",
  runs: [
    { vars: { _POST: { a: "3", b: "9", c: "5" } }, label: "3, 9, 5 (middle)", out: "Largest: 9" },
    { vars: { _POST: { a: "9", b: "3", c: "5" } }, label: "9, 3, 5 (first)", out: "Largest: 9" },
    { vars: { _POST: { a: "3", b: "5", c: "9" } }, label: "3, 5, 9 (last)", out: "Largest: 9" },
    { vars: { _POST: { a: "4", b: "4", c: "4" } }, label: "4, 4, 4 (all equal)", out: "Largest: 4" }
  ],
  code: [{ noRe: /\bmax\s*\(/, msg: "max() is the thing being practised — do it by hand" }],
  starter: `<?php\n$a = $_POST["a"];\n$b = $_POST["b"];\n$c = $_POST["c"];\n\n$largest = $a;\n\n`,
  sol: `<?php
$a = $_POST["a"];
$b = $_POST["b"];
$c = $_POST["c"];

$largest = $a;

if ($b > $largest) {
    $largest = $b;
}
if ($c > $largest) {
    $largest = $c;
}

echo "Largest: " . $largest;
`,
  why: `The all-equal case is there on purpose. Code written with
    <code>&gt;=</code> instead of <code>&gt;</code> still gives the right
    answer — but a tie is where sloppy comparison logic usually shows itself,
    so it is worth having in the test row.`
},

/* twin of 3 — modulus */
{
  id: "x3", set: "Extra practice", n: "3", twin: "like problem 3",
  title: "Leap year checker",
  context: `The smart plug asked one question of <code>%</code>. This asks
    three, and the rules really are this fussy — it is why 1900 was not a
    leap year but 2000 was.`,
  task: `A year arrives. Say whether it is a leap year. A year is a leap year
    if it divides by 4, <b>except</b> years that divide by 100, <b>unless</b>
    they also divide by 400.`,
  reqs: [
    "Read <code>$_POST[\"year\"]</code>",
    "Use <code>%</code>",
    "Leap → <code>2024 is a LEAP year</code>",
    "Not → <code>2023 is NOT a leap year</code>"
  ],
  inputs: "One year box. Check tries the four cases that matter.",
  runs: [
    { vars: { _POST: { year: "2024" } }, label: "2024 — divides by 4", out: "2024 is a LEAP year" },
    { vars: { _POST: { year: "2023" } }, label: "2023 — ordinary year", out: "2023 is NOT a leap year" },
    { vars: { _POST: { year: "1900" } }, label: "1900 — divides by 100", out: "1900 is NOT a leap year" },
    { vars: { _POST: { year: "2000" } }, label: "2000 — divides by 400", out: "2000 is a LEAP year" }
  ],
  code: [{ re: /%/, msg: "Use the modulus operator %" }],
  starter: `<?php\n$year = $_POST["year"];\n\nif ($year % 400 == 0) {\n\n}\n`,
  sol: `<?php
$year = $_POST["year"];

if ($year % 400 == 0) {
    $leap = true;
} elseif ($year % 100 == 0) {
    $leap = false;
} elseif ($year % 4 == 0) {
    $leap = true;
} else {
    $leap = false;
}

if ($leap) {
    echo "$year is a LEAP year";
} else {
    echo "$year is NOT a leap year";
}
`,
  why: `Order is everything. Test 400 <b>first</b>, then 100, then 4 — the
    other way round and 2000 comes out wrong, because it divides by 100 and
    that branch would answer before the 400 rule ever ran.
    <br><br>Storing the answer in <code>$leap</code> and printing afterwards
    keeps the deciding and the saying apart. You could echo inside each branch,
    but then the message is written four times and one of the four will
    eventually have a typo.`
},

/* twin of 4 — a generated table */
{
  id: "x4", set: "Extra practice", n: "4", twin: "like problem 4",
  title: "Times table",
  context: `The table every child learns, generated instead of typed.`,
  task: `Print the 7 times table from 1 to 10 as an HTML table, one row per
    line.`,
  reqs: [
    "No input",
    "Use a loop",
    "Each row reads like <code>7 x 3 = 21</code>, inside a <code>&lt;table&gt;</code>"
  ],
  inputs: "Nothing. This one takes no input.",
  runs: [{ vars: {}, label: "page load",
           has: ["<table", "</table>", "7 x 1 = 7", "7 x 3 = 21", "7 x 10 = 70"] }],
  code: [{ re: /for\s*\(|while\s*\(|foreach\s*\(/, msg: "Use a loop, not ten echo lines" }],
  starter: `<?php\n$n = 7;\n\necho "<table border='1'>";\n\nfor ($i = 1; $i <= 10; $i++) {\n\n}\n\necho "</table>";\n`,
  sol: `<?php
$n = 7;

echo "<table border='1'>";

for ($i = 1; $i <= 10; $i++) {
    echo "<tr><td>" . $n . " x " . $i . " = " . ($n * $i) . "</td></tr>";
}

echo "</table>";
`,
  why: `Putting the 7 in <code>$n</code> rather than typing it three times in
    the loop means the table for 8 is a one-character change. That is the
    whole argument for variables, in one line of code.`
},

/* twin of 5 — a tier table with several columns */
{
  id: "x5", set: "Extra practice", n: "5", twin: "like problem 5",
  title: "Mobile plan tiers",
  context: `A phone shop page: five bundles, each a multiple of the one
    below it.`,
  task: `For bundle sizes 1 to 5 gigabytes, work out the price (5 × N
    dollars), the text messages (100 × N) and the call minutes (60 × N), in a
    table.`,
  reqs: [
    "No input",
    "Loop from 1 to 5",
    "Four columns in an HTML <code>&lt;table&gt;</code>"
  ],
  inputs: "Nothing. This one takes no input.",
  runs: [{ vars: {}, label: "page load",
           has: ["<table", "</table>", "25", "500", "300", "5", "100", "60"] }],
  code: [{ re: /for\s*\(|while\s*\(|foreach\s*\(/, msg: "Use a loop" }],
  starter: `<?php\necho "<table border='1'>";\necho "<tr><th>GB</th><th>Price $</th><th>SMS</th><th>Minutes</th></tr>";\n\nfor ($n = 1; $n <= 5; $n++) {\n\n}\n\necho "</table>";\n`,
  sol: `<?php
echo "<table border='1'>";
echo "<tr><th>GB</th><th>Price $</th><th>SMS</th><th>Minutes</th></tr>";

for ($n = 1; $n <= 5; $n++) {
    echo "<tr>";
    echo "<td>" . $n . "</td>";
    echo "<td>" . (5 * $n) . "</td>";
    echo "<td>" . (100 * $n) . "</td>";
    echo "<td>" . (60 * $n) . "</td>";
    echo "</tr>";
}

echo "</table>";
`,
  why: `If this felt like problem 5 with the numbers swapped, that is because
    it is. Recognising that a new problem is an old one wearing different
    clothes is most of what getting better at this actually means.`
},

/* twin of 1·C — form, arithmetic, money */
{
  id: "x6", set: "Extra practice", n: "6", twin: "like problem 1 · C",
  title: "Invoice with VAT",
  context: `Every shop in the world needs this, and it is where
    <code>number_format</code> earns its place: money always shows two
    decimals, even when the second one is a zero.`,
  task: `A price, a quantity and a VAT percentage arrive from a form. Print
    the subtotal, the VAT and the total, each to two decimal places.`,
  reqs: [
    "Read <code>price</code>, <code>qty</code> and <code>vat</code> from <code>$_POST</code>",
    "Subtotal = price × quantity; VAT = subtotal × vat ÷ 100; Total = subtotal + VAT",
    "Use <code>number_format(..., 2)</code> so <code>55.5</code> shows as <code>55.50</code>",
    "Labels: <code>Subtotal: </code>, <code>VAT: </code>, <code>Total: </code>"
  ],
  inputs: "Three boxes from the order form.",
  runs: [
    { vars: { _POST: { price: "12.50", qty: "4", vat: "11" } }, label: "12.50 x 4 at 11%",
      has: ["Subtotal: 50.00", "VAT: 5.50", "Total: 55.50"] },
    { vars: { _POST: { price: "3", qty: "7", vat: "20" } }, label: "3.00 x 7 at 20%",
      has: ["Subtotal: 21.00", "VAT: 4.20", "Total: 25.20"] }
  ],
  code: [{ re: /number_format\s*\(/, msg: "Use number_format so the pennies always show" }],
  starter: `<?php\n$price = $_POST["price"];\n$qty   = $_POST["qty"];\n$vat   = $_POST["vat"];\n\n`,
  sol: `<?php
$price = $_POST["price"];
$qty   = $_POST["qty"];
$vat   = $_POST["vat"];

$subtotal = $price * $qty;
$tax      = $subtotal * $vat / 100;
$total    = $subtotal + $tax;

echo "Subtotal: " . number_format($subtotal, 2) . "<br>";
echo "VAT: " . number_format($tax, 2) . "<br>";
echo "Total: " . number_format($total, 2) . "<br>";
`,
  why: `<code>round()</code> would give <code>55.5</code> here and the
    invoice would look broken. <code>number_format()</code> is about how a
    number is <i>shown</i>, not what it is worth — which is why you format at
    the moment of printing and never before. Do the arithmetic on the real
    numbers; dress them up last.`
},

/* twin of 2/3 — the elseif ladder */
{
  id: "x7", set: "Extra practice", n: "7", twin: "conditions practice",
  title: "Grade bands",
  context: `A marks page that turns a number out of 20 into a letter. The
    elseif ladder from the lecture, with real stakes.`,
  task: `A mark arrives. Print the letter and a short message.`,
  reqs: [
    "Read <code>$_POST[\"mark\"]</code> (out of 20)",
    "18+ → A, 16+ → B, 14+ → C, 10+ → D, below 10 → F",
    "Print exactly <code>Mark 16 = B</code>"
  ],
  inputs: "One mark box. Check tries one mark from every band, including the boundaries.",
  runs: [
    { vars: { _POST: { mark: "19" } }, label: "19", out: "Mark 19 = A" },
    { vars: { _POST: { mark: "18" } }, label: "18 — bottom of A", out: "Mark 18 = A" },
    { vars: { _POST: { mark: "16" } }, label: "16", out: "Mark 16 = B" },
    { vars: { _POST: { mark: "14" } }, label: "14", out: "Mark 14 = C" },
    { vars: { _POST: { mark: "10" } }, label: "10 — the pass line", out: "Mark 10 = D" },
    { vars: { _POST: { mark: "9" } }, label: "9", out: "Mark 9 = F" }
  ],
  code: [{ re: /elseif|else\s+if/, msg: "Use an elseif ladder rather than separate ifs" }],
  starter: `<?php\n$mark = $_POST["mark"];\n\nif ($mark >= 18) {\n\n}\n`,
  sol: `<?php
$mark = $_POST["mark"];

if ($mark >= 18) {
    $letter = "A";
} elseif ($mark >= 16) {
    $letter = "B";
} elseif ($mark >= 14) {
    $letter = "C";
} elseif ($mark >= 10) {
    $letter = "D";
} else {
    $letter = "F";
}

echo "Mark $mark = $letter";
`,
  why: `The ladder works <b>top down and stops at the first match</b>, which
    is why the bands only ever name their lower edge. Written the other way up
    — 10 first — everything from 10 to 20 would come out D.
    <br><br>The boundary marks are in the test row deliberately: 18 and 10 are
    where <code>&gt;=</code> and <code>&gt;</code> part company, and that single
    character is the most common mistake in this kind of code.`
},

/* twin of 1·C + conditions — two inputs deciding together */
{
  id: "x8", set: "Extra practice", n: "8", twin: "like problem 1 · C",
  title: "Shipping cost",
  context: `Two inputs that have to be considered together — the first
    problem here where one <code>if</code> is not enough.`,
  task: `A weight in kilograms and a zone arrive. Work out the cost: $3 for
    the first kilogram, then $2 for each extra kilogram or part of one.
    International doubles the whole thing.`,
  reqs: [
    "Read <code>$_POST[\"weight\"]</code> and <code>$_POST[\"zone\"]</code>",
    "Zone is either <code>local</code> or <code>intl</code>",
    "Part of a kilogram counts as a whole one — <code>ceil()</code> does that",
    "Print exactly <code>Shipping: $7</code>"
  ],
  inputs: "A weight box and a zone choice.",
  runs: [
    { vars: { _POST: { weight: "0.5", zone: "local" } }, label: "0.5 kg local", out: "Shipping: $3" },
    { vars: { _POST: { weight: "1", zone: "local" } }, label: "1 kg local", out: "Shipping: $3" },
    { vars: { _POST: { weight: "3", zone: "local" } }, label: "3 kg local", out: "Shipping: $7" },
    { vars: { _POST: { weight: "3", zone: "intl" } }, label: "3 kg international", out: "Shipping: $14" },
    { vars: { _POST: { weight: "2.2", zone: "local" } }, label: "2.2 kg local", out: "Shipping: $7" }
  ],
  code: [{ re: /ceil\s*\(/, msg: "ceil() is how a part kilogram becomes a whole one" }],
  starter: `<?php\n$weight = $_POST["weight"];\n$zone   = $_POST["zone"];\n\n$cost = 3;\n\n`,
  sol: `<?php
$weight = $_POST["weight"];
$zone   = $_POST["zone"];

$cost = 3;

if ($weight > 1) {
    $extra = ceil($weight - 1);
    $cost = $cost + ($extra * 2);
}

if ($zone == "intl") {
    $cost = $cost * 2;
}

echo "Shipping: $" . $cost;
`,
  why: `Two separate <code>if</code> statements, not a ladder — because both
    rules can apply at once. An <code>elseif</code> here would mean a heavy
    international parcel never got its weight charge, which is the kind of bug
    that ships and costs someone money.
    <br><br>2.2 kg is in the tests because <code>ceil(1.2)</code> is 2, not 1.
    Read the rule again if that surprised you: <i>or part of one</i>.`
},

/* twin of 3 + 4 — a loop that makes a decision each pass */
{
  id: "x9", set: "Extra practice", n: "9", twin: "problems 3 and 4 together",
  title: "Countdown with odd and even",
  context: `The smart plug's question, asked inside a loop. Two techniques
    you already have, used in the same breath — which is how nearly all real
    code is built.`,
  task: `Count down from a number to 1. On each line, say whether that number
    is odd or even.`,
  reqs: [
    "Read <code>$_POST[\"start\"]</code>",
    "Use a loop that counts <b>down</b>",
    "One line each, exactly like <code>5 is ODD</code>, then <code>Liftoff!</code> at the end"
  ],
  inputs: "One number box.",
  runs: [
    { vars: { _POST: { start: "5" } }, label: "from 5",
      out: "5 is ODD\n4 is EVEN\n3 is ODD\n2 is EVEN\n1 is ODD\nLiftoff!" },
    { vars: { _POST: { start: "2" } }, label: "from 2",
      out: "2 is EVEN\n1 is ODD\nLiftoff!" }
  ],
  code: [
    { re: /%/, msg: "Use % to decide odd or even" },
    { re: /for\s*\(|while\s*\(/, msg: "Use a loop" }
  ],
  starter: `<?php\n$start = $_POST["start"];\n\nfor ($i = $start; $i >= 1; $i--) {\n\n}\n\necho "Liftoff!";\n`,
  sol: `<?php
$start = $_POST["start"];

for ($i = $start; $i >= 1; $i--) {
    if ($i % 2 == 0) {
        echo "$i is EVEN\\n";
    } else {
        echo "$i is ODD\\n";
    }
}

echo "Liftoff!";
`,
  why: `Counting down means three changes from the usual loop, and missing
    any one of them hangs the page: start at <code>$start</code>, carry on
    <code>while $i &gt;= 1</code>, and step with <code>$i--</code>. Leave the
    <code>++</code> in by mistake and the loop never ends — which is exactly
    the runaway this page stops for you with a message.`
},

/* twin of the slides exercise — formula, rounding, bands */
{
  id: "x10", set: "Extra practice", n: "10", twin: "like the slides exercise",
  title: "BMI calculator",
  context: `A formula and a decision in the same script, with real rounding —
    the closest thing here to the circle-and-sphere exercise.`,
  task: `A weight in kilograms and a height in metres arrive. Work out the
    BMI (weight ÷ height²), show it to 2 decimal places, and say which band it
    falls in.`,
  reqs: [
    "Read <code>$_POST[\"weight\"]</code> and <code>$_POST[\"height\"]</code>",
    "Under 18.5 → Underweight; under 25 → Normal; under 30 → Overweight; otherwise Obese",
    "Print exactly <code>BMI: 22.86 (Normal)</code>"
  ],
  inputs: "Two boxes from the health form.",
  runs: [
    { vars: { _POST: { weight: "70", height: "1.75" } }, label: "70 kg, 1.75 m", out: "BMI: 22.86 (Normal)" },
    { vars: { _POST: { weight: "95", height: "1.7" } }, label: "95 kg, 1.70 m", out: "BMI: 32.87 (Obese)" },
    { vars: { _POST: { weight: "48", height: "1.68" } }, label: "48 kg, 1.68 m", out: "BMI: 17.01 (Underweight)" },
    { vars: { _POST: { weight: "80", height: "1.75" } }, label: "80 kg, 1.75 m", out: "BMI: 26.12 (Overweight)" }
  ],
  code: [
    { re: /round\s*\(|number_format\s*\(/, msg: "Round the BMI to 2 decimal places" },
    { re: /elseif|else\s+if/, msg: "Use an elseif ladder for the bands" }
  ],
  starter: `<?php\n$weight = $_POST["weight"];\n$height = $_POST["height"];\n\n$bmi = $weight / ($height * $height);\n\n`,
  sol: `<?php
$weight = $_POST["weight"];
$height = $_POST["height"];

$bmi = $weight / ($height * $height);
$bmi = round($bmi, 2);

if ($bmi < 18.5) {
    $band = "Underweight";
} elseif ($bmi < 25) {
    $band = "Normal";
} elseif ($bmi < 30) {
    $band = "Overweight";
} else {
    $band = "Obese";
}

echo "BMI: $bmi ($band)";
`,
  why: `The brackets in <code>$height * $height</code> are not optional —
    <code>$weight / $height * $height</code> divides and then multiplies, and
    gives you back the weight. It is the quietest wrong answer in this whole
    page, because it <i>looks</i> like a number and it <i>is</i> plausible.
    <br><br>This ladder counts <b>upwards</b> with <code>&lt;</code>, where the
    grade bands counted downwards with <code>&gt;=</code>. Both are right. What
    matters is that the first test you write is the end of the range you start
    from.`
}

];
