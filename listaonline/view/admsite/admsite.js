const xhr = new XMLHttpRequest();
const urlUserAdm = "https://listaonline.online/src/controll/routes/route.usuario.php";
var user = document.querySelector("#user");

function readAll() {
    fetch(urlUserAdm + "?id_usuario=0")
        .then(function (resposta) {
            if (!resposta.ok)
                throw new Error("Erro ao executar requisição: " + resposta.status);
            return resposta.json();
        })
        .then(function (data) {
            data.forEach((dado) => {
                let row = document.createElement("tr");
                row.innerHTML += `<td>${dado.id_usuario}</td>`;
                row.innerHTML += `<td>${dado.nome_usuario}</td>`;
                row.innerHTML += `<td>${dado.email_usuario}</td>`;
                row.innerHTML += `<td>${dado.genero}</td>`;
                row.innerHTML += `<td>${dado.img}</td>`;
                row.innerHTML += `<td>${dado.senha}</td>`;
                row.innerHTML += `<td style="padding:2px"><button class="edi" onclick='editUser(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" onclick='delUser(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                user.appendChild(row);
            });
        })
        .catch(function (error) {
            alert(error.message);
        });
}

function editUser(u) {
    u.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[6].innerHTML = `<button class="sal" onclick='putUser(this)'><i class="fa fa-floppy-o" aria-hidden="true"></i></button><button class="can" onclick="cancelar(this)"><i class="fa fa-times" aria-hidden="true"></i></button>`;
}

function putUser(u) {
    let idUser = u.parentNode.parentNode.cells[0].innerHTML;
    let nomeUser = u.parentNode.parentNode.cells[1].innerHTML;
    let emailUser = u.parentNode.parentNode.cells[2].innerHTML;
    let genero = u.parentNode.parentNode.cells[3].innerHTML;
    let img = u.parentNode.parentNode.cells[4].innerHTML;
    let senha = u.parentNode.parentNode.cells[5].innerText;
    let dados = new FormData();
    dados.append("id_usuario", idUser);
    dados.append("nome_usuario", nomeUser);
    dados.append("email_usuario", emailUser);
    dados.append("genero", genero);
    dados.append("img", img);
    dados.append("senha", senha);
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    alert("Dados do Usuario Alterada Com Sucesso!");
                }
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("POST", urlUserAdm);
        xhr.send(dados);
    }
}

function cadastrar() {  //Function para salvar nova conta
    let nomeUser = document.querySelector("#nome");
    let emailUser = document.querySelector("#email");
    let genero = document.querySelector("#genero");
    let senha = document.querySelector("#senha");
    if (nomeUser.value != "" && emailUser.value != "" && genero.value != "" && senha.value != "") {
        let dados = new FormData();
        //dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_usuario", nomeUser.value);
        dados.append("email_usuario", emailUser.value);
        dados.append("genero", genero.value);
        dados.append("img", "");
        dados.append("senha", senha.value);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                alert("Conta Adiconada Com Sucesso!");
                //setTimeout(() => { window.location.reload(); }, 2000);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    alert(resp.erro);
                } else {
                }
            }
        });
        xhr.open("POST", urlUserAdm);
        xhr.send(dados);
    } else {
        alert("Favor preencher todos os campos!");
        //setTimeout(() => { window.location.reload(); }, 1000);
    }
}

function delUser(u) {
    let idUser = u.parentNode.parentNode.cells[0].innerHTML;
    let dados = new FormData();
    dados.append("id_usuario", idUser);
    dados.append("verbo", "DELETE");
    if (window.confirm("Confirma Exclusão do usuario = " + idUser + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    alert("usuario excluida com sucesso");
                }
                // setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("POST", urlUserAdm);
        xhr.send(dados);
    }
}

function limpaLocalStorage() {
    localStorage.clear();
}

function cancelar() {   //Function para atualizar pagina
    window.location.reload();
}