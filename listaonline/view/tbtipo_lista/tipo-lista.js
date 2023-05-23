const xhr = new XMLHttpRequest();
const urlTipoLista = "https://listaonline.online/src/controll/routes/route.tipo_lista.php";
var lista = document.querySelector("#lista");
var form = document.querySelector('#div');
var editAlt = true;

function readTipoLista() {
    fetch(urlTipoLista + "?id_usuario=" + localStorage.getItem("id_usu"))
        .then(function (resposta) {
            if (!resposta.ok)
                throw new Error("Erro ao executar requisição: " + resposta.status);
            return resposta.json();
        })
        .then(function (data) {
            data.forEach((dado) => {
                let row = document.createElement("tr");
                row.innerHTML += `<td onclick='abreLista(${dado.id_lista},"${dado.nome_lista}")' class="item--tabela">${dado.nome_lista}</td>`;
                row.innerHTML += `<td style="padding:3px" ><div class="opcoes--tabela">
                    <span class='edi' onclick='editTipoLista(this.parentNode.parentNode.parentNode.cells)'>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                    <span class='del' onclick='delTipoLista(${dado.id_lista},this.parentNode.parentNode.parentNode.cells[0].innerText)'>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </span>
                    <span class='sal' onclick='salvarAlteracao(${dado.id_lista},this.parentNode.parentNode.parentNode.cells[0].innerText)' hidden=true>
                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </span>
                    <span class='can' onclick='editTipoLista(this.parentNode.parentNode.parentNode.cells)' hidden=true>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    </span></div>
                    </td>`;
                lista.appendChild(row);
            });
        })
        .catch(function (error) {
            swal("Erro ao retornar dados do servidor!");
        });
}

function abreLista(numero, nomeLista) {
    if (editAlt) {
        window.location.assign("../tbitens/itens.html?id_lista=" + numero + "&nome_lista=" + nomeLista);
    }
}

function editTipoLista(itemEditado) {
    itemEditado[0].contentEditable = editAlt;
    itemEditado[0].focus();
    itemEditado[1].children[0].children[0].hidden = editAlt;
    itemEditado[1].children[0].children[1].hidden = editAlt;
    itemEditado[1].children[0].children[2].hidden = !editAlt;
    itemEditado[1].children[0].children[3].hidden = !editAlt;
    editAlt = !editAlt;
}

function delTipoLista(id_lista, listanome) {
    let dados = new FormData();
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("id_lista", id_lista);
    dados.append("verbo", "DELETE");
    swal({
    title: "Atenção!",
    text: "Clique no botão para confirmar sua ação!",
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
                }
            });
            xhr.open("POST", urlTipoLista);
            xhr.send(dados);
            cancelar();
        } else {
          cancelar();
        }
    });
}

/*function delTipoLista(id_lista, listanome) {
    let dados = new FormData();
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("id_lista", id_lista);
    dados.append("verbo", "DELETE");
    if (confirm("Deseja excluir Lista '" + listanome + "'?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resposta = JSON.parse(this.responseText);
                if (resposta.hasOwnProperty("erro")) {
                    swal(resposta.erro);
                }
                //setTimeout(() => { window.location.reload(); }, 500);
            }
        });
        xhr.open("POST", urlTipoLista);
        xhr.send(dados);
        cancelar();
    }
}*/

function salvarAlteracao(id_lista, nome_lista) {
    let dados = new FormData();
    dados.append("id_lista", id_lista);
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("nome_lista", nome_lista);
    dados.append("verbo", "PUT");
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let resposta = JSON.parse(this.responseText);
            if (resposta.hasOwnProperty("erro")) {
                swal(resposta.erro);
            }
        }
    });
    xhr.open("POST", urlTipoLista);
    xhr.send(dados);
    cancelar();
}

function novaLista() {
    let table = document.querySelector("#table");
    table.style.display = "none";
    let form = document.createElement("form");
    form.className = "Formulario__lista";
    form.innerHTML += `<h1 class="Titulo__Principal">Nova Lista</h1><input type="text" id="input_lista" placeholder="Digite o nome da lista">`;
    form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelarAdicionar()" value="Voltar" class="Botao-form"/><input type="button" id="btnsalvar" onclick="salvarNovaLista()" value="Salvar Lista" class="Botao-form"/></div></form>`
    div.appendChild(form);
}

function cancelarAdicionar() {
    let table = document.querySelector("#table");
    table.style.display = "table";
    form.innerHTML = '';
}

function salvarNovaLista() {
    let novoItem = document.querySelector('#input_lista').value;
    if (novoItem === "") {
        swal({
        title: "Atenção!",
        text: "Preencha todos os campos!",
        icon: "info",
        });
    } else {
        let btnsalvar = document.querySelector("#btnsalvar");
        btnsalvar.style.display = "none";
        var dados = new FormData();
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_lista", novoItem);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resposta = JSON.parse(this.responseText);
                if (resposta.hasOwnProperty("erro")) {
                    swal(resposta.erro);
                }
            }
        });
        xhr.open("POST", urlTipoLista);
        xhr.send(dados);
        cancelar();
    }
}

function limpaLocalStorage() {
    localStorage.clear();
}

function cancelar() {
    window.location.reload();
}