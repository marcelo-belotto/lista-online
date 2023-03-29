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
                if (dado.status_conta == "pago") {
                    row.innerHTML += `<td style="padding:3px"><input type="checkbox" id="pago" onclick="checado(this)" checked></td>`;
                    row.innerHTML += `<td>${dado.id_conta}</td>`;
                    row.innerHTML += `<td>${dado.nome_conta}</td>`;
                    row.innerHTML += `<td>${dado.vencimento}</td>`;
                    row.innerHTML += `<td>${moeda}</td>`;
                    row.innerHTML += `<td style="padding:3px"><button class="edi" onclick='editConta(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" onclick='delConta(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                    row.style.textDecoration = 'line-through';
                } else {
                    row.innerHTML += `<td style="padding:3px"><input type="checkbox" onclick="checado(this)"></td>`;
                    row.innerHTML += `<td>${dado.id_conta}</td>`;
                    row.innerHTML += `<td>${dado.nome_conta}</td>`;
                    row.innerHTML += `<td>${dado.vencimento}</td>`;
                    row.innerHTML += `<td>${moeda}</td>`;
                    row.innerHTML += `<td style="padding:3px"><button class="edi" onclick='editConta(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" onclick='delConta(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                }
                conta.appendChild(row);
            });
        })
        .catch(function (error) {
            alert(error.message);
        });
}

function checado(check) {
    let idConta = check.parentNode.parentNode.cells[1];
    let nomeConta = check.parentNode.parentNode.cells[2];
    let vencimentoConta = check.parentNode.parentNode.cells[3];
    let valor = check.parentNode.parentNode.cells[4];

    if (check.checked) {    //se a conta for marcada conta foi paga
        nomeConta.style.textDecoration = 'line-through';
        vencimentoConta.style.textDecoration = 'line-through';
        valor.style.textDecoration = 'line-through';

        let dados = "id_conta=" + idConta.innerText;
        dados += "&id_usuario=" + localStorage.getItem("id_usu");
        dados += "&nome_conta=" + nomeConta.innerText;
        dados += "&vencimento=" + vencimentoConta.innerText;
        dados += "&valor=" + 56;
        dados += "&status_conta=" + "pago";
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
                setTimeout(() => { window.location.reload(); }, 1000);
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
        dados += "&status_conta=" + "pendente";
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log("Não Checado: " + this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Dados da conta alterada com sucesso!";
                    // alert("Vamos pagar a conta " + localStorage.getItem("nome_usu") + " vai pagar multa em!");
                }
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    }
}

function editConta(c) {
    c.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    c.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    c.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    c.parentNode.parentNode.cells[5].innerHTML = "<button class='sal' onclick='putConta(this)'>Salvar</button>";
}

function putConta(c) {
    let idConta = c.parentNode.parentNode.cells[1].innerHTML;
    let nomeConta = c.parentNode.parentNode.cells[2].innerHTML;
    let vencimentoConta = c.parentNode.parentNode.cells[3].innerHTML;
    let valor = c.parentNode.parentNode.cells[4].innerText;
    let valorReal = valor.substr(3);
    let valorSemVirgula = valorReal.replace(",", ".");
    let dados = "id_conta=" + idConta;
    dados += "&id_usuario=" + localStorage.getItem("id_usu");
    dados += "&nome_conta=" + nomeConta;
    dados += "&vencimento=" + vencimentoConta;
    dados += "&valor=" + valorSemVirgula;
    dados += "&status_conta=" + "pago";
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Dados da conta Alterada Com Sucesso.";
                    alert("Dados da conta Alterada Com Sucesso!");
                }
                //setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    }
}

function novaConta() {
    let linha = document.createElement("tr");
    linha.innerHTML = `<td></td>`;
    linha.innerHTML += `<td></td>`;
    linha.innerHTML += `<td><input type="text" id="conta" placeholder="Digite o nome da conta"></td>`;
    linha.innerHTML += `<td><input type="date" id="vencimento" placeholder="Digite o vencimento da conta"></td>`;
    linha.innerHTML += `<td><input type="text" id="valor" placeholder="Digite o valor da conta"></td>`;
    linha.innerHTML += `<td><i class="fa fa-arrow-right" aria-hidden="true" onclick="finalizar()"></i></td><tr>`;
    conta.appendChild(linha);
}
function finalizar() {
    let nomeConta = document.querySelector("#conta");
    let vencimentoConta = document.querySelector("#vencimento");
    let valorConta = document.querySelector("#valor");
    if (nomeConta.value != "" && vencimentoConta.value != "" && valorConta.value != "") {
        alert("vamos add conta")
    } else {
        alert("preencher todos os campos")
    }
}

function delConta(c) {
    let id_conta = c.parentNode.parentNode.cells[1].innerText;
    let nome_conta = c.parentNode.parentNode.cells[2].innerText;
    let dados = "id_conta=" + id_conta;
    if (window.confirm("Confirma Exclusão da conta = " + nome_conta + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Alimento Excluido Com Sucesso!";
                    alert("conta excluida com sucesso");
                }
                //setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", urlConta);
        xhr.send(dados);
    }
}