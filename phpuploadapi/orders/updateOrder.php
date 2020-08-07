<?php
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes
header("Content-Type: appllication/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}


date_default_timezone_set('Asia/Kolkata');

include_once '../config/db.php';
include_once '../objects/orderObject.php';
 
// instantiate database and products object
$database = new Database();
$db = $database->getConnection();
$date = date('Y-m-d H:i:s');

// initialize object
$orders = new Orders($db);
$orders->table_name='orderDetails'; 

$data = json_decode(file_get_contents("php://input"));

$orders->id=$data->id;
$orders->trackingId=$data->trackingId;
$orders->deliveryStatus=$data->deliveryStatus;
$orders->deliveryTrack=$data->deliveryTrack;
$orders->updatedAt=$date;


// check if more than 0 record found
if($stmt = $orders->updateOrder()){
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode(array("message" => "Category updated into database."));
}
else{
 
    // set response code - 404 Not found
    http_response_code(200);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}

?>