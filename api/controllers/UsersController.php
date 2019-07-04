<?php
include_once dirname(__DIR__)."/models/UsersModel.php";
include_once "BasicController.php";

class UsersController extends BasicController{
    private $model = null;
    public function __construct(){
        parent::__construct();
        $this->model = new UsersModel('users');
    }

    private function areAllInputsProvided($inputObject){
        if($inputObject->email && $inputObject->username && $inputObject->lastName && $inputObject->password && $inputObject->role){
            return true;
        }else{
            echo "{'error': 'Input missing!'}";
            return false;
        };    
    }

    private function isEmailValid($email){
        if(strlen($email) > 255){
            http_response_code(400);
            echo "{'error': 'Email should be less than 256 characters long!'}";
            return false;
        }     
        else{
            return true;
        } 
    }

    private function isNameValid($name){
        if(strlen($name) > 100){
            http_response_code(400);
            echo "{'error': 'Names strings should be less than 100 characters long!'}";
            return false;
        } 
        else{
            return true;
        }
    }

    private function isRoleValid($role){
        if($role != 'User' &&  $role != 'Admin'){
            http_response_code(400);
            echo "{'error': 'Invalid roles'}";
        
        }else{
            return true;
        };
    }

    private function validateInput($inputObject){
        return ($this->areAllInputsProvided($inputObject) &&
                $this->isEmailValid($inputObject->email )&&
                $this->isNameValid($inputObject->username) &&
                $this->isNameValid($inputObject->lastName)&&
                $this->isRoleValid($inputObject->role)
               );
       
    }

    private function encryptPassword($password){
        $encryptedPassword = password_hash($password, PASSWORD_DEFAULT);
        return $encryptedPassword;
    }

    private function isPasswordMatchingHash($plainTextPassword, $hash){
        $isPasswordMatchingHash = password_verify($plainTextPassword, $hash);
        return $isPasswordMatchingHash;
    }

    private function validateLoginInput($inputObject){
        return isset($inputObject->email) && isset($inputObject->password);
    }

    private function setSession($id, $username, $role){
        session_start();
        $_SESSION['id'] = $id;
        $_SESSION['user'] = $username;
        $_SESSION['role'] = $role;
        $_SESSION['session_start'] = time();
    }

    private function destroySession(){
        session_unset();
        session_destroy();
    }

    public function registerUser($userDataJson){

        $phpObject = parent::decodeIfJson($userDataJson);
        if(!$this->validateInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Input validation failed!'}";
            return;
        }
        $phpObject = parent::sanitizeInput($phpObject);
        if(!$this->model->isEmailUnique($phpObject->email)){
            http_response_code(400);
            echo "{'error': 'Email is not unique!'}";
            return;
        }

        $phpObject->password = $this->encryptPassword($phpObject->password);

        return parent::insertOne($this->model, $phpObject);
        /*if($this->model->insert($phpObject)){
            http_response_code(200);
            echo $userDataJson;
        }else{
            http_response_code(404);
            echo "{'error': 'Registration failed!'}";
        }*/
    }

    public function updateUser($userDataJson){
        $phpObject = $this->decodeIfJson($userDataJson);
        if(!$this->validateInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Input validation failed!'}";
            return;
        }
        $phpObject = parent::sanitizeInput($phpObject);
        if($this->model->isEmailUnique($phpObject->email)){
            http_response_code(400);
            echo "{'error': 'Email does not exist!'}";
            return;
        }
        $phpObject->password = $this->encryptPassword($phpObject->password);

        return parent::updateOne($this->model, $phpObject);
    }

    public function deleteUser($userEmail){
        $userEmail = htmlspecialchars($userEmail, ENT_QUOTES);
        $userInfo = $this->model->getUserByEmail($userEmail);
        if(empty($userInfo)){
            http_response_code(404);
            echo "{'error': 'User not found!'}";
            return;
        }
        if($this->model->deleteUser($userEmail)){
            http_response_code(200);
            echo json_encode($userInfo, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }else{
            http_response_code(404);
            echo "{'error': 'Delete operation failed!'}";
        }
    }

    public function getAllUsers(){
        parent::getAll($this->model);
    }

    public function login($inputData){
        $phpObject = json_decode($inputData);
        $phpObject = parent::sanitizeInput($phpObject);
        if(!$this->validateLoginInput($phpObject)){
            http_response_code(400);
            echo "{'error': 'Email and password should be provided'}";
            return;
        };
        $userInfo = $this->model->getUserByEmail($phpObject->email);
        if(empty($userInfo)){
            http_response_code(404);
            echo "{'error': 'User not found'}";
            return;
        }

        if(isset($_SESSION['user'])){
            http_response_code(404);
            echo "{'error': 'Session already set'}";
            return;
        }


        if($this->isPasswordMatchingHash($phpObject->password, $userInfo[0]["password"])){
            $this->setSession($userInfo[0]['id'], [0]["username"], $userInfo[0]["role"]);
            echo json_encode($userInfo, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        else{
            http_response_code(404);
            echo "{'error': 'User or password are not correct'}";
            return;
        }
    }

    public function logout(){
        $this->destroySession();
    }
}
?>