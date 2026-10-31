/* ---------------------------------------------------------------
   MIT320 Partial I — the paper, as data.

   The text here is identical to resources/exams/mock-exam.md and the
   marking to mock-exam-answers.md. If you change one, change all three:
   a paper, a key and a simulator that disagree teach her to trust none
   of them. scripts/build-mock-exam.py builds the two PDFs from the same
   markdown, so the markdown is the source and this is the sitting.

   Question types
     mcq    — auto-marked, all or nothing
     tf     — auto-marked, true/false
     out    — exact output; auto-matched, then still shown at marking
              time so a partial mark is possible
     self   — written answer, self-marked against criteria
     plan   — written in the page (pseudocode)
     draw   — drawn on paper or the whiteboard, self-marked
     vscode — written in VS Code, pasted back for self-marking

   Every criterion carries its own mark, because the real scheme is not
   an even split: Section 4(c) is 6 for working code and 4 for the
   documentation, not 10 shared out equally.
--------------------------------------------------------------- */

const PAPER = [

{id:"1", title:"Section 1 — Multiple choice", note:"10 marks · 1 each · about 12 minutes", qs:[
 {n:1, marks:1, type:"mcq", q:"Where does PHP code run?",
  opts:["in the browser",
        "on the server, before the HTML is sent to the browser",
        "in the browser, after the HTML has loaded",
        "inside the database"], ans:1,
  why:"The browser never sees PHP. It receives only what the script printed.",
  lesson:"setup", label:"Lesson 0B — how PHP runs"},

 {n:2, marks:1, type:"mcq", q:"Which of these is a <b>valid</b> PHP variable name?",
  opts:["$2php","$my-var","$_total","my_var"], ans:2,
  why:"A name may start with a letter or an underscore, never a digit; a hyphen is a minus sign; and without the <code>$</code> it is not a variable at all.",
  lesson:"basics", label:"Lesson 1 — variables"},

 {n:3, marks:1, type:"mcq", q:"What does <code>echo 10 . 5;</code> print?",
  opts:["15","105","10.5","a syntax error"], ans:1,
  why:"The dot joins. It turns both numbers into text and sticks them together.",
  lesson:"basics", label:"Lesson 1 — the dot"},

 {n:4, marks:1, type:"mcq", q:"In PHP 8, what does <code>echo \"Total: \" . 5 + 3;</code> print?",
  opts:["Total: 53","Total: 8","8","a syntax error"], ans:1,
  why:"PHP 8 changed the precedence: <code>+</code> now binds tighter than the dot, so the addition happens first. In PHP 7 this was an error.",
  lesson:"operators", label:"Lesson 3 — precedence"},

 {n:5, marks:1, type:"mcq", q:"<code>var_dump((int) \"12abc\");</code> gives:",
  opts:["int(0)","int(12)","string(5) \"12abc\"","a fatal error"], ans:1,
  why:"Casting to int reads digits from the front and stops at the first character that is not one.",
  lesson:"datatypes", label:"Lesson 2 — casting"},

 {n:6, marks:1, type:"mcq", q:"Which comparison is <b>TRUE</b>?",
  opts:["0 == \"a\"","null === false","\"1\" == \"01\"","\"abc\" == 0"], ans:2,
  why:"Two numeric strings are compared as numbers, and 1 equals 01. The first and last were true in PHP 7 and are <b>false</b> in PHP 8.",
  lesson:"operators", label:"Lesson 3 — comparison"},

 {n:7, marks:1, type:"mcq", q:"What does <code>7 / 2</code> produce?",
  opts:["int(3)","float(3.5)","int(4)","string(\"3.5\")"], ans:1,
  why:"Division always produces a float in PHP unless you ask for <code>intdiv()</code>.",
  lesson:"operators", label:"Lesson 3 — division"},

 {n:8, marks:1, type:"mcq", q:"Which loop is guaranteed to run at least once?",
  opts:["for","while","do-while","foreach"], ans:2,
  why:"Its test is at the bottom, so the body has already run before anything is checked.",
  lesson:"loops", label:"Lesson 5 — do-while"},

 {n:9, marks:1, type:"mcq", q:"Inside a loop, <code>continue</code>:",
  opts:["ends the loop completely",
        "skips the rest of this pass and starts the next",
        "starts the loop again from the first pass",
        "stops the whole script"], ans:1,
  why:"<code>break</code> ends the loop; <code>continue</code> only ends the current pass.",
  lesson:"loops", label:"Lesson 5 — break and continue"},

 {n:10, marks:1, type:"mcq", q:"Which is a valid PHP comment?",
  opts:["&lt;!-- note --&gt;","** note **","# note","' note"], ans:2,
  why:"PHP takes <code>//</code>, <code>#</code> and <code>/* ... */</code>. The first is an HTML comment, which PHP ignores and the browser shows in the source.",
  lesson:"basics", label:"Lesson 1 — comments"}
]},

{id:"2", title:"Section 2 — True or false", note:"8 marks · 1 each · about 6 minutes", qs:[
 {n:11, marks:1, type:"tf", q:"Every PHP variable name must begin with a <code>$</code> sign.", ans:true,
  why:"No exceptions. Leaving it off makes PHP read a bare word instead.",
  lesson:"basics", label:"Lesson 1 — variables"},
 {n:12, marks:1, type:"tf", q:"<code>$Name</code> and <code>$name</code> refer to the same variable.", ans:false,
  why:"Variable names are case sensitive. (Function names are not.)",
  lesson:"basics", label:"Lesson 1 — variables"},
 {n:13, marks:1, type:"tf", q:"The <code>===</code> operator compares the value <b>and</b> the data type.", ans:true,
  why:"That is the whole difference between <code>===</code> and <code>==</code>.",
  lesson:"operators", label:"Lesson 3 — comparison"},
 {n:14, marks:1, type:"tf", q:"<code>\"5\" === 5</code> evaluates to true.", ans:false,
  why:"Same value, different types — string against integer — so <code>===</code> says no.",
  lesson:"operators", label:"Lesson 3 — comparison"},
 {n:15, marks:1, type:"tf", q:"The <code>+</code> operator joins two strings together in PHP.", ans:false,
  why:"The dot joins. <code>+</code> tries to add, converting the text to numbers first.",
  lesson:"operators", label:"Lesson 3 — the dot"},
 {n:16, marks:1, type:"tf", q:"<code>(bool) \"0.0\"</code> evaluates to false.", ans:false,
  why:"It is <b>true</b>. Only the empty string and the single character <code>\"0\"</code> are falsy strings; <code>\"0.0\"</code> is neither.",
  lesson:"datatypes", label:"Lesson 2 — truthiness"},
 {n:17, marks:1, type:"tf", q:"<code>empty(\"0\")</code> returns true.", ans:true,
  why:"<code>empty()</code> counts <code>\"0\"</code> as empty, which is exactly why it is the wrong check for a quantity box someone legitimately typed 0 into.",
  lesson:"datatypes", label:"Lesson 2 — empty()"},
 {n:18, marks:1, type:"tf", q:"Changing <code>$v</code> inside <code>foreach ($arr as $v)</code> changes the array.", ans:false,
  why:"<code>$v</code> is a copy. Changing the array needs a reference: <code>foreach ($arr as &amp;$v)</code>.",
  lesson:"arrays", label:"Lesson 6 — foreach"}
]},

/* Every output below was produced by running the snippet through PHP 8.2,
   not by reading it. */
{id:"3", title:"Section 3 — Code output and tracing", note:"12 marks · about 17 minutes", qs:[
 {n:19, marks:2, type:"out",
  q:"What is printed?",
  code:'$a = "5";\n$b = 5;\nvar_dump($a == $b);\nvar_dump($a === $b);',
  accept:["bool(true) bool(false)"],
  model:'<pre>bool(true)\nbool(false)</pre><code>==</code> converts the string to a number and finds them equal. <code>===</code> compares the types first and stops there.',
  criteria:[{t:"<code>bool(true)</code> for the <code>==</code>", m:1},
            {t:"<code>bool(false)</code> for the <code>===</code>", m:1}],
  lesson:"operators", label:"Lesson 3 — == against ==="},

 {n:20, marks:1, type:"out",
  q:"What is printed?",
  code:'for ($i = 1; $i <= 6; $i++) {\n    if ($i % 2 == 0) continue;\n    if ($i == 5) break;\n    echo $i . " ";\n}',
  accept:["1 3"],
  model:'<pre>1 3 </pre>2, 4 and 6 are skipped by <code>continue</code>. At 5 the loop <code>break</code>s <i>before</i> the echo, so 5 is never printed. Note the trailing space — every number printed brings one with it.',
  criteria:[{t:"<code>1 3</code> and nothing else", m:1}],
  lesson:"loops", label:"Lesson 5 — break and continue"},

 {n:21, marks:1, type:"out",
  q:"What is printed?",
  code:'$n = 10;\ndo {\n    echo "run ";\n    $n++;\n} while ($n < 5);',
  accept:["run"],
  model:'<pre>run </pre>The test is at the bottom, so the body runs once even though 10 was never less than 5.',
  criteria:[{t:"<code>run</code>, printed exactly once", m:1}],
  lesson:"loops", label:"Lesson 5 — do-while"},

 {n:22, marks:2, type:"out",
  q:"What is printed?",
  code:'$s = "PHP";\n$s .= " is";\n$s .= " fun";\necho $s . " (" . strlen($s) . ")";',
  accept:["PHP is fun (10)"],
  model:'<pre>PHP is fun (10)</pre><code>.=</code> adds to the end of what is already there. <code>"PHP is fun"</code> is ten characters <b>including the two spaces</b>.',
  criteria:[{t:"<code>PHP is fun</code> built up correctly", m:1},
            {t:"<code>(10)</code> — counted the spaces", m:1}],
  lesson:"datatypes", label:"Lesson 2 — strings"},

 {n:23, marks:1, type:"out",
  q:"What is printed?",
  code:'$cart = ["pen" => 3, "book" => 12, "bag" => 25];\n$t = 0;\nforeach ($cart as $item => $price) {\n    if ($price < 5) continue;\n    $t += $price;\n}\necho $t;',
  accept:["37"],
  model:'<pre>37</pre>The pen at 3 is skipped, so 12 + 25.',
  criteria:[{t:"<code>37</code>", m:1}],
  lesson:"arrays", label:"Lesson 6 — foreach"},

 {n:24, marks:2, type:"out",
  q:"What is printed?",
  code:'$x = 10;\n$y = $x++;\n$z = ++$x;\necho "$x $y $z";',
  accept:["12 10 12"],
  model:'<pre>12 10 12</pre><code>$x++</code> hands back the <i>old</i> value and then adds; <code>++$x</code> adds first and hands back the <i>new</i> one. <code>$x</code> is raised twice either way.',
  criteria:[{t:"<code>$x</code> ended at 12 — it was raised twice", m:1},
            {t:"<code>$y</code> is 10 and <code>$z</code> is 12, in that order", m:1}],
  lesson:"operators", label:"Lesson 3 — ++ before and after"},

 {n:25, marks:3, type:"self",
  q:"This script has <b>three</b> faults. Name each one and give the correction.",
  code:'$price = 10\n$qty = "3";\nif ($price = 10) {\n    echo "Total: " + $price * $qty;\n}',
  model:'<ul style="margin:8px 0 0;padding-left:19px">'
      + '<li>Line 1 has <b>no semicolon</b> at the end.</li>'
      + '<li>The <code>if</code> uses <code>=</code> — which puts a value in and is always true — instead of <code>==</code>.</li>'
      + '<li>The output uses <code>+</code> to join text to a number; it should be the dot.</li></ul>'
      + '<p style="margin:10px 0 0">Only the first stops the script from parsing. The other two run happily and give a wrong answer, which is the point of the question.</p>',
  criteria:[{t:"Missing semicolon after <code>$price = 10</code>", m:1},
            {t:"<code>=</code> should be <code>==</code> in the <code>if</code>", m:1},
            {t:"<code>+</code> should be the dot to join", m:1}],
  lesson:"operators", label:"Lesson 3 — = against =="}
]},

{id:"4", title:"Section 4 — Main algorithmic and coding exercise",
 note:"20 marks · about 25 minutes · all three deliverables required",
 brief:'<p>A tutor types <b>five marks out of 20</b> into a form, one box per student, and presses '
     + '<b>Show results</b>. The page must then display a table of the five marks with a letter grade '
     + 'beside each one, and underneath it the <b>total</b>, the <b>average to two decimal places</b>, '
     + 'the <b>highest</b> mark, and <b>how many students passed</b> (a pass is 10 or more).</p>'
     + '<p>If any box is empty or holds something that is not a number from 0 to 20, the page must say '
     + 'so and show no table.</p>'
     + '<p class="grades"><b>Grades:</b> 18 and over = A &nbsp;|&nbsp; 16 = B &nbsp;|&nbsp; 14 = C '
     + '&nbsp;|&nbsp; 10 = D &nbsp;|&nbsp; under 10 = F</p>',
 qs:[
 {n:26, marks:5, type:"plan", part:"(a)",
  q:"<b>Pseudocode.</b> His conventions: CAPITALS for the names, <code>&lt;--</code> for assignment, "
   + "<code>[square brackets]</code> for a note to the reader, and <code>IF … THEN … ELSE … ENDIF</code>.",
  model:'<pre>START\n  IF the Show results button was pressed THEN\n      TOTAL   &lt;-- 0\n      HIGHEST &lt;-- nothing yet          [not 0: zero is a legal mark]\n      PASSES  &lt;-- 0\n      PRINT the table heading row      [once, outside the loop]\n      I &lt;-- 1\n      WHILE I &lt;= 5\n          MARK &lt;-- the mark typed for student I\n          IF MARK is not a number OR MARK &lt; 0 OR MARK &gt; 20 THEN\n              PRINT "Every mark must be a number from 0 to 20."\n              STOP\n          ENDIF\n          TOTAL &lt;-- TOTAL + MARK\n          IF MARK &gt;= 10 THEN PASSES &lt;-- PASSES + 1 ENDIF\n          IF HIGHEST is nothing OR MARK &gt; HIGHEST THEN HIGHEST &lt;-- MARK ENDIF\n          PRINT a row holding I, MARK and the letter grade for MARK\n          I &lt;-- I + 1\n      ENDWHILE\n      PRINT the end of the table\n      PRINT TOTAL\n      PRINT TOTAL / 5 to two decimal places\n      PRINT HIGHEST\n      PRINT PASSES\n  ENDIF\nSTOP</pre>',
  criteria:[{t:"<code>START</code> and <code>STOP</code> both written", m:1},
            {t:"The counter is set <b>before</b> the loop and the loop tests up to and including 5", m:1},
            {t:"<code>TOTAL</code>, <code>HIGHEST</code> and <code>PASSES</code> all set up before the loop", m:1},
            {t:"The validity check is inside the loop, with its own message", m:1},
            {t:"Total, average, highest and passes printed <b>after</b> the loop, not inside it", m:1}],
  lesson:"algorithms", label:"Lesson 0A — pseudocode"},

 {n:27, marks:5, type:"draw", part:"(b)",
  q:"<b>Flowchart</b>, showing the inputs, the decisions and the loop. Draw it on paper or on the "
   + "whiteboard — not here. Tick what you drew once you have it in front of you.",
  model:'<pre>( START )\n    |\n&lt; Show results pressed ? &gt; --no--&gt; ( STOP )\n    | yes\n[ TOTAL &lt;-- 0 , HIGHEST &lt;-- none , PASSES &lt;-- 0 ]\n    |\n/ print the heading row ONCE /\n    |\n[ I &lt;-- 1 ]\n    |\n&lt; I &lt;= 5 ? &gt; --no--&gt; / print total, average, highest, passes / --&gt; ( STOP )\n    | yes\n/ read MARK for student I /\n    |\n&lt; MARK valid ? &gt; --no--&gt; / print the error / --&gt; ( STOP )\n    | yes\n[ TOTAL &lt;-- TOTAL + MARK ]\n    |\n&lt; MARK &gt;= 10 ? &gt; --yes--&gt; [ PASSES &lt;-- PASSES + 1 ]\n    |\n&lt; MARK &gt; HIGHEST ? &gt; --yes--&gt; [ HIGHEST &lt;-- MARK ]\n    |\n/ print the row for student I /\n    |\n[ I &lt;-- I + 1 ]\n    |\n    +---- back up to &lt; I &lt;= 5 ? &gt;</pre>'
      + '<p style="margin:10px 0 0">A loop has <b>no shape of its own</b>. It is a diamond, a body, and an '
      + 'arrow going back up to the diamond. That back-arrow <i>is</i> the loop.</p>',
  criteria:[{t:"<code>START</code> and <code>STOP</code> both drawn, as ovals", m:1},
            {t:"Every read and every print in a parallelogram", m:1},
            {t:"Every decision a diamond, with <b>both</b> exits labelled yes and no", m:1},
            {t:"The arrow back up to the loop test is actually drawn", m:1},
            {t:"Nothing left unconnected — it flows from START to STOP", m:1}],
  lesson:"algorithms", label:"Lesson 0A — flowcharts"},

 {n:28, marks:10, type:"vscode", part:"(c)",
  q:"<b>PHP code</b>, with inline <code>//</code> comments and a PHPDoc block "
   + "(<code>/** … */</code>). Write this in <b>VS Code</b>, run it under XAMPP, then paste it back here to mark it.",
  file:"partial1.php",
  model:'<pre>&lt;?php\n/**\n * Exam results dashboard.\n *\n * Reads five marks out of 20 from a POST form, grades each one, and\n * reports the total, the average, the highest mark and the pass count.\n *\n * @author  Fatima Al-Helou\n * @version 1.0\n */\n\n/**\n * Turn a mark out of 20 into a letter grade.\n *\n * @param  int|float $mark The mark to grade, 0 to 20.\n * @return string          A, B, C, D or F.\n */\nfunction letterGrade($mark) {\n    if ($mark &gt;= 18)     { return "A"; }\n    elseif ($mark &gt;= 16) { return "B"; }\n    elseif ($mark &gt;= 14) { return "C"; }\n    elseif ($mark &gt;= 10) { return "D"; }\n    return "F";\n}\n\n// Nothing below runs until the button has actually been pressed.\nif (isset($_POST["show"])) {\n\n    $total   = 0;      // running sum of every mark\n    $highest = null;   // null, not 0 - a mark of 0 is legal\n    $passes  = 0;      // how many reached 10\n\n    echo "&lt;table border=\'1\'&gt;";\n    echo "&lt;tr&gt;&lt;th&gt;Student&lt;/th&gt;&lt;th&gt;Mark&lt;/th&gt;&lt;th&gt;Grade&lt;/th&gt;&lt;/tr&gt;";\n\n    // One pass per student; $i doubles as the student number shown.\n    for ($i = 1; $i &lt;= 5; $i++) {\n\n        $mark = $_POST["mark" . $i];\n\n        // Everything from a form is text, and the box may be empty.\n        if (!is_numeric($mark) || $mark &lt; 0 || $mark &gt; 20) {\n            echo "&lt;/table&gt;";\n            echo "&lt;p&gt;Every mark must be a number from 0 to 20.&lt;/p&gt;";\n            return;\n        }\n\n        $total += $mark;\n        if ($mark &gt;= 10) { $passes++; }\n        if ($highest === null || $mark &gt; $highest) { $highest = $mark; }\n\n        echo "&lt;tr&gt;";\n        echo "&lt;td&gt;Student " . $i . "&lt;/td&gt;";\n        echo "&lt;td&gt;" . $mark . "&lt;/td&gt;";\n        echo "&lt;td&gt;" . letterGrade($mark) . "&lt;/td&gt;";\n        echo "&lt;/tr&gt;";\n    }\n\n    echo "&lt;/table&gt;";\n\n    // Worked out after the loop, never inside it.\n    echo "&lt;p&gt;Total: "   . $total . "&lt;/p&gt;";\n    echo "&lt;p&gt;Average: " . number_format($total / 5, 2) . "&lt;/p&gt;";\n    echo "&lt;p&gt;Highest: " . $highest . "&lt;/p&gt;";\n    echo "&lt;p&gt;Passed: "  . $passes . " out of 5&lt;/p&gt;";\n}</pre>'
      + '<p style="margin:10px 0 0">The form itself goes above this, with the five boxes named '
      + '<code>mark1</code> to <code>mark5</code> and the button named <code>show</code>. Any working '
      + 'shape counts — the marks are for the ten things listed, not for matching this layout.</p>',
  criteria:[{t:"The loop runs <b>exactly</b> five times", m:1},
            {t:"Each mark read from <code>$_POST</code> with the number built onto the name", m:1},
            {t:"Validity check: <code>is_numeric</code> <b>and</b> the 0–20 range, and no table when it fails", m:1},
            {t:"Total and pass count accumulate <b>inside</b> the loop", m:1},
            {t:"Average worked out <b>after</b> the loop, to two decimal places", m:1},
            {t:"The grade ladder tests the highest threshold first", m:1},
            {t:"A PHPDoc block at the top of the file", m:1},
            {t:"A PHPDoc block on the function, with <code>@param</code> and <code>@return</code>", m:1},
            {t:"Inline <code>//</code> comments that say <b>why</b>, not what", m:1},
            {t:"<code>$highest</code> starts as <code>null</code>, not 0 — zero is a legal mark", m:1}],
  lesson:"loops", label:"Lessons 4, 5 &amp; 7 — the whole thing together"}
]}];

