// ======================================
// ELEMENTOS
// ======================================

const calendario =
  document.querySelector("#calendario");

const horariosDiv =
  document.querySelector("#horarios");

const mesAtual =
  document.querySelector("#mesAtual");

const btnAgendar =
  document.querySelector("#btnAgendar");

const btnLimpar =
  document.querySelector("#btnLimpar");

const statusUsuario =
  document.querySelector("#statusUsuario");

// ======================================
// DATA ATUAL
// ======================================

const hoje = new Date();

const ano =
  hoje.getFullYear();

const mes =
  hoje.getMonth();

const diaAtual =
  hoje.getDate();

// ======================================
// MÊS
// ======================================

const meses = [

  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"

];

// ======================================
// HORÁRIOS
// ======================================

const horarios = [

  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00"

];

// ======================================
// HORÁRIOS OCUPADOS
// ======================================

let horariosOcupados =
  JSON.parse(
    localStorage.getItem("horarios")
  ) || {};

// ======================================
// LOGIN
// ======================================

const usuarioLogado =
  localStorage.getItem("usuarioLogado");

// ======================================
// STATUS LOGIN
// ======================================

if(usuarioLogado){

  statusUsuario.innerText =
    `Logado como ${usuarioLogado}`;

}else{

  statusUsuario.innerText =
    "Você não está logado";
}

// ======================================
// SELEÇÕES
// ======================================

let diaSelecionado = null;

let horarioSelecionado = null;

// ======================================
// MÊS
// ======================================

mesAtual.innerText =
  `${meses[mes]} ${ano}`;

// ======================================
// QUANTIDADE DIAS
// ======================================

const totalDias =
  new Date(
    ano,
    mes + 1,
    0
  ).getDate();

// ======================================
// GERAR CALENDÁRIO
// ======================================

for(let dia = 1; dia <= totalDias; dia++){

  const botao =
    document.createElement("button");

  botao.innerText = dia;

  botao.classList.add("dia");

  // DIA PASSADO
  if(dia < diaAtual){

    botao.classList.add("passado");

  }else{

    botao.addEventListener("click", () => {

      document
        .querySelectorAll(".dia")
        .forEach((item) => {

          item.classList.remove(
            "selecionado"
          );

        });

      botao.classList.add(
        "selecionado"
      );

      diaSelecionado = dia;

      gerarHorarios();

    });

  }

  calendario.appendChild(botao);

}

// ======================================
// GERAR HORÁRIOS
// ======================================

function gerarHorarios(){

  horariosDiv.innerHTML = "";

  horarios.forEach((hora) => {

    const botao =
      document.createElement("button");

    botao.innerText = hora;

    botao.classList.add(
      "horario"
    );

    const chave =
      `${diaSelecionado}-${mes}-${ano}-${hora}`;

    const agora =
      new Date();

    const [h,m] =
      hora.split(":");

    const dataHorario =
      new Date(
        ano,
        mes,
        diaSelecionado,
        h,
        m
      );

    // HORÁRIO PASSADO
    if(dataHorario < agora){

      botao.classList.add(
        "horario-passado"
      );

    }

    // HORÁRIO OCUPADO
    else if(horariosOcupados[chave]){

      botao.classList.add(
        "ocupado"
      );

    }

    // DISPONÍVEL
    else{

      botao.classList.add(
        "disponivel"
      );

      botao.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".horario"
            )
            .forEach((item) => {

              item.classList.remove(
                "selecionado"
              );

            });

          botao.classList.add(
            "selecionado"
          );

          horarioSelecionado =
            hora;

        }
      );

    }

    horariosDiv.appendChild(botao);

  });

}

// ======================================
// AGENDAR
// ======================================

btnAgendar.addEventListener(
  "click",
  () => {

    // LOGIN
    if(!usuarioLogado){

      alert(
        "Você precisa estar logado para agendar."
      );

      return;
    }

    // DIA
    if(!diaSelecionado){

      alert(
        "Selecione um dia."
      );

      return;
    }

    // HORÁRIO
    if(!horarioSelecionado){

      alert(
        "Selecione um horário."
      );

      return;
    }

    const chave =
      `${diaSelecionado}-${mes}-${ano}-${horarioSelecionado}`;

    horariosOcupados[chave] = {

      usuario:
        usuarioLogado
    };

    localStorage.setItem(
      "horarios",
      JSON.stringify(
        horariosOcupados
      )
    );

    alert(
      "Agendamento realizado com sucesso!"
    );

    gerarHorarios();

  }
);

// ======================================
// LIMPAR
// ======================================

btnLimpar.addEventListener(
  "click",
  () => {

    diaSelecionado = null;

    horarioSelecionado = null;

    document
      .querySelectorAll(".dia")
      .forEach((item) => {

        item.classList.remove(
          "selecionado"
        );

      });

    horariosDiv.innerHTML = "";

  }
);