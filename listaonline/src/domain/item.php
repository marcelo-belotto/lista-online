<?php

	class Item {
		var $id_item;
		var $id_lista;
		var $id_usuario;
		var $nome_item;
		var $qtd;

		function getId_item(){
			return $this->id_item;
		}
		function setId_item($id_item){
			$this->id_item = $id_item;
		}

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

		function getNome_item(){
			return $this->nome_item;
		}
		function setNome_item($nome_item){
			$this->nome_item = $nome_item;
		}

		function getQtd(){
			return $this->qtd;
		}
		function setQtd($qtd){
			$this->qtd = $qtd;
		}
	}

	class ItemDAO {
		function create($item) {
			$result = array();
			$id_item = $item->getId_item();
			$id_lista = $item->getId_lista();
			$id_usuario = $item->getId_usuario();
			$nome_item = $item->getNome_item();
			$qtd = $item->getQtd();
			try {
				$query = "INSERT INTO item (id_item, id_lista, id_usuario, nome_item, qtd) VALUES (DEFAULT, $id_lista, $id_usuario, '$nome_item', '$qtd')";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $item;
				} else {
					$result["Erro"] = "Erro ao adicionar item!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
		
		function read($id_item) {
			$result = array();
			try {
				$query = "SELECT * FROM item WHERE id_item = $id_item";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$ite = new Item();
					$ite->setId_item($row->id_item);
					$ite->setId_lista($row->id_lista);
					$ite->setId_usuario($row->id_usuario);
					$ite->setNome_item($row->nome_item);
					$ite->setQtd($row->qtd);
					$result[] = $ite;
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
				$query = "SELECT * FROM item";

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

		function update($ite) {
			$result = array();
			$id_item = $ite->getId_item();
			$id_lista = $ite->getId_lista();
			$id_usuario = $ite->getId_usuario();
			$nome_item = $ite->getNome_item();
			$qtd = $ite->getQtd();
			try {
				$query = "UPDATE item SET id_lista = $id_lista, id_usuario = $id_usuario, nome_item = '$nome_item', qtd = '$qtd' WHERE id_item = $id_item";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result[] = $ite;
				} else {
					$result["Erro"] = "Erro ao alterar item!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_item) {
			$result = array();
			try {
				$query = "DELETE FROM item WHERE id_item = $id_item";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["Sucess"] = "Item excluido com sucesso!";
				} else {
					$result["Erro"] = "Erro ao excluir item!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
