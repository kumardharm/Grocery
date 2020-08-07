<?php 
class Orders{
    private $conn;
    public $table_name = "users";

public $id;
public $invoiceId;
public $orderId;
public $cartItem;
public $couponDiscount;
public $subTotal;
public $tax;
public $grandTotal;
public $paymentStatus;
public $paymentMode;
public $tackingId;
public $deliveryTrack;
public $deliverStatus;
public $createdAt;
public $updatedAt;
public $sold;


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

  function readNew(){
     $query="select * from ". $this->table_name ." where deliveryStatus!='Delivered'";
      $stmt = $this->conn->prepare($query);

      if($stmt->execute()){
      
          return $stmt;
      }
  }

  function readAllById(){
    $query="select * from ". $this->table_name ." where id=:id";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":id", $this->id);
      
      if($stmt->execute()){
      
          return $stmt;
      }
  }

  function readTotalSale(){
    $query="select  sum(grandTotal) as sale from ". $this->table_name ;
    $stmt = $this->conn->prepare($query);    
    if($stmt->execute()){
    
        return $stmt;
    }
  }

  function readTotalProductSold(){
    $query="select  sold  from  productSold" ;
    $stmt = $this->conn->prepare($query);    
    if($stmt->execute()){    
        return $stmt;
    }
  }

function updateOrder(){
 $update="update $this->table_name set
 deliveryStatus=:deliveryStatus,
 trackingId=:trackingId,
deliveryTrack=:deliveryTrack,
 updatedAt=:updatedAt where    
  id=:id";

  $stmt = $this->conn->prepare($update);

  $stmt->bindParam(":id", $this->id);
  $stmt->bindParam(":trackingId", $this->trackingId);
  $stmt->bindParam(":deliveryStatus", $this->deliveryStatus);
  $stmt->bindParam(":deliveryTrack", $this->deliveryTrack);
  $stmt->bindParam(":updatedAt", $this->updatedAt);

  //$stmt->debugDumpParams();
  if($stmt->execute()){
     return true;
    }
    else
    return false;
}


}

?>