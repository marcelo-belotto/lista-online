<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $sugestao = $_POST['sugestao'];
  
  $arquivo = fopen('arquivos/'.$email.'.txt','a');

  $contexto = 'Nome: ' . $nome . PHP_EOL;
  $contexto .= 'E-Mail: ' . $email . PHP_EOL;
  $contexto .= 'Sugestão:'. $sugestao . PHP_EOL;
  $contexto .= PHP_EOL;

  if (empty($sugestao)) {?>
    <script>alert("Sugestão Em branco!")</script>
  <?php
  fclose($arquivo);
  } else {
    fwrite($arquivo,$contexto);
    fclose($arquivo);?>
    <script>alert("Enviado Com Sucesso!")</script>
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