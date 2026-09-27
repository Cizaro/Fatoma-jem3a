/* ============================================================
   Mini-quizzes, lessons 0A to 5.

   Question types:
     text   one box.            a:[exact-ish]  must:[all of these]  any:[one of these]
     choice one right option.
     multi  several right options, "tick all that apply".
     fields several boxes IN ORDER, each with its own accepted answers.
     set    several boxes in ANY order; each must match a different group.
     open   cannot be marked by a machine. Shows the model answer and she
            says whether she got it. Used only where the answer is a
            paragraph or a piece of pseudocode with many correct forms.

   Marking is deliberately generous: answers are lowercased, spaces are
   collapsed and a trailing semicolon is ignored, because this is a recall
   check, not a spelling test.
   ============================================================ */
window.QUIZZES = window.QUIZZES || {};

QUIZZES["lesson-00-algorithms"] = {
  title: "Algorithms, flowcharts and pseudocode",
  lesson: "algorithms",
  note: "MIT320 Lesson 1. No PHP in any of it.",
  qs: [
    { t: "text", q: "Define an algorithm in one sentence.",
      must: ["step"], any: ["solve", "problem"],
      model: "A step-by-step procedure for solving a problem.",
      explain: "Any wording with “steps” and “solve a problem” in it is fine." },

    { t: "set", q: "An algorithm must do three things to count as one. Name them.",
      groups: [
        { any: ["data", "input", "something to work on"], label: "it has data to work on" },
        { any: ["result", "output", "answer"], label: "it produces at least one result" },
        { any: ["terminate", "stop", "end", "finite"], label: "it stops after a finite number of steps" }
      ],
      explain: "The third is the interesting one. A loop where nothing changes is not a slow algorithm, it is not an algorithm." },

    { t: "fields", q: "Name the six phases of the Program Development Life Cycle, in order.",
      rows: [
        { label: "1", any: ["problem definition", "definition", "define the problem"] },
        { label: "2", any: ["problem analysis", "analysis", "analyse", "analyze"] },
        { label: "3", any: ["algorithm development", "algorithm"] },
        { label: "4", any: ["coding", "code", "documentation"] },
        { label: "5", any: ["testing", "test", "debug"] },
        { label: "6", any: ["maintenance", "maintain"] }
      ],
      explain: "Coding is phase 4 of 6. Most of the work happens before you type." },

    { t: "fields", q: "Two kinds of mistake. Which is which?",
      rows: [
        { label: "PHP cannot read it and refuses to run", any: ["syntax"] },
        { label: "It runs fine and gives the wrong answer", any: ["logic"] }
      ],
      explain: "A syntax error tells you the line. A logic error tells you nothing, which is why you test." },

    { t: "open", q: "Write an algorithm to log in to your school email account. No maths in this one.",
      model: "1. Go to the school website\n2. Click the Office 365 for Students and Teachers link\n3. Enter the email ID and the password\n4. Click Sign in",
      criteria: ["every step is a single action", "they are in the order you would really do them",
                 "it stops when the task is done", "nothing is so vague that someone would have to ask you a question"],
      rows: 5 },

    { t: "fields", q: "Which flowchart symbol is used for each job?",
      rows: [
        { label: "Start of the program", any: ["oval", "terminal", "rounded"] },
        { label: "Reading a number in", any: ["parallelogram", "leaning"] },
        { label: "Working out an average", any: ["rectangle", "box", "process"] },
        { label: "Deciding if A is bigger than B", any: ["diamond", "decision"] }
      ],
      explain: "A decision is always a diamond. Putting it in a rectangle loses the mark." },

    { t: "set", q: "Two rules every flowchart must obey. What are they?",
      groups: [
        { any: ["start", "stop", "begin"], label: "it must have a Start AND a Stop" },
        { any: ["connect", "hanging", "joined", "join"], label: "every step must connect, nothing left hanging" }
      ],
      explain: "Both are easy to check before you hand the paper in, and easy to lose a mark on." },

    { t: "open", q: "Write this as pseudocode, using your lecturer's notation: read two marks, average them, if the average is 50 or more print PASS, otherwise print FAIL.",
      model: "Input M1, M2\nAVG <-- (M1 + M2) / 2\nif (AVG >= 50) then\n    Print \"PASS\"\nelse\n    Print \"FAIL\"\nendif",
      criteria: ["both marks read in", "the arrow for assignment, not =",
                 "the condition the right way round", "both branches, and endif"],
      rows: 7 },

    { t: "fields", q: "In pseudocode, what is the difference between <-- and = ?",
      rows: [
        { label: "<--", any: ["assign", "put", "store", "puts a value", "value into"] },
        { label: "=", any: ["equal", "compare", "same", "asks", "check"] }
      ],
      explain: "In PHP they become = and ==, which is the swap that catches everybody." },

    { t: "fields", q: "Trace Euclid's GCD for A = 20, B = 12. Start is X=20, Y=12.",
      rows: [
        { label: "Step 1 — X", a: ["8"] }, { label: "Step 1 — Y", a: ["12"] },
        { label: "Step 2 — X", a: ["8"] }, { label: "Step 2 — Y", a: ["4"] },
        { label: "Step 3 — X", a: ["4"] }, { label: "Step 3 — Y", a: ["4"] },
        { label: "GCD", a: ["4"] }
      ],
      explain: "4 divides 20 five times and 12 three times, and nothing bigger does both." }
  ]
};

