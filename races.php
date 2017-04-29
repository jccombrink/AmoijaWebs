<?php
//$username="yosemiv8_amoija";$password="amoija";$database="yosemiv8_amoija";
$username="root";$password="spoorkoors";$database="amoija";

// Create connection
$conn = new mysqli(localhost, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM $database.races";
$resultset = $conn->query($sql);
$result = array();
if ($resultset->num_rows > 0){
    while($row = $resultset->fetch_assoc()) {
        $result[$row['id']]['event_id'] = html_entity_decode($row["event_id"],ENT_QUOTES, 'UTF-8');
        $result[$row['id']]['date'] = html_entity_decode($row["date"],ENT_QUOTES, 'UTF-8');
        $result[$row['id']]['type'] = html_entity_decode($row["type"],ENT_QUOTES, 'UTF-8');
        $result[$row['id']]['venue'] = html_entity_decode($row["venue"],ENT_QUOTES, 'UTF-8');
        $result[$row['id']]['entrylink'] = $row["entrylink"];
        $result[$row['id']]['id'] = $row["id"];
    }
}
else{
    echo "Failure";
}
usort($result, "compare");
echo json_encode($result);
$conn->close();
function compare($raceA, $raceB) {
    $a = strtotime(preg_replace('/-\d\d/', '', $raceA['date']));
    $b = strtotime(preg_replace('/-\d\d/', '', $raceB['date']));
    if ($a == $b) {
        return 0;
    }
    return ($a < $b) ? -1 : 1;
}
?>