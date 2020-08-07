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
 
// initialize object
$orders = new Orders($db);
$orders->table_name='orderDetails'; 

// query products
$stmt = $orders->readNew();
$num = $stmt->rowCount();


// check if more than 0 record found
if($num>0){

    // products array
    $category_arr=array();
    $category_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      
        extract($row);
 
        $product_item=array(

            "id"=>$id,
            "invoiceId"=>$invoiceId,
            "orderId"=>$orderId,
            "cartItem"=>$cartItem,
            "couponID"=>$couponId,
            "couponDiscount"=>$couponDiscount,
            "subTotal"=>$subTotal,
            "tax"=>$tax,
            "grandTotal"=>$grandTotal,
            "paymentStatus"=>$paymentStatus,
            "paymentMode"=>$paymentMode,
            "userId"=>$userId,
            "shippingAddress"=>$shippingAddress,
            "trackingId"=>$trackingId,
            "deliveryStatus"=>$deliveryStatus,
            "createdAt"=>$createdAt,
            "updatedAt"=>$updatedAt
 
        );
 
        array_push($category_arr["records"], $product_item);
        json_encode($category_arr,true);
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