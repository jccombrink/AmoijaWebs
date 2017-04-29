<?php
$errors = array();
//$username="yosemiv8_amoija";$password="amoija";$database="yosemiv8_amoija";
$username="root";$password="spoorkoors";$database="amoija";

// Create connection
$conn = new mysqli(localhost, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    $errors[] = "error";
}
if(isset($_REQUEST['id'])){
    $id = htmlentities($conn->real_escape_string($_REQUEST['id']));
}
else{
    $errors[] = "id error.";
}


$sql = "DELETE FROM $database.races WHERE id=?";
$stmt = $conn->prepare($sql);
if ($stmt && empty($errors)){
    $stmt->bind_param('i',$id);
    $stmt->execute();
    $stmt->close();
    $result['status'] = 'success';
    $result['messages'] = '';
}
else{
    $result['status'] = 'failed';
    $result['messages'] = $errors;
}
echo json_encode($result);
$conn->close();
?>