// =====================================
// QUANDO SITE CARREGA
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // =====================================
    // CALENDÁRIO
    // =====================================

    const calendarEl =
      document.getElementById(
        "calendar"
      );

    // =====================================
    // FULLCALENDAR
    // =====================================

    const calendar =
      new FullCalendar.Calendar(
        calendarEl,
        {

          // =====================================
          // VISUAL INICIAL
          // =====================================

          initialView:
            "dayGridMonth",

          // =====================================
          // IDIOMA
          // =====================================

          locale:"pt-br",

          // =====================================
          // ALTURA
          // =====================================

          height:"auto",

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
          // HORÁRIOS
          // =====================================

          slotMinTime:"08:00:00",

          slotMaxTime:"20:00:00",

          // =====================================
          // EVENTOS EXEMPLO
          // =====================================

          events:[

            {

              title:
                "Corte de Cabelo",

              start:
                "2026-05-28T10:00:00",

              end:
                "2026-05-28T11:00:00"

            },

            {

              title:
                "Barba Terapia",

              start:
                "2026-05-29T14:00:00",

              end:
                "2026-05-29T15:00:00"

            }

          ],

          // =====================================
          // CLIQUE NO DIA
          // =====================================

          dateClick:(info) => {

            // =====================================
            // LOGIN
            // =====================================

            const usuario =
              localStorage.getItem(
                "usuarioLogado"
              );

            if(!usuario){

              alert(
                "Faça login para agendar."
              );

              return;
            }

            // =====================================
            // NOME SERVIÇO
            // =====================================

            const servico =
              prompt(
                "Digite o serviço:"
              );

            // CANCELADO
            if(!servico){

              return;
            }

            // =====================================
            // NOVO EVENTO
            // =====================================

            calendar.addEvent({

              title:servico,

              start:info.dateStr

            });

            // =====================================
            // SALVO
            // =====================================

            alert(
              "Agendamento realizado!"
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