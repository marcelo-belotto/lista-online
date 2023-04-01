<?php

	class Conta {
		var $id_conta;
		var $id_usuario;
		var $nome_conta;
		var $vencimento;
		var $valor;
		var $status_conta;

		function getId_conta(){
			return $this->id_conta;
		}
		function setId_conta($id_conta){
			$this->id_conta = $id_conta;
		}

		function getId_usuario(){
			return $this->id_usuario;
		}
		function setId_usuario($id_usuario){
			$this->id_usuario = $id_usuario;
		}

		function getNome_conta(){
			return $this->nome_conta;
		}
		function setNome_conta($nome_conta){
			$this->nome_conta = $nome_conta;
		}

		function getVencimento(){
			return $this->vencimento;
		}
		function setVencimento($vencimento){
			$this->vencimento = $vencimento;
		}

		function getValor(){
			return $this->valor;
		}
		function setValor($valor){
			$this->valor = $valor;
		}

		function getStatus_conta(){
			return $this->status_conta;
		}
		function setStatus_conta($status_conta){
			$this->status_conta = $status_conta;
		}
	}

	class ContaDAO {
		function create($conta) {
			$result = array();
			$id_usuario = $conta->getId_usuario();
			$nome_conta = $conta->getNome_conta();
			$vencimento = $conta->getVencimento();
			$valor = $conta->getValor();
			$status_conta = $conta->getStatus_conta();
			try {
				$query = "INSERT INTO conta (id_usuario, nome_conta, vencimento, valor, status_conta) VALUES ($id_usuario,'$nome_conta','$vencimento','$valor','$status_conta')";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $conta;
				} else {
					$result["Erro"] = "Erro ao adicionar conta!";
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
				$query = "SELECT * FROM conta WHERE id_usuario = $id_usuario";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$con = new Conta();
					$con->setId_conta($row->id_conta);
					$con->setId_usuario($row->id_usuario);
					$con->setNome_conta($row->nome_conta);
					$con->setVencimento($row->vencimento);
					$con->setValor($row->valor);
					$con->setStatus_conta($row->status_conta);
					$result[] = $con;
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
				$query = "SELECT * FROM conta";

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

		function update($cont) {
			$result = array();
			$id_conta = $cont->getId_conta();
			$id_usuario = $cont->getId_usuario();
			$nome_conta = $cont->getNome_conta();
			$vencimento = $cont->getVencimento();
			$valor = $cont->getValor();
			$status_conta = $cont->getStatus_conta();
			try {
				$query = "UPDATE conta SET id_usuario = $id_usuario, nome_conta = '$nome_conta', vencimento = '$vencimento', valor = '$valor', status_conta = '$status_conta' WHERE id_conta = $id_conta";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $cont;
				} else {
					$result["Erro"] = "Erro ao alterar conta";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_conta) {
			$result = array();
			try {
				$query = "DELETE FROM conta WHERE id_conta = $id_conta";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["Sucess"] = "Conta excluida com sucesso!";
				} else {
					$result["Erro"] = "Erro ao excluir conta!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
