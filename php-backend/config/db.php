<?php
$host = 'localhost';
$db_name = 'employee';  // change this
$username = 'root';               // default in XAMPP
$password = '';                   // default in XAMPP

$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}
?>
