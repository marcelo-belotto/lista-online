<?php

	require("../../domain/connection.php");
	require("../../domain/login.php");

	class LoginProcess {
		var $log;

		function doPost($arr){
      if(
				isset($arr["nome_usuario"]) &&
				isset($arr["senha"])
			) {
				$lo = new Login();

				$lo->setNome_usuario($arr["nome_usuario"]);
				$lo->setSenha($arr["senha"]);
				$log = new LoginDAO();
				$result = $log->read($lo);
			}else {
				$result["error"] = "aqui";
			}
			http_response_code(200);
			echo json_encode($result);
		}

		function doGet($arr){

		}

		function doPut($arr){

		}

		function doDelete($arr){

		}
		
	}