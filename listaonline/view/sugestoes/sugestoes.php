<?php
$protocolo = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=="on") ? "https" : "http");
$url = '://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'?'.$_SERVER['QUERY_STRING'];
$chave = explode("=", $protocolo.$url);
	
	$email =  $chave[1];
	date_default_timezone_set('America/Sao_Paulo');	//define a região para pegar data
	$agora = date('dmyHis');	//retorna data e hora atual
    $sugestao = $_POST['sugestao'];
  
  if ($sugestao != '' || !empty($sugestao)){
    $arquivo = fopen('arquivos/'.$agora.'.txt','a');
    
    $contexto = 'Data: ' . $agora . PHP_EOL;
    $contexto .= 'E-Mail: ' . $email . PHP_EOL;
    $contexto .= 'Sugestão:'. $sugestao . PHP_EOL;
    $contexto .= PHP_EOL;
      
    fwrite($arquivo,$contexto);
    fclose($arquivo);?>
    <script>alert("Enviado Com Sucesso!")</script>
    <?php
  }else{
    ?>
    <script>alert("Favor digitar uma sugestão antes de enviar!")</script>
    <?php
  }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta http-equiv="refresh" content="0; URL='../tbusuario/perfil.html" />
</head>
</html>