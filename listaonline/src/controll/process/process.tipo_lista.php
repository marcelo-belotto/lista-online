<?php

	require("../../domain/connection.php");
	require("../../domain/tipo_lista.php");

	class Tipo_listaProcess {
		var $td;

		function doGet($arr){
			$td = new Tipo_listaDAO();
			if(isset($arr["id_usuario"])){
				if($arr["id_usuario"] == "0"){
					$result = $td->readAll();
				} else {
					$result = $td->read($arr["id_usuario"]);
				}
			} else {
				$result["erro"] = "Conta não encontrado!";
			}
			http_response_code(200);
			echo json_encode($result);
		}

		function doPost($arr){
			if(isset($arr["verbo"])) {
                if($arr["verbo"] == "POST") {
					if(
						isset($arr["id_usuario"]) &&
						isset($arr["nome_lista"])
					){
						$td = new Tipo_listaDAO();
						$lista = new Tipo_lista();
						$lista->setId_usuario($arr["id_usuario"]);
						$lista->setNome_lista($arr["nome_lista"]);
						$result = $td->create($lista);
					}
                }else if($arr["verbo"] == "DELETE") {
                    if(
						isset($arr["id_usuario"]) &&
						isset($arr["id_lista"]) 
					){
						if($arr["id_lista"] > 0) {
							$td = new Tipo_listaDAO();
							$result = $td->delete($arr["id_usuario"],$arr["id_lista"]);
						}else {
							$result["status"] = "Lista não deletada process!";
						}
					}else {
						$result["status"] = "Id da lista não existe!";
					}
                }else if($arr["verbo"] == "PUT") {
                    if(
						isset($arr["id_lista"]) &&
						isset($arr["id_usuario"]) &&
						isset($arr["nome_lista"])
					){
						$td = new Tipo_listaDAO();
						$lista = new Tipo_lista();
						$lista->setId_lista($arr["id_lista"]);
						$lista->setId_usuario($arr["id_usuario"]);
						$lista->setNome_lista($arr["nome_lista"]);
						$result = $td->update($lista);
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