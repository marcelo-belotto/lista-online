<?php

	class Tipo_lista {
		var $id_lista;
		var $id_usuario;
		var $nome_lista;

		function getId_lista(){
			return $this->id_lista;
		}
		function setId_lista($id_lista){
			$this->id_lista = $id_lista;
		}

		function getId_usuario(){
			return $this->id_usuario;
		}
		function setId_usuario($id_usuario){
			$this->id_usuario = $id_usuario;
		}

		function getNome_lista(){
			return $this->nome_lista;
		}
		function setNome_lista($nome_lista){
			$this->nome_lista = $nome_lista;
		}
	}

	class Tipo_listaDAO {
		function create($tipo_lista) {
			$result = array();
			$id_lista = $tipo_lista->getId_lista();
			$id_usuario = $tipo_lista->getId_usuario();
			$nome_lista = $tipo_lista->getNome_lista();
			try {
				$query = "INSERT INTO tipo_lista (id_lista, id_usuario, nome_lista) VALUES (DEFAULT, $id_usuario, '$nome_lista')";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $tipo_lista;
				} else {
					$result["Erro"] = "Erro ao adicionar lista!";
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
				$query = "SELECT * FROM tipo_lista";

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
				$query = "SELECT * FROM tipo_lista WHERE id_usuario = $id_usuario";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$tipo = new Tipo_lista();
					$tipo->setId_lista($row->id_lista);
					$tipo->setId_usuario($row->id_usuario);
					$tipo->setNome_lista($row->nome_lista);
					$result[] = $tipo;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function update($lista) {
			$result = array();
			$id_lista = $lista->getId_lista();
			$id_usuario = $lista->getId_usuario();
			$nome_lista = $lista->getNome_lista();
			try {
				$query = "UPDATE tipo_lista nome_lista SET nome_lista = '$nome_lista' WHERE id_lista = $id_lista AND id_usuario = $id_usuario";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $lista;
				} else {
					$result["erro"] = "Erro ao alterar lista!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_usuario, $id_lista) {
			$result = array();
			try {
				$query = "DELETE FROM tipo_lista WHERE id_lista = $id_lista and id_usuario = $id_usuario";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["Sucess"] = "Lista excluida com sucesso!";
				} else {
					$result["Erro"] = "Erro ao excluir lista!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
