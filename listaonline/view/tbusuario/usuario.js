const xhr = new XMLHttpRequest();
const urlUsuario = "https://listaonline.online/src/controll/routes/route.usuario.php";
var nome_usuario = document.querySelector("#nome_usuario");
var email = document.querySelector("#email_usuario");
var p = document.querySelector("#p");
var senha = document.querySelector("#senha");
var photo = document.getElementById('exibir');
const mostrarSenha = document.querySelector("#verSenha");
const button = document.querySelector("#esconderSenha");
button.addEventListener('click', esconderSenha);
mostrarSenha.addEventListener('click', verSenha);

function esconderSenha() {
    if (senha.type == "password") {
        senha.type = "text";
        button.style.display = "none";
        mostrarSenha.style.display = "block";
    }
}

function verSenha() {
    senha.type = "password"; 
    button.style.display = "block";
    mostrarSenha.style.display = "none";
}

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
                email.value = dado.email_usuario;
                if (dado.img == null) {
                    photo.src = "../img/userazul.png";
                } else {
                    localStorage.setItem("nome_img", dado.img);
                    photo.src = "../../foto_usuario/" + dado.img;
                    photo.onerror = function () {
                        photo.src = "../img/userazul.png";
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
            swal("Erro ao fazer requisição ao servidor!");
        });
}

function cadastrar() {
    if (nome_usuario.value != "" && email.value != "" && senha.value != "") {
        if (document.querySelector('input[name="generoradio"]:checked') == null) {
            swal("Escolha um genero!");
        } else {
            if (senha.value.length >= 6) {
                let dados = new FormData();
                dados.append("nome_usuario", nome_usuario.value.toLowerCase());
                dados.append("email_usuario", email.value.toLowerCase());
                dados.append("genero", document.querySelector('input[name="generoradio"]:checked').value);
                dados.append("img", "");
                dados.append("senha", senha.value);
                dados.append("verbo", "POST");
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                        if (this.responseText != 1) {
                            let resposta = JSON.parse(this.responseText);
                            if (resposta.hasOwnProperty("erro")) {
                                swal(resposta.erro);
                            } else {
                                let btncadastrar = document.querySelector("#btncadastrar");
                                btncadastrar.style.display = "none";
                                setTimeout(() => { window.location.assign("./login/login.html"); }, 500);
                            }
                        } else {
                            swal({
                            title: "Atenção!",
                            text: "Email já cadastrado digite novo email!",
                            icon: "info",
                            });
                        }
                    }
                });
                xhr.open("POST", urlUsuario);
                xhr.send(dados);
            } else {
                swal({
                title: "Atenção!",
                text: "Senha fraca mínimo 6 caracteres!",
                icon: "info",
                });
            }
        }
    } else {
        swal({
        title: "Atenção!",
        text: "Preencha todos os campos!",
        icon: "info",
        });
    }
}

function alterarPerfil() {
    if (nome_usuario.value != "" && email.value != "" && senha.value != "") {
        if (document.querySelector('input[name="generoradio"]:checked') == null) {
            swal("Escolha um genero!");
        } else {
            let dados = new FormData();
            dados.append("id_usuario", localStorage.getItem("id_usu"));
            dados.append("nome_usuario", nome_usuario.value);
            dados.append("email_usuario", email.value);
            dados.append("genero", document.querySelector('input[name="generoradio"]:checked').value);
            dados.append("img", localStorage.getItem("nome_img"));
            dados.append("senha", senha.value);
            dados.append("verbo", "PUT");
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    let resposta = JSON.parse(this.responseText);
                    if (resposta.hasOwnProperty("erro")) {
                        swal(resposta.erro);
                    }
                    window.location.reload();
                }
            });
            xhr.open("POST", urlUsuario);
            xhr.send(dados);
        }
    } else {
        swal({
        title: "Atenção!",
        text: "Preencha todos os campos!",
        icon: "info",
        });
    }
}

function excluirPerfil() {
    let dados = new FormData();
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("verbo", "DELETE");
    swal({
    title: "Atenção!",
    text: "Clique no botão para ser redirecionado!",
    icon: "warning",
    buttons: true,
    }).then(function(result) {
        if (result) {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    let resposta = JSON.parse(this.responseText);
                    if (resposta.hasOwnProperty("erro")) {
                        swal(resposta.erro);
                    }
                    setTimeout(() => { window.location.assign("../home.html"); }, 500);
                }
            });
            xhr.open("POST", urlUsuario);
            xhr.send(dados);
        } else {
          cancelar();
        }
    });
}

/*function excluirPerfil() {
    let dados = new FormData();
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("verbo", "DELETE");
    if (confirm("Deseja excluir o perfil '" + nome_usuario.value + "'?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resposta = JSON.parse(this.responseText);
                if (resposta.hasOwnProperty("erro")) {
                    swal(resposta.erro);
                }
                setTimeout(() => { window.location.assign("../home.html"); }, 500);
            }
        });
        xhr.open("POST", urlUsuario);
        xhr.send(dados);
    }
}*/

function passaIdUrl() {
    window.location.assign("./foto/fotohtml.php?id=" + localStorage.getItem("id_usu"));
}

function passaDadosUrl(){
    window.location.assign("../sugestoes/sugestoeshtml.php?nome="+nome_usuario.value+"&email="+email.value);
}

function limpaLocalStorage() {
    localStorage.clear();
}