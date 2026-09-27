/* ============================================================
   The teaching plan. Ahmad reads this on the call; Fatima never
   sees it. Kept as data so the page stays a renderer and a
   session can be reworded without touching any markup.

   Every session has the same five parts on purpose. A shape she
   can predict is a shape she can relax inside, and a shape you
   can run when you are tired.
   ============================================================ */

/* ---------- board sketches ----------
   The things worth drawing rather than saying. They use the
   palette variables, so they follow the theme and stay readable
   when the page is printed. */
const D = {};

D.server = `
<svg viewBox="0 0 580 200" role="img" aria-label="The browser asks, the server runs PHP, HTML comes back">
  <rect x="14" y="62" width="150" height="76" rx="10" class="bx"/>
  <text x="89" y="94" class="lb">Her browser</text>
  <text x="89" y="114" class="sm">Chrome</text>

  <rect x="392" y="52" width="170" height="96" rx="10" class="bx hot"/>
  <text x="477" y="84" class="lb">The server</text>
  <text x="477" y="104" class="sm">Apache + PHP</text>
  <text x="477" y="124" class="sm">(XAMPP)</text>

  <path d="M168 88 L386 78" class="ar"/>
  <text x="277" y="74" class="tag">"give me index.php"</text>

  <path d="M386 120 L168 112" class="ar"/>
  <text x="277" y="142" class="tag">plain HTML comes back</text>

  <text x="477" y="180" class="note">PHP runs HERE. Never on her laptop.</text>
</svg>`;

D.steps = `
<svg viewBox="0 0 580 200" role="img" aria-label="An algorithm is steps, stacked in order">
  <rect x="40" y="132" width="190" height="42" rx="7" class="bx"/>
  <text x="62" y="159" class="lb s">1</text><text x="96" y="159" class="sm a">boil the water</text>
  <rect x="70" y="84" width="190" height="42" rx="7" class="bx"/>
  <text x="92" y="111" class="lb s">2</text><text x="126" y="111" class="sm a">add the tea</text>
  <rect x="100" y="36" width="190" height="42" rx="7" class="bx"/>
  <text x="122" y="63" class="lb s">3</text><text x="156" y="63" class="sm a">wait 3 minutes</text>

  <text x="330" y="86" class="lb a">steps taken</text>
  <text x="330" y="112" class="lb a">to solve a problem</text>
  <text x="330" y="146" class="note a">in order &middot; it stops &middot; it gives an answer</text>
</svg>`;

D.symbols = `
<svg viewBox="0 0 580 170" role="img" aria-label="The five flowchart symbols">
  <rect x="16" y="40" width="96" height="42" rx="21" class="bx"/>
  <text x="64" y="66" class="sm">Start / Stop</text>
  <text x="64" y="104" class="note">oval</text>

  <path d="M144 40 L244 40 L228 82 L128 82 Z" class="bx"/>
  <text x="186" y="66" class="sm">Input / Print</text>
  <text x="186" y="104" class="note">parallelogram</text>

  <rect x="264" y="40" width="96" height="42" rx="4" class="bx"/>
  <text x="312" y="66" class="sm">Do a step</text>
  <text x="312" y="104" class="note">rectangle</text>

  <path d="M436 34 L482 61 L436 88 L390 61 Z" class="bx hot"/>
  <text x="436" y="66" class="sm">A &gt; B ?</text>
  <text x="436" y="104" class="note">diamond</text>

  <path d="M506 61 L562 61" class="ar"/>
  <text x="534" y="104" class="note">flow line</text>

  <text x="290" y="150" class="note">Two rules that cost marks: a Start AND a Stop, and nothing left unconnected.</text>
</svg>`;

D.decision = `
<svg viewBox="0 0 580 200" role="img" aria-label="A decision has exactly two ways out">
  <path d="M290 16 L370 56 L290 96 L210 56 Z" class="bx hot"/>
  <text x="290" y="62" class="sm">is A &gt; B ?</text>

  <path d="M210 56 L120 56 L120 118" class="ar"/>
  <text x="158" y="46" class="tag">yes</text>
  <path d="M370 56 L460 56 L460 118" class="ar"/>
  <text x="424" y="46" class="tag">no</text>

  <rect x="56" y="122" width="128" height="42" rx="4" class="bx"/>
  <text x="120" y="148" class="sm">Print A</text>
  <rect x="396" y="122" width="128" height="42" rx="4" class="bx"/>
  <text x="460" y="148" class="sm">Print B</text>

  <text x="290" y="190" class="note">Only one side ever runs. That is the whole idea of if / else.</text>
</svg>`;

