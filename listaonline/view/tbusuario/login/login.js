const url = "http://localhost/listaonline/src/controll/routes/route.login.php";
const xhr = new XMLHttpRequest();
const nome = document.getElementById("nome_usuario");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

function logar() {
    let dados = new FormData();
    if (nome.value != "" && senha.value != "") {
        dados.append("nome_usuario", nome.value);
        dados.append("senha", senha.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                let destino = "";
                if (resp.length === 0) {
                    alert("Usuário ou senha inválido");
                } else {
                    if (resp[0].id_usuario === "1") {
                        destino += "../../admsite/admsite.html";
                    } else {
                        destino += "../../tbconta/conta.html";
                    }
                    localStorage.setItem('id_usu', resp[0].id_usuario);
                    localStorage.setItem('nome_usu', resp[0].nome_usuario);
                    window.location.href = destino;
                }
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        alert("Preencha os campos com nome e senha!");
    }
    //setTimeout(() => { msg.innerHTML = ""; }, 3000);
}

function emailNovaSenha() {
    let dados = new FormData();
    if (nome.value != "" && email.value != "") {
        dados.append("nome_usuario", nome.value);
        dados.append("email_usuario", email.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                let destino = "";
                if (resp.length === 0) {
                    alert("Usuário ou email inválido");
                    setTimeout(() => { window.location.reload(); }, 1000);
                } else {
                    if (resp[0].id_usuario === "1") {
                        destino += "../../admsite/admsite.html";
                    } else {
                        destino += "../perfil.html";
                    }
                    localStorage.setItem('id_usu', resp[0].id_usuario);
                    localStorage.setItem('nome_usu', resp[0].nome_usuario);
                    window.location.href = destino;
                }
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        alert("Preencha os campos com nome e email!");
    }
}