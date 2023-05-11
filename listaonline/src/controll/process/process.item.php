<?php

	require("../../domain/connection.php");
	require("../../domain/item.php");

	class ItemProcess {
		var $id;

		function doGet($arr){
			$id = new ItemDAO();
			if(isset($arr["id_lista"])){
				if($arr["id_lista"] == "0") {
					$result = $id->readAll();
				} else {
					$result = $id->read($arr["id_lista"]);
				}
			}else{
				$result["erro"] = "Item não encontrado!";
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){		
			if(isset($arr["verbo"])) {
                if($arr["verbo"] == "POST") {
					if(
						isset($arr["id_item"]) &&
						isset($arr["id_lista"]) &&
						isset($arr["id_usuario"]) &&
						isset($arr["nome_item"]) &&
						isset($arr["qtd"]) &&
						isset($arr["concluido"])
					){
						$id = new ItemDAO();
						$ite = new Item();
						$ite->setId_item($arr["id_item"]);
						$ite->setId_lista($arr["id_lista"]);
						$ite->setId_usuario($arr["id_usuario"]);
						$ite->setNome_item($arr["nome_item"]);
						$ite->setQtd($arr["qtd"]);
						$ite->setConcluido($arr["concluido"]);
						$result = $id->create($ite);
					}
                }else if($arr["verbo"] == "DELETE") {
                    if(
						
						isset($arr["id_item"]) &&
						isset($arr["id_lista"]) 
						 
					){
						if($arr["id_item"] > 0) {
							$id = new ItemDAO();
							$result = $id->delete($arr["id_item"],$arr["id_lista"]);
						}else {
							$result["status"] = "Item não deletada process!";
						}
					}else {
						$result["status"] = "Id do item não existe!";
					}
                }else if($arr["verbo"] == "PUT") {
					if(
						isset($arr["id_item"]) &&
						isset($arr["id_lista"]) &&
						isset($arr["id_usuario"]) &&
						isset($arr["nome_item"]) &&
						isset($arr["qtd"]) &&
						isset($arr["concluido"])
					){
						$id = new ItemDAO();
						$ite = new Item();
						$ite->setId_item($arr["id_item"]);
						$ite->setId_lista($arr["id_lista"]);
						$ite->setId_usuario($arr["id_usuario"]);
						$ite->setNome_item($arr["nome_item"]);
						$ite->setQtd($arr["qtd"]);
						$ite->setConcluido($arr["concluido"]);
						$result = $id->update($ite);
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