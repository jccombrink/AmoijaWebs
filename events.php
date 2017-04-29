<?php
//$username="yosemiv8_amoija";$password="amoija";$database="yosemiv8_amoija";
$username="root";$password="spoorkoors";$database="amoija";

// Create connection
$conn = new mysqli(localhost, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM $database.events";
$resultset = $conn->query($sql);
$result = array();
if ($resultset->num_rows > 0){
    while($row = $resultset->fetch_assoc()) {
//        $name = html_entity_decode($row["name"],ENT_QUOTES, 'UTF-8');
        $id = $row["id"];
        $result[$id]['NAME'] = html_entity_decode($row["name"], ENT_QUOTES, 'UTF-8');
        $result[$id]['ABSTRACT'] = html_entity_decode($row["abstract"], ENT_QUOTES, 'UTF-8');
        $result[$id]['LOGO'] = html_entity_decode($row["logo"], ENT_QUOTES, 'UTF-8');
        $result[$id]['TYPE'] = html_entity_decode($row["type"], ENT_QUOTES, 'UTF-8');
        $result[$id]['DATE'] = html_entity_decode($row["date"], ENT_QUOTES, 'UTF-8');
//        $result[$id]['VENUE'] = html_entity_decode($row["venue"]);
        $result[$id]['ROUTE'] = html_entity_decode($row["route"], ENT_QUOTES, 'UTF-8');
        $result[$id]['DISTANCE'] = html_entity_decode($row["distances"], ENT_QUOTES, 'UTF-8');
        $result[$id]['CATEGORIES'] = html_entity_decode($row["categories"], ENT_QUOTES, 'UTF-8');
        $result[$id]['ENTRIES'] = html_entity_decode($row["entries"], ENT_QUOTES, 'UTF-8');
        $result[$id]['REGISTRATION'] = html_entity_decode($row["registration"], ENT_QUOTES, 'UTF-8');
        $result[$id]['STARTING'] = html_entity_decode($row["start_times"], ENT_QUOTES, 'UTF-8');
        $result[$id]['MORE'] = html_entity_decode($row["more"], ENT_QUOTES, 'UTF-8');
//        $result[$id]['ENTERLINK'] = html_entity_decode($row["enterlink"],ENT_QUOTES, 'UTF-8');
    }
}
else{
    echo "Failure";
}
echo json_encode($result);
$conn->close();
?>