<?php
class DB{
    private static $instance = null;
    public $connection;
    
	private $host = 'localhost';
	private $dbname = 'webproject';
    private $username = "root";
    private $dbPassword = "";

    private function __construct()
    {
        $this->connection = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->dbPassword);
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