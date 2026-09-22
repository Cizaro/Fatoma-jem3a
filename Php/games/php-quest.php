<?php
/*
 * PHP QUEST - an escape room, written in PHP.
 *
 * Play it:   php -S localhost:8000     (from the Php folder)
 *            then http://localhost:8000/games/php-quest.php
 *
 * You are locked in the server room. Seven doors. Each one opens only when
 * you answer its question. Type your answer, collect the keys, get out.
 *
 * What the CODE of this file teaches you:
 *   - a multidimensional array holding all the rooms   (Lesson 6)
 *   - functions that take the room and return something (Lesson 7)
 *   - sessions remembering where you are                (Lesson 8)
 *   - a form posting back to the same page              (Lesson 8)
 */

session_start();

// ---------------------------------------------------------------
// THE ROOMS - one associative array per room, all inside one array.
// Add your own room at the end: it will just work.
// ---------------------------------------------------------------
$ROOMS = [
    [
        "name"   => "The Entrance",
        "story"  => "The door clicks shut behind you. A screen on the wall glows with one line of code.",
        "code"   => "echo \"Hello \" . \"World\";",
        "ask"    => "What appears on the screen?",
        "accept" => ["hello world"],
        "hint"   => "The dot glues the two pieces of text together. Mind the space.",
        "key"    => "Rusty Key",
        "win"    => "The screen flashes green. A rusty key drops into your hand.",
    ],
    [
        "name"   => "The Hall of Quotes",
        "story"  => "Two identical doors. Above them, two lines that look the same but are not.",
        "code"   => "\$door = \"north\";\necho 'Go \$door';",
        "ask"    => "What is written above the left door?",
        "accept" => ["go \$door", "go door"],
        "hint"   => "Single quotes do not read variables. They print exactly what you typed.",
        "key"    => "Brass Key",
        "win"    => "You walk through the door that says Go \$door - literally. It opens.",
    ],
    [
        "name"   => "The Counting Corridor",
        "story"  => "A row of five lamps. A keypad asks for a number.",
        "code"   => "\$lamps = [\"a\", \"b\", \"c\", \"d\", \"e\"];\n// what is the INDEX of the last lamp?",
        "ask"    => "Type the index of the last lamp",
        "accept" => ["4"],
        "hint"   => "There are five lamps, but counting starts at zero.",
        "key"    => "Iron Key",
        "win"    => "The fifth lamp lights up. Index 4. The floor slides open.",
    ],
    [
        "name"   => "The Looping Stairs",
        "story"  => "Stairs that fold back on themselves. Carved into the wall is a loop.",
        "code"   => "for (\$i = 1; \$i <= 4; \$i++) {\n    echo \$i;\n}",
        "ask"    => "What does the carving print?",
        "accept" => ["1234"],
        "hint"   => "It starts at 1 and stops once i passes 4. Write the digits with no spaces.",
        "key"    => "Silver Key",
        "win"    => "You climb 1, 2, 3, 4 steps and the wall parts.",
    ],
    [
        "name"   => "The Broken Gate",
        "story"  => "A gate that will not open. Its control panel shows one line, and it is wrong.",
        "code"   => "if (\$power = 0) {\n    echo \"open\";\n}",
        "ask"    => "One character must change. Type the operator it SHOULD be",
        "accept" => ["==", "===" ],
        "hint"   => "A single = puts a value in. To compare, you need two of them.",
        "key"    => "Golden Key",
        "win"    => "You change = to ==. The gate remembers how to compare, and swings open.",
    ],
    [
        "name"   => "The Hall of Records",
        "story"  => "Filing cabinets to the ceiling. A terminal waits for a command.",
        "code"   => "-- read every row from the students table",
        "ask"    => "Type the SQL word that READS rows",
        "accept" => ["select", "select *", "select * from students", "select * from students;"],
        "hint"   => "Four commands run a database. This is the one that only looks.",
        "key"    => "Crystal Key",
        "win"    => "SELECT. The cabinets open all at once and show you everything.",
    ],
    [
        "name"   => "The Last Door",
        "story"  => "Daylight underneath. A final prompt: someone typed a name into a form, and you must print it without letting them attack the page.",
        "code"   => "echo ______(\$_POST[\"name\"]);",
        "ask"    => "Type the function that makes it safe",
        "accept" => ["htmlspecialchars"],
        "hint"   => "It turns < into &lt; so a typed script is shown, not run.",
        "key"    => "Freedom",
        "win"    => "htmlspecialchars(). The door unlocks. You step outside.",
    ],
];

// ---------------------------------------------------------------
// GAME STATE - all of it lives in the session
// ---------------------------------------------------------------
function newQuest() {
    $_SESSION["q_room"]  = 0;
    $_SESSION["q_keys"]  = [];
    $_SESSION["q_tries"] = 0;
    $_SESSION["q_total"] = 0;
}

