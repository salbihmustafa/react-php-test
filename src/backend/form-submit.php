<?php

$response = array();

try {
    //Connect to the database
    $conn = new PDO("mysql:host=localhost;dbname=react_php_test", "root", "");

    //Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Prepare and execute the query
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $conn->prepare("INSERT INTO finance_info (f_purchase_price, f_down_payment, f_interest_rate, f_term) 
    VALUES (:purchase_price, :down_payment, :interest_rate, :term)");
    $stmt->execute([
        'purchase_price' => $data['purchasePrice'],
        'down_payment' => $data['downPayment'],
        'interest_rate' => $data['interestRate'],
        'term' => $data['term'],
    ]);

    $response['status'] = 'success';
    $response['message'] = 'Data inserted successfully.';
    //send response back to front end
    echo json_encode($response);
    //close connection
    $conn = null;
} catch (PDOException $e) {
    $response['status'] = 'error';
    $response['message'] = 'Connection failed: ' . $e->getMessage();
    //send response back to front end
    echo json_encode($response);
    //close connection
    $conn = null;
}