QUIZZES["lesson-01"] = {
  title: "echo, variables, comments", lesson: "basics",
  qs: [
    { t: "text", q: "What does echo do?",
      any: ["print", "output", "display", "shows"],
      model: "Prints or outputs something to the page or terminal." },

    { t: "multi", q: "Tick the valid variable names.",
      opts: ["$name", "age", "$2fast", "$my_age", "$myAge", "$my age"],
      correct: [0, 3, 4],
      explain: "age has no $, $2fast starts with a digit, and $my age has a space in it." },

    { t: "text", q: "What does this print?", code: "$city = \"Tyre\";\necho \"I love $city\";",
      a: ["i love tyre"], explain: "Double quotes read the variable." },

    { t: "text", q: "And this one?", code: "$city = \"Tyre\";\necho 'I love $city';",
      a: ["i love $city"], explain: "Single quotes are literal. They print the dollar sign itself." },

    { t: "fields", q: "What is printed here, and why?", code: "$x = 3;\n$x = 8;\necho $x;",
      rows: [
        { label: "Prints", a: ["8"] },
        { label: "Why", any: ["last", "overwrit", "replaced", "only keeps", "second"] }
      ],
      explain: "A variable only ever keeps the last value put into it." },

    { t: "text", q: "Write one line that joins $a = \"Good\" and $b = \"Night\" into Good Night.",
      code: null, mono: true,
      must: ["echo"], any: ["$a . \" \" . $b", "\"$a $b\"", "$a.\" \".$b", "$a . ' ' . $b"],
      model: "echo $a . \" \" . $b;   (or echo \"$a $b\";)" },

    { t: "set", q: "There are 2 mistakes here. Name them.",
      code: "$name = \"Rana\"\necho \"Hi $nmae\";",
      groups: [
        { any: ["semicolon", ";", "missing ;"], label: "missing semicolon on line 1" },
        { any: ["nmae", "typo", "spell", "misspell"], label: "$nmae is a typo for $name" }
      ] },

    { t: "text", q: "Write a comment in PHP that says: this is my first program",
      mono: true, any: ["//", "#", "/*"],
      must: ["this is my first program"],
      model: "// this is my first program" }
  ]
};

