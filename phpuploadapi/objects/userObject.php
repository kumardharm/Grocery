<?php 
class UserList{
    private $conn;
    public $table_name = "users";

public $id;
public $email;
public $image;
public $mobileNo;
public $name;
public $status;
public $role;
public $createdAt;
public $updatedAt;


public function __construct($db){
    $this->conn = $db;
}

function readAll(){
    $query="select * from ". $this->table_name;
      $stmt = $this->conn->prepare($query);

      if($stmt->execute()){
      
          return $stmt;
      }
  }

}

?>