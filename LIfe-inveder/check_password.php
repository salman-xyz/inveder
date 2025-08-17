<?php
$servername = "localhost";
$username = "YOUR_DB_USER";
$password = "YOUR_DB_PASSWORD";
$dbname = "u217154754_login_li";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB Connection failed"]));
}

if (isset($_GET["token"])) {
    $token = $_GET["token"];
    $sql = "SELECT * FROM tokens WHERE token = '$token' AND status = 1 LIMIT 1";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "invalid"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No token provided"]);
}
?>
