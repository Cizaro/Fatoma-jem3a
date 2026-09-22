<?php
/*
 * HANGMAN - written in PHP, with programming words.
 *
 * Play it:   php -S localhost:8000     (inside the Php folder)
 *            then http://localhost:8000/games/hangman.php
 *
 * What it teaches you:
 *   - arrays and in_array()      (Lesson 6)
 *   - functions                  (Lesson 7)
 *   - loops                      (Lesson 5)
 *   - sessions + $_GET           (Lesson 8)
 */

session_start();

$WORDS = [
    "variable"  => "a box with a name that holds a value",
    "function"  => "a block of code you can call by name",
    "array"     => "holds many values under one name",
    "loop"      => "repeats code again and again",
    "string"    => "text between quotes",
    "boolean"   => "can only be true or false",
    "echo"      => "the PHP way to print something",
    "database"  => "where the data is stored permanently",
    "server"    => "the computer that runs your PHP",
    "condition" => "decides which code runs",
    "integer"   => "a whole number",
    "foreach"   => "the loop made for arrays",
    "semicolon" => "the thing you always forget at the end of a line",
    "browser"   => "shows the HTML your PHP produced",
];

const MAX_WRONG = 6;

function newGame($words) {
    $word = array_rand($words);              // picks a random KEY
    $_SESSION["word"]   = $word;
    $_SESSION["clue"]   = $words[$word];
    $_SESSION["picked"] = [];                // every letter the player tried
}

if (!isset($_SESSION["word"]) || isset($_GET["new"])) {
    newGame($WORDS);
}

$word   = $_SESSION["word"];
$clue   = $_SESSION["clue"];
$picked = $_SESSION["picked"];

// ---- the player clicked a letter ----
if (isset($_GET["letter"])) {
    $letter = strtolower(substr($_GET["letter"], 0, 1));
    if (ctype_alpha($letter) && !in_array($letter, $picked)) {
        $_SESSION["picked"][] = $letter;
        $picked = $_SESSION["picked"];
    }
}

// ---- work out the state of the game ----
function wrongLetters($word, $picked) {
    $wrong = [];
    foreach ($picked as $letter) {
        if (strpos($word, $letter) === false) {   // === false, because position 0 is falsy!
            $wrong[] = $letter;
        }
    }
    return $wrong;
}

function isWon($word, $picked) {
    foreach (str_split($word) as $letter) {
        if (!in_array($letter, $picked)) {
            return false;         // found a letter still hidden
        }
    }
    return true;
}

function display($word, $picked, $reveal = false) {
    $out = "";
    foreach (str_split($word) as $letter) {
        $out .= ($reveal || in_array($letter, $picked)) ? strtoupper($letter) : "_";
        $out .= " ";
    }
    return trim($out);
}

$wrong  = wrongLetters($word, $picked);
$lost   = count($wrong) >= MAX_WRONG;
$won    = isWon($word, $picked);
$over   = $lost || $won;
$left   = MAX_WRONG - count($wrong);

