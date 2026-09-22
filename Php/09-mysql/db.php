<?php
/*
 * The connection file. Every other page just does:  require "db.php";
 * Keeping it in one place means you change the password once, not in 20 files.
 */

$host     = "localhost";
$user     = "root";
$password = "";          // XAMPP default: empty. If you set one, put it here.
$database = "school";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("<h2>Connection failed</h2>
         <p>" . mysqli_connect_error() . "</p>
         <p>Checklist:<br>
         1. Is MySQL started in the XAMPP control panel?<br>
         2. Did you import <code>school.sql</code> in phpMyAdmin?<br>
         3. Is the password in <code>db.php</code> correct?</p>");
}

mysqli_set_charset($conn, "utf8mb4");
