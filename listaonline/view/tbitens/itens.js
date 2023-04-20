const xhr = new XMLHttpRequest();
const urlItem = "http://localhost/listaonline/src/controll/routes/route.item.php";
var item = document.querySelector("#item");
var form = document.querySelector('#div');
let idse = "";
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
        row.innerHTML += `<td class="item--tabela"><input type="checkbox" onclick="checado(this,${indice})" unchecked class="item--tabela"></td>`;
        row.innerHTML += `<td class="item--tabela">${dado.nome_item}</td>`;
        if (dado.qtd == null) {
          row.innerHTML += `<td class="item--tabela"></td>`;
        } else {
          row.innerHTML += `<td class="item--tabela">${dado.qtd}</td>`;
        }
        row.innerHTML += `<td class="item--tabela"><div class="opcoes--tabela">
                  <span class='edi' onclick='editItem(this.parentNode.parentNode.parentNode.cells)'>
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                  <span class='del' onclick='delItem(${indice})'>
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </span>
                  <span class='sal' onclick='salvarAlteracao(${indice},this.parentNode.parentNode.parentNode.cells)' hidden=true>
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </span>
                  <span class='can' onclick='editItem(this.parentNode.parentNode.parentNode.cells)' hidden=true>
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </span></div>
                  </td>`;
        item.appendChild(row);
        if (dado.concluido == 1) {
          row.cells[0].children[0].checked = true;
          row.cells[1].style.textDecoration = 'line-through';
          row.cells[2].style.textDecoration = 'line-through';
        }
        indice++;
      });
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function editItem(itemEditado) {
  console.log(itemEditado);
  itemEditado[1].contentEditable = editAlt;
  itemEditado[2].contentEditable = editAlt;
  itemEditado[1].focus();
  itemEditado[3].children[0].children[0].hidden = editAlt;
  itemEditado[3].children[0].children[1].hidden = editAlt;
  itemEditado[3].children[0].children[2].hidden = !editAlt;
  itemEditado[3].children[0].children[3].hidden = !editAlt;
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
    listaItens[indice].qtd +
    "&concluido=" +
    listaItens[indice].concluido;

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
  form.className = "Formulario__item";
  form.innerHTML += `<h2 class="Titulo__Principal">Novo Item</h2><input type="text" id="input_item" placeholder="Digite o nome do item">`;
  form.innerHTML += `<h2 class="Titulo__Principal">Quantidade</h2><input type="text" id="input_qtd" placeholder="Digite a quantidade">`;
  form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelarAdicionar()" value="Voltar" class="Botao-form"/><input type="button" onclick="salvarNovoItem()" value="Salvar Item" class="Botao-form"/></div></form>`;
  div.appendChild(form);
}

function cancelarAdicionar(){
  let table = document.querySelector("#table");
  table.style.display = "table";
  form.innerHTML = '';
}

function salvarNovoItem() {
  let novoItem = document.querySelector('#input_item').value;
  let qtd = document.querySelector('#input_qtd').value;
  if (novoItem === "" || qtd === "") {
    alert("Preencha os Campos Corretamente!")
  } else {
    var dados = new FormData();
    dados.append("id_item", null);
    dados.append("id_lista", new URL(window.location.href).searchParams.get("id_lista"));
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("nome_item", novoItem);
    dados.append("qtd", qtd);
    dados.append("concluido", 0);

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

function checado(check, indice) {
  let nome_item = check.parentNode.parentNode.cells[1];
  let qtd = check.parentNode.parentNode.cells[2];
  let nome = localStorage.getItem("nome_usu");

  if (check.checked) {
    nome_item.style.textDecoration = 'line-through';
    qtd.style.textDecoration = 'line-through';
    listaItens[indice].concluido = 1;
  } else {
    nome_item.style.textDecoration = 'none';
    qtd.style.textDecoration = 'none';
    listaItens[indice].concluido = 0;
  }
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
    listaItens[indice].qtd +
    "&concluido=" +
    listaItens[indice].concluido;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let resposta = JSON.parse(this.responseText);
      if (resposta.hasOwnProperty("erro")) {
        alert(resposta.erro);
      } else {
        alert(listaItens[indice].concluido == 1 ? "Parabens! Menos uma Pendência, " + nome : "Poxa, " + nome + " Denovo?");
      }
    }
  });
  xhr.open("PUT", urlItem);
  xhr.send(dados);
  setTimeout(() => { window.location.reload(); }, 2000);
}

function limpaLocalStorage() {
  localStorage.clear();
}