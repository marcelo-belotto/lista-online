const xhr = new XMLHttpRequest();
const urlConta = "https://listaonline.online/src/controll/routes/route.conta.php";
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
                var data = new Date();  //Data atual
                var dia = String(data.getDate()).padStart(2, '0');
                var mes = String(data.getMonth() + 1).padStart(2, '0');
                var ano = data.getFullYear();
                var dataAtual = ano + '-' + mes + '-' + dia;    //Data atual
                let diffInMs = new Date(dado.vencimento) - new Date(dataAtual); //Diferença entre datas
                let diffInDays = diffInMs / (1000 * 60 * 60 * 24);//Diferença entre datas
                if (diffInDays <= 4) {
                    var moeda = dado.valor.toString(); //Formata valor para moeda 
                    let formatado = moeda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    let valorSplit = formatado.split(".");
                    var moeda = parseInt(valorSplit[0]).toFixed(2).split('.');
                    moeda[0] = "R$ " + moeda[0].split(/(?=(?:...)*$)/).join('.');
                    let valorCompleto = moeda[0] + "," + valorSplit[1]; //Formata valor para moeda
                    
                    let row = document.createElement("section");
                    if (dado.status_conta == "pago") {
                        row.innerHTML += `<p class="con">${dado.nome_conta}</p>`;
                        row.innerHTML += `<p class="con">${dado.vencimento}</p>`;
                        row.innerHTML += `<p class="con">${valorCompleto}</p>`;
                        row.innerHTML += `<div class="opcoes--tabela"><span class="del" onclick='delConta(${indice})'><i class="fa fa-trash-o" aria-hidden="true"></i></span><span><input type="checkbox" id="pago" onclick="checado(this,${indice})" checked></span></div></section>`;
                        row.style.textDecoration = 'line-through';
                        row.style.background = "#008000";
                        row.style.color = "var(--cor-da-fonte-menu)";
                    } else {
                        swal("Falta menos de 5 dias para o vencimento da conta '" + dado.nome_conta + "'");
                        row.innerHTML += `<p class="con">${dado.nome_conta}</p>`;
                        row.innerHTML += `<p class="con">${dado.vencimento}</p>`;
                        row.innerHTML += `<p class="con">${valorCompleto}</p>`;
                        row.innerHTML += `<div class="opcoes--tabela"><span class="del" onclick='delConta(${indice})'><i class="fa fa-trash-o" aria-hidden="true"></i></span><span class="edi" onclick='editConta(this.parentNode,${indice})'><i class="fa fa-pencil" aria-hidden="true"></i></span><span><input type="checkbox" onclick="checado(this,${indice})"></span></div></section>`;
                    }
                    conta.appendChild(row);
                    indice++;
                } else {
                    var moeda = dado.valor.toString(); //Formata valor para moeda 
                    let formatado = moeda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    let valorSplit = formatado.split(".");
                    var moeda = parseInt(valorSplit[0]).toFixed(2).split('.');
                    moeda[0] = "R$ " + moeda[0].split(/(?=(?:...)*$)/).join('.');
                    let valorCompleto = moeda[0] + "," + valorSplit[1]; //Formata valor para moeda
                    let row = document.createElement("section");
                    if (dado.status_conta == "pago") {
                        row.innerHTML += `<p class="con">${dado.nome_conta}</p>`;
                        row.innerHTML += `<p class="con">${dado.vencimento}</p>`;
                        row.innerHTML += `<p class="con">${valorCompleto}</p>`;
                        row.innerHTML += `<div class="opcoes--tabela"><span class="del" onclick='delConta(${indice})'><i class="fa fa-trash-o" aria-hidden="true"></i></span><span><input type="checkbox" id="pago" onclick="checado(this,${indice})" checked></span></div></section>`;
                        row.style.textDecoration = 'line-through';
                        row.style.background = "#008000";
                        row.style.color = "var(--cor-da-fonte-menu)";
                    } else {
                        row.innerHTML += `<p class="con">${dado.nome_conta}</p>`;
                        row.innerHTML += `<p class="con">${dado.vencimento}</p>`;
                        row.innerHTML += `<p class="con">${valorCompleto}</p>`;
                        row.innerHTML += `<div class="opcoes--tabela"><span class="del" onclick='delConta(${indice})'><i class="fa fa-trash-o" aria-hidden="true"></i></span><span class="edi" onclick='editConta(this.parentNode,${indice})'><i class="fa fa-pencil" aria-hidden="true"></i></span><span><input type="checkbox" onclick="checado(this,${indice})"></span></div></section>`;
                    }
                    conta.appendChild(row);
                    indice++;
                }
            });
        })
        .catch(function (error) {
            swal("Erro ao retornar dados do usuario do servidor!");
        });
}

