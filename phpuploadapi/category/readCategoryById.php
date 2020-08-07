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
$category->table_name='categories'; 

$data = json_decode(file_get_contents("php://input"));


$category->id=$data->id;
// query products
$stmt = $category->readAllById();
$num = $stmt->rowCount();


// check if more than 0 record found
if($num>0){

    // products array
    $category_arr=array();
    $category_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      
        extract($row);
 
        $category_item=array(

            "id"=>$id,
            "title"=>$title,
            "thumb"=>$thumb,
            "description"=>$description,
            "createdAt"=>$createdAt,
            "updatedAt"=>$updatedAt
        );
 
        array_push($category_arr["records"], $category_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($category_arr);
}
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}

?>