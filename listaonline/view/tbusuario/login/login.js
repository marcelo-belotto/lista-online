const url = "http://localhost/listaonline/src/controll/routes/route.login.php";
const xhr = new XMLHttpRequest();
const msg = document.getElementById("mensagem");
const nome = document.getElementById("nome_usuario");
const email = document.getElementById("email_usuario");
const senha = document.getElementById("senha");

function logar() {
    let dados = new FormData();
    if (email.value != "" && senha.value != "") {
        dados.append("email_usuario", email.value);
        dados.append("senha", senha.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                let destino = "";
                if (resp.length === 0) {
                    msg.innerHTML = "Email ou senha inválido!";
                    setTimeout(() => { window.location.reload(); }, 3000);
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
        msg.innerHTML = "Preencha os campos com nome e email!";
        setTimeout(() => { window.location.reload(); }, 3000);
    }
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
                    msg.innerHTML = "Usuário ou email inválido!";
                    setTimeout(() => { window.location.reload(); }, 3000);
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
        msg.innerHTML = "Preencha os campos com nome e email!";
        setTimeout(() => { window.location.reload(); }, 3000);
    }
}