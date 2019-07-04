<?php
include_once dirname(__DIR__)."/DB.php";
class BasicModel{
    private $connection;
    private $table;
    public function __construct($table){
        $this->connection = DB::getInstance()->connection;
        $this->table = $table;
    }
    public function getConnection(){
        return $this->connection;
    }
    public function getTable(){
        return $this->table;
    }
    public function getAll(){
        $tempArray = [];
        $statement = $this->connection->query("SELECT * FROM " . $this->table); 
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            array_push($tempArray, $row);
        }
        return json_encode($tempArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    }
    public function getById($idValue){
        $statement = $this->connection->prepare("SELECT * FROM " . $this->table . "WHERE id = '?' ");
        $statement->execute([$idValue]);
        return $statement->rowCount() > 0;
    }

    public function deleteById($id){
        $statement = $this->connection->prepare("DELETE FROM {$this->table} WHERE id = :id ");
        $statement->execute(["id" => $id]);
        return $statement->rowCount() > 0;
    }
   
}
 ?>