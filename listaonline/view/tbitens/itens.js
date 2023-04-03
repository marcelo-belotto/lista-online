const xhr = new XMLHttpRequest();
const urlItem = "http://localhost/listaonline/src/controll/routes/route.item.php";
var item = document.querySelector('#item');

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
                  row.innerHTML += `<td>${dado.id_item}</td>`;
                  row.innerHTML += `<td>${dado.id_lista}</td>`;
                  row.innerHTML += `<td>${dado.id_usuario}</td>`;
                  row.innerHTML += `<td>${dado.nome_item}</td>`;
                  row.innerHTML += `<td>${dado.qtd}</td>`;
                  row.innerHTML += `<td style="padding:3px">
                  <button class='edi' onclick='editTipoLista(this.parentNode.parentNode.cells)'>
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button class='del' onclick='delTipoLista(this.parentNode.parentNode.cells[0].innerText)'>
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  <button class='sal' onclick='salvarAlteracao(this.parentNode.parentNode.cells[0].innerText,this.parentNode.parentNode.cells[1].innerText)' hidden=true>
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </button>
                  <button class='can' onclick='editTipoLista(this.parentNode.parentNode.cells)' hidden=true>
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                  </td>`;
              item.appendChild(row);
          });
      })
      .catch(function (error) {
          alert(error.message);
      });
}