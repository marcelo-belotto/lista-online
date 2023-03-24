<?php

	require("../../domain/connection.php");
	require("../../domain/tipo_lista.php");

	class Tipo_listaProcess {
		var $td;

		function doGet($arr){
			$td = new Tipo_listaDAO();
			if($arr["id_lista"] == "0") {
				$result = $td->readAll();
			} else {
				$result = $td->read($arr["id_lista"]);
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$td = new Tipo_listaDAO();
			$lista = new Tipo_lista();
			$lista->setId_lista($arr["id_lista"]);
			$lista->setId_usuario($arr["id_usuario"]);
			$lista->setNome_lista($arr["nome_lista"]);
			$result = $td->create($lista);
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$td = new Tipo_listaDAO();
			$lista = new Tipo_lista();
			$lista->setId_lista($arr["id_lista"]);
			$lista->setId_usuario($arr["id_usuario"]);
			$lista->setNome_lista($arr["nome_lista"]);
			$result = $td->update($lista);
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$td = new Tipo_listaDAO();
			$result = $td->delete($arr["id_lista"]);
			http_response_code(200);
			echo json_encode($result);
		}
	}