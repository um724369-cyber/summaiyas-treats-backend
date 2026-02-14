<?php
// Check if we are on Localhost (XAMPP) or Live Server
if ($_SERVER['HTTP_HOST'] == 'localhost') {
    // 🏠 LOCALHOST SETTINGS (XAMPP)
    $servername = "localhost:3307"; 
    $username = "root";
    $password = "";
    $dbname = "mansuri_sweets";
} else {
    // 🌐 LIVE SERVER SETTINGS (InfinityFree)
    $servername = "sql104.infinityfree.com";
    $username = "if0_41148670";
    $password = "gloN536FNZFG"; 
    $dbname = "if0_41148670_mansuri_sweets";
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>