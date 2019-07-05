<?php
header('Access-Control-Allow-Origin: *');
include_once  "./api/controllers/UsersController.php";
include_once  "./api/controllers/TagGroupsController.php";
include_once  "./api/controllers/TagsController.php";

$url = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];
$rootFolderName = "62051_project_final";
$baseUrl = "/".$rootFolderName."/api.php/";
$usersController = new UsersController();
$tagsController = new TagsController();
$tagGroupsController = new TagGroupsController();

if($method == 'GET'){

    switch ($url) {
        case $baseUrl . 'users' :
            $usersController->getAllUsers();
            break;
        case $baseUrl . 'logout':
            $usersController->logout();
            break;
        case (preg_match( '/\/'.$rootFolderName.'\/api.php\/tags\/.*/', $url) ? true : false):
            $groupId = substr($url, strrpos($url, '/') + 1);
            $tagsController->getTagsForGroup($groupId);
            break;
        case (preg_match( '/\/'.$rootFolderName.'\/api.php\/tagGroupByName\/.*/', $url) ? true : false) :
            $name = substr($url, strrpos($url, '/') + 1);
            $tagGroupsController->getGroupByName($name);
            break;

        case (preg_match( '/\/'.$rootFolderName.'\/api.php\/tagGroups\/.*/', $url) ? true : false) :
            $userId = substr($url, strrpos($url, '/') + 1);
            $tagGroupsController->getGroupsForUser($userId);
            break;
        default:
            http_response_code(404);
            echo "Path not found! Check path name and method";
            break;
    }
}elseif($method == 'POST'){
    switch ($url) {
        case $baseUrl . "registerUser":
            $inputData = file_get_contents('php://input', true);
            $usersController->registerUser($inputData);
            break;
        case $baseUrl . "addTag":
            $inputData = file_get_contents('php://input', true);
            $tagsController->insertTag($inputData);
            break;
        case $baseUrl . "insertTagGroup":
            $inputData = file_get_contents('php://input', true);
            $tagGroupsController->insertTagGroup($inputData);
            break;
        case $baseUrl . 'login':
            $inputData = file_get_contents('php://input', true);
            $usersController->login($inputData);
            break;
        default:
            http_response_code(404);
            echo "Path not found! Check path name and method";
            break;
    }
}elseif($method == 'PUT'){
    switch ($url) {
        case $baseUrl . "updateUser":
            $inputData = file_get_contents('php://input', true);
            $usersController->updateUser($inputData);
            break;
        case $baseUrl . "updateTag":
            $inputData = file_get_contents('php://input', true);
            $tagsController->updateTag($inputData);
            break;
        case $baseUrl . "updateTagGroup":
            $inputData = file_get_contents('php://input', true);
            $tagGroupsController->updateTagGroup($inputData);
            break;
        default:
            http_response_code(404);
            echo "Path not found! Check path name and method";
            break;
    }
}elseif($method == 'DELETE'){
    switch ($url) {
        case (preg_match( '/\/'.$rootFolderName.'\/api.php\/deleteUser\/.*/', $url) ? true : false)  :
            $email = substr($url, strrpos($url, '/' )+1);
            $usersController->deleteUser($email);
            break;
        case (preg_match( '/\/'.$rootFolderName.'\/api.php\/deleteTag\/.*/', $url) ? true : false) :
            $groupId = substr($url, strrpos($url, '/' )+1);
            $tagsController->deleteTag(intval($groupId));
            break;
        case (preg_match( '/\/'.$rootFolderName.'\/api.php\/deleteTagGroup\/.*/', $url) ? true : false) :
            $groupId = substr($url, strrpos($url, '/' )+1);
            $tagGroupsController->deleteTagGroup($groupId);
            break;
        default:
            http_response_code(404);
            echo "Path not found! Check path name and method";
            break;
    }
}else{
    http_response_code(404);
    echo "Path not found! Check path name and method";
    return;
}



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");



?>