QUIZZES["lesson-02"] = {
  title: "Data types and strings", lesson: "datatypes",
  qs: [
    { t: "fields", q: "Name the type of each value.",
      rows: [
        { label: "\"Rana\"", any: ["string", "str", "text"] },
        { label: "19", any: ["int", "integer", "number"] },
        { label: "14.5", any: ["float", "double", "decimal"] },
        { label: "true", any: ["bool", "boolean"] },
        { label: "\"19\"", any: ["string", "str", "text"] }
      ],
      explain: "The last one is the interesting one: it is in quotes, so it is text even though it looks like a number." },

    { t: "choice", q: "Which function tells you the value AND the type?",
      opts: ["echo", "print", "var_dump", "count"], correct: 2 },

    { t: "text", q: "What does strlen(\"Beirut\") give?", a: ["6"] },

    { t: "text", q: "What does echo false; print?",
      any: ["nothing", "empty", "blank"],
      model: "Nothing at all. That is exactly why we use var_dump()." },

    { t: "fields", q: "Predict each one.",
      rows: [
        { label: "echo 10 % 4;", a: ["2"] },
        { label: "echo \"3\" + 4;", a: ["7"] },
        { label: "echo \"3\" . 4;", a: ["34"] },
        { label: "echo round(2.6);", a: ["3"] }
      ],
      explain: "+ adds, . glues. That is the whole difference." },

    { t: "text", q: "$word = \"hello\"; — write the code that prints HELLO.",
      mono: true, must: ["strtoupper", "$word"], model: "echo strtoupper($word);" },

    { t: "text", q: "$price = 80; — write the code that prints the price after a 25% discount. It should print 60.",
      mono: true, must: ["$price"], any: ["* 25 / 100", "*25/100", "0.75", ".75"],
      model: "echo $price - ($price * 25 / 100);   (or $price * 0.75)" },

    { t: "text", q: "In the word \"Fatima\", what position is the letter t?",
      a: ["2"], explain: "Counting starts at 0, so F=0, a=1, t=2." }
  ]
};

QUIZZES["lesson-03"] = {
  title: "Operators", lesson: "operators",
  qs: [
    { t: "fields", q: "Explain the difference, one sentence each.",
      rows: [
        { label: "=", any: ["put", "assign", "store", "value into", "gives"] },
        { label: "==", any: ["equal", "compare", "same", "asks", "check"] }
      ] },

    { t: "fields", q: "Fill the table.",
      rows: [
        { label: "7 + 3 * 2", a: ["13"] },
        { label: "(7 + 3) * 2", a: ["20"] },
        { label: "7 % 3", a: ["1"] },
        { label: "2 ** 3", a: ["8"] }
      ],
      explain: "Multiply before add, unless brackets say otherwise." },

    { t: "text", q: "$x = 20; then $x -= 5; then $x *= 2; — what is $x?",
      a: ["30"], explain: "20 − 5 = 15, then × 2 = 30." },

    { t: "fields", q: "True or false?",
      rows: [
        { label: "5 == \"5\"", any: ["true", "t", "yes"] },
        { label: "5 === \"5\"", any: ["false", "f", "no"] },
        { label: "5 != 4", any: ["true", "t", "yes"] }
      ],
      explain: "== ignores the type. === checks the type too." },

    { t: "text", q: "$i = 7; — what does $i++ do to it?",
      any: ["8", "adds 1", "add one", "increment"],
      model: "It adds 1, so $i becomes 8." },

    { t: "text", q: "Write the condition: the person is 18 or older AND has a passport. Use $age and $hasPassport.",
      mono: true, must: ["$age", ">= 18", "&&", "$haspassport"],
      model: "$age >= 18 && $hasPassport" },

    { t: "text", q: "Write the condition: it is Saturday OR it is Sunday. Use $day.",
      mono: true, must: ["$day", "saturday", "sunday", "||"],
      model: "$day == \"Saturday\" || $day == \"Sunday\"" },

    { t: "text", q: "Rewrite as a ternary: if ($mark >= 10) $result = \"Pass\"; else $result = \"Fail\";",
      mono: true, must: ["$mark", ">= 10", "?", ":", "pass", "fail"],
      model: "$result = ($mark >= 10) ? \"Pass\" : \"Fail\";" }
  ]
};

