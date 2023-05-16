<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $sugestao = $_POST['sugestao'];
  
  if ($sugestao != '' || !empty($sugestao)){
    $arquivo = fopen('arquivos/'.$email.'.txt','a');

    $contexto = 'Nome: ' . $nome . PHP_EOL;
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
  
}

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta http-equiv="refresh" content="0; URL='../tbusuario/perfil.html" />
</head>
</html>