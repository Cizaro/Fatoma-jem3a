/* ---------------------------------------------------------------
   The teaching order — every topic in the sequence it is taught in.

   This is the spine. teach.html is the script for one session, with
   timings and what to say minute by minute; this is the whole course
   laid end to end, so you can see where you are and what is next.

   Each step is one idea, and the order is not negotiable: every step
   assumes the ones above it and nothing below it.

     say   the sentence to define it with, out loud, before any code
     draw  what goes on the whiteboard - skip this and it does not land
     show  the smallest piece of code that demonstrates it
     her   what she does, in the same sitting, before you move on
     trap  the mistake she will make, so you can watch for it
     go    where on this site it lives
--------------------------------------------------------------- */
const ORDER = [

/* ===================== PART 0 - no code at all ===================== */
{ part:"Before any code", s:"0A", t:"What an algorithm is",
  say:"Steps taken to solve a problem. It takes data in, it gives at least one result out, and it stops.",
  draw:"Three stacked boxes: INPUT → PROCESS → OUTPUT.",
  her:"Argue whether a recipe is an algorithm, and why a loop that never ends is not one.",
  trap:"She will say \"a program\". Press her: an algorithm exists on paper, with no computer anywhere.",
  go:[["Lesson 0A","app/lessons/algorithms.html"],["Mini-quiz","app/quiz.html?q=lesson-00-algorithms"]] },

{ part:"Before any code", s:"0A", t:"The program development cycle",
  say:"Six phases, and writing code is only the fourth. Most of the job happens before you type.",
  draw:"The six phases in a column, with a ring drawn round number 4.",
  her:"Name the phase a flowchart belongs to. (Three: algorithm development.)",
  trap:"Skipping straight to the editor. The whole point of this topic is that you do not.",
  go:[["Lesson 0A","app/lessons/algorithms.html"]] },

{ part:"Before any code", s:"0A", t:"Pseudocode and the arrow",
  say:"Code written for a person to read. Her lecturer's rules: CAPITALS, [square bracket comments], and <-- to put a value in.",
  draw:"GRADE <-- 15 on one line, IF GRADE = 15 under it. Circle both.",
  show:"GRADE <-- 15\nIF GRADE >= 10 THEN\n    PRINT \"Pass\"\nENDIF",
  her:"Write the pass/fail rule in pseudocode, on paper, at the same time as you.",
  trap:"In pseudocode <-- puts in and = asks. In PHP they swap: = puts in, == asks. This is the single most common lost mark.",
  go:[["Lesson 0A","app/lessons/algorithms.html"],["Assignment 1","assignment-01.html"]] },

{ part:"Before any code", s:"0A", t:"Flowchart symbols",
  say:"Five shapes and nothing else: oval to start and stop, parallelogram for input and output, rectangle to do, diamond to decide, arrows to connect.",
  draw:"All five, once, clearly. Leave them up for the rest of the session.",
  her:"Draw the grade flowchart from the pseudocode she just wrote. Do not draw it for her.",
  trap:"Decisions drawn in a rectangle. Correct it every single time — it sets fast.",
  go:[["Lesson 0A","app/lessons/algorithms.html"],["Whiteboard","whiteboard.html"]] },

{ part:"Before any code", s:"0A", t:"Decisions and loops on paper",
  say:"A diamond has two ways out and only one of them ever runs. An arrow going back up is a loop.",
  draw:"A diamond with yes and no labelled, then one arrow curving back to above it.",
  her:"Point at the arrow that makes it a loop, in her own drawing.",
  trap:"Unlabelled branches, and a chart with no Stop. Both cost marks on their own.",
  go:[["Lesson 0A","app/lessons/algorithms.html"]] },

{ part:"Before any code", s:"0A", t:"Tracing by hand",
  say:"Follow the steps yourself, writing down every variable after every line. This is how you find a bug without a computer.",
  draw:"The Euclid table: two columns, one row per pass. GCD(48, 18).",
  her:"She fills the table row by row, out loud. You write nothing.",
  trap:"Reading the code and saying \"yes that looks right\". Make her write each value down.",
  go:[["Lesson 0A","app/lessons/algorithms.html"]] },

{ part:"Before any code", s:"0A", t:"Assignment 1",
  say:"Five problems, three deliverables each: a drawn flowchart, pseudocode, and working code.",
  her:"All five, in her own hand. The workbook builds the submission file once the tests pass.",
  trap:"Writing the code first and the flowchart afterwards to match. That inverts the whole lesson.",
  go:[["Assignment 1","assignment-01.html"]] },

/* ===================== PART 1 - the machine ===================== */
{ part:"Getting PHP running", s:"1", t:"Why PHP needs a server",
  say:"PHP runs on the server, before the browser sees anything. The browser never sees PHP — only the text it printed.",
  draw:"Two boxes, browser and server, with arrows both ways. Put the file in the server box.",
  her:"Double-click a .php file and watch the code appear as text. The failure teaches it faster than you can.",
  trap:"Opening files with file:// all term. If the address bar does not say localhost, nothing will work.",
  go:[["Lesson 0B","app/lessons/setup.html"]] },

{ part:"Getting PHP running", s:"1", t:"XAMPP: Apache, htdocs, localhost",
  say:"Press Start next to Apache. Your files go in C:\\xampp\\htdocs. localhost IS that folder.",
  draw:"The path C:\\xampp\\htdocs\\Fatima\\form.php with an arrow to http://localhost/Fatima/form.php.",
  her:"She does it on her screen while you watch. Not you on yours.",
  trap:"Typing the C:\\xampp\\htdocs part into the browser. Say out loud that localhost replaces it.",
  go:[["Lesson 0B","app/lessons/setup.html"]] },

{ part:"Getting PHP running", s:"1", t:"The PHP tags",
  say:"Anything between <?php and ?> is run. Anything outside is sent out as it is.",
  show:"<h1>Hello</h1>\n<?php\necho \"from PHP\";\n?>",
  her:"Put text above and below the tags and predict the output before pressing refresh.",
  trap:"Forgetting the file must end in .php. An .html file never runs anything.",
  go:[["Lesson 1","app/lessons/basics.html"],["Code lab","code-lab.html"]] },

{ part:"Getting PHP running", s:"1", t:"echo",
  say:"echo prints. That is all it does.",
  show:"<?php\necho \"Hello world\";",
  her:"Three echo lines, in the code lab, until the semicolons stop being a surprise.",
  trap:"A missing semicolon. Show her the parse error on purpose, once, so the message is familiar.",
  go:[["Lesson 1","app/lessons/basics.html"],["Code lab","code-lab.html"]] },

{ part:"Getting PHP running", s:"1", t:"Variables",
  say:"A box with a name. $ then a letter, then letters, numbers or underscores. Capitals matter.",
  draw:"A labelled box with a value inside it, and the name written on the outside.",
  show:"<?php\n$name = \"Fatima\";\necho \"Hello $name\";",
  her:"Two variables, joined into one sentence.",
  trap:"Leaving off the $. PHP treats a bare word as text and the error arrives much later.",
  go:[["Lesson 1","app/lessons/basics.html"],["Flashcards","flashcards.html?deck=syntax"]] },

{ part:"Getting PHP running", s:"1", t:"Double quotes and single quotes",
  say:"Inside double quotes a variable turns into its value. Inside single quotes it stays as text.",
  show:"<?php\n$n = 5;\necho \"I have $n\";   // I have 5\necho 'I have $n';    // I have $n",
  her:"Print the same line both ways and say why they differ.",
  trap:"This is the first-week bug in this language. Make her predict before running.",
  go:[["Lesson 1","app/lessons/basics.html"]] },

/* ===================== PART 2 - data ===================== */
{ part:"Data and strings", s:"2", t:"The data types",
  say:"String, integer, float, boolean, array, null. PHP decides for you, and changes its mind freely.",
  draw:"Six labelled boxes with one example in each.",
  show:"<?php\nvar_dump(\"15\");\nvar_dump(15);\nvar_dump(15.0);\nvar_dump(true);",
  her:"Guess each var_dump before pressing Run.",
  go:[["Lesson 2","app/lessons/datatypes.html"],["Flashcards","flashcards.html?deck=strings"]] },

{ part:"Data and strings", s:"2", t:"Joining text is a dot",
  say:"PHP joins with . and adds with +. Mix them up and you get a number where you wanted a sentence.",
  show:"<?php\necho \"100\" + 25;   // 125\necho \"100\" . 25;   // 10025",
  her:"Build one sentence out of three variables with dots.",
  trap:"Coming from other languages she will reach for +. Show her the 125 once.",
  go:[["Lesson 2","app/lessons/datatypes.html"],["Code lab","code-lab.html"]] },

{ part:"Data and strings", s:"2", t:"String functions",
  say:"strlen counts, strtoupper shouts, trim cleans, substr cuts, strpos finds.",
  show:"<?php\n$s = \"  php is fun  \";\necho strtoupper(trim($s));",
  her:"Clean a messy name and print it with a capital letter.",
  trap:"strpos returns 0 when it matches at the start, and 0 is falsy. Use !== false.",
  go:[["Lesson 2","app/lessons/datatypes.html"],["Flashcards","flashcards.html?deck=strings"]] },

{ part:"Data and strings", s:"2", t:"Type juggling",
  say:"PHP converts silently and aggressively. \"15\" + 27 is 42 and nobody warns you.",
  show:"<?php\necho \"sam\" + 25;   // 25\necho \"sam\" . 25;   // sam25",
  her:"Predict four conversions, then check with var_dump.",
  trap:"Treat it as a feature to know, not to rely on. Everything from a form is a string.",
  go:[["Lesson 2","app/lessons/datatypes.html"]] },

/* ===================== PART 3 - operators ===================== */
{ part:"Operators", s:"3", t:"Arithmetic",
  say:"+ - * / and % — three families: maths, comparison, logic. These are the maths ones.",
  show:"<?php\n$a = 24; $b = 7;\necho $a + $b;\necho $a / $b;",
  her:"Four results from two variables, each on its own line.",
  go:[["Lesson 3","app/lessons/operators.html"],["Problem sheet","php-problems.html?p=p1a"]] },

{ part:"Operators", s:"3", t:"Modulus",
  say:"% gives the remainder. 14 % 2 is 0, 15 % 2 is 1. That is how you ask \"is it even?\".",
  draw:"15 ÷ 2 = 7 remainder 1. Circle the 1.",
  show:"<?php\nif ($n % 2 == 0) { echo \"EVEN\"; } else { echo \"ODD\"; }",
  her:"The smart plug problem — it is one line of thinking and a whole exam question.",
  go:[["Lesson 3","app/lessons/operators.html"],["Problem 3","php-problems.html?p=p3"]] },

{ part:"Operators", s:"3", t:"== against ===",
  say:"== asks if they look the same after PHP converts them. === asks if they really are the same.",
  show:"<?php\nvar_dump(123 == \"123\");    // true\nvar_dump(123 === \"123\");   // false",
  her:"Four comparisons, predicted then checked.",
  trap:"= is not a comparison at all. It puts a value in. Draw the three lengths: = == ===.",
  go:[["Lesson 3","app/lessons/operators.html"],["Flashcards","flashcards.html?deck=syntax"]] },

{ part:"Operators", s:"3", t:"Logic and precedence",
  say:"&& means both, || means either, ! flips it. Multiply happens before add — brackets settle every argument.",
  show:"<?php\nif ($grade >= 10 && $attendance >= 75) { echo \"Passed\"; }",
  her:"One rule with two conditions, written as a sentence first and then as code.",
  trap:"Reaching for brackets is never wrong. Teach the habit, not the precedence table.",
  go:[["Lesson 3","app/lessons/operators.html"]] },

/* ===================== PART 4 - decisions ===================== */
{ part:"Making decisions", s:"4", t:"if and else",
  say:"If this is true do that, otherwise do the other thing. One of the two always runs.",
  draw:"The diamond from session 0A again, next to the code. Same shape, different notation.",
  show:"<?php\nif ($age >= 18) {\n    echo \"adult\";\n} else {\n    echo \"child\";\n}",
  her:"The pass/fail rule she wrote in pseudocode on day one, now in PHP.",
  trap:"if ($x = 5) assigns and is always true. The classic. Show it deliberately.",
  go:[["Lesson 4","app/lessons/conditions.html"],["Mini-quiz","app/quiz.html?q=lesson-04"]] },

{ part:"Making decisions", s:"4", t:"The elseif ladder",
  say:"Tested top down, and it stops at the first one that matches. So each band only names its lower edge.",
  draw:"A staircase, each step labelled with its boundary.",
  show:"<?php\nif ($m >= 18) { $g = \"A\"; }\nelseif ($m >= 16) { $g = \"B\"; }\nelseif ($m >= 10) { $g = \"D\"; }\nelse { $g = \"F\"; }",
  her:"Grade bands, then test the boundary marks on purpose — 18 and 10, not 17 and 11.",
  trap:"Writing the ladder upside down. Put 10 first and everything above it comes out D.",
  go:[["Lesson 4","app/lessons/conditions.html"],["Extra 7","php-problems.html?p=x7"]] },

{ part:"Making decisions", s:"4", t:"Holding the best so far",
  say:"To find the biggest, assume the first one is it, then replace it every time you meet something better.",
  draw:"Five boxes in a row and one labelled HIGHEST above them, being crossed out and rewritten.",
  her:"The price filter — five prices, no min() and no max().",
  trap:"Starting $lowest at 0. Nothing is ever below zero, so the answer is always 0.",
  go:[["Problem 2","php-problems.html?p=p2"],["Extra 2","php-problems.html?p=x2"]] },

{ part:"Making decisions", s:"4", t:"isset and empty",
  say:"isset asks whether something exists at all. You need it the moment anything comes from outside.",
  show:"<?php\nif (isset($_POST[\"Sum\"])) {\n    // the form was submitted\n}",
  her:"Say out loud what isset is protecting against before she writes it.",
  go:[["Lesson 4","app/lessons/conditions.html"]] },

/* ===================== PART 5 - loops ===================== */
{ part:"Loops", s:"5", t:"The three parts of a loop",
  say:"Every loop has three parts: where it starts, how long it carries on, and what changes each pass. Miss the third and it never ends.",
  draw:"for ($i = 1; $i <= 5; $i++) with each of the three parts labelled underneath.",
  show:"<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i;\n}",
  her:"Count 1 to 5, then 5 down to 1. The second one is three changes, not one.",
  trap:"Forgetting the $i++ hangs the page. Do it once on purpose so the symptom is familiar.",
  go:[["Lesson 5","app/lessons/loops.html"],["Code lab","code-lab.html"]] },

{ part:"Loops", s:"5", t:"while and do-while",
  say:"while tests before the first pass, so it can run zero times. do-while tests after, so it always runs at least once.",
  draw:"Two flowcharts side by side with the diamond at the top and at the bottom.",
  her:"Write the same countdown both ways and say which she would use for a menu.",
  go:[["Lesson 5","app/lessons/loops.html"]] },

{ part:"Loops", s:"5", t:"Trace a loop on paper",
  say:"Same skill as Euclid on day one. Write down every variable after every pass.",
  draw:"A table: pass number, $i, total. Fill it together for the first three rows.",
  her:"She fills the rest without running it, then runs it to check.",
  go:[["Lesson 5","app/lessons/loops.html"],["Whiteboard","whiteboard.html"]] },

{ part:"Loops", s:"5", t:"Loops that build HTML",
  say:"The header row goes outside the loop. The data rows go inside. That is the whole trick.",
  show:"<?php\necho \"<table>\";\nfor ($n = 0; $n <= 5; $n++) {\n    echo \"<tr><td>$n</td><td>\" . ($n * $n) . \"</td></tr>\";\n}\necho \"</table>\";",
  her:"The squares-and-cubes table, then the pricing tiers — same machine, different numbers.",
  trap:"Printing the header inside the loop. Six header rows and a confused student.",
  go:[["Problem 4","php-problems.html?p=p4"],["Problem 5","php-problems.html?p=p5"]] },

{ part:"Loops", s:"5", t:"break and continue",
  say:"break leaves the loop now. continue skips the rest of this pass and starts the next.",
  show:"<?php\nfor ($i = 1; $i <= 10; $i++) {\n    if ($i % 2 == 0) continue;\n    if ($i == 7) break;\n    echo $i;\n}",
  her:"Predict the output before running it.",
  go:[["Lesson 5","app/lessons/loops.html"],["Mini-quiz","app/quiz.html?q=lesson-05"]] },

/* ===================== PART 6 - arrays ===================== */
{ part:"Arrays", s:"6", t:"An array is a row of boxes",
  say:"One name, many values, each with a number. The numbering starts at zero.",
  draw:"Five boxes in a row, numbered 0 1 2 3 4 underneath, not 1 2 3 4 5. Do this before any code.",
  show:"<?php\n$fruit = [\"apple\", \"pear\", \"fig\"];\necho $fruit[0];   // apple",
  her:"Reach into the array and pull out the last one — and notice it is [2], not [3].",
  trap:"Off by one, every time, for the first week. The drawing is what fixes it.",
  go:[["Lesson 6","app/lessons/arrays.html"],["Flashcards","flashcards.html?deck=arrays"]] },

{ part:"Arrays", s:"6", t:"foreach",
  say:"Go through every item, one at a time, without counting anything yourself.",
  show:"<?php\nforeach ($fruit as $f) {\n    echo $f;\n}",
  her:"Print a list with a for loop, then the same list with foreach, and say which she prefers.",
  go:[["Lesson 6","app/lessons/arrays.html"],["Code lab","code-lab.html"]] },

{ part:"Arrays", s:"6", t:"Keys instead of numbers",
  say:"An associative array labels the boxes with words instead of numbers. $_POST is one of these.",
  draw:"The same row of boxes, but with \"name\", \"age\", \"city\" written under them.",
  show:"<?php\n$student = [\"name\" => \"Fatima\", \"age\" => 20];\necho $student[\"name\"];",
  her:"Build one, then walk it with foreach ($a as $key => $value).",
  trap:"This is the step that makes $_POST[\"FN\"] stop being magic. Say so explicitly.",
  go:[["Lesson 6","app/lessons/arrays.html"],["Mini-quiz","app/quiz.html?q=lesson-06"]] },

{ part:"Arrays", s:"6", t:"Array functions",
  say:"count, array_sum, sort, in_array, implode. Know they exist; look up the rest.",
  her:"Total a list of prices two ways: with a loop, and with array_sum.",
  go:[["Lesson 6","app/lessons/arrays.html"],["Flashcards","flashcards.html?deck=arrays"]] },

/* ===================== PART 7 - functions ===================== */
{ part:"Functions", s:"7", t:"Define once, call many times",
  say:"A named piece of code you can run whenever you want, with different values each time.",
  draw:"A box with an arrow going in and an arrow coming out. Label them parameter and return.",
  show:"<?php\nfunction greet($name) {\n    return \"Hello \" . $name;\n}\necho greet(\"Fatima\");",
  her:"Write one that takes a price and returns it with tax added.",
  go:[["Lesson 7","app/lessons/functions.html"],["Code lab","code-lab.html"]] },

{ part:"Functions", s:"7", t:"return against echo",
  say:"echo prints and the value is gone. return hands it back so you can use it again.",
  show:"<?php\nfunction a() { echo 5; }\nfunction b() { return 5; }\necho b() * 2;   // 10",
  her:"Write both, then try to multiply the result of each. One of them will not work.",
  trap:"This is the whole topic. Spend the time here and the rest is easy.",
  go:[["Lesson 7","app/lessons/functions.html"],["Mini-quiz","app/quiz.html?q=lesson-07"]] },

{ part:"Functions", s:"7", t:"Scope and defaults",
  say:"A variable made inside a function does not exist outside it. A parameter can have a default.",
  show:"<?php\nfunction discount($price, $percent = 10) {\n    return $price - ($price * $percent / 100);\n}",
  her:"Call it with one argument and then with two.",
  go:[["Lesson 7","app/lessons/functions.html"]] },

/* ===================== PART 8 - forms ===================== */
{ part:"Forms", s:"8", t:"The round trip",
  say:"The page runs twice. Once to show the form, and again — the same file — when she presses the button.",
  draw:"Six numbered steps between browser and server. Do this before a single line of code.",
  her:"Tell you which of the six steps belong to the browser and which to the server.",
  trap:"Everything strange about a form file comes from the page running twice. Say it, draw it, repeat it.",
  go:[["Lesson 8","app/lessons/forms.html"],["Whiteboard","whiteboard.html"]] },

{ part:"Forms", s:"8", t:"The form tag",
  say:"action is which file receives it. method is how it travels — POST hidden, GET in the address bar.",
  show:"<form action=\"\" method=\"POST\">\n  <input type=\"number\" name=\"FN\">\n  <input type=\"submit\" name=\"Sum\" value=\"Add\">\n</form>",
  her:"Build the form by hand, then submit it and look at the address bar with GET and with POST.",
  trap:"type=\"button\" does nothing. It must be type=\"submit\".",
  go:[["Lesson 8","app/lessons/forms.html"]] },

{ part:"Forms", s:"8", t:"name= is the only thing PHP sees",
  say:"name becomes the key in $_POST. id is for CSS and JavaScript, and the server never sees it.",
  draw:"The input tag written out big, with an arrow from name=\"FN\" to $_POST[\"FN\"].",
  her:"Ask her which of the two words the server knows about. Wait for the answer.",
  trap:"A missing name= sends nothing and reports nothing. Silent, and very common.",
  go:[["Lesson 8","app/lessons/forms.html"],["Problem 1C","php-problems.html?p=p1c"]] },

{ part:"Forms", s:"8", t:"Reading the form",
  say:"$_POST is an associative array that PHP fills in for you. isset tells you which run this is.",
  show:"<?php\nif (isset($_POST[\"Sum\"])) {\n    $a = $_POST[\"FN\"];\n    $b = $_POST[\"SN\"];\n    echo \"The result = \" . ($a + $b);\n}",
  her:"The lecturer's calculator, from scratch, three ways: fixed numbers, then GET, then POST.",
  trap:"Everything in $_POST is a string. Arithmetic converts it; joining does not.",
  go:[["Problem 1A","php-problems.html?p=p1a"],["Problem 1C","php-problems.html?p=p1c"]] },

{ part:"Forms", s:"8", t:"Validation and sticky values",
  say:"Never trust what was typed. Check it exists, check it is a number, check it is in range — then use it.",
  show:"<?php\nif (is_numeric($r) && $r > 0) {\n    // safe to use\n} else {\n    echo \"Please enter a positive number.\";\n}",
  her:"The circle and sphere exercise, part 2 — the part that copes with an empty box.",
  trap:"She will test with good input only. Make her submit an empty form on purpose.",
  go:[["Slides B","php-problems.html?p=d2"],["Mini-quiz","app/quiz.html?q=lesson-08"]] },

/* ===================== PART 9 - MySQL ===================== */
{ part:"MySQL", s:"9", t:"What a database is",
  say:"A table is a spreadsheet the server owns. Rows are records, columns are fields, and one column identifies each row.",
  draw:"A grid with headers, three rows, and the id column shaded.",
  her:"Name the rows and columns of a students table before touching phpMyAdmin.",
  go:[["Lesson 9","app/lessons/mysql.html"],["SQL lab","sql-lab.html"]] },

{ part:"MySQL", s:"9", t:"Start MySQL, then connect",
  say:"Press Start next to MySQL as well as Apache. Then three lines connect PHP to it.",
  show:"<?php\n$conn = new mysqli(\"localhost\", \"root\", \"\", \"school\");\nif ($conn->connect_error) {\n    die(\"Failed: \" . $conn->connect_error);\n}",
  her:"Connect, break it on purpose by misspelling the database name, and read the error.",
  trap:"Forgetting to start MySQL. The error message does say so — teach her to read it.",
  go:[["Lesson 9","app/lessons/mysql.html"]] },

{ part:"MySQL", s:"9", t:"SELECT",
  say:"SELECT which columns, FROM which table, WHERE which rows, ORDER BY which column.",
  show:"SELECT name, grade FROM students WHERE grade >= 10 ORDER BY grade DESC;",
  her:"Six queries in the SQL lab, graded on the rows that come back, not on the wording.",
  go:[["SQL lab","sql-lab.html"],["Flashcards","flashcards.html?deck=sql"]] },

{ part:"MySQL", s:"9", t:"Showing the rows on a page",
  say:"Run the query, then loop the result exactly like any other list.",
  show:"<?php\n$res = $conn->query(\"SELECT * FROM students\");\nwhile ($row = $res->fetch_assoc()) {\n    echo $row[\"name\"];\n}",
  her:"Print a table of students — which is the loop from session 5 and the array from session 6, together.",
  trap:"$row is an associative array. If session 6 landed, this is five minutes.",
  go:[["Lesson 9","app/lessons/mysql.html"],["Mini-quiz","app/quiz.html?q=lesson-09"]] },

/* ===================== PART 10 - putting it together ===================== */
{ part:"Dynamic pages", s:"10", t:"Writing to the database",
  say:"INSERT adds, UPDATE changes, DELETE removes. Every one of them needs a WHERE except INSERT.",
  show:"INSERT INTO students (name, grade) VALUES ('Fatima', 17);\nUPDATE students SET grade = 18 WHERE id = 3;",
  her:"Add a row, change it, then delete it — and watch what UPDATE without WHERE would do.",
  trap:"UPDATE with no WHERE changes every row. Say it before she writes one.",
  go:[["Lesson 10","app/lessons/dynamic.html"],["SQL lab","sql-lab.html"]] },

{ part:"Dynamic pages", s:"10", t:"List page and detail page",
  say:"One page lists everything with a link per row; the link carries an id; the second page shows that one.",
  draw:"Two rectangles, with an arrow labelled ?id=3 between them.",
  show:"<a href=\"detail.php?id=<?= $row['id'] ?>\">view</a>",
  her:"Build both pages. This is the shape of nearly every website she has ever used.",
  go:[["Lesson 10","app/lessons/dynamic.html"]] },

{ part:"Dynamic pages", s:"10", t:"The whole thing at once",
  say:"A form takes input, PHP checks it, SQL stores it, a loop shows it. Every topic in this list, in one file.",
  her:"The final project, then the exam simulator under time.",
  trap:"If a piece fails here, it is not a new topic — it is an old one that never fully landed. Go back to that session.",
  go:[["Lesson 10","app/lessons/dynamic.html"],["Exam simulator","exam-simulator.html"]] }

];
