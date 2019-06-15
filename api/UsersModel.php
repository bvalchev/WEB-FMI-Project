<?php
include_once "BasicModel.php";
class UsersModel extends BasicModel{ 

    public function __construct($table){
        parent::__construct($table);
    }

    public function insert($object){
        $connection = $this->getConnection();
        $statement = $connection->prepare("INSERT INTO " . $this->getTable() . " (email, username, lastName, password, role ,secretQuestion, answer) 
                                          VALUES (:email, :username, :lastName, :password, :role, :secretQuestion, :answer)");
        $statement->execute(['email' => $object->email, 'username' => $object->username, 'lastName' => $object->lastName,
                            'password' => $object->password, 'role' => $object->role, 'secretQuestion' => $object->secretQuestion ,
                            'answer' => $object->answer]);
        return $statement->rowCount() > 0;
    }

    public function update($object){
        $connection = $this->getConnection();
        $statement = $connection->prepare("UPDATE " . $this->getTable() . " SET username = :username,
                                          lastName = :lastName, password = :password, role = :role, 
                                          secretQuestion = :secretQuestion, answer = :answer
                                          WHERE email = :email");
        $statement->execute(['email' => $object->email, 'username' => $object->username, 'lastName' => $object->lastName,
            'password' => $object->password, 'role' => $object->role, 'secretQuestion' => $object->secretQuestion ,
            'answer' => $object->answer]);
        var_dump($object->lastName);
        var_dump($statement->errorInfo());
        die;
        return $statement->rowCount() > 0;
    }

    public function getUserByEmail( $emailValue){
        $statement = $this->getConnection()->prepare("SELECT * FROM {$this->getTable()} WHERE email = :email ");
        $statement->execute(["email" => $emailValue]);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function deleteUser($emailValue){
        $connection = $this->getConnection();
        $statement = $connection->prepare("DELETE FROM  {$this->getTable()} WHERE email = :email ");
        $statement->execute(["email" => $emailValue]);
        return $statement->rowCount() > 0;
    }

    public function isEmailUnique($emailValue){
        $statement = $this->getConnection()->prepare("SELECT count(*) FROM {$this->getTable()} WHERE email = :email");  
        $statement->execute(['email' => $emailValue]);
        $count = $statement->fetchColumn();
        return $count == 0;
    }
}
?>