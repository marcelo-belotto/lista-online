const xhr = new XMLHttpRequest();
const urlItem =
  "http://localhost/listaonline/src/controll/routes/route.item.php";
var item = document.querySelector("#item");
let idse =  "";
var editAlt = true;
var editAdd = true;
var listaItens = [];
var indice = 0;


function readItem() {
  let idse = new URL(window.location.href).searchParams.get("id_lista");
  fetch(urlItem + "?id_lista=" + idse)
    .then(function (resposta) {
      if (!resposta.ok)
        throw new Error("Erro ao executar requisição: " + resposta.status);
      return resposta.json();
    })
    .then(function (data) {
      data.forEach((dado) => {
        let row = document.createElement("tr");
        listaItens.push(dado);
        row.innerHTML += `<td style="padding:3px"><input type="checkbox" id="pago" onclick="checado(this)" unchecked></td>`;
        row.innerHTML += `<td>${dado.nome_item}</td>`;
        row.innerHTML += `<td>${dado.qtd}</td>`;
        row.innerHTML += `<td style="padding:3px">
                  <button class='edi' onclick='editItem(this.parentNode.parentNode.cells)'>
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button class='del' onclick='delItem(${indice})'>
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  <button class='sal' onclick='salvarAlteracao(${indice},this.parentNode.parentNode.cells)' hidden=true>
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </button>
                  <button class='can' onclick='editItem(this.parentNode.parentNode.cells)' hidden=true>
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                  </td>`;
        item.appendChild(row);
        indice++;
      });
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function editItem(itemEditado) {
  itemEditado[1].contentEditable = editAlt;
  itemEditado[2].contentEditable = editAlt;
  itemEditado[1].focus();
  itemEditado[3].children[0].hidden = editAlt;
  itemEditado[3].children[1].hidden = editAlt;
  itemEditado[3].children[2].hidden = !editAlt;
  itemEditado[3].children[3].hidden = !editAlt;
  editAlt = !editAlt;
}

function delItem(indice) {
  let dados =
    "id_usuario=" +
    localStorage.getItem("id_usu") +
    "&id_lista=" +
    listaItens[indice].id_lista +
    "&id_item=" +
    listaItens[indice].id_item;
  if (confirm("Deseja realmente excluir o item da Lista?")) {
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let resposta = JSON.parse(this.responseText);
        if (resposta.hasOwnProperty("erro")) {
          alert(resposta.erro);
        } else {
          //lista.innerHTML = "";
          alert("Item excluido com sucesso!");
        }
      }
    });
    xhr.open("DELETE", urlItem);
    xhr.send(dados);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

function salvarAlteracao(indice, celulas) {
  listaItens[indice].nome_item = celulas[1].innerText;
  listaItens[indice].qtd = celulas[2].innerText;
  let dados =
    "id_lista=" +
    listaItens[indice].id_lista +
    "&id_usuario=" +
    localStorage.getItem("id_usu") +
    "&id_item=" +
    listaItens[indice].id_item +
    "&nome_item=" +
    listaItens[indice].nome_item +
    "&qtd=" +
    listaItens[indice].qtd;

  if (confirm("Deseja alterar o item da lista?")) {
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
    xhr.open("PUT", urlItem);
    xhr.send(dados);
    setTimeout(() => { window.location.reload(); }, 1000);
    }
}

function novoItem() {
    let table = document.querySelector("#table");
    table.style.display = "none";
    let form = document.createElement("form");
    form.innerHTML += `Item<br><input type="text" id="input_item" placeholder="Digite o nome do item"><br>`;
    form.innerHTML += `Quantidade<br><input type="text" id="input_qtd" placeholder="Digite a quantidade"><br>`;
    form.innerHTML += `<input type="button" onclick="salvarNovoItem()" value="Salvar Item"/></form>`;
    div.appendChild(form);
}

function salvarNovoItem(){
    let novoItem = document.querySelector('#input_item').value;
    let qtd = document.querySelector('#input_qtd').value;
    if (novoItem === "" || qtd === ""){
        alert("Preencha os Campos Corretamente!")
    }else{
    var dados = new FormData();
    dados.append("id_item", null);
    dados.append("id_lista", new URL(window.location.href).searchParams.get("id_lista"));
    dados.append("id_usuario" , localStorage.getItem("id_usu"));
    dados.append("nome_item" , novoItem);
    dados.append("qtd", qtd);

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
    xhr.open("POST", urlItem);
    xhr.send(dados);
    setTimeout(() => { window.location.reload(); }, 1000);
    }
}
}

function checado(check) {
  let nome_item = check.parentNode.parentNode.cells[1];
  let qtd = check.parentNode.parentNode.cells[2];

  if (check.checked) {    //se a conta for marcada conta foi paga
    nome_item.style.textDecoration = 'line-through';
    qtd.style.textDecoration = 'line-through';
  }else{
    nome_item.style.textDecoration = 'none';
    qtd.style.textDecoration = 'none';
  }
}
