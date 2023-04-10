const xhr = new XMLHttpRequest();
const urlConta = "http://localhost/listaonline/src/controll/routes/route.conta.php";
var conta = document.querySelector("#conta");
var div = document.querySelector("#div");
var marcado = document.getElementById('pago');
var arrayLista = [];
var indice = 0;

function readConta() {
    fetch(urlConta + "?id_usuario=" + localStorage.getItem("id_usu"))
        .then(function (resposta) {
            if (!resposta.ok)
                throw new Error("Erro ao executar requisição: " + resposta.status);
            return resposta.json();
        })
        .then(function (data) {
            data.forEach((dado) => {
                arrayLista.push(dado);
                var moeda = dado.valor.toString(); //Formata valor para moeda 
                let formatado = moeda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                let valorSplit = formatado.split(".");
                var moeda = parseInt(valorSplit[0]).toFixed(2).split('.');
                moeda[0] = "R$ " + moeda[0].split(/(?=(?:...)*$)/).join('.');
                let valorCompleto = moeda[0] + "," + valorSplit[1]; //Formata valor para moeda
                let row = document.createElement("tr");
                if (dado.status_conta == "pago") {
                    row.innerHTML += `<td style="padding:3px"><input type="checkbox" id="pago" onclick="checado(this,${indice})" checked></td>`;
                    row.innerHTML += `<td>${dado.nome_conta}</td>`;
                    row.innerHTML += `<td>${dado.vencimento}</td>`;
                    row.innerHTML += `<td>${valorCompleto}</td>`;
                    row.innerHTML += `<td style="padding:3px"><button class="edi" onclick='editConta(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" onclick='delConta(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                    row.style.textDecoration = 'line-through';
                    row.style.color = 'green';
                } else {
                    row.innerHTML += `<td style="padding:3px"><input type="checkbox" onclick="checado(this,${indice})"></td>`;
                    row.innerHTML += `<td>${dado.nome_conta}</td>`;
                    row.innerHTML += `<td>${dado.vencimento}</td>`;
                    row.innerHTML += `<td>${valorCompleto}</td>`;
                    row.innerHTML += `<td style="padding:3px"><button class="edi" onclick='editConta(this,${indice})'><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" onclick='delConta(${indice})'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                }
                conta.appendChild(row);
                indice++;
            });
        })
        .catch(function (error) {
            alert(error.message);
        });
}

function checado(check, indice) {
    let tdconta = check.parentNode.parentNode.cells[1];
    let tdvencimento = check.parentNode.parentNode.cells[2];
    let tdvalor = check.parentNode.parentNode.cells[3];
    let valor = arrayLista[indice].valor;
    let subVirPon = valor.replace(",", ".");
    if (check.checked) {    //se a conta for marcada conta foi paga
        tdconta.style.textDecoration = 'line-through';    //Passa um alinha sobre o texto da td
        tdvencimento.style.textDecoration = 'line-through';
        tdvalor.style.textDecoration = 'line-through';

        let dados = "id_conta=" + arrayLista[indice].id_conta;
        dados += "&id_usuario=" + localStorage.getItem("id_usu");
        dados += "&nome_conta=" + arrayLista[indice].nome_conta;
        dados += "&vencimento=" + arrayLista[indice].vencimento;
        dados += "&valor=" + subVirPon;
        dados += "&status_conta=" + "pago";
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log("checado " + this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    alert(localStorage.getItem("nome_usu") + " Menos uma divida, show de bola!");
                }
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    } else { //se desmarcar conta não paga
        tdconta.style.textDecoration = 'line-through';    //Passa um alinha sobre o texto da td
        tdvencimento.style.textDecoration = 'line-through';
        tdvalor.style.textDecoration = 'line-through';

        let dados = "id_conta=" + arrayLista[indice].id_conta;
        dados += "&id_usuario=" + localStorage.getItem("id_usu");
        dados += "&nome_conta=" + arrayLista[indice].nome_conta;
        dados += "&vencimento=" + arrayLista[indice].vencimento;
        dados += "&valor=" + subVirPon;
        dados += "&status_conta=" + "pendente";
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log("Não checado" + this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    // alert("Vamos pagar a conta " + localStorage.getItem("nome_usu") + " vai pagar multa em!");
                }
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    }
}

function editConta(c, indice) {
    c.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    c.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    c.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    c.parentNode.parentNode.cells[4].innerHTML = `<button class="sal" onclick='putConta(this,${indice})'><i class="fa fa-floppy-o" aria-hidden="true"></i></button><button class="can" onclick="cancelar(this)"><i class="fa fa-times" aria-hidden="true"></i></button>`;
}

function putConta(c, indice) {
    let nomeConta = c.parentNode.parentNode.cells[1].innerHTML;
    let vencimentoConta = c.parentNode.parentNode.cells[2].innerHTML;
    let valor = c.parentNode.parentNode.cells[3].innerText;
    let valorReal = valor.substr(3);
    let valorSemVirgula = valorReal.replace(",", ".");

    let dados = "id_conta=" + arrayLista[indice].id_conta;
    dados += "&id_usuario=" + localStorage.getItem("id_usu");
    dados += "&nome_conta=" + nomeConta;
    dados += "&vencimento=" + vencimentoConta;
    dados += "&valor=" + valorSemVirgula;
    dados += "&status_conta=" + "";
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    alert("Dados da conta Alterada Com Sucesso!");
                }
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("PUT", urlConta);
        xhr.send(dados);
    }
}