D.trace = `
<svg viewBox="0 0 580 190" role="img" aria-label="Tracing Euclid by hand, 48 and 18">
  <text x="60" y="30" class="lb s">X</text><text x="150" y="30" class="lb s">Y</text>
  <text x="250" y="28" class="note a">keep taking the smaller</text>
  <text x="250" y="48" class="note a">off the bigger</text>
  <line x1="30" y1="40" x2="200" y2="40" class="rule"/>
  <text x="60" y="68" class="sm">48</text><text x="150" y="68" class="sm">18</text>
  <text x="60" y="92" class="sm">30</text><text x="150" y="92" class="sm">18</text>
  <text x="60" y="116" class="sm">12</text><text x="150" y="116" class="sm">18</text>
  <text x="60" y="140" class="sm">12</text><text x="150" y="140" class="sm">6</text>
  <text x="60" y="166" class="sm hi">6</text><text x="150" y="166" class="sm hi">6</text>
  <text x="250" y="166" class="note a hi">equal, so the answer is 6</text>
</svg>`;

D.boxes = `
<svg viewBox="0 0 580 170" role="img" aria-label="An array is numbered boxes in a row">
  <text x="20" y="40" class="note a">$marks = [15, 12, 18, 9];</text>
  <rect x="20" y="56" width="80" height="54" rx="6" class="bx"/><text x="60" y="90" class="lb">15</text>
  <rect x="108" y="56" width="80" height="54" rx="6" class="bx"/><text x="148" y="90" class="lb">12</text>
  <rect x="196" y="56" width="80" height="54" rx="6" class="bx"/><text x="236" y="90" class="lb">18</text>
  <rect x="284" y="56" width="80" height="54" rx="6" class="bx"/><text x="324" y="90" class="lb">9</text>
  <text x="60" y="130" class="note">0</text><text x="148" y="130" class="note">1</text>
  <text x="236" y="130" class="note">2</text><text x="324" y="130" class="note">3</text>
  <text x="404" y="80" class="lb a hi">counting starts</text>
  <text x="404" y="104" class="lb a hi">at ZERO</text>
  <text x="20" y="158" class="note a">$marks[2] is 18. There is no $marks[4] &ndash; that is the error she will hit.</text>
</svg>`;

D.loop = `
<svg viewBox="0 0 580 180" role="img" aria-label="A loop's arrow goes back up">
  <rect x="180" y="14" width="150" height="36" rx="4" class="bx"/><text x="255" y="37" class="sm">$i = 1</text>
  <path d="M255 50 L255 66" class="ar"/>
  <path d="M255 70 L320 96 L255 122 L190 96 Z" class="bx hot"/>
  <text x="255" y="101" class="sm">$i &lt;= 3 ?</text>
  <path d="M320 96 L420 96" class="ar"/><text x="370" y="86" class="tag">no</text>
  <text x="452" y="101" class="sm">stop</text>
  <path d="M255 122 L255 142 L120 142 L120 32 L176 32" class="ar"/>
  <text x="128" y="166" class="note">yes: print, add 1, go back up</text>
  <text x="420" y="166" class="note a">no back-arrow = not a loop</text>
</svg>`;

D.form = `
<svg viewBox="0 0 580 180" role="img" aria-label="A form posts to a PHP page">
  <rect x="16" y="40" width="160" height="90" rx="8" class="bx"/>
  <text x="96" y="68" class="sm">form.html</text>
  <rect x="40" y="82" width="112" height="18" rx="4" class="bx thin"/>
  <text x="96" y="122" class="note">name="email"</text>

  <path d="M180 84 L370 84" class="ar"/>
  <text x="275" y="74" class="tag">method="post"</text>

  <rect x="374" y="40" width="190" height="90" rx="8" class="bx hot"/>
  <text x="469" y="68" class="sm">save.php</text>
  <text x="469" y="96" class="note">$_POST["email"]</text>
  <text x="469" y="118" class="note">the name= IS the key</text>
</svg>`;

