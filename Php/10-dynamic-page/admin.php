<?php
/*
 * The admin page: add and delete courses.
 * Notice it redirects after saving - that is the PRG pattern from the lesson.
 */
require "includes/db.php";

$errors = [];

// ---- delete ----
if (isset($_GET["delete"])) {
    $stmt  = mysqli_prepare($conn, "DELETE FROM courses WHERE id = ?");
    $delId = (int)$_GET["delete"];
    mysqli_stmt_bind_param($stmt, "i", $delId);
    mysqli_stmt_execute($stmt);
    header("Location: admin.php?deleted=1");   // redirect, then exit. Always.
    exit;
}

// ---- add ----
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title   = trim($_POST["title"]   ?? "");
    $teacher = trim($_POST["teacher"] ?? "");
    $level   =      $_POST["level"]   ?? "beginner";
    $hours   =      $_POST["hours"]   ?? "";
    $desc    = trim($_POST["description"] ?? "");

    if ($title === "")                        $errors[] = "Title is required.";
    if ($hours === "" || !is_numeric($hours)) $errors[] = "Hours must be a number.";

    if (!$errors) {
        $stmt = mysqli_prepare($conn,
            "INSERT INTO courses (title, teacher, level, hours, description) VALUES (?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sssis", $title, $teacher, $level, $hours, $desc);
        mysqli_stmt_execute($stmt);
        header("Location: index.php?added=1");
        exit;
    }
}

$courses = mysqli_query($conn, "SELECT id, title, teacher, hours FROM courses ORDER BY id");

$pageTitle = "Admin";
require "includes/header.php";
?>

<h1>Admin</h1>
<p class="sub">Add a course and watch the public page change.</p>

<?php if (isset($_GET["deleted"])): ?>
    <div class="notice">Course deleted.</div>
<?php endif; ?>

<?php if ($errors): ?>
    <div class="notice" style="background:#fdeaea;border-color:#e03131">
        <ul style="margin-left:18px">
        <?php foreach ($errors as $e): ?><li><?= htmlspecialchars($e) ?></li><?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<div class="card">
<form class="stack" method="post">
    <label for="title">Title</label>
    <input type="text" id="title" name="title">

    <label for="teacher">Teacher</label>
    <input type="text" id="teacher" name="teacher">

    <label for="level">Level</label>
    <select id="level" name="level">
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="advanced">advanced</option>
    </select>

    <label for="hours">Hours</label>
    <input type="text" id="hours" name="hours">

    <label for="description">Description</label>
    <textarea id="description" name="description" rows="4"></textarea>

    <button class="btn" type="submit" style="margin-top:16px">Add course</button>
</form>
</div>

<div class="card" style="margin-top:20px">
<table>
    <tr><th>#</th><th>Title</th><th>Teacher</th><th>Hours</th><th></th></tr>
    <?php while ($c = mysqli_fetch_assoc($courses)): ?>
        <tr>
            <td><?= $c["id"] ?></td>
            <td><?= htmlspecialchars($c["title"]) ?></td>
            <td><?= htmlspecialchars($c["teacher"]) ?></td>
            <td><?= (int)$c["hours"] ?></td>
            <td><a class="danger" href="?delete=<?= $c["id"] ?>"
                   onclick="return confirm('Delete this course?')">delete</a></td>
        </tr>
    <?php endwhile; ?>
</table>
</div>

<?php
mysqli_close($conn);
require "includes/footer.php";
