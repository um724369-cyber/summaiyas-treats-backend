<?php
include 'db.php';

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $desc = $_POST['description'];
    $price = $_POST['price'];

    $sql = "INSERT INTO products (name, description, price) VALUES ('$name', '$desc', '$price')";

    if(mysqli_query($conn, $sql)){
        header("Location: index.php"); // Send you back to the home page to see the new item
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>