// =====================================
// HORÁRIOS DISPONÍVEIS
// =====================================

const horarios =
  document.querySelectorAll(".disponivel");

// =====================================
// CLICOU NO HORÁRIO
// =====================================

horarios.forEach((horario) => {

  horario.addEventListener("click", () => {

    alert(
      `Horário ${horario.innerText} selecionado!`
    );

  });

});