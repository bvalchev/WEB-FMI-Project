<?php
/**
 * Created by PhpStorm.
 * User: Boyan
 * Date: 8.6.2019 г.
 * Time: 18:55
 */
include_once "BasicModel.php";
class TagGroupsModel extends BasicModel{

    public function __construct($table){
        parent::__construct($table);
    }

    public function insert($object){
        $connection = $this->getConnection();
        $statement = $connection->prepare("INSERT INTO " . $this->getTable() . " (userId, tagGroupName) 
                                          VALUES (:userId, :tagGroupName)");
        $statement->execute(['userId' => $object->userId, 'tagGroupName' => $object->tagGroupName]);
        return $statement->rowCount() > 0;
    }

    public function getAllTagGroupsForUser($userId){
        $statement = $this->getConnection()->prepare("SELECT * FROM  {$this->getTable()} WHERE userId = :userId ");
        $statement->execute(["userId" => $userId]);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }


    public function getTagGroupByName($tagGroupName){
        $statement = $this->getConnection()->prepare("SELECT * FROM {$this->getTable()} WHERE tagGroupName = :tagGroupName");
        $statement->execute(["tagGroupName" => $tagGroupName]);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function isTagGroupNameUniqueForUser($tagGroupName, $userId){
        $statement = $this->getConnection()->prepare("SELECT count(*) FROM {$this->getTable()} WHERE tagGroupName = :tagGroupName AND userId = :userId");
        $statement->execute(['tagGroupName' => $tagGroupName, 'userId' => $userId]);
        $count = $statement->fetchColumn();
        return $count == 0;
    }

    public function update($object){
        $connection = $this->getConnection();
        $statement = $connection->prepare("UPDATE " . $this->getTable() . " SET tagGroupName = :tagGroupName WHERE id = :id");
        $statement->execute(['id'=> $object->id, 'tagGroupName' => $object->tagGroupName]);
        return $statement->rowCount() > 0;
    }

    public function deleteTagGroup($id){
        $connection = $this->getConnection();
        $statement = $connection->prepare("DELETE FROM {$this->getTable()} WHERE id = :id ");
        $statement->execute(["id" => $id]);
        return $statement->rowCount() > 0;
    }
}