// the little drawing, one stage per wrong guess
$STAGES = [
"  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========",
"  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========",
"  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========",
"  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========",
"  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========",
"  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========",
"  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========",
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PHP Hangman</title>
<style>
  body{font-family:system-ui,"Segoe UI",sans-serif;background:#f3f5fb;color:#151a2e;
       max-width:560px;margin:40px auto;padding:0 20px;line-height:1.6;text-align:center}
  h1{font-size:27px;margin-bottom:2px}
  .sub{color:#6b7490;margin-bottom:22px}
  .box{background:#fff;border-radius:14px;padding:24px;box-shadow:0 2px 12px rgba(20,30,60,.08)}
  pre{font-family:ui-monospace,Consolas,monospace;font-size:16px;line-height:1.35;
      color:#3b4260;margin:0 0 14px}
  .word{font-family:ui-monospace,Consolas,monospace;font-size:30px;letter-spacing:4px;
        font-weight:700;margin:10px 0 6px}
  .clue{color:#6b7490;font-style:italic;margin-bottom:16px}
  .keys{display:grid;grid-template-columns:repeat(9,1fr);gap:6px;margin-top:18px}
  .keys a,.keys span{display:block;padding:9px 0;border-radius:8px;text-decoration:none;
        font-weight:700;font-size:15px;background:#eef1f8;color:#3b5bdb}
  .keys a:hover{background:#3b5bdb;color:#fff}
  .keys .hit{background:#e7f6ec;color:#2b8a3e}
  .keys .miss{background:#fdeaea;color:#c92a2a;text-decoration:line-through}
  .lives{font-size:15px;color:#6b7490;margin-top:14px}
  .result{font-size:20px;font-weight:700;padding:14px;border-radius:10px;margin-bottom:14px}
  .win{background:#e7f6ec;color:#2b8a3e}
  .lose{background:#fdeaea;color:#c92a2a}
  .again{display:inline-block;margin-top:14px;background:#3b5bdb;color:#fff;
         padding:10px 22px;border-radius:9px;text-decoration:none;font-weight:600}
  .hint{margin-top:22px;font-size:13px;color:#6b7490;text-align:left;
        background:#fff;border-radius:12px;padding:16px}
  code{background:#eef1f8;padding:2px 5px;border-radius:4px}
</style>
</head>
<body>

<h1>PHP Hangman</h1>
<p class="sub">Guess the programming word before the drawing is finished.</p>

<div class="box">

  <?php if ($won): ?>
      <div class="result win">You won! The word was <?= strtoupper($word) ?>.</div>
  <?php elseif ($lost): ?>
      <div class="result lose">Game over. The word was <?= strtoupper($word) ?>.</div>
  <?php endif; ?>

  <pre><?= $STAGES[min(count($wrong), MAX_WRONG)] ?></pre>

  <div class="word"><?= display($word, $picked, $over) ?></div>
  <p class="clue">clue: <?= htmlspecialchars($clue) ?></p>

  <?php if (!$over): ?>
      <div class="keys">
      <?php foreach (range('a', 'z') as $letter): ?>
          <?php if (in_array($letter, $picked)): ?>
              <span class="<?= strpos($word, $letter) !== false ? 'hit' : 'miss' ?>">
                  <?= strtoupper($letter) ?></span>
          <?php else: ?>
              <a href="?letter=<?= $letter ?>"><?= strtoupper($letter) ?></a>
          <?php endif; ?>
      <?php endforeach; ?>
      </div>
      <p class="lives">
          <?= $left ?> wrong guess<?= $left === 1 ? '' : 'es' ?> left
          <?php if ($wrong): ?>
              &middot; missed: <strong><?= strtoupper(implode(" ", $wrong)) ?></strong>
          <?php endif; ?>
      </p>
  <?php else: ?>
      <a class="again" href="?new=1">Play again</a>
  <?php endif; ?>

</div>

<div class="hint">
    <strong>Open the code and find these three things:</strong>
    <ul style="margin:8px 0 0 18px">
        <li><code>in_array($letter, $picked)</code> - Lesson 6. Has this letter been tried?</li>
        <li><code>str_split($word)</code> - turns "array" into ["a","r","r","a","y"].</li>
        <li><code>strpos($word, $letter) === false</code> - careful! <code>strpos</code> returns
            <code>0</code> when the letter is the FIRST one, and <code>0</code> is falsy.
            That is why we compare with <code>=== false</code> and not with <code>!</code>.
            This exact bug catches professional developers.</li>
    </ul>
    <p style="margin-top:10px"><strong>Make it yours:</strong> add 5 of your own words to the
    <code>$WORDS</code> array at the top of the file.</p>
    <p><a href="php-arcade.html">&larr; the arcade</a> &nbsp;|&nbsp; <a href="guess-number.php">guess the number &rarr;</a></p>
</div>

</body>
</html>
