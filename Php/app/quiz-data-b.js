/* ============================================================
   Mini-quizzes, lessons 6 to 10. Same question types as
   quiz-data-a.js, which documents them.
   ============================================================ */
window.QUIZZES = window.QUIZZES || {};

QUIZZES["lesson-06"] = {
  title: "Arrays", lesson: "arrays",
  note: "This is the load-bearing one. Under 5 out of 8 means we redo arrays, not move on.",
  qs: [
    { t: "fields", q: "Given $a = [\"red\", \"green\", \"blue\"];",
      rows: [
        { label: "$a[0]", a: ["red"] },
        { label: "$a[2]", a: ["blue"] },
        { label: "count($a)", a: ["3"] },
        { label: "index of the LAST item", a: ["2"] }
      ],
      explain: "Three items, last index 2. Counting starts at zero." },

    { t: "text", q: "What happens if you write echo $a[3]; ?",
      any: ["warning", "undefined", "error", "no index", "does not exist", "notice"],
      model: "A warning: undefined array key 3. There is no index 3, the last one is 2." },

    { t: "text", q: "Write the line that adds \"yellow\" to the end of $a, without writing an index.",
      mono: true, must: ["$a[]", "yellow"], model: "$a[] = \"yellow\";" },

    { t: "text", q: "Given $user = [\"name\" => \"Rana\", \"age\" => 19]; \u2014 print the name.",
      mono: true, must: ["echo", "$user", "name"],
      model: "echo $user[\"name\"];" },

    { t: "text", q: "What is wrong with echo $user[name]; ?",
      any: ["quote", "constant", "\"name\""],
      model: "The key needs quotes. Without them PHP looks for a constant called name." },

    { t: "text", q: "Write a foreach that prints every colour in $a, one per line.",
      mono: true, must: ["foreach", "$a", "echo"],
      model: "foreach ($a as $colour) { echo $colour . \"\\n\"; }" },

    { t: "text", q: "What does this print?", code: "$n = [10, 20, 30];\necho array_sum($n) / count($n);",
      a: ["20"] },

    { t: "text", q: "Write the line that prints Sara.",
      code: "$class = [\n    [\"name\" => \"Rana\", \"grade\" => 15],\n    [\"name\" => \"Sara\", \"grade\" => 18],\n];",
      mono: true, must: ["$class", "1", "name"],
      model: "echo $class[1][\"name\"];" }
  ]
};

QUIZZES["lesson-07"] = {
  title: "Functions", lesson: "functions",
  qs: [
    { t: "text", q: "Write the smallest possible function called hello() that echoes Hi.",
      mono: true, must: ["function", "hello", "echo", "hi"],
      model: "function hello() { echo \"Hi\"; }" },

    { t: "text", q: "You wrote the function but nothing happened when you ran the file. Why?",
      any: ["call", "never called", "did not call", "calling"],
      model: "She defined it but never called it. Defining runs nothing." },

    { t: "text", q: "In function add($a, $b), what are $a and $b called?",
      any: ["parameter", "argument"], model: "Parameters." },

    { t: "text", q: "What is the difference between echo and return inside a function?",
      any: ["back", "hands", "gives", "store", "use"],
      model: "echo prints it and gives nothing back. return hands the value back so it can be stored or used in another calculation." },

    { t: "fields", q: "What does this print, and why?",
      code: "function f($n) {\n    return $n + 1;\n    echo \"done\";\n}\necho f(5);",
      rows: [
        { label: "Prints", a: ["6"] },
        { label: "Why", any: ["return ends", "stops", "never runs", "immediately", "exits"] }
      ],
      explain: "return ends the function immediately, so the echo is unreachable." },

    { t: "fields", q: "Why does this give an error, and how do you fix it?",
      code: "$x = 10;\nfunction show() {\n    echo $x;\n}\nshow();",
      rows: [
        { label: "Error because", any: ["scope", "cannot see", "can't see", "outside"] },
        { label: "Fix", any: ["pass", "parameter", "argument", "show($x)", "function show($x)"] }
      ],
      explain: "Scope. A function cannot see variables from outside itself, so pass it in." },

    { t: "text", q: "Write half($n) that RETURNS half of a number, then print half(50).",
      mono: true, must: ["function", "half", "return", "/ 2"],
      model: "function half($n) { return $n / 2; }\necho half(50);" },

    { t: "text", q: "What does the = 10 do in function discount($price, $percent = 10), and when is it used?",
      any: ["default", "when not passed", "if no", "missing"],
      model: "It is a default value, used when the caller does not pass that argument. discount(100) means 10%." }
  ]
};

