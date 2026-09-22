<?php
/*
 * One course, chosen by the id in the URL:  detail.php?id=3
 */
require "includes/db.php";

// force it to be a number - never trust the URL
$id = (int)($_GET["id"] ?? 0);

$course = null;
if ($id > 0) {
    $stmt = mysqli_prepare($conn, "SELECT * FROM courses WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $course = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
}

$pageTitle = $course ? $course["title"] : "Not found";
require "includes/header.php";
?>

<a class="back" href="index.php">&larr; all courses</a>

<?php if (!$course): ?>

    <div class="card empty">
        <h1>Course not found</h1>
        <p>There is no course with id <?= $id ?>.</p>
        <p>Try <code>detail.php?id=1</code>, or go back to the list.</p>
    </div>

<?php else: ?>

    <div class="card">
        <span class="tag <?= htmlspecialchars($course["level"]) ?>"><?= htmlspecialchars($course["level"]) ?></span>
        <h1><?= htmlspecialchars($course["title"]) ?></h1>
        <p class="meta">
            Taught by <?= htmlspecialchars($course["teacher"]) ?>
            &middot; <?= (int)$course["hours"] ?> hours
            &middot; added <?= date("d M Y", strtotime($course["created"])) ?>
        </p>
        <p><?= nl2br(htmlspecialchars($course["description"])) ?></p>
    </div>

    <div class="card" style="margin-top:16px">
        <strong>What just happened</strong>
        <ul style="margin-left:18px">
            <li>The link carried <code>?id=<?= $id ?></code> - PHP read it from <code>$_GET</code>.</li>
            <li><code>(int)</code> forced it to a number, so <code>?id=abc</code> cannot break anything.</li>
            <li>A prepared statement fetched exactly one row.</li>
            <li><code>nl2br()</code> turns line breaks into <code>&lt;br&gt;</code> for display.</li>
        </ul>
    </div>

<?php endif; ?>

<?php
mysqli_close($conn);
require "includes/footer.php";