function checado(check, indice) {
    let tdconta = check.parentNode.parentNode.parentNode;
    let valor = arrayLista[indice].valor;

    let subVirPon = valor.replace(",", ".");
    if (check.checked) {    //se a conta for marcada conta foi paga
        tdconta.style.textDecoration = 'line-through';    //Passa um alinha sobre o texto da td

        let dados = new FormData();
        dados.append("id_conta", arrayLista[indice].id_conta);
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_conta", arrayLista[indice].nome_conta);
        dados.append("vencimento", arrayLista[indice].vencimento);
        dados.append("valor", subVirPon);
        dados.append("status_conta", "pago");
        dados.append("verbo", "PUT");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    swal(resp.erro);
                } else {
                    alert(localStorage.getItem("nome_usu") + " parabéns menos uma divida!");
                }
            }
        });
        xhr.open("POST", urlConta);
        xhr.send(dados);
        cancelar();
    } else { //se desmarcar conta não paga
        tdconta.style.textDecoration = 'line-through';
        let dados = new FormData();
        dados.append("id_conta", arrayLista[indice].id_conta);
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_conta", arrayLista[indice].nome_conta);
        dados.append("vencimento", arrayLista[indice].vencimento);
        dados.append("valor", subVirPon);
        dados.append("status_conta", "pendente");
        dados.append("verbo", "PUT");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    swal(resp.erro);
                }
            }
        });
        xhr.open("POST", urlConta);
        xhr.send(dados);
        cancelar();
    }
}