QUIZZES["lesson-08"] = {
  title: "Forms", lesson: "forms",
  qs: [
    { t: "fields", q: "Label the three attributes.",
      code: "<form method=\"post\" action=\"save.php\">\n    <input type=\"text\" name=\"email\">\n</form>",
      rows: [
        { label: "method decides", any: ["how", "get or post", "travels", "sent"] },
        { label: "action decides", any: ["which file", "where", "receives", "page"] },
        { label: "name decides", any: ["key", "$_post", "read", "index"] }
      ] },

    { t: "text", q: "The form above is submitted. Write the PHP that reads the email.",
      mono: true, must: ["$_post", "email"], model: "$email = $_POST[\"email\"];" },

    { t: "fields", q: "GET and POST.",
      rows: [
        { label: "GET \u2014 where does the data go?", any: ["url", "address", "query"] },
        { label: "POST \u2014 where does the data go?", any: ["body", "request", "hidden", "not in the url"] },
        { label: "Which one for a password?", any: ["post"] }
      ] },

    { t: "set", q: "Your form sends but PHP says \u201cUndefined array key\u201d. Name two possible causes.",
      groups: [
        { any: ["no name", "name attribute", "missing name"], label: "the input has no name attribute" },
        { any: ["method", "get", "post", "mismatch", "spelt", "spelled", "typo", "different"],
          label: "the method and the superglobal do not match, or the name is spelled differently" }
      ] },

    { t: "text", q: "What does htmlspecialchars() do, and when must you use it?",
      any: ["entit", "harmless", "escape", "displayed", "not executed", "tags"],
      model: "It converts < > \" & into harmless entities so user text is displayed, not executed. Use it every single time you print something a user typed." },

    { t: "text", q: "Write the safe way to read a field that might not be there.",
      mono: true, must: ["$_post", "??"], model: "$name = $_POST[\"name\"] ?? \"\";" },

    { t: "text", q: "Why do we check the data again in PHP when the HTML already had required?",
      any: ["browser", "switched off", "bypass", "trust", "skipped", "client"],
      model: "HTML validation runs in the browser and can be switched off or bypassed entirely. Never trust the browser." },

    { t: "text", q: "What is if ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") for, and what breaks without it?",
      any: ["first visit", "before", "submitted", "undefined", "warning", "page loads"],
      model: "It stops the handling code running on the first visit, before anything was submitted. Without it you get undefined-key warnings the moment the page loads." }
  ]
};

