// =====================================
// FORMULÁRIO
// =====================================

const form =
  document.querySelector("#formCadastro");

// =====================================
// TELEFONE
// =====================================

const telefone =
  document.querySelector("#telefone");

// =====================================
// SENHAS
// =====================================

const senha =
  document.querySelector("#senha");

const confirmarSenha =
  document.querySelector("#confirmarSenha");

// =====================================
// BOTÕES MOSTRAR SENHA
// =====================================

const mostrarSenha =
  document.querySelector("#mostrarSenha");

const mostrarConfirmarSenha =
  document.querySelector("#mostrarConfirmarSenha");

// =====================================
// MÁSCARA TELEFONE
// =====================================

telefone.addEventListener("input", (e) => {

  // Remove tudo que não é número
  let valor =
    e.target.value.replace(/\D/g, "");

  // Limita 11 números
  valor = valor.slice(0, 11);

  // Formata telefone
  if(valor.length > 10){

    valor = valor.replace(
      /^(\d{2})(\d{5})(\d{4}).*/,
      "($1) $2-$3"
    );

  }else if(valor.length > 6){

    valor = valor.replace(
      /^(\d{2})(\d{4})(\d{0,4}).*/,
      "($1) $2-$3"
    );

  }else if(valor.length > 2){

    valor = valor.replace(
      /^(\d{2})(\d{0,5})/,
      "($1) $2"
    );

  }else{

    valor = valor.replace(
      /^(\d*)/,
      "($1"
    );
  }

  // Atualiza valor
  e.target.value = valor;

});

// =====================================
// MOSTRAR SENHA
// =====================================

mostrarSenha.addEventListener("click", () => {

  if(senha.type === "password"){

    senha.type = "text";

  }else{

    senha.type = "password";
  }

});

// =====================================
// MOSTRAR CONFIRMAR SENHA
// =====================================

mostrarConfirmarSenha.addEventListener("click", () => {

  if(confirmarSenha.type === "password"){

    confirmarSenha.type = "text";

  }else{

    confirmarSenha.type = "password";
  }

});

// =====================================
// ENVIO FORMULÁRIO
// =====================================

form.addEventListener("submit", (event) => {

  // Impede reload
  event.preventDefault();

  // Valores senha
  const senhaValor =
    senha.value.trim();

  const confirmarValor =
    confirmarSenha.value.trim();

  // =====================================
  // SENHAS DIFERENTES
  // =====================================

  if(senhaValor !== confirmarValor){

    alert("As senhas não coincidem.");

    return;
  }

  // =====================================
  // SENHA CURTA
  // =====================================

  if(senhaValor.length < 6){

    alert(
      "A senha precisa ter pelo menos 6 caracteres."
    );

    return;
  }

  // =====================================
  // TELEFONE INVÁLIDO
  // =====================================

  const numerosTelefone =
    telefone.value.replace(/\D/g, "");

  if(numerosTelefone.length !== 11){

    alert(
      "Digite um telefone válido com 11 dígitos."
    );

    return;
  }

  // =====================================
  // CADASTRO OK
  // =====================================

  alert("Cadastro realizado com sucesso!");

});