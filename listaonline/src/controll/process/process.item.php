<?php

	require("../../domain/connection.php");
	require("../../domain/item.php");

	class ItemProcess {
		var $id;

		function doGet($arr){
			$id = new ItemDAO();
			if($arr["id_lista"] == "0") {
				$result = $id->readAll();
			} else {
				$result = $id->read($arr["id_lista"]);
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$id = new ItemDAO();
			$ite = new Item();
			$ite->setId_item($arr["id_item"]);
			$ite->setId_lista($arr["id_lista"]);
			$ite->setId_usuario($arr["id_usuario"]);
			$ite->setNome_item($arr["nome_item"]);
			$ite->setQtd($arr["qtd"]);
			$ite->setConcluido($arr["concluido"]);
			$result = $id->create($ite);
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$id = new ItemDAO();
			$ite = new Item();
			$ite->setId_item($arr["id_item"]);
			$ite->setId_lista($arr["id_lista"]);
			$ite->setId_usuario($arr["id_usuario"]);
			$ite->setNome_item($arr["nome_item"]);
			$ite->setQtd($arr["qtd"]);
			$ite->setConcluido($arr["concluido"]);
			$result = $id->update($ite);
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$id = new ItemDAO();
			$result = $id->delete($arr["id_item"],$arr["id_lista"]);
			http_response_code(200);
			echo json_encode($result);
		}
	}