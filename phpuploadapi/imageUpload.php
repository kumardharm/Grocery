<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");



$response = array();
$folder=isset($_POST['folder'])?$_POST['folder']:null;
$category=isset($_POST['category'])?$_POST['category']:null;
if($category!=null){
$upload_dir = 'uploads/'.$folder."/".$category."/";
}
else
$upload_dir = 'uploads/'.$folder."/";

$server_url = 'http://127.0.0.1:8081';


if(isset($_FILES['avatar']))
{
    $avatar_name = $_FILES["avatar"]["name"];
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    $error = $_FILES["avatar"]["error"];
//print_r($_FILES["avatar"]);
    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = $avatar_name;
        if(!is_dir($upload_dir)){
            mkdir($upload_dir,0777,true);
        }
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );    
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }
}
else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}

if(isset($_FILES['avatar2']))
{
    $avatar_name = $_FILES["avatar2"]["name"];
    $avatar_tmp_name = $_FILES["avatar2"]["tmp_name"];
    $error = $_FILES["avatar2"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = $category."-".$avatar_name;
        if(!is_dir($upload_dir)){
            mkdir($upload_dir,0777,true);
        }
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );    
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }

}
else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}
if(isset($_FILES['avatar3'] )  )
{
    $avatar_name = $_FILES["avatar3"]["name"];
    $avatar_tmp_name = $_FILES["avatar3"]["tmp_name"];
    $error = $_FILES["avatar3"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = $category."-".$avatar_name;
        if(!is_dir($upload_dir)){
            mkdir($upload_dir,0777,true);
        }
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );    
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }
}
else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}


if(isset($_FILES['avatar4']))
{
   
    $avatar_name = $_FILES["avatar4"]["name"];
    $avatar_tmp_name = $_FILES["avatar4"]["tmp_name"];
    $error = $_FILES["avatar4"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {

       
        $random_name = $category."-".$avatar_name;
        if(!is_dir($upload_dir)){
            mkdir($upload_dir,0777,true);
        }
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
        
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );    
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }
}
else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}

echo json_encode($response);
?>