D.db = `
<svg viewBox="0 0 580 180" role="img" aria-label="PHP talks to MySQL, the browser never does">
  <rect x="16" y="56" width="130" height="66" rx="8" class="bx"/>
  <text x="81" y="94" class="sm">Browser</text>
  <rect x="216" y="56" width="130" height="66" rx="8" class="bx hot"/>
  <text x="281" y="94" class="sm">PHP</text>
  <path d="M150 74 L212 74" class="ar"/><path d="M212 106 L150 106" class="ar"/>
  <ellipse cx="482" cy="66" rx="60" ry="14" class="bx"/>
  <path d="M422 66 L422 112 A60 14 0 0 0 542 112 L542 66" class="bx"/>
  <text x="482" y="102" class="sm">MySQL</text>
  <path d="M350 74 L418 74" class="ar"/><path d="M418 106 L350 106" class="ar"/>
  <text x="281" y="156" class="note">Only the middle box knows the password. That is why this is not JavaScript.</text>
</svg>`;

/* ---------- the sessions ---------- */
const SESSIONS = [
  {
    id: "0a", tag: "Session 0A", mins: "60 min", title: "Algorithms, flowcharts, pseudocode",
    lesson: "00-algorithms", deck: true,
    goal: "She can define an algorithm, name the PDLC phases, draw a legal flowchart, and trace Euclid by hand.",
    why: "This is her lecturer's actual Lesson 1 and there is no code in it. These are the cheapest marks on the paper — a flowchart cannot fail to compile. Teach it with a pen, not an editor.",
    boards: ["steps", "symbols", "decision", "trace"],
    beats: [
      { t: "0–5", h: "Set the frame",
        say: ["“Today we write no code at all. That is deliberate — it is how your lecturer starts, and it is the easiest part of the exam.”"],
        do:  ["Camera on, editor closed. Pen and paper at both ends."] },
      { t: "5–15", h: "What an algorithm is",
        say: ["Draw the stack. “Steps taken to solve a problem.”",
              "Then the three rules: it takes data, it gives at least one result, and it STOPS.",
              "“A loop where nothing changes isn’t a slow algorithm. It isn’t an algorithm.”"],
        ask: ["“Is a recipe an algorithm? Why?” — let her argue it."] },
      { t: "15–22", h: "PDLC, six phases",
        say: ["List them in order. Then point at number 4.",
              "“Coding is phase four of six. Most of the job happens before you type.”"],
        ask: ["“Where do flowcharts live?” (phase 3, algorithm development)"] },
      { t: "22–35", h: "Pseudocode and the arrow",
        say: ["Her lecturer’s conventions: CAPITALS, [square bracket comments], and GRADE <-- value.",
              "“In pseudocode <-- puts a value in and = asks a question. In PHP those swap: = puts in, == asks. This is the single most common lost mark on this topic.”"],
        do:  ["Write the grade example on paper together, both of you, at the same time."] },
      { t: "35–48", h: "Flowcharts",
        say: ["Draw all five symbols once. Then the two rules that cost marks: Start AND Stop, and nothing left unconnected.",
              "Draw the diamond. “Two ways out, only one ever runs.”"],
        do:  ["Make her draw the grade flowchart from the pseudocode you just wrote. Do not draw it for her."] },
      { t: "48–58", h: "Trace Euclid",
        say: ["GCD(48, 18). Keep taking the smaller off the bigger until they match."],
        do:  ["She fills the table by hand, row by row, out loud. You write nothing.",
              "“If you can trace this, you can trace a loop — and lesson 5 is nothing but that.”"] },
      { t: "58–60", h: "Close",
        do:  ["Arcade → Match the Words (algorithm set), one quick round.", "Set the homework."] }
    ],
    watch: ["Decisions drawn in a rectangle. Correct it every single time — it sticks fast.",
            "Writing $ and ; in a pseudocode answer. That loses marks.",
            "A flowchart with no Stop oval. Perfect logic, marked wrong."],
    hw: "exercises.php in 00-algorithms — her lecturer’s own five. Plus: write the algorithm for making tea, then make someone follow it exactly."
  },

  {
    id: "1", tag: "Session 1", mins: "70 min", title: "Setup, echo, variables",
    lesson: "01-basics",
    goal: "XAMPP running on her machine, and she can print text and store a value.",
    why: "The session where people quit. Nothing here is hard, but a broken install feels like a personal failure. Get the server up before you teach anything.",
    boards: ["server"],
    beats: [
      { t: "0–15", h: "Get XAMPP running — her screen, not yours",
        say: ["Draw the two boxes first. “PHP runs on the server. Never on your laptop. That is the whole reason we need XAMPP.”",
              "“If you double-click a .php file you will see the code, not the page. That is not a bug — it means you skipped the server.”"],
        do:  ["She installs. Start Apache. Open http://localhost/. Make her say the URL out loud.",
              "Do not move on until SHE has a green Apache and a page loading."] },
      { t: "15–25", h: "First line",
        do:  ["echo “Hello” in her own folder, served over http://localhost/.",
              "Type it live yourself, and make a typo on purpose. Miss the semicolon. Read the error together."],
        say: ["“Read the error. It has three things: what, where, and the line number. That habit is worth more than anything else today.”"] },
      { t: "25–45", h: "Variables and quotes",
        say: ["$name = “Fatima”; — the $ is part of the name.",
              "Show single quotes and double quotes side by side. Once. Let the difference land."],
        ask: ["“What will this print?” BEFORE running. Every time. The gap between her guess and the output is the lesson."] },
      { t: "45–62", h: "She drives",
        do:  ["Screen share swaps. She does exercises.php.",
              "Stay quiet longer than is comfortable. Hint at the line number, never type on her screen."] },
      { t: "62–70", h: "Close",
        do:  ["One arcade round. Set homework. Stop on something that worked."] }
    ],
    watch: ["Opening the file from the folder instead of localhost — she’ll see raw code and think she broke it.",
            "Forgetting the $. The error says “undefined constant”, which sounds like nothing.",
            "Smart quotes if she pastes from WhatsApp or Word. They look identical and break everything."],
    hw: "Finish exercises.php. Watch the lesson-2 video before the next call."
  },

  {
    id: "2", tag: "Session 2", mins: "60 min", title: "Data types and strings",
    lesson: "02-datatypes",
    goal: "She knows what type a value is and can join strings without guessing.",
    why: "PHP converts types behind her back. Naming the types now stops six later bugs from being mysterious.",
    boards: [],
    beats: [
      { t: "0–5", h: "Warm-up", do: ["She runs last week’s exercise and explains one line out loud."] },
      { t: "5–20", h: "The types", say: ["string, int, float, bool, null. Use var_dump() constantly — it shows the type, not just the value."] },
      { t: "20–35", h: "Joining", say: ["The dot glues. “5” + 5 is 10, but “5” . 5 is “55”. Show both, side by side, once."],
        ask: ["“Is this a number or a word?” — ask it about every value for the rest of the course."] },
      { t: "35–55", h: "She drives", do: ["exercises.php. Predict first, run second."] },
      { t: "55–60", h: "Close", do: ["Arcade → Guess the Output. Quiz 01."] }
    ],
    watch: ["Believing “10” and 10 are the same thing. They are, until they suddenly aren’t."],
    hw: "exercises.php + quiz-01."
  },

  {
    id: "3", tag: "Session 3", mins: "60 min", title: "Operators",
    lesson: "03-operators",
    goal: "Arithmetic, comparison and logical operators, and she knows what precedence means.",
    why: "Short session, low drama. Use the spare time to go back over anything from session 2 that wobbled.",
    boards: [],
    beats: [
      { t: "0–5", h: "Warm-up", do: ["Last week’s exercise, one line explained."] },
      { t: "5–25", h: "The three families", say: ["Arithmetic, comparison, logical. Comparison always produces true or false — nothing else."] },
      { t: "25–35", h: "Precedence", say: ["“When you are not sure, use brackets. Professionals use brackets. It is not cheating.”"] },
      { t: "35–55", h: "She drives", do: ["exercises.php, then the same answers in the code lab."] },
      { t: "55–60", h: "Close", do: ["Arcade round."] }
    ],
    watch: ["% on negative numbers. Mention it exists, don’t dwell."],
    hw: "exercises.php."
  },

  {
    id: "4", tag: "Session 4", mins: "70 min", title: "Making decisions",
    lesson: "04-conditions",
    goal: "if / elseif / else, and she can see why order matters.",
    why: "Where the flowchart diamond from session 0A becomes code. Point at that explicitly — it makes the first session pay off.",
    boards: ["decision"],
    beats: [
      { t: "0–5", h: "Warm-up", do: ["Re-draw the diamond from session 0A. “Remember this? Here it is in PHP.”"] },
      { t: "5–20", h: "if / else", say: ["Translate the grade pseudocode line by line into PHP, together. Every pseudocode line becomes exactly one PHP line."] },
      { t: "20–35", h: "The two traps",
        do:  ["Write if ($x = 5) deliberately. Let it be always true. Then explain.",
              "Give her a grade of 18 with the elseif branches in the wrong order and let “Pass” print. The bug teaches it better than you can."] },
      { t: "35–58", h: "She drives", do: ["exercises.php."] },
      { t: "58–70", h: "Close", do: ["Arcade → Fix the Bug. Quiz 02 — let her get = vs == wrong, then explain."] }
    ],
    watch: ["= instead of ==. It is in the quiz on purpose.", "elseif order. Always check the boundary value: exactly 60, exactly 10."],
    hw: "exercises.php + quiz-02. Do not advance if the quiz went badly."
  },

  {
    id: "5", tag: "Session 5", mins: "75 min", title: "Loops",
    lesson: "05-loops",
    goal: "for and while, and she can trace one on paper before running it.",
    why: "Everything she traced in session 0A was really a loop. Say that out loud. And warn about infinite loops BEFORE she writes one.",
    boards: ["loop"],
    beats: [
      { t: "0–5", h: "Safety first", say: ["“If it never stops, Ctrl + C. Say it back to me.” Do this before she writes a single loop, not after."] },
      { t: "5–20", h: "The three parts", say: ["Start, condition, change. Draw the back-arrow. “If your arrow doesn’t go back up, you drew five boxes, not a loop.”"] },
      { t: "20–35", h: "Trace on paper", do: ["Three times round the loop — she writes every value of $i by hand before running it. Exactly like the Euclid table."] },
      { t: "35–60", h: "She drives", do: ["exercises.php. If she is struggling, shrink it: print 1 2 3 and nothing else until it clicks."] },
      { t: "60–75", h: "Close", do: ["guess-number.php in the arcade. It is a loop she actually wants to finish."] }
    ],
    watch: ["Forgetting the $i++ — that is the infinite one.", "Off by one: <= versus <. Make her check the last number every time."],
    hw: "exercises.php. Rewrite one for loop as a while loop."
  },

  {
    id: "6", tag: "Session 6", mins: "75 min", title: "Arrays — the hard one",
    lesson: "06-arrays",
    goal: "Indexed and associative arrays, and foreach.",
    why: "The genuine wall of the course. Tell her out loud: “this is the hardest jump, everyone struggles here, it is not you.” Draw boxes before any code.",
    boards: ["boxes"],
    beats: [
      { t: "0–10", h: "Draw it first — no editor", do: ["Numbered boxes on paper. Index under each. Zero at the left, in a different colour."],
        say: ["“Counting starts at zero. Not because it is clever, but because that is how it is — and half the errors this week will be that.”"] },
      { t: "10–25", h: "Reaching in", do: ["$marks[2]. Then $marks[4] deliberately, so she sees the error and knows what it means."] },
      { t: "25–40", h: "foreach", say: ["“for walks the numbers. foreach walks the boxes. Prefer foreach.”"] },
      { t: "40–45", h: "Associative", say: ["Keys instead of numbers. Same boxes, labels instead of positions."] },
      { t: "45–68", h: "She drives", do: ["exercises.php. Expect this to be slow. Slow is fine."] },
      { t: "68–75", h: "Close", do: ["End on something that worked, even a small thing. Do not push through frustration today."] }
    ],
    watch: ["Off-by-one everywhere.", "Frustration. If it comes, shrink the problem until she succeeds, then grow it again."],
    hw: "exercises.php only. Keep it light after this one."
  },

  {
    id: "7", tag: "Session 7", mins: "70 min", title: "Functions",
    lesson: "07-functions",
    goal: "Write a function, pass arguments, return a value — and know why return is not echo.",
    why: "echo vs return is the real content here. Make her use a returned value in a calculation, or it will not land.",
    boards: [],
    beats: [
      { t: "0–5", h: "Warm-up", do: ["Last week’s array exercise, one line explained."] },
      { t: "5–25", h: "Define and call", say: ["A function is a named box of steps you can use again. Same idea as the algorithm from day one, with a name on it."] },
      { t: "25–45", h: "echo vs return",
        do:  ["Make her write square($n). Then make her use the result inside a bigger sum.",
              "A version that echoes instead of returning cannot do that. Let her feel the difference, don’t just state it."] },
      { t: "45–62", h: "She drives", do: ["exercises.php."] },
      { t: "62–70", h: "Close", do: ["hangman.php in the arcade. Quiz 03. Then set Project 1."] }
    ],
    watch: ["Variables inside a function not existing outside it. Scope confuses everyone once."],
    hw: "exercises.php + quiz-03 + start Project 1."
  },

  {
    id: "8", tag: "Session 8", mins: "70 min", title: "Forms",
    lesson: "08-forms",
    goal: "A form that posts to a PHP page and shows what was typed.",
    why: "First time two files talk to each other. Draw it before coding, or the $_POST key will look like magic.",
    boards: ["form"],
    beats: [
      { t: "0–10", h: "Draw the round trip", say: ["“The name= attribute in the HTML IS the key in $_POST. Same word, both ends. That is the whole trick.”"] },
      { t: "10–30", h: "Build it together", do: ["form.html and save.php. Type both live. Get the name= wrong once on purpose and read the warning."] },
      { t: "30–40", h: "GET vs POST", say: ["GET puts it in the URL where everyone can see it. POST does not. Passwords are POST."] },
      { t: "40–62", h: "She drives", do: ["exercises.php."] },
      { t: "62–70", h: "Close", do: ["Set Project 2."] }
    ],
    watch: ["Opening form.html from the folder instead of localhost — the same trap as session 1, back again.",
            "A typo between name= and the $_POST key. Check they match character for character."],
    hw: "exercises.php + Project 2."
  },

  {
    id: "9", tag: "Session 9", mins: "75 min", title: "MySQL",
    lesson: "09-mysql",
    goal: "Start MySQL, open phpMyAdmin, connect from PHP, and SELECT real rows.",
    why: "Two things can be broken here instead of one, so check the server first every single time.",
    boards: ["db"],
    beats: [
      { t: "0–10", h: "Start MySQL first", say: ["“Every ‘connection failed’ starts with the same question: is MySQL green in the XAMPP panel?”"],
        do:  ["Open phpMyAdmin together. Import school.sql. Look at the rows as a table before writing any PHP."] },
      { t: "10–25", h: "The three lines", do: ["Connect, query, loop the result. Nothing more today."] },
      { t: "25–40", h: "SELECT", say: ["Write the SQL in phpMyAdmin FIRST, see the rows, and only then move it into PHP. Debugging two things at once is what makes this session miserable."] },
      { t: "40–65", h: "She drives", do: ["exercises.php."] },
      { t: "65–75", h: "Close", do: ["Arcade → Match the Words, the database set."] }
    ],
    watch: ["MySQL not started. It is always this.", "Database name typo’d in db.php.", "Password: blank on XAMPP, and that is normal for local work."],
    hw: "exercises.php. Write three SELECTs of her own in phpMyAdmin."
  },

  {
    id: "10", tag: "Session 10", mins: "75 min", title: "Dynamic pages",
    lesson: "10-dynamic-page",
    goal: "A list page, a detail page reached by a link, and an admin form that writes.",
    why: "Everything from all ten sessions at once. This is the shape of her final project, so build it slowly and name the parts as they appear.",
    boards: [],
    beats: [
      { t: "0–10", h: "Name the pieces", do: ["Point at the list, the link, the id in the URL, the query, the form. “You already know all five of these.”"] },
      { t: "10–35", h: "List then detail", do: ["Build the list page, then the detail page. Make her predict what happens with a missing id."] },
      { t: "35–55", h: "Writing", do: ["The admin form. POST, insert, redirect."] },
      { t: "55–70", h: "She drives", do: ["She adds one field end to end: form, database column, display."] },
      { t: "70–75", h: "Close", do: ["Quiz 04. Set Project 3. Book the paper exam run."] }
    ],
    watch: ["An id in the URL with nothing after it. Always handle the missing case.", "Forgetting to refresh after an insert and thinking it failed."],
    hw: "Project 3. Then the paper final exam, marked by you on a call, before she touches the simulator."
  }
];
