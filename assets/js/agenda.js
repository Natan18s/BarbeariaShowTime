// =====================================
// BOTÕES DOS DIAS
// =====================================

const dias =
  document.querySelectorAll(".dia");

// =====================================
// HORÁRIOS DISPONÍVEIS
// =====================================

const horariosDisponiveis =
  document.querySelectorAll(".disponivel");

// =====================================
// SELECIONAR DIA
// =====================================

dias.forEach((dia) => {

  dia.addEventListener("click", () => {

    // Remove seleção anterior
    dias.forEach((item) => {

      item.style.background =
        "rgba(255,255,255,0.1)";

      item.style.color =
        "white";

    });

    // Destaca dia clicado
    dia.style.background =
      "#d4af37";

    dia.style.color =
      "black";

  });

});

// =====================================
// HORÁRIO DISPONÍVEL
// =====================================

horariosDisponiveis.forEach((horario) => {

  horario.addEventListener("click", () => {

    alert(
      `Horário ${horario.innerText} agendado com sucesso!`
    );

  });

});