QUIZZES["lesson-04"] = {
  title: "Making decisions", lesson: "conditions",
  qs: [
    { t: "fields", q: "What goes in each kind of bracket on an if?",
      rows: [
        { label: "Round ( )", any: ["condition", "question", "test", "comparison"] },
        { label: "Curly { }", any: ["code", "body", "runs", "statements", "what happens"] }
      ] },

    { t: "fields", q: "What does this print, and why is it a bug?",
      code: "$mark = 19;\nif ($mark >= 10) {\n    echo \"Pass\";\n} elseif ($mark >= 18) {\n    echo \"Excellent\";\n}",
      rows: [
        { label: "Prints", a: ["pass"] },
        { label: "The bug", any: ["order", "first", "unreachable", "strictest", "never runs"] }
      ],
      explain: "PHP stops at the first true branch, so Excellent can never run. Strictest condition first." },

    { t: "multi", q: "Which of these are FALSE in PHP? Tick them.",
      opts: ["0", "\"0\"", "\"hello\"", "\"\"", "-1", "\"false\""],
      correct: [0, 1, 3],
      explain: "\"false\" is a non-empty string, so it is true. -1 is not zero, so it is true too." },

    { t: "fields", q: "What is missing here, and what happens without it?",
      code: "switch ($fruit) {\n    case \"apple\":\n        echo \"red\";\n    case \"lemon\":\n        echo \"yellow\";\n}",
      rows: [
        { label: "Missing", any: ["break"] },
        { label: "Without it", any: ["fall", "redyellow", "both", "carries on", "continues"] }
      ] },

    { t: "text", q: "Spot the bug.", code: "if ($age > 18);\n{\n    echo \"adult\";\n}",
      any: ["semicolon", "empty", "always runs", "stray"],
      model: "The ; right after the if(...) ends the statement, so the block is no longer attached and always runs." },

    { t: "text", q: "Write an if/else that prints Even or Odd for $n.",
      mono: true, must: ["$n", "% 2", "even", "odd", "else"],
      model: "if ($n % 2 == 0) { echo \"Even\"; } else { echo \"Odd\"; }" },

    { t: "fields", q: "Put these in the correct order for a grading if chain: >= 10 · >= 16 · >= 18 · >= 14",
      rows: [
        { label: "first", a: [">= 18", ">=18"] },
        { label: "then", a: [">= 16", ">=16"] },
        { label: "then", a: [">= 14", ">=14"] },
        { label: "last", a: [">= 10", ">=10"] }
      ],
      explain: "PHP takes the first true branch, so the hardest condition has to be checked first." },

    { t: "text", q: "When do you use switch instead of if?",
      any: ["exact", "several values", "many values", "one variable", "list of values"],
      model: "When comparing one variable against several exact values. Use if for ranges." }
  ]
};

QUIZZES["lesson-05"] = {
  title: "Loops", lesson: "loops",
  qs: [
    { t: "fields", q: "Name the three parts inside for ( ; ; ) and when each one runs.",
      rows: [
        { label: "Part 1", any: ["start", "$i = 0", "initial", "once"] },
        { label: "Part 2", any: ["condition", "check", "before every", "test"] },
        { label: "Part 3", any: ["step", "$i++", "change", "after every", "increment"] }
      ],
      explain: "Start runs once. Condition runs before every round. Step runs after every round." },

    { t: "text", q: "How many times does the body run?", code: "for ($i = 0; $i < 4; $i++) { }",
      a: ["4"], explain: "0, 1, 2, 3. Four rounds." },

    { t: "text", q: "What does this print?", code: "for ($i = 3; $i >= 1; $i--) {\n    echo $i;\n}",
      a: ["321"] },

    { t: "fields", q: "What is wrong here, and what happens if you run it?",
      code: "$n = 1;\nwhile ($n <= 3) {\n    echo $n;\n}",
      rows: [
        { label: "Wrong", any: ["nothing changes", "$n never", "no increment", "never changes", "$n++"] },
        { label: "Happens", any: ["infinite", "forever", "freez", "never stops", "hangs"] }
      ],
      explain: "Ctrl + C stops it." },

    { t: "fields", q: "Difference between break and continue.",
      rows: [
        { label: "break", any: ["leaves", "stops the loop", "exits", "out of the loop", "ends the loop"] },
        { label: "continue", any: ["skips", "next round", "current round", "jumps"] }
      ] },

    { t: "text", q: "What does this print?",
      code: "for ($i = 1; $i <= 6; $i++) {\n    if ($i == 4) break;\n    echo $i;\n}",
      a: ["123"] },

    { t: "text", q: "Write a loop that prints every even number from 2 to 10.",
      mono: true, must: ["for", "echo"], any: ["+= 2", "+=2", "% 2", "%2"],
      model: "for ($i = 2; $i <= 10; $i += 2) { echo $i . \" \"; }" },

    { t: "text", q: "In a nested loop, which one finishes first — the inner or the outer?",
      any: ["inner"],
      model: "The inner loop finishes completely for every single round of the outer one." }
  ]
};
