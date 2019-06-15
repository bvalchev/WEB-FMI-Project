<?php
/**
 * Created by PhpStorm.
 * User: Boyan
 * Date: 1.6.2019 г.
 * Time: 17:47
 */
include_once "BasicModel.php";
class TagsModel extends BasicModel{

    public function __construct($table){
        parent::__construct($table);
    }

    public function insert($object){
        $connetion = $this->getConnection();
        $statement = $connetion->prepare("INSERT INTO " . $this->getTable() . " (tagGroupId, tagName, link, points) 
                                          VALUES (:tagGroupId, :tagName, :link, :points)");
        $statement->execute(['tagGroupId'=> $object->tagGroupId, 'tagName' => $object->tagName, 'points' => $object->points, 'link' => $object->link]);
        return $statement->rowCount() > 0;
    }

    /*public function getAllTagGroupsForUser($tagGroupId){
        $statement = $this->getConnection()->prepare("SELECT * FROM  {$this->getTable()} WHERE tagGroupId = :tagGroupId ");
        $statement->execute(["tagGroupId" => $tagGroupId]);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }*/

    public function getTagsForGroup($tagGroupId){
        $statement = $this->getConnection()->prepare("SELECT * FROM {$this->getTable()} WHERE tagGroupId = :tagGroupId");
        $statement->execute(["tagGroupId" => $tagGroupId]);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getTagById($tagId){
        $statement = $this->getConnection()->prepare("SELECT * FROM {$this->getTable()} WHERE id= :tagId");
        $statement->execute(["tagGroupId" => $tagId]);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    /*public function isTagGroupNameUniqueForUser($tagGroupName, $userId){
        $statement = $this->getConnection()->prepare("SELECT count(*) FROM {$this->getTable()} WHERE tagGroupName = :$tagGroupName AND userId = :$userId");
        $statement->execute(['tagGroupName' => $tagGroupName, 'userId' => $userId]);
        $count = $statement->fetchColumn();
        return $count == 0;
    }*/

    public function update($object){
        $connection = $this->getConnection();
        $statement = $connection->prepare("UPDATE {$this->getTable()} SET tagName = :tagName, points = :points, link = :link WHERE id = :id");
        $statement->execute(['tagName' => $object->tagName, 'points' => $object->points, 'link' => $object->link, 'id' => $object->id]);
        return $statement->rowCount() > 0;
    }

    public function deleteTag($id){
        $connection = $this->getConnection();
        $statement = $connection->prepare("DELETE FROM {$this->getTable()} WHERE id = :id ");
        $statement->execute(["id" => $id]);
        return $statement->rowCount() > 0;
    }
}