if (!isset($_SESSION["q_room"]) || isset($_GET["new"])) {
    newQuest();
}

$room    = $_SESSION["q_room"];
$escaped = $room >= count($ROOMS);
$message = "";
$mood    = "";

// ---------------------------------------------------------------
// normalise what the player typed so small differences still pass
// ---------------------------------------------------------------
function clean($text) {
    $text = strtolower(trim($text));
    $text = str_replace(["'", '"', "`"], "", $text);
    $text = preg_replace("/\s+/", " ", $text);   // squash repeated spaces
    return $text;
}

function isRight($answer, $accepted) {
    return in_array(clean($answer), array_map("clean", $accepted));
}

// ---------------------------------------------------------------
// the player answered
// ---------------------------------------------------------------
if ($_SERVER["REQUEST_METHOD"] === "POST" && !$escaped) {

    $guess   = $_POST["answer"] ?? "";
    $current = $ROOMS[$room];
    $_SESSION["q_total"]++;

    if (trim($guess) === "") {
        $message = "You have to type something.";
        $mood    = "warn";
    } elseif (isRight($guess, $current["accept"])) {
        $_SESSION["q_keys"][] = $current["key"];
        $_SESSION["q_room"]++;
        $_SESSION["q_tries"] = 0;
        $message = $current["win"];
        $mood    = "win";
        $room    = $_SESSION["q_room"];
        $escaped = $room >= count($ROOMS);
    } else {
        $_SESSION["q_tries"]++;
        $message = $_SESSION["q_tries"] >= 2
            ? "Still locked. Hint: " . $current["hint"]
            : "The door does not move. Read the code again.";
        $mood    = "lose";
    }
}

$keys  = $_SESSION["q_keys"];
$tries = $_SESSION["q_total"];

