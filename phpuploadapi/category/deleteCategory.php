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
include_once '../objects/catObject.php';
 
// instantiate database and products object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$category = new Category($db);


 $category->id =  isset($_GET['id']) ? $_GET['id'] : die();


$category->table_name='categories'; 
 //$category->id=$data->id;

// delete the product
if($category->deleteById()){

    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Product was deleted."));
}
 
// if unable to delete the product
else{

    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete product."));
}

?>