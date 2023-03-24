<?php

	require("../../domain/connection.php");
	require("../../domain/conta.php");

	class ContaProcess {
		var $cd;

		function doGet($arr){
			$cd = new ContaDAO();
			if($arr["id_usuario"] == "0"){
				$result = $cd->readAll();
			} else {
				$result = $cd->read($arr["id_usuario"]);
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$cd = new ContaDAO();
			$con = new Conta();
			$con->setId_usuario($arr["id_usuario"]);
			$con->setNome_conta($arr["nome_conta"]);
			$con->setVencimento($arr["vencimento"]);
			$con->setValor($arr["valor"]);
			$result = $cd->create($con);
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$cd = new ContaDAO();
			$conta = new Conta();
			$conta->setId_conta($arr["id_conta"]);
			$conta->setId_usuario($arr["id_usuario"]);
			$conta->setNome_conta($arr["nome_conta"]);
			$conta->setVencimento($arr["vencimento"]);
			$conta->setValor($arr["valor"]);
			$result = $cd->update($conta);
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$cd = new ContaDAO();
			$result = $cd->delete($arr["id_conta"]);
			http_response_code(200);
			echo json_encode($result);
		}
	}