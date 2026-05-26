// Seleciona o formulário
const form = document.querySelector("form");

// Evento de envio
form.addEventListener("submit", (event) => {

  // Impede recarregar a página
  event.preventDefault();

  // Mensagem temporária
  alert("Cadastro realizado com sucesso!");

});