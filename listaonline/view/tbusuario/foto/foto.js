var photo = document.getElementById('exibir');
var file = document.getElementById('img');
var id = document.querySelector("#id_usu");
var p = document.querySelector("#p");
document.getElementById("salvar_img").style.display = "none";
document.getElementById("deletar_img").style.display = "none";
//id.value = localStorage.getItem("id_usu");

if (localStorage.getItem("nome_img") == "null") {
    photo.src = "../../img/userazul.png";
} else {
    photo.src = "../../../foto_usuario/" + localStorage.getItem("nome_img");
    document.getElementById("deletar_img").style.display = "block";

    photo.onerror = function () {
        photo.src = "../../img/userazul.png";
        const paragrafo = document.createElement("p");
        paragrafo.textContent = "Imagem não encontrada no servidor!";
        p.appendChild(paragrafo);
        document.getElementById("deletar_img").style.display = "none";
    }
}

file.addEventListener('change', () => { //Visualisar imagem antes de salvar no banco de dados
    if (file.files.length <= 0) {
        return;
    }
    let reader = new FileReader();
    reader.onload = () => {
        photo.src = reader.result;
    }
    reader.readAsDataURL(file.files[0]);
    document.getElementById("deletar_img").style.display = "none";
    document.getElementById("salvar_img").style.display = "block";
}); //Visualisar imagem antes de salvar no banco de dados