<?php
/*
 * PROJECT 2 - TO-DO LIST   (starter file)
 *
 * Run:   php -S localhost:8000     (from the Php folder)
 * Open:  http://localhost:8000/projects/project-2-todo/index.php
 *
 * ADDING a task is done for you, so you can see the pattern.
 * DONE, DELETE and the counter are yours.
 */

session_start();

// the list lives in the session, so it survives page reloads
if (!isset($_SESSION["tasks"])) {
    $_SESSION["tasks"] = [
        ["text" => "Read lesson 8",        "done" => true],
        ["text" => "Finish the exercises", "done" => false],
    ];
}

$error = "";

// ---------------- ADD (given to you) ----------------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $text = trim($_POST["task"] ?? "");

    if ($text === "") {
        $error = "You cannot add an empty task.";
    } else {
        $_SESSION["tasks"][] = ["text" => $text, "done" => false];
        header("Location: index.php");   // redirect so F5 does not add it twice
        exit;
    }
}

// ---------------- TODO 1: DONE ----------------
// When the user clicks "done", the link sends  ?done=2
// Read it, flip $_SESSION["tasks"][$i]["done"] to the opposite (use !),
// then redirect back to index.php and exit.
// Careful: cast the id with (int) and check the task exists with isset().



// ---------------- TODO 2: DELETE ----------------
// The delete link sends  ?delete=2
// Remove that task with unset(), then use array_values() to renumber the array
// (otherwise you get holes: 0, 2, 3...). Redirect and exit.



// ---------------- TODO 3: the counter ----------------
// Count how many tasks are done. You will print it below.
$total = count($_SESSION["tasks"]);
$done  = 0;   // <- change this: loop through the tasks and count the done ones

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>My To-Do List</title>
<style>
  body{font-family:system-ui,"Segoe UI",sans-serif;background:#f3f5fb;color:#151a2e;
       max-width:560px;margin:50px auto;padding:0 20px;line-height:1.6}
  h1{font-size:27px;margin-bottom:2px}
  .sub{color:#6b7490;margin-bottom:22px}
  .box{background:#fff;border-radius:14px;padding:22px;box-shadow:0 2px 12px rgba(20,30,60,.08)}
  form{display:flex;gap:10px;margin-bottom:6px}
  input[type=text]{flex:1;padding:11px 14px;border:1px solid #ccd3e5;border-radius:9px;
       font-size:15px;font-family:inherit}
  button{padding:11px 20px;border:0;border-radius:9px;background:#3b5bdb;color:#fff;
       font-weight:600;cursor:pointer;font-size:15px;font-family:inherit}
  button:hover{background:#2f4bc0}
  .err{background:#fdeaea;color:#c92a2a;padding:10px 14px;border-radius:8px;margin-bottom:14px}
  ul{list-style:none;padding:0;margin:18px 0 0}
  li{display:flex;align-items:center;gap:10px;padding:11px 4px;border-bottom:1px solid #eef1f8}
  li:last-child{border-bottom:0}
  li.done span{text-decoration:line-through;color:#9aa3bd}
  li span{flex:1}
  li a{font-size:13px;text-decoration:none;color:#3b5bdb}
  li a.del{color:#d43b3b}
  .count{margin-top:16px;color:#6b7490;font-size:14px;text-align:center}
  .empty{text-align:center;color:#9aa3bd;padding:24px 0}
  .todo{margin-top:22px;background:#fff8e6;border-left:4px solid #f0a500;
        padding:14px 18px;border-radius:8px;font-size:14px}
</style>
</head>
<body>

<h1>My To-Do List</h1>
<p class="sub">Stored in <code>$_SESSION</code> — it lasts until you close the browser.</p>

<div class="box">

    <?php if ($error): ?>
        <div class="err"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="post">
        <input type="text" name="task" placeholder="What do you have to do?" autofocus>
        <button type="submit">Add</button>
    </form>

    <?php if ($total === 0): ?>
        <p class="empty">Nothing to do. Enjoy it while it lasts.</p>
    <?php else: ?>
        <ul>
        <?php foreach ($_SESSION["tasks"] as $i => $task): ?>
            <li class="<?= $task["done"] ? "done" : "" ?>">
                <span><?= htmlspecialchars($task["text"]) ?></span>
                <a href="?done=<?= $i ?>"><?= $task["done"] ? "undo" : "done" ?></a>
                <a class="del" href="?delete=<?= $i ?>">delete</a>
            </li>
        <?php endforeach; ?>
        </ul>

        <p class="count"><strong><?= $done ?></strong> of <strong><?= $total ?></strong> done</p>
    <?php endif; ?>

</div>

<div class="todo">
    <strong>Your job:</strong>
    <ol style="margin:6px 0 0 18px">
        <li>Make the <em>done</em> link actually work (TODO 1)</li>
        <li>Make <em>delete</em> work (TODO 2)</li>
        <li>Make the counter count (TODO 3)</li>
        <li>Test it: add <code>&lt;b&gt;bold&lt;/b&gt;</code> as a task. It must show as text,
            not as bold — that proves <code>htmlspecialchars()</code> is doing its job.</li>
    </ol>
</div>

</body>
</html>
