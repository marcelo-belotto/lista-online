const xhr = new XMLHttpRequest();
const urlTipoLista = "http://localhost/listaonline/src/controll/routes/route.tipo_lista.php";
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
                row.innerHTML += `<td onclick='abreLista(${dado.id_lista})' class="item--tabela">${dado.nome_lista}</td>`;
                row.innerHTML += `<td style="padding:3px" ><div class="opcoes--tabela">
                    <span class='edi' onclick='editTipoLista(this.parentNode.parentNode.parentNode.cells)'>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                    <span class='del' onclick='delTipoLista(${dado.id_lista})'>
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
            alert(error.message);
        });
}

function abreLista(numero) {
    if (editAlt) {
        window.location.assign("../tbitens/itens.html?id_lista=" + numero);
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

function delTipoLista(id_lista) {
    let dados = "id_usuario=" + localStorage.getItem("id_usu") + "&" + "id_lista=" + id_lista;
    if (confirm("Deseja realmente excluir a Lista?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resposta = JSON.parse(this.responseText);
                if (resposta.hasOwnProperty("erro")) {
                    alert(resposta.erro);
                } else {
                    //lista.innerHTML = "";
                    alert("Lista excluida com sucesso!");
                }
            }
        });
        xhr.open("DELETE", urlTipoLista);
        xhr.send(dados);
        setTimeout(() => { window.location.reload(); }, 1000);
    }
}

function salvarAlteracao(id_lista, nome_lista) {
    let dados = "id_lista=" + id_lista + "&id_usuario=" + localStorage.getItem("id_usu") + "&nome_lista=" + nome_lista;
    console.log(dados);
    if (confirm("Deseja alterar o nome da lista?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resposta = JSON.parse(this.responseText);
                if (resposta.hasOwnProperty("erro")) {
                    alert(resposta.erro);
                } else {

                    alert("Lista alterada com sucesso!");
                }
            }
        });
        xhr.open("PUT", urlTipoLista);
        xhr.send(dados);
        setTimeout(() => { window.location.reload(); }, 1000);
    }
}

function novaLista() {
    let table = document.querySelector("#table");
    table.style.display = "none";
    let form = document.createElement("form");
    form.className = "Formulario__lista";
    form.innerHTML += `<h1 class="Titulo__Principal">Nova Lista</h1><input type="text" id="input_lista" placeholder="Digite o nome da lista">`;
    form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelarAdicionar()" value="Voltar" class="Botao-form"/><input type="button" onclick="salvarNovaLista()" value="Salvar Lista" class="Botao-form"/></div></form>`
    //form.innerHTML += `<i class="fa fa-arrow-right" aria-hidden="true" onclick="finalizar()"></i></form>`;
    div.appendChild(form);
}

function cancelarAdicionar(){
    let table = document.querySelector("#table");
    table.style.display = "table";
    form.innerHTML = '';
}

function salvarNovaLista() {
    let novoItem = document.querySelector('#input_lista').value;
    if (novoItem === "") {
        alert("Preencha o Campo Nome da lista!")
    } else {
        var dados = new FormData();
        //dados.append("id_lista", 0);
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_lista", novoItem);

        console.log(dados);

        if (confirm("Deseja Salvar o novo item?")) {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    let resposta = JSON.parse(this.responseText);
                    console.log(resposta);
                    if (resposta.hasOwnProperty("erro")) {
                        alert(resposta.erro);
                    } else {
                        alert("Novo Item salvo com sucesso!");
                    }
                }
            });
            xhr.open("POST", urlTipoLista);
            xhr.send(dados);
            setTimeout(() => { window.location.reload(); }, 1000);
        }
    }
}

function limpaLocalStorage() {
    localStorage.clear();
}