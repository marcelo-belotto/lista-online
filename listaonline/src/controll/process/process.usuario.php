<?php

	require("../../domain/connection.php");
	require("../../domain/usuario.php");

	class UsuarioProcess {
		var $ud;

		function doGet($arr){
			$ud = new UsuarioDAO();
			if($arr["id_usuario"] == "0"){
				$result = $ud->readAll();
			} else {
				$result = $ud->read($arr["id_usuario"]);
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$ud = new UsuarioDAO();
			$usu = new Usuario();
			$usu->setNome_usuario($arr["nome_usuario"]);
			$usu->setGenero($arr["genero"]);
			$usu->setImg($arr["img"]);
			$usu->setSenha($arr["senha"]);
			$result = $ud->create($usu);
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$ud = new UsuarioDAO();
			$usu = new Usuario();
			$usu->setId_usuario($arr["id_usuario"]);
			$usu->setNome_usuario($arr["nome_usuario"]);
			$usu->setGenero($arr["genero"]);
			$usu->setImg($arr["img"]);
			$usu->setSenha($arr["senha"]);
			$result = $ud->update($usu);
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$ud = new UsuarioDAO();
			$result = $ud->delete($arr["id_usuario"]);
			http_response_code(200);
			echo json_encode($result);
		}
	}