/* The starter file she opens in VS Code. Not a head start on the answer —
   it is the form and the plumbing, so the 25 minutes go on the algorithm
   rather than on typing five <input> tags. */
const STARTER = `<?php
/**
 * MIT320 Partial I - Section 4
 *
 * TODO: your PHPDoc block goes here. Summary line, then @author and @version.
 */

// TODO: the letterGrade() function goes here, with its own PHPDoc block
//       holding @param and @return.

?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Exam results</title></head>
<body>

<form method="post">
    Student 1 <input type="text" name="mark1"><br><br>
    Student 2 <input type="text" name="mark2"><br><br>
    Student 3 <input type="text" name="mark3"><br><br>
    Student 4 <input type="text" name="mark4"><br><br>
    Student 5 <input type="text" name="mark5"><br><br>
    <button type="submit" name="show" value="1">Show results</button>
</form>

<?php
if (isset($_POST["show"])) {

    // TODO: set up TOTAL, HIGHEST and PASSES here - before the loop.

    // TODO: print the heading row of the table, once.

    // TODO: one loop, five passes. Read mark1..mark5, check each one,
    //       add it up, count the passes, track the highest, print a row.

    // TODO: after the loop - total, average to 2dp, highest, passes.
}
?>

</body>
</html>
`;

/* What a weak section actually means. The total is not the useful part. */
const DIAGNOSIS = {
 "1":["The vocabulary hasn't settled yet.",
      "Ten minutes of flashcards at the start of each call, and no new material until they come back clean."],
 "2":["The small print of the type system is the gap — <code>===</code>, truthiness, <code>empty()</code>.",
      "Lesson 2 and Lesson 3 again, with <code>var_dump()</code> on everything. Reading about it will not fix it; dumping it will."],
 "3":["Tracing code in your head is the gap.",
      "Back to the <code>examples.php</code> files, playing <i>predict the output, then run it</i> — out loud, every file."],
 "4":["Producing an algorithm from a blank page is the gap.",
      "This is a practice problem, not a knowledge problem. The problem sets, from blank, one a day. Re-reading won't shift it."]
};
