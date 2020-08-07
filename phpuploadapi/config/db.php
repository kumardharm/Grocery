
<?php
date_default_timezone_set('Asia/Kolkata');


class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "toyshop";
    private $username = "root";
    private $password = "root";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            //echo "voila";
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
   
}
?>