function editConta(c, indice) { //Cria formulario e passa os valores para dentro dos inputs
    let main = document.querySelector("#conta");
    main.style.display = "none";
    let aside = document.querySelector("#noneaside");
    aside.style.display = "none";
    let form = document.createElement("form");
    form.className = "Formulario__conta";
    form.innerHTML += `<h2 class="Titulo__Form">Conta</h2><input type="text" id="input_conta" placeholder="Digite o nome da conta">`;
    form.innerHTML += `<h2 class="Titulo__Form">Vencimento</h2><input type="date" id="vencimento">`;
    form.innerHTML += `<h2 class="Titulo__Form">Valor</h2><input type="text" id="valor" placeholder="Digite o valor da conta" onkeyup="formatarMoeda()">`;
    form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelar()" value="Voltar" class="Botao-form"/>
    <input type="button" id="btnalterar" onclick="confirmarAlteracao(${arrayLista[indice].id_conta})" value="Alterar conta" class="Botao-form"/></div></form>`;
    div.appendChild(form);

    localStorage.setItem("id_con", arrayLista[indice].id_conta);
    document.querySelector("#input_conta").value = arrayLista[indice].nome_conta;
    document.querySelector("#vencimento").value = arrayLista[indice].vencimento;
    document.querySelector("#valor").value = arrayLista[indice].valor;
}

function confirmarAlteracao() { //Finaliza aleração conta
    let valorConta = document.querySelector("#valor");
    let nomeConta = document.querySelector("#input_conta");
    let vencimentoConta = document.querySelector("#vencimento");
    
    if (nomeConta.value != "" && vencimentoConta.value != "" && valorConta.value != "") {
        let btnalterar = document.querySelector("#btnalterar");
        btnalterar.style.display = "none";
        let valorPonto = document.querySelector("#valor").value.replace(".", ",");
        let valorVirgula = valorPonto.replace(",", ".");
        
        let dados = new FormData();
        dados.append("id_conta", localStorage.getItem("id_con"));
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_conta", nomeConta.value);
        dados.append("vencimento", vencimentoConta.value);
        dados.append("valor", valorVirgula);
        dados.append("status_conta", "");
        dados.append("verbo", "PUT");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    swal(resp.erro);
                }
            }
        });
        xhr.open("POST", urlConta);
        xhr.send(dados);
        cancelar();
    } else {
        swal("Preencha todos os campos!");
    }
}

function novaConta() {  //Cria formulario para adicionar nova conta
    let main = document.querySelector("#conta");
    main.style.display = "none";
    let form = document.createElement("form");
    form.className = "Formulario__conta";
    form.innerHTML += `<h2 class="Titulo__Form">Conta</h2><input type="text" id="input_conta" placeholder="Digite o nome da conta">`;
    form.innerHTML += `<h2 class="Titulo__Form">Vencimento</h2><input type="date" id="vencimento">`;
    form.innerHTML += `<h2 class="Titulo__Form">Valor</h2><input type="text" id="valor" placeholder="Digite o valor da conta" onkeyup="formatarMoeda()">`;
    form.innerHTML += `<div class="container-botao"><input type="button" onclick="cancelar()" value="Voltar" class="Botao-form"/>
    <input type="button" id="btnsalvar" onclick="finalizar()" value="Salvar conta" class="Botao-form"/></div></form>`;
    div.appendChild(form);
}

function finalizar() {  //Function para salvar nova conta
    let valorConta = document.querySelector("#valor");
    let nomeConta = document.querySelector("#input_conta");
    let vencimentoConta = document.querySelector("#vencimento").value.split("-");
    let formatadata = vencimentoConta[0] + "-" + vencimentoConta[1] + "-" + vencimentoConta[2];
    let valorPonto = document.querySelector("#valor").value.replace(".", "");
    let valorVirgula = valorPonto.replace(",", ".");
    
    if (nomeConta.value != "" && vencimentoConta.value != "" && valorConta.value != "") {
        let btnsalvar = document.querySelector("#btnsalvar");
        btnsalvar.style.display = "none";
        let dados = new FormData();
        dados.append("id_usuario", localStorage.getItem("id_usu"));
        dados.append("nome_conta", nomeConta.value);
        dados.append("vencimento", formatadata);
        dados.append("valor", valorVirgula);
        dados.append("status_conta", "pendente");
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    swal(resp.erro);
                }
            }
        });
        xhr.open("POST", urlConta);
        xhr.send(dados);
        cancelar();
    } else {
        swal({
        title: "Atenção!",
        text: "Preencha todos os campos!",
        icon: "info",
        });
    }
}

function delConta(indice) {
    let dados = new FormData();
    dados.append("id_conta", arrayLista[indice].id_conta);
    dados.append("verbo", "DELETE");
    swal({
    title: "Atenção!",
    text: "Clique no botão para confirmar ação!",
    icon: "warning",
    buttons: true,
    }).then(function(result) {
        if (result) {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    let resp = JSON.parse(this.responseText);
                    if (resp.hasOwnProperty("erro")) {
                        msg.innerHTML = resp.erro;
                    }
                    //setTimeout(() => { window.location.reload(); }, 500);
                }
            });
            xhr.open("POST", urlConta);
            xhr.send(dados);
            cancelar();
        } else {
          cancelar();
        }
    });
}

/*function delConta(indice) {
    let dados = new FormData();
    dados.append("id_conta", arrayLista[indice].id_conta);
    dados.append("verbo", "DELETE");
    if (window.confirm("Confirma Exclusão da conta: " + arrayLista[indice].nome_conta + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                }
                //setTimeout(() => { window.location.reload(); }, 500);
            }
        });
        xhr.open("POST", urlConta);
        xhr.send(dados);
        cancelar();
    }
}*/

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
        elemento.value = "00.00";
    }
}

function limpaLocalStorage() {
    localStorage.clear();
}

function cancelar() {   //Function para atualizar pagina
    window.location.reload();
}