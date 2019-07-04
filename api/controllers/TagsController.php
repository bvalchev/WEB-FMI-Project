<?php
include_once dirname(__DIR__)."/models/TagsModel.php";
include_once "TagGroupsController.php";

class TagsController extends BasicController
{
    private $model = null;
    private $tagGroupsController = null;

    public function __construct()
    {
        parent::__construct();
        $this->model = new TagsModel('tags');
        $this->tagGroupsController = new TagGroupsController('taggroups');
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

    /*private function isGroupValid($groupId){
        return $this->tagGroupsController->isGroupValid($groupId);
    }*/

    private function validateInput($inputObject){
        return $this->isNameValid($inputObject->tagName) /*&& $this->isGroupValid(($inputObject->tagGroupId))*/;
    }

    public function getTagsForGroup($groupId){
        $tagsInfo = $this->model->getTagsForGroup($groupId);
        echo $json = json_encode($tagsInfo, JSON_UNESCAPED_UNICODE);
    }

    public function insertTag($tagDataJson){
        $phpObject = $this->decodeIfJson($tagDataJson);
        if(!$this->validateInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Input validation failed!'}";
            return;
        }
        $phpObject = parent::sanitizeInput($phpObject);
        /*if(!$this->model->isGroupNameUniqueForUser($phpObject->groupNAme)){
            http_response_code(400);
            echo "{'error': 'Group name is not unique for this user!'}";
            return;
        }*/

        //$phpObject ->userId = $_SESSION['id'];

        return parent::insertOne($this->model, $phpObject);
        /*if($this->model->insert($phpObject)){
            http_response_code(200);
            echo $userDataJson;
        }else{
            http_response_code(404);
            echo "{'error': 'Registration failed!'}";
        }*/
    }

    public function updateTag($tagDataJson){
        $phpObject = $this->decodeIfJson($tagDataJson);
        if(!$this->validateInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Input validation failed!'}";
            return;
        }
        $phpObject = parent::sanitizeInput($phpObject);
        /*if($this->model->isGroupNameUniqueForUser($phpObject->email)){
            http_response_code(400);
            echo "{'error': 'Group name does not exist!'}";
            return;
        }*/

        //$phpObject->userId = $_SESSION['id'];

        return parent::updateOne($this->model, $phpObject);
    }

    public function deleteTag($id){
        //$tagGroupInfo = $this->model->getTagsForGroup($_SESSION['id'], $groupName);
        /*if(empty($tagGroupInfo)){
            http_response_code(404);
            echo "{'error': 'Group not found!'}";
            return;
        }*/
        if($this->model->deleteTag($id)){
            http_response_code(201);
            echo json_encode($id, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }else{
            http_response_code(404);
            echo "{'error': 'Delete operation failed!'}";
            return;
        }
    }

    /*public function getTagGroups(){
        $this->model->getAllTagGroupsForUser($_SESSION['id']);
    }*/
}