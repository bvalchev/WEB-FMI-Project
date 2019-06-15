<?php
/**
 * Created by PhpStorm.
 * User: Boyan
 * Date: 1.6.2019 г.
 * Time: 17:18
 */
class BasicController{
    public function __construct(){
    }

    protected function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }
    protected function decodeIfJson($jsonObject){
        $phpObject = [];
        if($this->isJson($jsonObject)){
            $phpObject = json_decode($jsonObject);
        }
        return $phpObject;
    }

    protected function sanitizeInput($inputObject){
        $sanitizedInput = $inputObject;
        foreach ($sanitizedInput as $key => $value) {
            $sanitizedInput->$key = htmlspecialchars($sanitizedInput->$key, ENT_QUOTES);
        }
        return $sanitizedInput;
    }

    protected  function getAll($model){
        $responseJson = $model->getAll();
        $phpObject = json_decode($responseJson);
        if(empty($phpObject)){
            http_response_code(404);
            echo "{'error': 'Get all operation failed!'}";
            return false;
        }else{
            echo $responseJson;
            return $responseJson;
        }
    }

    protected function insertOne($model, $phpObject){
        if($model->insert($phpObject)){
            http_response_code(200);
            echo "{'success': 'Insert successful!'}";
            return true;
        }else{
            http_response_code(404);
            echo "{'error': 'Insert failed!'}";
            return false;
        }
    }

    protected function updateOne($model, $phpObject){
        if($model->update($phpObject)){
            http_response_code(200);
            return true;
        }else{
            http_response_code(404);
            echo "{'error': 'Update failed!'}";
            return false;
        }
    }

    protected function deleteOneById($model, $id){

    }
}