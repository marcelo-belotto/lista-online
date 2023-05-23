<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../../img/logo.jpg">
    <link rel="stylesheet" type="text/css" href="./foto.css">
    <title>Imagem</title>
</head>

<body>  
<header class="menu__principal">
        <img class="logo" src="../../img/logo.jpg" alt="">
        <nav class="menu__navegacao">
            <div class="item-menu-linha">
                <a href="../../tbtipo_lista/tipo-lista.html" class="item-menu">Lista</a>
                <a href="../perfil.html" class="item-menu">Perfil</a>
            </div>
            <div class="item-menu-linha">
                <a href="../../tbconta/conta.html" class="item-menu">Conta</a>
                <a href="../login/login.html" onclick="limpaLocalStorage()" class="item-menu">Sair</a>
            </div>
        </nav>
    </header>

<?php
$protocolo = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=="on") ? "https" : "http");
$url = '://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'?'.$_SERVER['QUERY_STRING'];
$chave = explode("=", $protocolo.$url);
        ?>
    <div class="divlogin">
    <!--<h2>Imagem do perfil</h2>-->
    <form action="./foto.php?id=<?php echo $chave[1]?>" method="POST" enctype="multipart/form-data">
        <div class="inputForm">
            <article>
                <img class="novaimg" id="exibir" src="" alt="">                
            </article>
                <label for="img">Escolher nova imagem </label>
                <input type="file" id="img" name="img_usuario" class="escolherimg">
        </div> 
        <input type="submit" id="deletar_img" name="deletar_img" value="Excluir imagem"><br>
        <input type="submit" id="salvar_img" name="salvar_img" value="Salvar imagem">
    </form>
    </div>

    <footer class="rodape">
        <div class="rodape__container">
            <p class="rodape__texto"></p>
        </div>
    </footer>
    <script>
        let data = new Date();
        data = data.getFullYear();
        document.querySelector(".rodape__texto").innerHTML = `Lista Online ${data} - Todos os Direitos Reservados.`;
    </script>
</body>
<script src="./foto.js"></script>

</html>