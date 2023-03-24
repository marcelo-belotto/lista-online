<?php
//session_start();
	class Login {
		var $nome_usuario;
		var $senha;

		function getNome_usuario(){
			return $this->nome_usuario;
		}
		function setNome_usuario($nome_usuario){
			$this->nome_usuario = $nome_usuario;
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
			$nome_usuario = $login->getNome_usuario();
			$senha = $login->getSenha();
			try {
				$query = "SELECT * FROM `usuario` WHERE nome_usuario = '$nome_usuario' AND senha = '$senha'";

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