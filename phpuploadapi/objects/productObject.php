<?php

class Products{

    private $conn;
    public $table_name = "menuItems";

    public $id;
    public $available;
    public $category;
    public $color;
    public $creatdAt;
    public $description;
    public $noOfRating;
    public $offer;
    public $price;
    public $productQty;
    public $rating;
    public $media;
    public $thumb1;
    public $thumb2;
    public $thumb3;
    public $video;
    public $title;
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

    function readAllById(){
        $query="select * from ". $this->table_name. " where id=:id";
          $stmt = $this->conn->prepare($query);

          $stmt->bindParam(':id', $this->id);
          if($stmt->execute()){
          
              return $stmt;
          }
      }

      function updateProduct(){
     

        echo $update="update $this->table_name set
        available=:available,
        category=:category,
        color=:color,
        description=:description,
        price=:price,
        productQty=:productQty,
        media=:media,
        thumb1=:thumb1,
        thumb2=:thumb2,
        thumb3=:thumb3,
        video=:video,
        title=:title,
        updatedAt=:updatedAt
        where id=:id";

        $stmt = $this->conn->prepare($update);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":available", $this->available);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":color", $this->color);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":productQty", $this->productQty);
        $stmt->bindParam(":media", $this->media);
        $stmt->bindParam(":thumb1", $this->thumb1);
        $stmt->bindParam(":thumb2", $this->thumb2);
        $stmt->bindParam(":thumb3", $this->thumb3);
        $stmt->bindParam(":video", $this->video);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":updatedAt", $this->updatedAt);
     
        //$stmt->debugDumpParams();
        if($stmt->execute()){
           return true;
          }
          else
          return false;
      }

      
      function insertProduct(){
     

        $update="insert  into $this->table_name set
        available=:available,
        category=:category,
        color=:color,
        description=:description,
        price=:price,
        productQty=:productQty,
        media=:media,
        thumb1=:thumb1,
        thumb2=:thumb2,
        thumb3=:thumb3,
        video=:video,
        title=:title,
        createdAt=:createdAt,   
        id=:id";

        $stmt = $this->conn->prepare($update);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":available", $this->available);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":color", $this->color);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":productQty", $this->productQty);
        $stmt->bindParam(":media", $this->media);
        $stmt->bindParam(":thumb1", $this->thumb1);
        $stmt->bindParam(":thumb2", $this->thumb2);
        $stmt->bindParam(":thumb3", $this->thumb3);
        $stmt->bindParam(":video", $this->video);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":createdAt", $this->createdAt);
     
        //$stmt->debugDumpParams();
        if($stmt->execute()){
           return true;
          }
          else
          return false;
      }

      function deleteById(){

        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmtd = $this->conn->prepare($query);
    
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmtd->bindParam(":id", $this->id);
    
     
             $stmtd->execute();
        if( $stmtd->rowCount()>0)
             return true;
             else
             return false;
         
        }

        function readAllProduct(){

        $query = "select sum(productQty)  as productQty from " . $this->table_name ;
          $stmt = $this->conn->prepare($query);
          if($stmt->execute()){
          
            return $stmt;
        }
        }

        function readInactiveProduct(){
        $this->available="Inactive";
        $query = "select sum(productQty)  as productQty from " . $this->table_name ." where available=:available";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":available",$this->available ); 
      
        if($stmt->execute()){
          
          return $stmt;
      }
        }

}

?>