<?php
/*
 * Step 1: just prove the connection works.
 * Open: http://localhost/.../09-mysql/01-connect.php
 */
require "db.php";
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Connection test</title>
<link rel="stylesheet" href="../08-forms/style.css"></head>
<body>

<h1>Connected!</h1>

<div class="card result">
    <p>PHP is talking to MySQL.</p>
    <p>Server version: <strong><?= mysqli_get_server_info($conn) ?></strong></p>
    <?php
    $result = mysqli_query($conn, "SELECT COUNT(*) AS total FROM students");
    $row    = mysqli_fetch_assoc($result);
    ?>
    <p>The <code>students</code> table has <strong><?= $row["total"] ?></strong> rows.</p>
</div>

<p><a href="02-select.php">Next: read the rows &rarr;</a></p>

<?php mysqli_close($conn); ?>
</body>
</html>
