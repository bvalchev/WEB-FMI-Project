<?php
include_once dirname(__DIR__)."/models/TagGroupsModel.php";

class TagGroupsController extends BasicController
{
    private $model = null;

    public function __construct()
    {
        parent::__construct();
        $this->model = new TagGroupsModel('taggroups');
    }

    private function isNameValid($name){
        if(strlen($name) > 60 && strlen($name) > 0){
            http_response_code(400);
            echo "{'error': 'Names strings should be provided and be less than 60 characters long!'}";
            return false;
        }
        else{
            return true;
        }
    }

    public function isGroupValid($groupId){

    }

    private function validateInput($inputObject){
        return $this->isNameValid($inputObject->tagGroupName);
    }

    public function getGroupsForUser($userId){
        $tagGroupsInfo = $this->model->getAllTagGroupsForUser($userId);
        echo $json = json_encode($tagGroupsInfo, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public function getGroupByName($groupName){
        $tagGroupInfo = $this->model->getTagGroupByName($groupName);
        echo $json = json_encode($tagGroupInfo, JSON_UNESCAPED_UNICODE);
    }

    public function insertTagGroup($tagDataJson){
        $phpObject = $this->decodeIfJson($tagDataJson);
        if(!$this->validateInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Input validation failed!'}";
            return;
        }
        $phpObject = parent::sanitizeInput($phpObject);
        if(!$this->model->isTagGroupNameUniqueForUser($phpObject->tagGroupName, $phpObject->userId/*$_SESSION['id']*/)){
            http_response_code(400);
            echo "{'error': 'Group name is not unique for this user!'}";
            return;
        }

        //$phpObject ->userId = $_SESSION['id'];

        return parent::insertOne($this->model, $phpObject);
    }

    public function updateTagGroup($tagDataJson){
        $phpObject = $this->decodeIfJson($tagDataJson);
        if(!$this->validateInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Input validation failed!'}";
            return;
        }
        $phpObject = parent::sanitizeInput($phpObject);
        if(!$this->model->isTagGroupNameUniqueForUser($phpObject->tagGroupName, $phpObject->userId/*$_SESSION['id']*/)){
            http_response_code(400);
            echo "{'error': 'Group name taken!'}";
            return;
        }
        //$phpObject->userId = $_SESSION['id'];

        return parent::updateOne($this->model, $phpObject);
    }

    public function deleteTagGroup($id){
        //$tagGroupInfo = $this->model->getTagsForGroup($_SESSION['id'], $groupName);
        /*if(empty($tagGroupInfo)){
            http_response_code(404);
            echo "{'error': 'Group not found!'}";
            return;
        }*/
        if($this->model->deleteTagGroup($id)){
            http_response_code(200);
            echo json_encode($id, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }else{
            http_response_code(404);
            echo "{'error': 'Delete operation failed!'}";
            return;
        }
    }
}