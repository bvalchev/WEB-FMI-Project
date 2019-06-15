<?php
class DB{
    private static $instance = null;
    public $connection;
    
    private $username = "root";
    private $dbPassword = "";

    private function __construct()
    {
        $this->connection = new PDO("mysql:host=localhost;dbname=webproject", $this->username, $this->dbPassword);
    }
  
    public static function getInstance()
    {
        if(!self::$instance)
        {
        self::$instance = new DB();
        }
    
        return self::$instance;
    }
}
?>