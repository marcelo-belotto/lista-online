const xhr = new XMLHttpRequest();
const urlUsuario = "http://localhost/listaonline/src/controll/routes/route.usuario.php";
var nome_usuario = document.querySelector("#nome_usuario");
var p = document.querySelector("#p");
var senha = document.querySelector("#senha");
var photo = document.getElementById('exibir');

function readPerfil() {
    fetch(urlUsuario + "?id_usuario=" + localStorage.getItem("id_usu"))
        .then(function (resposta) {
            if (!resposta.ok)
                throw new Error("Erro ao executar requisição: " + resposta.status);
            return resposta.json();
        })
        .then(function (data) {
            data.forEach((dado) => {
                nome_usuario.value = dado.nome_usuario;
                if (dado.img == null) {
                    photo.src = "../img/user.jpg";
                } else {
                    photo.src = "../../foto_usuario/" + dado.img;

                    photo.onerror = function () {
                        photo.src = "../img/user.jpg";
                        const paragrafo = document.createElement("p");
                        paragrafo.textContent = "Imagem não encontrada no servidor!";
                        p.appendChild(paragrafo);
                    }
                }
                senha.value = dado.senha;
                if (dado.genero == "M") {
                    document.getElementById("generom").checked = true;
                } else {
                    document.getElementById("generof").checked = true;
                }
                localStorage.setItem("nome_img", dado.img);
            });
        })
        .catch(function (error) {
            alert(error.message);
        });
}

function cadastrar() {
    if (nome_usuario.value != "" && senha.value != "") {
        if (document.querySelector('input[name="generoradio"]:checked') == null) {
            console.log("Escolha um genero!");
        } else {
            let dados = new FormData();
            dados.append("nome_usuario", nome_usuario.value);
            dados.append("genero", document.querySelector('input[name="generoradio"]:checked').value);
            dados.append("img", "");
            dados.append("senha", senha.value);
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                    let resposta = JSON.parse(this.responseText);
                    if (resposta.hasOwnProperty("erro")) {
                        alert(resposta.erro);
                    } else {
                        alert("Cadastro realizado com sucesso!");
                    }
                }
            });
            xhr.open("POST", urlUsuario);
            xhr.send(dados);
        }
    } else {
        console.log("Prencha todo os campos com *");
    }
}

function alterarPerfil() {
    if (nome_usuario.value != "" && senha.value != "") {
        if (document.querySelector('input[name="generoradio"]:checked') == null) {
            console.log("Escolha um genero!");
        } else {
            let dados = "id_usuario=" + localStorage.getItem("id_usu");
            dados += "&nome_usuario=" + nome_usuario.value;
            dados += "&genero=" + document.querySelector('input[name="generoradio"]:checked').value;
            dados += "&img=" + localStorage.getItem("nome_img");
            dados += "&senha=" + senha.value;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                    let resposta = JSON.parse(this.responseText);
                    if (resposta.hasOwnProperty("erro")) {
                        alert(resposta.erro);
                    } else {
                        alert("Perfil alterado com sucesso!");
                    }
                }
            });
            xhr.open("PUT", urlUsuario);
            //setTimeout(() => { window.location.assign("./perfil.html"); }, 2000);
            xhr.send(dados);
        }
    } else {
        console.log("Prencha todo os campos com *");
    }
}

function excluirPerfil() {
    let dados = "id_usuario=" + localStorage.getItem("id_usu");
    if (confirm("Deseja excluir o perfil " + nome_usuario.value + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resposta = JSON.parse(this.responseText);
                if (resposta.hasOwnProperty("erro")) {
                    alert(resposta.erro);
                } else {
                    alert("Perfil excluido com sucesso!");
                }
            }
        });
        xhr.open("DELETE", urlUsuario);
        xhr.send(dados);
    }
}