function novaConta() {
    let table = document.querySelector("#table");
    table.style.display = "none";
    let form = document.createElement("form");
    form.innerHTML += `Conta<br><input type="text" id="input_conta" placeholder="Digite o nome da conta"><br>`;
    form.innerHTML += `Vencimento<br><input type="date" id="vencimento" placeholder="Digite o vencimento da conta"><br>`;
    form.innerHTML += `Valor<br><input type="text" id="valor" placeholder="Digite o valor da conta" onkeyup="formatarMoeda()"><br><br>`;
    form.innerHTML += `<input type="button" onclick="finalizar()" value="Salvar conta"/></form>`;
    div.appendChild(form);
}

function formatarMoeda() {  //Function para formata valor em real
    var elemento = document.getElementById('valor');
    var valor = elemento.value;
    if (valor != "") {
        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        if (valor.length > 6 && valor.length < 10) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        } else if (valor.length >= 10) {
            valor = valor.replace(/([0-9]{6}),([0-9]{2}$)/g, ".$1,$2");
        }
        elemento.value = valor;
    } else {
        elemento.value = "00,00";
    }
}

function finalizar() {  //Function para salvar nova conta
    let nomeConta = document.querySelector("#input_conta");
    let vencimentoConta = document.querySelector("#vencimento").value.split("-");
    let formatadata = vencimentoConta[2] + "-" + vencimentoConta[1] + "-" + vencimentoConta[0];
    let valorConta = document.querySelector("#valor");
    let valorPonto = valorConta.value.replace(".", "");
    let valorVirgula = valorPonto.replace(",", ".");
    if (nomeConta.value != "" && vencimentoConta.value != "" && valorConta.value != "") {
        let dados = new FormData();
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_conta", nomeConta.value);
        dados.append("vencimento", formatadata);
        dados.append("valor", valorVirgula);
        dados.append("status_conta", "pendente");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Conta Adiconada Com Sucesso!");
                setTimeout(() => { window.location.reload(); }, 2000);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    alert(resp.erro);
                } else {
                }
            }
        });
        xhr.open("POST", urlConta);
        xhr.send(dados);
    } else {
        alert("Favor preencher todos os campos!");
        setTimeout(() => { window.location.reload(); }, 1000);
        //setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function delConta(indice) {
    let dados = "id_conta=" + arrayLista[indice].id_conta;
    if (window.confirm("Confirma Exclusão da conta = " + arrayLista[indice].nome_conta + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    alert("conta excluida com sucesso");
                }
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
        xhr.open("DELETE", urlConta);
        xhr.send(dados);
    }
}

function limpaLocalStorage() {
    localStorage.clear();
}

function cancelar() {   //Function para atualizar pagina
    window.location.reload();
}