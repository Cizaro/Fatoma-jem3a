<?php
// The one and only place the connection details live.
$conn = mysqli_connect("localhost", "root", "", "mini_site");

if (!$conn) {
    die("<h2>Connection failed</h2><p>" . mysqli_connect_error() . "</p>
         <p>Start MySQL in XAMPP and import <code>courses.sql</code> in phpMyAdmin.</p>");
}
mysqli_set_charset($conn, "utf8mb4");
