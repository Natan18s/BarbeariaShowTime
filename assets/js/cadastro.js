// Seleciona formulário
const form = document.querySelector("#formCadastro");

// Seleciona senha
const senha = document.querySelector("#senha");

// Seleciona confirmar senha
const confirmarSenha = document.querySelector("#confirmarSenha");

// Botão mostrar senha
const mostrarSenha = document.querySelector("#mostrarSenha");

// MOSTRAR SENHA
mostrarSenha.addEventListener("click", () => {

  // Verifica tipo atual
  if(senha.type === "password"){

    senha.type = "text";

  }else{

    senha.type = "password";
  }

});

// ENVIO FORMULÁRIO
form.addEventListener("submit", (event) => {

  // Impede recarregar
  event.preventDefault();

  // Remove espaços
  const senhaValor = senha.value.trim();

  const confirmarValor =
    confirmarSenha.value.trim();

  // Verifica senhas
  if(senhaValor !== confirmarValor){

    alert("As senhas não coincidem.");

    return;
  }

  // Verifica tamanho senha
  if(senhaValor.length < 6){

    alert(
      "A senha precisa ter pelo menos 6 caracteres."
    );

    return;
  }

  // Cadastro fake temporário
  alert("Cadastro realizado com sucesso!");

});