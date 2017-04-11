<?php
$errors = array();
$params = array("event_id", "date", "type", "venue", "entrylink");
$types = array("sssss");

$username="yosemiv8_amoija";$password="amoija";$database="yosemiv8_amoija";
//$username="root";$password="spoorkoors";$database="amoija";

// Create connection
$conn = new mysqli(localhost, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    $errors[] = "error";
}
//$param_references is om references te hou van die values in $params, want die 'call_user_func_array' soek references. Vader weet allenig hoekom.
$param_references = array();
foreach ($params as $value) {
    if(isset($_REQUEST[$value])){
//        $$value = htmlentities($conn->real_escape_string($_REQUEST[$value]));
        $$value = htmlentities($_REQUEST[$value]);
        $param_references[] = &$$value;
    }
    else{
        $errors[] = $value." error.";
    }
}
if(isset($_REQUEST['id'])){
    $sql = "UPDATE $database.races SET event_id=?, date=?, type=?, venue=?, entrylink=? WHERE id=".$_REQUEST['id'];
}
else{
    $sql = "INSERT INTO $database.races (event_id, date, type, venue, entrylink) VALUES (?,?,?,?,?)";
}
$stmt = $conn->prepare($sql);
if ($stmt && empty($errors)){
    call_user_func_array(array($stmt, "bind_param"), array_merge($types, $param_references));
    $stmt->execute();
    $stmt->close();
    $result['status'] = 'success';
    $result['messages'] = $sql;
}
else{
    $result['status'] = 'failed';
    $result['messages'] = $errors;
}
echo json_encode($result);
$conn->close();
?>