<?php
/*
 * GUESS THE NUMBER - a real game written in PHP.
 *
 * Play it:   php -S localhost:8000     (run this inside the Php folder)
 *            then open http://localhost:8000/games/guess-number.php
 *
 * What it teaches you:
 *   - sessions (how PHP remembers things between page loads)
 *   - forms + $_POST          (Lesson 8)
 *   - if / elseif / else      (Lesson 4)
 *   - functions               (Lesson 7)
 */

session_start();   // must be the FIRST thing, before any HTML

// ---- start a new game ----
function newGame() {
    $_SESSION["secret"]  = rand(1, 100);   // the number to find
    $_SESSION["tries"]   = 0;
    $_SESSION["history"] = [];
    $_SESSION["won"]     = false;
}

if (!isset($_SESSION["secret"]) || isset($_GET["new"])) {
    newGame();
}

$message = "I am thinking of a number between 1 and 100.";
$mood    = "neutral";

// ---- the player guessed ----
if ($_SERVER["REQUEST_METHOD"] === "POST" && !$_SESSION["won"]) {

    $guess = $_POST["guess"] ?? "";

    if ($guess === "" || !is_numeric($guess)) {
        $message = "That is not a number. Try again.";
        $mood    = "warn";
    } elseif ($guess < 1 || $guess > 100) {
        $message = "Between 1 and 100 please!";
        $mood    = "warn";
    } else {
        $guess = (int)$guess;
        $_SESSION["tries"]++;
        $_SESSION["history"][] = $guess;

        $secret = $_SESSION["secret"];

        if ($guess === $secret) {
            $_SESSION["won"] = true;
            $message = "CORRECT! The number was $secret. You found it in "
                     . $_SESSION["tries"] . " tries.";
            $mood    = "win";
        } elseif ($guess < $secret) {
            $difference = $secret - $guess;
            $message = "$guess is TOO LOW" . ($difference <= 5 ? " - but very close!" : ".");
            $mood    = "low";
        } else {
            $difference = $guess - $secret;
            $message = "$guess is TOO HIGH" . ($difference <= 5 ? " - but very close!" : ".");
            $mood    = "high";
        }
    }
}

// the perfect player needs at most 7 tries (100 -> 50 -> 25 -> ...). Can you?
function rating($tries) {
    if ($tries <= 4) return "Incredible";
    if ($tries <= 7) return "Perfect strategy";
    if ($tries <= 12) return "Good";
    return "You got there in the end";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guess the Number</title>
<style>
  body{font-family:system-ui,"Segoe UI",sans-serif;background:#f3f5fb;color:#151a2e;
       max-width:520px;margin:50px auto;padding:0 20px;line-height:1.6;text-align:center}
  h1{font-size:28px;margin-bottom:4px}
  .sub{color:#6b7490;margin-bottom:24px}
  .box{background:#fff;border-radius:14px;padding:26px;box-shadow:0 2px 12px rgba(20,30,60,.08)}
  .msg{font-size:18px;font-weight:600;padding:16px;border-radius:10px;margin-bottom:20px}
  .neutral{background:#eef1f8}
  .warn{background:#fff3db;color:#a86800}
  .low {background:#e7f0ff;color:#2f4bc0}
  .high{background:#ffeae7;color:#c33a1a}
  .win {background:#e7f6ec;color:#2b8a3e;font-size:20px}
  input{padding:12px 16px;border:1px solid #ccd3e5;border-radius:9px;font-size:18px;
        width:130px;text-align:center;font-family:inherit}
  button{padding:12px 24px;border:0;border-radius:9px;background:#3b5bdb;color:#fff;
         font-size:16px;font-weight:600;cursor:pointer;margin-left:8px;font-family:inherit}
  button:hover{background:#2f4bc0}
  .history{margin-top:22px;font-size:14px;color:#6b7490}
  .g{display:inline-block;background:#eef1f8;border-radius:16px;padding:3px 11px;margin:3px}
  .again{display:inline-block;margin-top:18px;color:#3b5bdb;text-decoration:none;font-weight:600}
  .hint{margin-top:26px;font-size:13px;color:#6b7490;text-align:left;
        background:#fff;border-radius:12px;padding:16px}
  code{background:#eef1f8;padding:2px 5px;border-radius:4px}
</style>
</head>
<body>

<h1>Guess the Number</h1>
<p class="sub">Between 1 and 100. PHP is keeping the secret.</p>

<div class="box">
    <div class="msg <?= $mood ?>"><?= htmlspecialchars($message) ?></div>

    <?php if (!$_SESSION["won"]): ?>
        <form method="post">
            <input type="number" name="guess" min="1" max="100" autofocus
                   placeholder="?" required>
            <button type="submit">Guess</button>
        </form>
        <p style="margin-top:16px;color:#6b7490">Tries so far: <strong><?= $_SESSION["tries"] ?></strong></p>
    <?php else: ?>
        <p style="font-size:17px"><strong><?= rating($_SESSION["tries"]) ?>!</strong></p>
        <a class="again" href="?new=1">Play again &rarr;</a>
    <?php endif; ?>

    <?php if (count($_SESSION["history"]) > 0): ?>
        <div class="history">
            your guesses:
            <?php foreach ($_SESSION["history"] as $g): ?>
                <span class="g"><?= (int)$g ?></span>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<div class="hint">
    <strong>The winning strategy (and the reason computers are fast):</strong>
    always guess the middle. 50, then 25 or 75, then halve again. Any number from 1 to 100
    can be found in <strong>7 guesses maximum</strong>. That is called a binary search.
    <br><br>
    <strong>Open this file and look at the code.</strong> The interesting part is
    <code>$_SESSION</code> - it is how PHP remembers the secret number even though the page
    reloads completely after every guess. Without it, the number would be lost every time.
    <br><br>
    <a href="php-arcade.html">&larr; back to the arcade</a> &nbsp;|&nbsp; <a href="hangman.php">hangman &rarr;</a>
</div>

</body>
</html>
