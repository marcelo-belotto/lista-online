<?php
	class Login {
		var $nome_usuario;
		var $email_usuario;
		var $senha;

		function getNome_usuario(){
			return $this->nome_usuario;
		}
		function setNome_usuario($nome_usuario){
			$this->nome_usuario = $nome_usuario;
		}

		function getEmail_usuario(){
			return $this->email_usuario;
		}

		function setEmail_usuario($email_usuario){
			$this->email_usuario = $email_usuario;
		}

		function getSenha(){
			return $this->senha;
		}
		function setSenha($senha){
			$this->senha = $senha;
		}
	}

	class LoginDAO {
		function read($login) {
			$result = array();
			$email_usuario = $login->getEmail_usuario();
			$senha = $login->getSenha();
			try {
				$query = "SELECT * FROM `usuario` WHERE email_usuario = '$email_usuario' AND senha = '$senha'";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$result[] = $row;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function readEmail($esqueciSenha) {
			$result = array();
			$nome_usuario = $esqueciSenha->getNome_usuario();
			$email_usuario = $esqueciSenha->getEmail_usuario();
			try {
				$query = "SELECT * FROM `usuario` WHERE nome_usuario = '$nome_usuario' AND email_usuario = '$email_usuario'";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$result[] = $row;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
?>