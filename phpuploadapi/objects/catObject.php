<?php 
class Category{
    private $conn;
    public $table_name = "categories";

public $id;
public $title;
public $thumb;
public $description;
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

    function createCategory(){
       
        $insert="insert into $this->table_name (id,title,thumb,description,createdAt) values (:id,:title,:thumb,:description,:date)";
        $stmt = $this->conn->prepare($insert);

        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->thumb=htmlspecialchars(strip_tags($this->thumb));    
        $this->description=htmlspecialchars(strip_tags($this->description));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":thumb", $this->thumb);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":date", $this->createdAt);
     
        //$stmt->debugDumpParams();
        if($stmt->execute()){
           return true;
          }
          return false;
    }
    
    function updateCategory(){
       
        $update="update $this->table_name set
        title=:title,
        thumb=:thumb,
        description=:description,
        updatedAt=:updatedAt 
        where id=:id";
        $stmt = $this->conn->prepare($update);

        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->thumb=htmlspecialchars(strip_tags($this->thumb));    
        $this->description=htmlspecialchars(strip_tags($this->description));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":thumb", $this->thumb);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":updatedAt", $this->updatedAt);
     
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
}
?>