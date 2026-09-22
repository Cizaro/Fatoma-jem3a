<?php
// Written once, used by every page. Change the menu here and it changes everywhere.
$pageTitle = $pageTitle ?? "Mini Site";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($pageTitle) ?> | Mini Site</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header class="topbar">
    <div class="wrap">
        <span class="logo">Mini<strong>Site</strong></span>
        <nav>
            <a href="index.php">Courses</a>
            <a href="admin.php">Admin</a>
        </nav>
    </div>
</header>
<main class="wrap">
