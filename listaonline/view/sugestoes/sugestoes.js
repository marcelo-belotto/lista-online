let pars = new URLSearchParams(document.location.search);
document.querySelector('#txtnome').value = pars.get('nome');
document.querySelector('#txtemail').value = pars.get('email');
let data = new Date();
let ano = data.getFullYear();
document.querySelector(".rodape__texto").innerHTML = `Lista Online ${ano} - Todos os Direitos Reservados.`;
let dataFormatada = data.toLocaleDateString();

function enviar(){
  document.querySelector('#txtnome').value += ` - ${dataFormatada}`;
  document.querySelector('#txtnome').disabled = false;
  document.querySelector('#txtemail').disabled = false;
}