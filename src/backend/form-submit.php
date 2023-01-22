<?php

$data = json_decode(file_get_contents('php://input'), true);

// Output the value of the $data variable
echo "<pre>";
print_r($data);
echo "</pre>";

// or you can use
echo json_encode($data);

?>