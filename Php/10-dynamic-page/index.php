<?php
/*
 * The catalogue page: reads the database, supports search, links to detail.php
 */
require "includes/db.php";

$search = trim($_GET["search"] ?? "");

if ($search !== "") {
    // the % wildcards go in the PHP variable, not in the SQL text
    $stmt = mysqli_prepare($conn,
        "SELECT * FROM courses WHERE title LIKE ? OR teacher LIKE ? ORDER BY title");
    $term = "%" . $search . "%";
    mysqli_stmt_bind_param($stmt, "ss", $term, $term);
} else {
    $stmt = mysqli_prepare($conn, "SELECT * FROM courses ORDER BY title");
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$count  = mysqli_num_rows($result);

$pageTitle = "Courses";
require "includes/header.php";
?>

<h1>Course catalogue</h1>
<p class="sub">Every card below is one row in the <code>courses</code> table.</p>

<?php if (isset($_GET["added"])): ?>
    <div class="notice">Course added.</div>
<?php endif; ?>

<form class="searchbar" method="get">
    <input type="text" name="search" placeholder="Search a course or a teacher..."
           value="<?= htmlspecialchars($search) ?>">
    <button type="submit">Search</button>
</form>

<?php if ($search !== ""): ?>
    <p class="sub">
        <?= $count ?> result(s) for "<strong><?= htmlspecialchars($search) ?></strong>"
        &middot; <a href="index.php">clear</a>
    </p>
<?php endif; ?>

<?php if ($count === 0): ?>

    <div class="card empty">
        <p>No course matches that search.</p>
        <p><a href="index.php">Show everything</a></p>
    </div>

<?php else: ?>

    <div class="grid">
    <?php while ($course = mysqli_fetch_assoc($result)): ?>
        <article class="card">
            <span class="tag <?= htmlspecialchars($course["level"]) ?>">
                <?= htmlspecialchars($course["level"]) ?>
            </span>
            <h2><a href="detail.php?id=<?= $course["id"] ?>"><?= htmlspecialchars($course["title"]) ?></a></h2>
            <p class="meta"><?= htmlspecialchars($course["teacher"]) ?> &middot; <?= (int)$course["hours"] ?> hours</p>
            <p><?= htmlspecialchars(substr($course["description"], 0, 90)) ?>...</p>
        </article>
    <?php endwhile; ?>
    </div>

<?php endif; ?>

<?php
mysqli_close($conn);
require "includes/footer.php";
