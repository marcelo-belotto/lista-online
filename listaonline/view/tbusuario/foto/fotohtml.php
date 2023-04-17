<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../usuario.css">
    <title>Imagem</title>
</head>

<body>    
<?php
$protocolo = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=="on") ? "https" : "http");
$url = '://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'?'.$_SERVER['QUERY_STRING'];
$chave = explode("=", $protocolo.$url);
        ?>
    <h1>Imagem do perfil</h1>
    <form action="./foto.php?id=<?php echo $chave[1]?>" method="POST" enctype="multipart/form-data">
        <fieldset>
            <label id="p">Imagem<br>
                <img id="exibir" src="" alt="">
                <input type="file" id="img" name="img_usuario">
            </label><br><br><br>
            <input type="submit" id="deletar_img" name="deletar_img" value="Excluir imagem"><br>
            <input type="submit" id="salvar_img" name="salvar_img" value="Salvar imagem">
        </fieldset>
    </form>
</body>
<script src="./foto.js"></script>

</html>