// =====================================
// ELEMENTOS
// =====================================

const datasDiv =
  document.querySelector("#datas");

const horariosDiv =
  document.querySelector("#horarios");

const btnConfirmar =
  document.querySelector("#btnConfirmar");

// =====================================
// BOTÃO COMEÇA DESATIVADO
// =====================================

btnConfirmar.disabled = true;

// =====================================
// DATA HOJE
// =====================================

const hoje =
  new Date();

// =====================================
// HORÁRIOS
// =====================================

const horarios = [

  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"

];

// =====================================
// AGENDAMENTOS
// =====================================

let agendamentos =
  JSON.parse(
    localStorage.getItem(
      "agendamentos"
    )
  ) || [];

// =====================================
// SELEÇÕES
// =====================================

let dataSelecionada = null;

let horarioSelecionado = null;

// =====================================
// GERAR DATAS
// =====================================

for(let i = 0; i < 30; i++){

  const data =
    new Date();

  data.setDate(
    hoje.getDate() + i
  );

  const ano =
    data.getFullYear();

  const mes =
    String(
      data.getMonth() + 1
    ).padStart(2,"0");

  const dia =
    String(
      data.getDate()
    ).padStart(2,"0");

  const dataCompleta =
    `${ano}-${mes}-${dia}`;

  // =====================================
  // BOTÃO
  // =====================================

  const botao =
    document.createElement(
      "button"
    );

  botao.classList.add(
    "data-btn",
    "disponivel"
  );

  botao.innerText =
    `${dia}/${mes}`;

  // =====================================
  // CLIQUE
  // =====================================

  botao.addEventListener(
    "click",
    () => {

      document
        .querySelectorAll(
          ".data-btn"
        )
        .forEach((btn) => {

          btn.classList.remove(
            "selecionado"
          );

        });

      botao.classList.add(
        "selecionado"
      );

      dataSelecionada =
        dataCompleta;

      horarioSelecionado =
        null;

      btnConfirmar.disabled =
        true;

      gerarHorarios();

    }
  );

  datasDiv.appendChild(
    botao
  );

}

// =====================================
// GERAR HORÁRIOS
// =====================================

function gerarHorarios(){

  horariosDiv.innerHTML = "";

  horarios.forEach((hora) => {

    const dataHora =
      `${dataSelecionada}T${hora}`;

    // =====================================
    // VERIFICA OCUPADO
    // =====================================

    const ocupado =
      agendamentos.some(
        (agendamento) => {

          return (
            agendamento.dataHora ===
            dataHora
          );

        }
      );

    // =====================================
    // BOTÃO
    // =====================================

    const botao =
      document.createElement(
        "button"
      );

    botao.classList.add(
      "horario-btn"
    );

    // =====================================
    // OCUPADO
    // =====================================

    if(ocupado){

      botao.classList.add(
        "ocupado"
      );

      botao.innerText =
        `${hora}\nHorário Ocupado`;

    }

    // =====================================
    // DISPONÍVEL
    // =====================================

    else{

      botao.classList.add(
        "disponivel"
      );

      botao.innerText =
        hora;

      // =====================================
      // CLIQUE
      // =====================================

      botao.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".horario-btn"
            )
            .forEach((btn) => {

              btn.classList.remove(
                "selecionado"
              );

            });

          botao.classList.add(
            "selecionado"
          );

          horarioSelecionado =
            hora;

          btnConfirmar.disabled =
            false;

        }
      );

    }

    horariosDiv.appendChild(
      botao
    );

  });

}

// =====================================
// CONFIRMAR
// =====================================

btnConfirmar.addEventListener(
  "click",
  () => {

    // =====================================
    // LOGIN
    // =====================================

    const usuario =
      localStorage.getItem(
        "usuarioLogado"
      );

    if(!usuario){

      alert(
        "Você precisa estar logado para agendar."
      );

      return;
    }

    // =====================================
    // CONFIRMA
    // =====================================

    const confirmar =
      confirm(

        `Deseja confirmar o agendamento?\n\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}`

      );

    if(!confirmar){

      return;
    }

    // =====================================
    // SALVAR
    // =====================================

    const novoAgendamento = {

      usuario,

      dataHora:
        `${dataSelecionada}T${horarioSelecionado}`

    };

    agendamentos.push(
      novoAgendamento
    );

    localStorage.setItem(

      "agendamentos",

      JSON.stringify(
        agendamentos
      )

    );

    // =====================================
    // SUCESSO
    // =====================================

    alert(
      "Agendamento realizado com sucesso!"
    );

    // =====================================
    // RESET
    // =====================================

    horarioSelecionado =
      null;

    btnConfirmar.disabled =
      true;

    gerarHorarios();

  }
);