function rank($rooms, $tries) {
    if ($tries <= $rooms)     return "Flawless - one try per door";
    if ($tries <= $rooms + 3) return "Sharp";
    if ($tries <= $rooms * 2) return "You got there";
    return "The long way round - but out is out";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PHP Quest</title>
<style>
  :root{
    --bg:#0f1119; --panel:#181c29; --panel2:#11141f; --ink:#e8ebf7; --muted:#8e97b4;
    --line:#29304a; --accent:#7c6df2; --gold:#e3b23c; --good:#4ec27f; --bad:#e2686f;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    background:var(--bg); color:var(--ink); line-height:1.65;
    font-family:system-ui,"Segoe UI",sans-serif;
    padding:0 16px 60px; min-height:100vh;
  }
  .wrap{max-width:620px;margin:0 auto;padding-block:36px 0}
  h1{font-size:27px;letter-spacing:.5px;text-align:center}
  h1 span{color:var(--accent)}
  .sub{color:var(--muted);text-align:center;font-size:14px;margin-bottom:22px}

  .progress{display:flex;gap:6px;justify-content:center;margin-bottom:20px;flex-wrap:wrap}
  .dot{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;
       font-size:12px;font-weight:700;border:2px solid var(--line);color:var(--muted)}
  .dot.done{background:var(--gold);border-color:var(--gold);color:#241c05}
  .dot.now{border-color:var(--accent);color:var(--accent);
           box-shadow:0 0 0 4px rgba(124,109,242,.16)}

  .card{background:var(--panel);border:1px solid var(--line);border-radius:14px;
        padding:24px;margin-bottom:16px}
  .roomname{font-size:12px;letter-spacing:.16em;text-transform:uppercase;
            color:var(--accent);font-weight:700;margin-bottom:8px}
  .story{color:var(--ink);margin-bottom:16px}
  pre{background:var(--panel2);border:1px solid var(--line);border-radius:10px;
      padding:16px;overflow-x:auto;font-size:14px;line-height:1.7;color:#cfd6f5;
      font-family:ui-monospace,Consolas,monospace;margin-bottom:16px}
  label{display:block;font-weight:600;margin-bottom:8px}
  .field{display:flex;gap:10px;flex-wrap:wrap}
  input[type=text]{flex:1;min-width:160px;padding:12px 15px;border:1px solid var(--line);
       border-radius:9px;background:var(--panel2);color:var(--ink);font-size:15px;
       font-family:ui-monospace,Consolas,monospace}
  input[type=text]:focus{outline:2px solid var(--accent);outline-offset:1px}
  button{padding:12px 24px;border:0;border-radius:9px;background:var(--accent);color:#fff;
         font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
  button:hover{filter:brightness(1.1)}

  .msg{padding:13px 16px;border-radius:10px;margin-bottom:16px;font-size:14.5px}
  .win {background:rgba(78,194,127,.12);border-left:4px solid var(--good);color:#b6ecce}
  .lose{background:rgba(226,104,111,.12);border-left:4px solid var(--bad);color:#f3c3c6}
  .warn{background:rgba(227,178,60,.12);border-left:4px solid var(--gold);color:#f0dda6}

  .keys{background:var(--panel2);border:1px solid var(--line);border-radius:12px;
        padding:14px 18px;font-size:14px}
  .keys b{color:var(--gold);display:block;margin-bottom:6px;font-size:12px;
          letter-spacing:.12em;text-transform:uppercase}
  .key{display:inline-block;background:rgba(227,178,60,.14);color:var(--gold);
       border-radius:20px;padding:3px 12px;margin:3px 4px 0 0;font-size:13px}
  .none{color:var(--muted);font-style:italic}

  .escape{text-align:center;padding:34px 22px}
  .escape .big{font-size:46px}
  .escape h2{font-size:24px;margin:10px 0 6px}
  .escape p{color:var(--muted)}
  .again{display:inline-block;margin-top:18px;background:var(--accent);color:#fff;
         padding:11px 26px;border-radius:9px;text-decoration:none;font-weight:600}
  .footlinks{text-align:center;margin-top:22px;font-size:13.5px}
  .footlinks a{color:var(--accent);text-decoration:none;margin:0 8px}
  .footlinks a:hover{text-decoration:underline}
  .note{background:var(--panel);border:1px solid var(--line);border-radius:12px;
        padding:16px 18px;font-size:13.5px;color:var(--muted);margin-top:18px}
  .note b{color:var(--ink)}
  code{background:var(--panel2);padding:2px 6px;border-radius:4px;
       font-family:ui-monospace,Consolas,monospace;font-size:13px}
</style>
</head>
<body>
<div class="wrap">

<h1>PHP <span>Quest</span></h1>
<p class="sub">Seven doors. Each one opens only if you can read the code.</p>

<div class="progress">
  <?php foreach ($ROOMS as $i => $r): ?>
    <div class="dot <?= $i < $room ? 'done' : ($i === $room ? 'now' : '') ?>"><?= $i + 1 ?></div>
  <?php endforeach; ?>
</div>

<?php if ($message): ?>
  <div class="msg <?= $mood ?>"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<?php if ($escaped): ?>

  <div class="card escape">
    <div class="big">&#127881;</div>
    <h2>You made it out</h2>
    <p>All <?= count($ROOMS) ?> doors, in <?= $tries ?> attempts.</p>
    <p style="margin-top:6px;color:var(--gold);font-weight:600"><?= rank(count($ROOMS), $tries) ?></p>
    <a class="again" href="?new=1">Play again</a>
  </div>

<?php else: $r = $ROOMS[$room]; ?>

  <div class="card">
    <div class="roomname">Door <?= $room + 1 ?> of <?= count($ROOMS) ?> &middot; <?= htmlspecialchars($r["name"]) ?></div>
    <p class="story"><?= htmlspecialchars($r["story"]) ?></p>

    <pre><?= htmlspecialchars($r["code"]) ?></pre>

    <form method="post">
      <label for="answer"><?= htmlspecialchars($r["ask"]) ?></label>
      <div class="field">
        <input type="text" id="answer" name="answer" autocomplete="off" spellcheck="false" autofocus>
        <button type="submit">Try the door</button>
      </div>
    </form>
  </div>

<?php endif; ?>

<div class="keys">
  <b>Keys collected</b>
  <?php if (count($keys) === 0): ?>
    <span class="none">none yet</span>
  <?php else: ?>
    <?php foreach ($keys as $k): ?>
      <span class="key">&#128273; <?= htmlspecialchars($k) ?></span>
    <?php endforeach; ?>
  <?php endif; ?>
</div>

<div class="note">
  <b>When you have escaped, open this file and read it.</b>
  Everything in the game is something you already know:
  the seven rooms are one <b>multidimensional array</b> (lesson 6), <code>clean()</code> and
  <code>isRight()</code> are <b>functions</b> (lesson 7), and <code>$_SESSION</code> is what
  remembers which door you are on when the page reloads (lesson 8).
  <br><br>
  <b>Make it yours:</b> add an eighth room to the <code>$ROOMS</code> array at the top.
  Copy the shape of one that is already there. The game will pick it up with no other change -
  the progress dots, the keys and the ending all count themselves from the array.
</div>

<div class="footlinks">
  <a href="php-arcade.html">&larr; the arcade</a>
  <a href="guess-number.php">guess the number</a>
  <a href="hangman.php">hangman</a>
  <a href="?new=1">start over</a>
</div>

</div>
</body>
</html>
