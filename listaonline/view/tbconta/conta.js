const xhr = new XMLHttpRequest();
const urlConta = "http://localhost/listaonline/src/controll/routes/route.conta.php";
var conta = document.querySelector("#conta");
var marcado = document.getElementById('pago');

function readConta() {
    fetch(urlConta + "?id_usuario=" + localStorage.getItem("id_usu"))
        .then(function (resposta) {
            if (!resposta.ok)
                throw new Error("Erro ao executar requisição: " + resposta.status);
            return resposta.json();
        })
        .then(function (data) {
            data.forEach((dado) => {
                var moeda = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(dado.valor);
                let row = document.createElement("tr");
                if (dado.valor < 80) {
                    row.innerHTML += `<td>${dado.id_conta}</td>`;
                    row.innerHTML += `<td>${dado.nome_conta}</td>`;
                    row.innerHTML += `<td>${dado.vencimento}</td>`;
                    row.innerHTML += `<td>${moeda}</td>`;
                    row.innerHTML += `<td style="padding:3px"><input type="checkbox" id="pago" onclick="checado(this)" checked></td></tr>`;
                    row.style.textDecoration = 'line-through';
                } else {
                    row.innerHTML += `<td>${dado.id_conta}</td>`;
                    row.innerHTML += `<td>${dado.nome_conta}</td>`;
                    row.innerHTML += `<td>${dado.vencimento}</td>`;
                    row.innerHTML += `<td>${moeda}</td>`;
                    row.innerHTML += `<td style="padding:3px"><input type="checkbox" onclick="checado(this)"></td></tr>`;
                }
                // row.addEventListener("click", function () {
                //     row.innerHTML += `<td style="padding:3px"><button onclick='editConta(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delConta(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                // })
                conta.appendChild(row);

            });
        })
        .catch(function (error) {
            alert(error.message);
        });
}

function checado(check) {
    let idConta = check.parentNode.parentNode.cells[0];
    let nomeConta = check.parentNode.parentNode.cells[1];
    let vencimentoConta = check.parentNode.parentNode.cells[2];
    let valor = check.parentNode.parentNode.cells[3];

    if (check.checked) {    //se a conta for marcada conta foi paga
        nomeConta.style.textDecoration = 'line-through';
        vencimentoConta.style.textDecoration = 'line-through';
        valor.style.textDecoration = 'line-through';

        let dados = "id_conta=" + idConta.innerText;
        dados += "&id_usuario=" + localStorage.getItem("id_usu");
        dados += "&nome_conta=" + nomeConta.innerText;
        dados += "&vencimento=" + vencimentoConta.innerText;
        dados += "&valor=" + 56;
        //dados += "&status_conta=" + "Paga";
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log("Checado: " + this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Dados da conta alterada com sucesso!";
                    alert(localStorage.getItem("nome_usu") + " Menos uma divida, show de bola!");
                }
                //setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    } else { //se desmarcar conta não paga
        nomeConta.style.textDecoration = 'none';
        vencimentoConta.style.textDecoration = 'none';
        valor.style.textDecoration = 'none';

        let dados = "id_conta=" + idConta.innerText;
        dados += "&id_usuario=" + localStorage.getItem("id_usu");
        dados += "&nome_conta=" + nomeConta.innerText;
        dados += "&vencimento=" + vencimentoConta.innerText;
        dados += "&valor=" + 110;
        //dados += "&status_conta=" + "Pendente";
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log("Não Checado: " + this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Dados da conta alterada com sucesso!";
                    alert("Vamos pagar a conta " + localStorage.getItem("nome_usu") + " vai pagar multa em!");
                }
                //setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    }
}

function editConta() {
    alert("vamos editar");
}

function delConta() {
    alert("vamos deletar");
}