QUIZZES["lesson-09"] = {
  title: "MySQL", lesson: "mysql",
  qs: [
    { t: "fields", q: "Match the database word to the Excel word.",
      rows: [
        { label: "table", any: ["sheet", "spreadsheet"] },
        { label: "row", any: ["row", "record", "line"] },
        { label: "column", any: ["column", "field"] }
      ] },

    { t: "text", q: "What does AUTO_INCREMENT PRIMARY KEY give you?",
      any: ["unique", "next number", "automatic", "identifies"],
      model: "MySQL gives every new row the next unique number automatically, and that number identifies the row. You never set it yourself." },

    { t: "fields", q: "Write the SQL for each.",
      rows: [
        { label: "Read every student", must: ["select", "students"] },
        { label: "Only grade 10 or more", must: ["where", "grade", "10"] },
        { label: "Sort by grade, biggest first", must: ["order by", "grade", "desc"] }
      ],
      explain: "SELECT * FROM students; \u00b7 ... WHERE grade >= 10; \u00b7 ... ORDER BY grade DESC;" },

    { t: "text", q: "Write the SQL that adds a student called Rana with grade 16.",
      mono: true, must: ["insert", "students", "rana", "16"],
      model: "INSERT INTO students (name, grade) VALUES ('Rana', 16);" },

    { t: "text", q: "What is the danger in DELETE FROM students; ?",
      any: ["where", "every row", "all rows", "whole table", "undo"],
      model: "No WHERE, so it deletes every row in the table, with no undo." },

    { t: "text", q: "Write the PHP loop that prints every row's name from $result.",
      mono: true, must: ["while", "fetch", "$row", "name"],
      model: "while ($row = mysqli_fetch_assoc($result)) { echo $row[\"name\"] . \"<br>\"; }" },

    { t: "fields", q: "What is wrong here, and what should replace it?",
      code: "mysqli_query($conn, \"SELECT * FROM users WHERE id = \" . $_GET[\"id\"]);",
      rows: [
        { label: "Wrong", any: ["injection", "sql injection", "glued", "not escaped", "unsafe"] },
        { label: "Replace with", any: ["prepared", "bind", "?", "placeholder"] }
      ] },

    { t: "text", q: "In mysqli_stmt_bind_param($stmt, \"si\", $name, $age) \u2014 what do s and i mean, and what must match?",
      any: ["string", "integer"],
      model: "s = string, i = integer. The number of letters must match the number of ? in the query, and their order must match the order of the variables." }
  ]
};

QUIZZES["lesson-10"] = {
  title: "Dynamic pages", lesson: "dynamic",
  qs: [
    { t: "text", q: "In one sentence: what is the difference between a static page and a dynamic page?",
      any: ["database", "builds", "same thing", "every time", "changes"],
      model: "A static page shows the same thing to everyone. A dynamic page builds itself from the database, or from input, every time it is opened." },

    { t: "fields", q: "Difference between include and require?",
      rows: [
        { label: "include", any: ["warn", "carries on", "continues", "keeps going"] },
        { label: "require", any: ["stop", "fatal", "halts", "ends"] }
      ] },

    { t: "text", q: "Why do we put the header in its own file?",
      any: ["once", "every page", "one place", "reuse", "change it in one"],
      model: "So it is written once and used by every page. Change the menu in one file and every page updates." },

    { t: "fields", q: "This link sends an id: <a href=\"detail.php?id=7\">. Read it safely.",
      rows: [
        { label: "The PHP", must: ["(int)", "$_get"] },
        { label: "Why the (int)", any: ["number", "harmless", "0", "injection", "forces"] }
      ],
      explain: "$id = (int)($_GET[\"id\"] ?? 0); so ?id=abc becomes a harmless 0." },

    { t: "fields", q: "Where do the % signs go in a LIKE search \u2014 in the SQL string or in the PHP variable?",
      rows: [
        { label: "Where", any: ["php", "variable", "the php variable"] },
        { label: "Why", any: ["?", "placeholder", "safe", "prepared", "only sees"] }
      ],
      explain: "$term = \"%\" . $search . \"%\"; The SQL only ever sees ?, which is what keeps it safe." },

    { t: "text", q: "The search finds nothing. What must the page show?",
      any: ["nothing found", "message", "no results", "friendly", "empty"],
      model: "A friendly \u201cnothing found\u201d message. Never a blank page, which looks broken." },

    { t: "text", q: "What do header(\"Location: index.php\"); and exit; do together, and why is the second needed?",
      any: ["stops", "rest", "script", "resubmit", "re-submit", "refresh"],
      model: "header() tells the browser to go elsewhere, exit stops the rest of the script running. The redirect also stops a refresh re-submitting the form." },

    { t: "set", q: "Name four of the rules that protect a dynamic page.",
      groups: [
        { any: ["prepared", "bind", "placeholder"], label: "prepared statements for every user value" },
        { any: ["htmlspecialchars", "escape", "special chars"], label: "htmlspecialchars() on every printed value" },
        { any: ["(int)", "int", "cast"], label: "(int) on every id from a URL" },
        { any: ["empty", "nothing found", "message", "redirect", "close"],
          label: "a friendly empty-result message, redirect after save, close the connection" }
      ] }
  ]
};
