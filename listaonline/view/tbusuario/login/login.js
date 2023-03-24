const nome = document.getElementById("nome_usuario");
const senha = document.getElementById("senha");
//const msg = document.getElementById("mensagem");

function logar() {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost/listaonline/src/controll/routes/route.login.php";
    let dados = new FormData();
    if (nome.value != "" && senha.value != "") {
        dados.append("nome_usuario", nome.value);
        dados.append("senha", senha.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                let destino = "";
                if (resp.length === 0) {
                    //msg.innerHTML = "Usuário ou senha inválido";
                    alert("Usuário ou senha inválido");
                } else {
                    if (resp[0].id_usuario === "1") {
                        destino += "../../admsite/admsite.html";
                    } else {
                        destino += "../../home.html";
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
        // msg.innerHTML = "Preencher com email e senha";
    }
    //setTimeout(() => { msg.innerHTML = ""; }, 3000);
}