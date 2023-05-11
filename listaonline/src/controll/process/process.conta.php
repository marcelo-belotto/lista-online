<?php

	require("../../domain/connection.php");
	require("../../domain/conta.php");

	class ContaProcess {
		var $cd;

		function doGet($arr){
			$cd = new ContaDAO();
			if(isset($arr["id_usuario"])){
				if($arr["id_usuario"] == "0"){
					$result = $cd->readAll();
				} else {
					$result = $cd->read($arr["id_usuario"]);
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
						isset($arr["nome_conta"]) &&
						isset($arr["vencimento"]) &&
						isset($arr["valor"]) &&
						isset($arr["status_conta"])
					){
						$cd = new ContaDAO();
						$con = new Conta();
						$con->setId_usuario($arr["id_usuario"]);
						$con->setNome_conta($arr["nome_conta"]);
						$con->setVencimento($arr["vencimento"]);
						$con->setValor($arr["valor"]);
						$con->setStatus_conta($arr["status_conta"]);
						$result = $cd->create($con);
					}
                }else if($arr["verbo"] == "DELETE") {
                    if(isset($arr["id_conta"])) {
						if($arr["id_conta"] > 0) {
							$cd = new ContaDAO();
							$result = $cd->delete($arr["id_conta"]);
						}else {
							$result["status"] = "Conta não deletada process!";
						}
					}else {
						$result["status"] = "Id da conta não existe!";
					}
                }else if($arr["verbo"] == "PUT") {
                    if(
						isset($arr["id_conta"]) &&
						isset($arr["id_usuario"]) &&
						isset($arr["nome_conta"]) &&
						isset($arr["vencimento"]) &&
						isset($arr["valor"]) &&
						isset($arr["status_conta"])
					){
						$cd = new ContaDAO();
						$con = new Conta();
						$con->setId_conta($arr["id_conta"]);
						$con->setId_usuario($arr["id_usuario"]);
						$con->setNome_conta($arr["nome_conta"]);
						$con->setVencimento($arr["vencimento"]);
						$con->setValor($arr["valor"]);
						$con->setStatus_conta($arr["status_conta"]);
						$result = $cd->update($con);
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