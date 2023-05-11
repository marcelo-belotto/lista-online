<?php

	require("../../domain/connection.php");
	require("../../domain/usuario.php");

	class UsuarioProcess {
		var $ud;

		function doGet($arr){
			$ud = new UsuarioDAO();
			
			if(isset($arr["id_usuario"])){
				if($arr["id_usuario"] == "0"){
					$result = $ud->readAll();
				} else {
					$result = $ud->read($arr["id_usuario"]);
				}
			} else {
				$result["erro"] = "Usuario não encontrado!";
			}
			http_response_code(200);
			echo json_encode($result);
		}

        function doPost($arr){
            if(isset($arr["verbo"])) {
                if($arr["verbo"] == "POST") {
					if(
						isset($arr["nome_usuario"]) &&
						isset($arr["email_usuario"]) &&
						isset($arr["genero"]) &&
						isset($arr["img"]) &&
						isset($arr["senha"])
					){
            			$ud = new UsuarioDAO();
            			$usu = new Usuario();
            			$usu->setNome_usuario($arr["nome_usuario"]);
            			$usu->setEmail_usuario($arr["email_usuario"]);
            			$usu->setGenero($arr["genero"]);
            			$usu->setImg($arr["img"]);
            			$usu->setSenha($arr["senha"]);
            			$result = $ud->create($usu);
					}
                }else if($arr["verbo"] == "DELETE") {
                    if(isset($arr["id_usuario"])) {
						if($arr["id_usuario"] > 0) {
							$ud = new UsuarioDAO();
							$result = $ud->delete($arr["id_usuario"]);
						}else {
							$result["status"] = "Usuario não deletado process!";
						}
					}else {
						$result["status"] = "Id do usuario não existe!";
					}
                }else if($arr["verbo"] == "PUT") {
                    if(
						isset($arr["id_usuario"]) &&
						isset($arr["nome_usuario"]) &&
						isset($arr["email_usuario"]) &&
						isset($arr["genero"]) &&
						isset($arr["img"]) &&
						isset($arr["senha"])
					){
            			$ud = new UsuarioDAO();
            			$usu = new Usuario();
            			$usu->setId_usuario($arr["id_usuario"]);
            			$usu->setNome_usuario($arr["nome_usuario"]);
            			$usu->setEmail_usuario($arr["email_usuario"]);
            			$usu->setGenero($arr["genero"]);
            			$usu->setImg($arr["img"]);
            			$usu->setSenha($arr["senha"]);
            			$result = $ud->update($usu);
					}
                }else {
					$result["status"] = "Não inicializado a edição";
				}
            }else {
				$result["status"] = "Verbo não ok!";
			}
			http_response_code(200);
			echo json_encode($result);
        }
	}