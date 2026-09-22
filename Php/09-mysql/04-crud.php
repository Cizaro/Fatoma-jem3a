<?php
/*
 * All four operations on one page: Create, Read, Update, Delete.
 * Read this one slowly - it is the skeleton of almost every admin panel ever made.
 */
require "db.php";

$message = "";

// ---------- DELETE ----------
if (isset($_GET["delete"])) {
    $stmt = mysqli_prepare($conn, "DELETE FROM students WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $_GET["delete"]);
    mysqli_stmt_execute($stmt);
    $message = "Student deleted.";
}

// ---------- UPDATE ----------
if (isset($_POST["action"]) && $_POST["action"] === "update") {
    $stmt = mysqli_prepare($conn, "UPDATE students SET name = ?, grade = ? WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "sdi", $_POST["name"], $_POST["grade"], $_POST["id"]);
    mysqli_stmt_execute($stmt);
    $message = "Student updated.";
}

// ---------- CREATE ----------
if (isset($_POST["action"]) && $_POST["action"] === "create") {
    if (trim($_POST["name"]) !== "") {
        $stmt = mysqli_prepare($conn, "INSERT INTO students (name, grade) VALUES (?, ?)");
        mysqli_stmt_bind_param($stmt, "sd", $_POST["name"], $_POST["grade"]);
        mysqli_stmt_execute($stmt);
        $message = "Student added.";
    } else {
        $message = "Name cannot be empty.";
    }
}

// are we editing one row?
$editing = null;
if (isset($_GET["edit"])) {
    $stmt = mysqli_prepare($conn, "SELECT * FROM students WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $_GET["edit"]);
    mysqli_stmt_execute($stmt);
    $editing = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
}

// ---------- READ ----------
$students = mysqli_query($conn, "SELECT * FROM students ORDER BY id");
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>CRUD</title>
<link rel="stylesheet" href="../08-forms/style.css">
<style>
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e3e7f0; }
th { background: #eef1f8; }
.actions a { margin-right: 10px; font-size: 14px; }
.danger { color: #e03131; }
</style></head>
<body>

<h1>Student manager</h1>
<p class="sub">Create, Read, Update, Delete - the four things every app does.</p>

<?php if ($message): ?>
    <div class="card result"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<form method="post">
    <input type="hidden" name="action" value="<?= $editing ? "update" : "create" ?>">
    <?php if ($editing): ?>
        <input type="hidden" name="id" value="<?= $editing["id"] ?>">
    <?php endif; ?>

    <label for="name"><?= $editing ? "Edit student #" . $editing["id"] : "New student" ?></label>
    <input type="text" id="name" name="name" placeholder="Name"
           value="<?= $editing ? htmlspecialchars($editing["name"]) : "" ?>">

    <label for="grade">Grade</label>
    <input type="text" id="grade" name="grade" placeholder="0 - 20"
           value="<?= $editing ? $editing["grade"] : "" ?>">

    <button type="submit"><?= $editing ? "Update" : "Add" ?></button>
    <?php if ($editing): ?>
        &nbsp;<a href="04-crud.php">cancel</a>
    <?php endif; ?>
</form>

<div class="card">
<table>
    <tr><th>#</th><th>Name</th><th>Grade</th><th>Actions</th></tr>
    <?php while ($s = mysqli_fetch_assoc($students)): ?>
        <tr>
            <td><?= $s["id"] ?></td>
            <td><?= htmlspecialchars($s["name"]) ?></td>
            <td><?= $s["grade"] ?></td>
            <td class="actions">
                <a href="?edit=<?= $s["id"] ?>">edit</a>
                <a class="danger" href="?delete=<?= $s["id"] ?>"
                   onclick="return confirm('Delete this student?')">delete</a>
            </td>
        </tr>
    <?php endwhile; ?>
</table>
</div>

<div class="card">
    <strong>Notice:</strong>
    <ul>
        <li>The edit link sends the id through the URL: <code>?edit=3</code> - that is <code>$_GET</code>.</li>
        <li>The delete link asks for confirmation first. Always.</li>
        <li>Every single query uses a prepared statement. No exceptions.</li>
        <li>The same form does "add" and "edit" - a hidden field says which.</li>
    </ul>
</div>

<?php mysqli_close($conn); ?>
</body>
</html>
