<?php
    require("../../../src/domain/connection.php");

	$protocolo = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=="on") ? "https" : "http");
	$url = '://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'?'.$_SERVER['QUERY_STRING'];
	$chave = explode("=", $protocolo.$url);

	$diretorio = "../../../foto_usuario/";	//define o diretorio para onde ira enviar o arquivo
	$arquivo = $_FILES['img_usuario']['name'];

	$_UP['tamanho'] = 1000000;	//tamanho máximo do arquivo
	$_UP['extensoes'] = array('jpg', 'jpeg', 'png');

	$query_img_select = "SELECT * FROM `usuario` WHERE id_usuario = $chave[1]";	//selec para verificar se tem img no banco
	$con = new Connection();
	$resultSet = Connection::getInstance()->query($query_img_select);

	while($row = $resultSet->fetchObject()){
		$id = $row->id_usuario;
		$nome = $row->nome_usuario;
		$email = $row->email_usuario;
		$genero = $row->genero;
		$senha = $row->senha;
		$nome_img = $row->img;
	}
	global $id;
	global $nome;
	global $email;
	global $genero;
	global $nome_img;
	global $senha;

	date_default_timezone_set('America/Sao_Paulo');	//define a região para pegar data
	$agora = date('dmyHis');	//retorna data e hora atual
	$pega_extensao = explode(".", $arquivo);
	$extensao_minuscula = strtolower(end($pega_extensao));
	$novo_nome = $agora . "." . $extensao_minuscula;	//define o nome do arquivo
	

	if(isset($_POST['salvar_img'])){	//se o botão salvar for clicado
		if(array_search($extensao_minuscula, $_UP['extensoes']) === false){	//procura no array se a extensao do arquivo e valida
			echo "
				<META HTTP-EQUIV=REFRESH CONTENT = '0;URL=https://listaonline.online/view/tbusuario/perfil.html'>
				<script type=\"text/javascript\">
					alert(\"Extensão da imagem invalida, só e perimtido extensao jpg, jpeg ou png.\");
				</script>
			";
			
		} else if($_UP['tamanho'] < $_FILES['img_usuario']['size']){	//verifica se o tamanha da img e maior que um 1kb
				echo "
				<META HTTP-EQUIV=REFRESH CONTENT = '0;URL=https://listaonline.online/view/tbusuario/perfil.html'>
					<script type=\"text/javascript\">
						alert(\"Imagem muito grande.\");
					</script>
				";
		} else {
			if($nome_img != ""){	//se tiver algum nome de imagem no banco exclui do diretorio e adiciona uma nova
				unlink("../../../foto_usuario/".$nome_img);
				$query = "UPDATE usuario SET nome_usuario = '$nome', email_usuario = '$email', genero = '$genero', img = '$novo_nome', senha = '$senha' WHERE id_usuario = '$id'";
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){			
					move_uploaded_file($_FILES['img_usuario']['tmp_name'], $diretorio . $novo_nome);	//efetua o upload
					echo "
					<META HTTP-EQUIV=REFRESH CONTENT = '0;URL=https://listaonline.online/view/tbusuario/perfil.html'>
						<script type=\"text/javascript\">
						alert(\"Imagem alterada com sucesso!\");
						</script>
					";
				} else {
					$result["erro"] = "Erro ao alterar usuario!";
				}

			} else {	//se não tiver algum nome de imagem no banco adiciona uma a img no diretorio	
				$query = "UPDATE usuario SET nome_usuario = '$nome', email_usuario = '$email', genero = '$genero', img = '$novo_nome', senha = '$senha' WHERE id_usuario = '$id'";
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){			
					move_uploaded_file($_FILES['img_usuario']['tmp_name'], $diretorio . $novo_nome);	//efetua o upload
	
					echo "
					<META HTTP-EQUIV=REFRESH CONTENT = '0;URL=https://listaonline.online/view/tbusuario/perfil.html'>
						<script type=\"text/javascript\">
							alert(\"Imagem alterada com sucesso!\" + $nome);
						</script>
					";
				} else {
					$result["erro"] = "Erro ao alterar usuario!";
				}
			}	
		}
	}

	if(isset($_POST['deletar_img'])){	//se o botão deletar for clicado
		$query = "UPDATE usuario SET nome_usuario = '$nome', email_usuario = '$email', genero = '$genero', img = '', senha = '$senha' WHERE id_usuario = '$id'";
		$status = Connection::getInstance()->prepare($query);
		if($status->execute()){			
			unlink("../../../foto_usuario/".$nome_img);
			
			echo "
			<META HTTP-EQUIV=REFRESH CONTENT = '0;URL=https://listaonline.online/view/tbusuario/perfil.html'>
				<script type=\"text/javascript\">
				alert(\"Imagem excluida com sucesso!\");
				</script>
			";
		} else {
			$result["erro"] = "Erro ao alterar usuario!";
		}
	} 
?>