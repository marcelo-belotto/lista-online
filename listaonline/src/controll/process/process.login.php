<?php

	require("../../domain/connection.php");
	require("../../domain/login.php");

	class LoginProcess {
		var $log;
		function doPost($arr){
            if(isset($arr["email_usuario"]) && isset($arr["senha"])) {
				$lo = new Login();
				$lo->setEmail_usuario($arr["email_usuario"]);
				$lo->setSenha($arr["senha"]);
				$log = new LoginDAO();
				$result = $log->read($lo);
				
			} else if(isset($arr["nome_usuario"]) &&
					isset($arr["email_usuario"])) {
					$lo = new Login();	
					$lo->setNome_usuario($arr["nome_usuario"]);
					$lo->setEmail_usuario($arr["email_usuario"]);
					$log = new LoginDAO();
					$result = $log->readEmail($lo);
			} else {
				$result["error"] = "aqui";
			}
			http_response_code(200);
			echo json_encode($result);
		}
		
	}