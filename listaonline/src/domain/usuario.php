<?php
	class Usuario {
		var $id_usuario;
		var $nome_usuario;
		var $email_usuario;
		var $genero;
		var $img;
		var $senha;

		function getId_usuario(){
			return $this->id_usuario;
		}
		function setId_usuario($id_usuario){
			$this->id_usuario = $id_usuario;
		}

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

		function getGenero(){
			return $this->genero;
		}
		function setGenero($genero){
			$this->genero = $genero;
		}

		function getImg(){
			return $this->img;
		}
		function setImg($img){
			$this->img = $img;
		}

		function getSenha(){
			return $this->senha;
		}
		function setSenha($senha){
			$this->senha = $senha;
		}
	}

	class UsuarioDAO {
		function create($usuario) {
			$result = array();
			$nome_usuario = $usuario->getNome_usuario();
			$email_usuario = $usuario->getEmail_usuario();
			$genero = $usuario->getGenero();
			$img = $usuario->getImg();
			$senha = $usuario->getSenha();
			try {
				$query = "INSERT INTO usuario (id_usuario, nome_usuario, email_usuario, genero, img, senha) VALUES".
				"(DEFAULT,'$nome_usuario','$email_usuario','$genero','$img','$senha')";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $usuario;
				} else {
					$result = 1;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function readAll() {
			$result = array();
			try {
				$query = "SELECT * FROM `usuario`";

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

		function read($id_usuario) {
			$result = array();
			try {
				$query = "SELECT * FROM `usuario` WHERE id_usuario = $id_usuario";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$usuario = new Usuario();
					$usuario->setId_usuario($row->id_usuario);
					$usuario->setNome_usuario($row->nome_usuario);
					$usuario->setEmail_usuario($row->email_usuario);
					$usuario->setGenero($row->genero);
					$usuario->setImg($row->img);
					$usuario->setSenha($row->senha);
					$result[] = $usuario;					
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function update($usu) {
			$result = array();
			$id_usuario = $usu->getId_usuario();
			$nome_usuario = $usu->getNome_usuario();
			$email_usuario = $usu->getEmail_usuario();
			$genero = $usu->getGenero();
			$img = $usu->getImg();
			$senha = $usu->getSenha();
			try {
				$query = "UPDATE usuario SET nome_usuario = '$nome_usuario', email_usuario = '$email_usuario', genero = '$genero', img = '$img', senha = '$senha' WHERE id_usuario = '$id_usuario'";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $usu;
				} else {
					$result["erro"] = "Erro ao alterar usuario!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_usuario) {
			$result = array();
			try {
				$query_img_select = "SELECT * FROM `usuario` WHERE id_usuario = $id_usuario";	//selec para verificar se tem img no banco
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query_img_select);			
				while($row = $resultSet->fetchObject()){
					$nome_img = $row->img;
				}

				$query = "DELETE FROM usuario WHERE id_usuario = $id_usuario";
				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					unlink("../../../foto_usuario/".$nome_img);
					$result["Sucess"] = "Usuário excluido com sucesso!";
				} else {
					$result["Erro"] = "Erro ao excluir usuário!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
?>