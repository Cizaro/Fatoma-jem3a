<?php
/*
 * Step 2: SELECT rows and show them in an HTML table.
 * This is THE pattern of dynamic websites: loop over rows, print HTML.
 */
require "db.php";

// change this to "grade" or "name" to see the sorting change
$sql    = "SELECT * FROM students ORDER BY grade DESC";
$result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Students</title>
<link rel="stylesheet" href="../08-forms/style.css">
<style>
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e3e7f0; }
th { background: #eef1f8; }
.fail { color: #e03131; font-weight: 600; }
.pass { color: #2f9e44; font-weight: 600; }
</style></head>
<body>

<h1>Students</h1>
<p class="sub">Rows are coming from MySQL, not from the HTML.</p>

<div class="card">
<table>
    <tr><th>#</th><th>Name</th><th>Major</th><th>Grade</th><th>Result</th></tr>

    <?php while ($row = mysqli_fetch_assoc($result)): ?>
        <tr>
            <td><?= $row["id"] ?></td>
            <td><?= htmlspecialchars($row["name"]) ?></td>
            <td><?= htmlspecialchars($row["major"]) ?></td>
            <td><?= $row["grade"] ?></td>
            <td class="<?= $row["grade"] >= 10 ? "pass" : "fail" ?>">
                <?= $row["grade"] >= 10 ? "Pass" : "Fail" ?>
            </td>
        </tr>
    <?php endwhile; ?>

</table>
</div>

<?php
// a second query: the statistics
$stats = mysqli_fetch_assoc(mysqli_query($conn,
    "SELECT COUNT(*) AS total, AVG(grade) AS average, MAX(grade) AS best FROM students"));
?>
<div class="card result">
    <p>Total students: <strong><?= $stats["total"] ?></strong></p>
    <p>Class average: <strong><?= round($stats["average"], 2) ?></strong></p>
    <p>Best grade: <strong><?= $stats["best"] ?></strong></p>
</div>

<p><a href="03-insert.php">Next: add a student &rarr;</a></p>

<?php mysqli_close($conn); ?>
</body>
</html>
