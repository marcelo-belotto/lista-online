const xhr = new XMLHttpRequest();
const urlItem = "https://listaonline.online/src/controll/routes/route.item.php";
var item = document.querySelector(".item");
var form = document.querySelector("#div");
var cabecalho = document.querySelector(".container_cabecalho");
var nmlista = new URL(window.location.href).searchParams.get("nome_lista");
var idse = new URL(window.location.href).searchParams.get("id_lista");
var listaItens = [];
var indice = 0;

function readItem() {
  let idse = new URL(window.location.href).searchParams.get("id_lista");
  document.querySelector(".Titulo__Principal").innerHTML = nmlista;
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
          row.style.background = "#008000";
          row.children[2].children[2].checked = true;
          row.children[0].style.textDecoration = "line-through";
          row.children[1].style.textDecoration = "line-through";
          row.children[0].style.color = "var(--cor-da-fonte-menu)";
          row.children[1].style.color = "var(--cor-da-fonte-menu)";
          row.children[2].children[1].style = "Display: none";
        }
        indice++;
      });
    })
    .catch(function (error) {
      swal(error.message);
    });
}

function editItem(itemEditado, indice) {
  let table = document.querySelector(".item");
  cabecalho.style.display = "none"
  table.style.display = "none";
  let form = document.createElement("form");
  form.className = "Formulario__item";
  form.innerHTML += `<h2 class="Titulo__Principal">Alterar Item</h2><input type="text" id="input_item" value="${itemEditado.children[0].innerHTML}">`;
  form.innerHTML += `<h2 class="Titulo__Principal">Quantidade</h2><input type="text" id="input_qtd" value="${itemEditado.children[1].innerHTML}">`;
  form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelarAdicionar()" value="Voltar" class="Botao-form"/><input type="button" id="btnsalvar" onclick="salvarAlteracao(${indice})" value="Alterar Item" class="Botao-form"/></div></form>`;
  div.appendChild(form);
}

function delItem(indice) {
  let dados = new FormData();
  dados.append("id_lista", listaItens[indice].id_lista);
  dados.append("id_item", listaItens[indice].id_item);
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
            xhr.open("POST", urlItem);
            xhr.send(dados);
            cancelar();
        } else {
          cancelar();
        }
    });
}

/*function delItem(indice) {
  let dados = new FormData();
  dados.append("id_lista", listaItens[indice].id_lista);
  dados.append("id_item", listaItens[indice].id_item);
  dados.append("verbo", "DELETE");
  if (confirm("Deseja excluir o item da Lista?")) {
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
        let resposta = JSON.parse(this.responseText);
        if (resposta.hasOwnProperty("erro")) {
          swal(resposta.erro);
        }
      }
    });
    xhr.open("POST", urlItem);
    xhr.send(dados);
    cancelar();
  }
}*/

function salvarAlteracao(indice) {
  let item = document.querySelector("#input_item");
  if(item.value != ""){
      let btnsalvar = document.querySelector("#btnsalvar");
      btnsalvar.style.display = "none";
      listaItens[indice].qtd = document.querySelector("#input_qtd").value;
      listaItens[indice].nome_item = item.value;
      listaItens[indice].qtd = document.querySelector("#input_qtd").value;
      let dados = new FormData();
      dados.append("id_lista", listaItens[indice].id_lista);
      dados.append("id_usuario", localStorage.getItem("id_usu"));
      dados.append("id_item", listaItens[indice].id_item);
      dados.append("nome_item", listaItens[indice].nome_item);
      dados.append("qtd", listaItens[indice].qtd);
      dados.append("concluido", listaItens[indice].concluido);
      dados.append("verbo", "PUT");
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          let resposta = JSON.parse(this.responseText);
          if (resposta.hasOwnProperty("erro")) {
            swal(resposta.erro);
          }
        }
      });
      xhr.open("POST", urlItem);
      xhr.send(dados);
      cancelar();
  }else{
    swal({
    title: "Atenção!",
    text: "Preencha todos os campos!",
    icon: "info",
    });
  }
}

function novoItem() {
  let table = document.querySelector(".item");
  cabecalho.style.display = "none";
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
  cabecalho.style.display = "grid";
  table.style.display = "flex";
  form.innerHTML = "";
}

function salvarNovoItem() {
  let novoItem = document.querySelector("#input_item").value;
  let qtd = document.querySelector("#input_qtd").value;
  if (novoItem === "") {
    swal({
    title: "Atenção!",
    text: "Preencha todos os campos!",
    icon: "info",
    });
  } else {
    let btnNovoItem = document.querySelector("#btnNovoItem");
    btnNovoItem.style.display = "none";
    var dados = new FormData();
    dados.append("id_item", null);
    dados.append("id_lista", new URL(window.location.href).searchParams.get("id_lista"));
    dados.append("id_usuario", localStorage.getItem("id_usu"));
    dados.append("nome_item", novoItem);
    dados.append("qtd", qtd);
    dados.append("concluido", 0);
    dados.append("verbo", "POST");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let resposta = JSON.parse(this.responseText);
        if (resposta.hasOwnProperty("erro")) {
          swal(resposta.erro);
        }
      }
    });
    xhr.open("POST", urlItem);
    xhr.send(dados);
    cancelar();
  }
}

function checado(check, indice) {
  let backdiv = check.parentNode.parentNode;
  let nome_item = check.parentNode.parentNode.children[0];
  let qtd = check.parentNode.parentNode.children[1];
  let nome = localStorage.getItem("nome_usu");

  if (listaItens[indice].qtd == null) {
    listaItens[indice].qtd = "";
  }
  if (check.checked) {
    check.parentNode.children[1].style = "Display: none";
    backdiv.style.background = "#008000";
    nome_item.style.textDecoration = "line-through";
    nome_item.style.color = "var(--cor-da-fonte-menu)";
    qtd.style.textDecoration = "line-through";
    qtd.style.color = "var(--cor-da-fonte-menu)";
    listaItens[indice].concluido = 1;
  } else {
    check.parentNode.children[1].style = "Display: block";
    backdiv.style.background = "var(--cor-de-fundo-menu)";
    nome_item.style.textDecoration = "none";
    qtd.style.textDecoration = "none";
    nome_item.style.color = "var(--cor-da-fonte-menu)";
    qtd.style.color = "var(--cor-da-fonte-menu)";
    listaItens[indice].concluido = 0;
  }

  let dados = new FormData();
  dados.append("id_lista", listaItens[indice].id_lista);
  dados.append("id_usuario", localStorage.getItem("id_usu"));
  dados.append("id_item", listaItens[indice].id_item);
  dados.append("nome_item", listaItens[indice].nome_item);
  dados.append("qtd", listaItens[indice].qtd);
  dados.append("concluido", listaItens[indice].concluido);
  dados.append("verbo", "PUT");
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let resposta = JSON.parse(this.responseText);
      if (resposta.hasOwnProperty("erro")) {
        swal(resposta.erro);
      }
    }
  });
  xhr.open("POST", urlItem);
  xhr.send(dados);
  //cancelar();
}

function limpaLocalStorage() {
  localStorage.clear();
}

function cancelar() {
  window.location.reload();
}