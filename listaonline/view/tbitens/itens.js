const xhr = new XMLHttpRequest();
const urlItem = "http://localhost/listaonline/src/controll/routes/route.item.php";
var item = document.querySelector(".item");
var form = document.querySelector("#div");
let idse = "";
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
        let row = document.createElement("div");
        row.classList.add("container-item");
        listaItens.push(dado);
        row.innerHTML += `<p class="linha-item">${dado.nome_item}</p>`;
        if (dado.qtd == null) {
          row.innerHTML += `<p class="linha-item"></p>`;
        } else {
          row.innerHTML += `<p class="linha-item">${dado.qtd}</p>`;
        }
        row.innerHTML += `<div class="item-acoes">
        <i class="fa fa-trash-o" aria-hidden="true" onclick='delItem(${indice})'></i>
        <i class="fa fa-pencil" aria-hidden="true" onclick='editItem(this.parentNode.parentNode,${indice})'></i>
        <input type="checkbox" onclick="checado(this,${indice})" unchecked class="checkbox-acoes">
        </div>`;
        item.appendChild(row);
        if (dado.concluido == 1) {
          row.style.border = "1px solid var(--cor-de-fundo-menu)";
          row.style.background = "lightblue";
          row.children[2].children[2].checked = true;
          row.children[0].style.textDecoration = "line-through";
          row.children[1].style.textDecoration = "line-through";
          row.children[0].style.color = "var(--cor-de-fundo-menu)";
          row.children[1].style.color = "var(--cor-de-fundo-menu)";
          row.children[2].children[1].style = "Display: none";
        }
        indice++;
      });
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function editItem(itemEditado, indice) {
  let table = document.querySelector(".item");
  table.style.display = "none";
  let form = document.createElement("form");
  form.className = "Formulario__item";
  form.innerHTML += `<h2 class="Titulo__Principal">Alterar Item</h2><input type="text" id="input_item" value="${itemEditado.children[0].innerHTML}">`;
  form.innerHTML += `<h2 class="Titulo__Principal">Quantidade</h2><input type="text" id="input_qtd" value="${itemEditado.children[1].innerHTML}">`;
  form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelarAdicionar()" value="Voltar" class="Botao-form"/><input type="button" id="btnsalvar" onclick="salvarAlteracao(${indice})" value="Alterar Item" class="Botao-form"/></div></form>`;
  div.appendChild(form);
}

function delItem(indice) {
  let dados = "id_usuario=" + localStorage.getItem("id_usu") + "&id_lista=" + listaItens[indice].id_lista +
    "&id_item=" + listaItens[indice].id_item;

  if (confirm("Deseja excluir o item da Lista?")) {
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let resposta = JSON.parse(this.responseText);
        if (resposta.hasOwnProperty("erro")) {
          alert(resposta.erro);
        }
      }
    });
    xhr.open("DELETE", urlItem);
    xhr.send(dados);
    setTimeout(() => { window.location.reload(); }, 1000);
  }
}

function salvarAlteracao(indice) {
  let btnsalvar = document.querySelector("#btnsalvar");
  btnsalvar.style.display = "none";
  listaItens[indice].qtd = document.querySelector("#input_qtd").value;
  listaItens[indice].nome_item = document.querySelector("#input_item").value;
  listaItens[indice].qtd = document.querySelector("#input_qtd").value;
  let dados = "id_lista=" + listaItens[indice].id_lista + "&id_usuario=" + localStorage.getItem("id_usu") +
    "&id_item=" + listaItens[indice].id_item + "&nome_item=" + listaItens[indice].nome_item + "&qtd=" +
    listaItens[indice].qtd + "&concluido=" + listaItens[indice].concluido;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let resposta = JSON.parse(this.responseText);
      if (resposta.hasOwnProperty("erro")) {
        alert(resposta.erro);
      }
    }
  });
  xhr.open("PUT", urlItem);
  xhr.send(dados);
  setTimeout(() => { window.location.reload(); }, 1000);
}

function novoItem() {
  let table = document.querySelector(".item");
  table.style.display = "none";
  let form = document.createElement("form");
  form.className = "Formulario__item";
  form.innerHTML += `<h2 class="Titulo__Principal">Novo Item</h2><input type="text" id="input_item" placeholder="Digite o nome do item">`;
  form.innerHTML += `<h2 class="Titulo__Principal">Quantidade</h2><input type="text" id="input_qtd" placeholder="Digite a quantidade">`;
  form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelarAdicionar()" value="Voltar" class="Botao-form"/><input type="button" id="btnNovoItem" onclick="salvarNovoItem()" value="Salvar Item" class="Botao-form"/></div></form>`;
  div.appendChild(form);
}

function cancelarAdicionar() {
  let table = document.querySelector(".item");
  table.style.display = "flex";
  form.innerHTML = "";
}

function salvarNovoItem() {
  let btnNovoItem = document.querySelector("#btnNovoItem");
  btnNovoItem.style.display = "none";
  let novoItem = document.querySelector("#input_item").value;
  let qtd = document.querySelector("#input_qtd").value;
  if (novoItem === "" || qtd === "") {
    alert("Preencha os Campos Corretamente!");
  } else {
    var dados = new FormData();
    dados.append("id_item", null);
    dados.append("id_lista", new URL(window.location.href).searchParams.get("id_lista"));
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("nome_item", novoItem);
    dados.append("qtd", qtd);
    dados.append("concluido", 0);

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let resposta = JSON.parse(this.responseText);
        console.log(resposta);
        if (resposta.hasOwnProperty("erro")) {
          alert(resposta.erro);
        }
      }
    });
    xhr.open("POST", urlItem);
    xhr.send(dados);
    setTimeout(() => { window.location.reload(); }, 1000);
  }
}

function checado(check, indice) {
  let nome_item = check.parentNode.parentNode.children[0];
  let qtd = check.parentNode.parentNode.children[1];
  let nome = localStorage.getItem("nome_usu");

  if (check.checked) {
    nome_item.style.textDecoration = "line-through";
    nome_item.style.color = "var(--cor-de-fundo-menu)";
    qtd.style.textDecoration = "line-through";
    qtd.style.color = "var(--cor-de-fundo-menu)";
    listaItens[indice].concluido = 1;
  } else {
    nome_item.style.textDecoration = "none";
    qtd.style.textDecoration = "none";
    listaItens[indice].concluido = 0;
  }
  let dados = "id_lista=" + listaItens[indice].id_lista + "&id_usuario=" + localStorage.getItem("id_usu") +
    "&id_item=" + listaItens[indice].id_item + "&nome_item=" + listaItens[indice].nome_item + "&qtd=" +
    listaItens[indice].qtd + "&concluido=" + listaItens[indice].concluido;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let resposta = JSON.parse(this.responseText);
      if (resposta.hasOwnProperty("erro")) {
        alert(resposta.erro);
      }
    }
  });
  xhr.open("PUT", urlItem);
  xhr.send(dados);
  //setTimeout(() => { window.location.reload(); }, 1000);
}

function limpaLocalStorage() {
  localStorage.clear();
}
