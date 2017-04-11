<?php
$errors = array();
$username="yosemiv8_amoija";$password="amoija";$database="yosemiv8_amoija";
//$username="root";$password="spoorkoors";$database="amoija";

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


$sql1 = "DELETE FROM $database.events WHERE id=?";
$sql2 = "DELETE FROM $database.races WHERE event_id=?";
$stmt1 = $conn->prepare($sql1);
$stmt2 = $conn->prepare($sql2);
if ($stmt1 && $stmt2 && empty($errors)){
    $stmt1->bind_param('i',$id);
    $stmt1->execute();
    $stmt1->close();
    $stmt2->bind_param('i',$id);
    $stmt2->execute();
    $stmt2->close();
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