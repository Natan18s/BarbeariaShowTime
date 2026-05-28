// =====================================
// SITE CARREGOU
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // =====================================
    // ELEMENTO CALENDÁRIO
    // =====================================

    const calendarEl =
      document.getElementById(
        "calendar"
      );

    // =====================================
    // EVENTOS SALVOS
    // =====================================

    let eventosSalvos =
      JSON.parse(
        localStorage.getItem(
          "agendamentos"
        )
      ) || [];

    // =====================================
    // CALENDÁRIO
    // =====================================

    const calendar =
      new FullCalendar.Calendar(
        calendarEl,
        {

          // =====================================
          // VISÃO INICIAL
          // =====================================

          initialView:
            "timeGridWeek",

          // =====================================
          // IDIOMA
          // =====================================

          locale:"pt-br",

          // =====================================
          // ALTURA
          // =====================================

          height:"auto",

          // =====================================
          // HORÁRIO
          // =====================================

          slotMinTime:"08:00:00",

          slotMaxTime:"20:00:00",

          slotDuration:"01:00:00",

          // =====================================
          // FORMATO HORAS
          // =====================================

          slotLabelFormat:{

            hour:"2-digit",

            minute:"2-digit",

            hour12:false

          },

          // =====================================
          // BARRA SUPERIOR
          // =====================================

          headerToolbar:{

            left:
              "prev,next today",

            center:
              "title",

            right:
              "dayGridMonth,timeGridWeek,timeGridDay"

          },

          // =====================================
          // TEXTO BOTÕES
          // =====================================

          buttonText:{

            today:"Hoje",

            month:"Mês",

            week:"Semana",

            day:"Dia"

          },

          // =====================================
          // AGORA
          // =====================================

          nowIndicator:true,

          // =====================================
          // EVENTOS
          // =====================================

          events:eventosSalvos,

          // =====================================
          // BLOQUEAR PASSADO
          // =====================================

          validRange:{

            start:new Date()
          },

          // =====================================
          // CLIQUE HORÁRIO
          // =====================================

          dateClick:(info) => {

            // =====================================
            // USUÁRIO
            // =====================================

            const usuario =
              localStorage.getItem(
                "usuarioLogado"
              );

            // =====================================
            // NÃO LOGADO
            // =====================================

            if(!usuario){

              alert(
                "Você precisa estar logado para agendar."
              );

              return;
            }

            // =====================================
            // DATA
            // =====================================

            const dataSelecionada =
              info.dateStr;

            // =====================================
            // CONFIRMAÇÃO
            // =====================================

            const confirmar =
              confirm(

                `Deseja realmente agendar o horário:\n\n${dataSelecionada.replace("T"," às ")} ?`

              );

            // CANCELADO
            if(!confirmar){

              return;
            }

            // =====================================
            // VERIFICA DUPLICADO
            // =====================================

            const existe =
              eventosSalvos.some(
                (evento) => {

                  return (
                    evento.start ===
                    dataSelecionada
                  );

                }
              );

            // =====================================
            // JÁ OCUPADO
            // =====================================

            if(existe){

              alert(
                "Esse horário já está ocupado."
              );

              return;
            }

            // =====================================
            // NOVO EVENTO
            // =====================================

            const novoEvento = {

              title:
                "Horário Ocupado",

              start:
                dataSelecionada,

              end:
                dataSelecionada,

              color:"#d4af37"

            };

            // =====================================
            // ADICIONA
            // =====================================

            calendar.addEvent(
              novoEvento
            );

            // =====================================
            // SALVA
            // =====================================

            eventosSalvos.push(
              novoEvento
            );

            localStorage.setItem(

              "agendamentos",

              JSON.stringify(
                eventosSalvos
              )

            );

            // =====================================
            // SUCESSO
            // =====================================

            alert(
              "Horário agendado com sucesso!"
            );

          }

        }
      );

    // =====================================
    // RENDERIZA
    // =====================================

    calendar.render();

  }
);