<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="../img/logo.jpg">
  <link rel="stylesheet" type="text/css" href="./sugestoes.css">
  <title>Sugestões - Lista Online</title>
</head>
<body>
  <header class="menu__principal">
    <img class="logo" src="../img/logo.jpg" alt="">
    <nav class="menu__navegacao">
        <div class="item-menu-linha">
            <a href="../tbusuario/perfil.html" class="item-menu">Perfil</a>
            <a href="../tbtipo_lista/tipo-lista.html" class="item-menu">Lista</a>
        </div>
        <div class="item-menu-linha">
            <a href="../tbconta/conta.html" class="item-menu">Conta</a>
            <a href="../tbusuario/login/login.html" onclick="limpaLocalStorage()" class="item-menu">Sair</a>
        </div>
    </nav>
</header>
<?php
$protocolo = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=="on") ? "https" : "http");
$url = '://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'?'.$_SERVER['QUERY_STRING'];
$chave = explode("=", $protocolo.$url);
$nome = explode("&", $chave[1]);?>
<main>
  <form action="sugestoes.php?email=<?php echo $chave[2]?>" method="POST">
    <label for="sugestao"><h1>Sugestões</h1></label>
    <textarea name="sugestao" id="sugestao" cols="30" rows="10" placeholder="Digite aqui sua sugestão..." ></textarea>
    <input type="submit" class="btn-form" name="enviar" value="Enviar">
  </form>
</main>
<footer class="rodape">
  <div class="rodape__container">
      <p class="rodape__texto"></p>
  </div>
</footer>
</body>
</html>