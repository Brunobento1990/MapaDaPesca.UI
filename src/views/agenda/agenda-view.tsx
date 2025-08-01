"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import { Fragment, useEffect, useState } from "react";
import {
  IAgendaPescaria,
  StatusAgendaPescariaColor,
} from "@/types/agenda-pescaria";
import { useAgendaApi } from "@/api/use/use-agenda-api";
import { BoxApp } from "@/component/box/box-app";
import { TextApp } from "@/component/text/text-app";
import { DividerApp } from "@/component/divider/divider-app";
import { ModalAgendamento } from "./modal-agendamento";
import { LoadingApp } from "@/component/loading/loading-app";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { rotasApp } from "@/config/rotas-app";

const corDataBloqueada = "#ffa963";

export function AgendaView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [dataAtual, setDataAtual] = useState(moment().format("YYYY-MM-DD"));
  const [agenda, setAgenda] = useState<IAgendaPescaria[]>([]);
  moment.locale("pt-br");
  const localizer = momentLocalizer(moment);
  const { agendaDoMes } = useAgendaApi();
  const { show } = useSnackbar();
  const { navigate } = useNavigateApp();

  const messages = {
    allDay: "Dia inteiro",
    previous: "Anterior",
    next: "Próximo",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Não há eventos neste período.",
    showMore: (total: number) => `+ Ver mais (${total})`,
  };

  function fecharModal() {
    setOpenModal(false);
    setSelectedDate("");
  }

  function abrirModal(data: string) {
    setOpenModal(true);
    setSelectedDate(data);
  }

  async function init(data?: string) {
    const response = await agendaDoMes.fetch(
      moment(data ?? dataAtual).format("MM"),
      moment(data ?? dataAtual).format("YYYY")
    );
    if (response) {
      setAgenda([
        ...response.agenda,
        ...response.agendaBloqueada.map((item) => {
          return {
            ...item,
            dataDeAgendamento: item.data,
            bloqueada: true,
          } as any;
        }),
      ]);
    }
  }

  function selecionarAgenda(agenda: IAgendaPescaria) {
    if (!agenda) {
      return;
    }
    navigate(rotasApp.agendaVisualizar + agenda.id);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {openModal ? (
        <ModalAgendamento
          open={openModal}
          selectedDate={selectedDate}
          fechar={(agenda) => {
            setAgenda((prev) => [...prev, agenda]);
            fecharModal();
          }}
          close={fecharModal}
        />
      ) : (
        <></>
      )}
      <BoxApp display="flex" flexDirection="column" gap="10px" overflowy="auto">
        <TextApp titulo="Legenda status" />
        <BoxApp display="flex" gap="10px">
          <BoxApp display="flex" gap="10px">
            <BoxApp
              width="20px"
              height="20px"
              borderRadius="3px"
              backgroundColor={StatusAgendaPescariaColor[1]}
            >
              <></>
            </BoxApp>
            <TextApp titulo="Pendente" />
          </BoxApp>
          <BoxApp display="flex" gap="10px">
            <BoxApp
              width="20px"
              height="20px"
              borderRadius="3px"
              backgroundColor={StatusAgendaPescariaColor[2]}
            >
              <></>
            </BoxApp>
            <TextApp titulo="Confirmado" />
          </BoxApp>
          <BoxApp display="flex" gap="10px">
            <BoxApp
              width="20px"
              height="20px"
              borderRadius="3px"
              backgroundColor={StatusAgendaPescariaColor[3]}
            >
              <></>
            </BoxApp>
            <TextApp titulo="Cancelado" />
          </BoxApp>
          <BoxApp display="flex" gap="10px">
            <BoxApp
              width="20px"
              height="20px"
              borderRadius="3px"
              backgroundColor={StatusAgendaPescariaColor[4]}
            >
              <></>
            </BoxApp>
            <TextApp titulo="Concluído" />
          </BoxApp>
          <BoxApp display="flex" gap="10px">
            <BoxApp
              width="20px"
              height="20px"
              borderRadius="3px"
              backgroundColor={corDataBloqueada}
            >
              <></>
            </BoxApp>
            <TextApp titulo="Data Bloqueada" />
          </BoxApp>
        </BoxApp>
      </BoxApp>
      {agendaDoMes.loading && (
        <LoadingApp comBox texto="Carregando agenda..." />
      )}
      <DividerApp marginBotton="1rem" marginTop="1rem" />
      <div style={{ height: "600px" }}>
        <Calendar
          localizer={localizer}
          events={agenda.map((item: any) => {
            return {
              start: new Date(`${item.ano}-${item.mes}-${item.dia}T00:00:00`),
              end: new Date(`${item.ano}-${item.mes}-${item.dia}T00:00:00`),
              title: item.titulo ?? (item.pescaria?.titulo || "Pescaria"),
              status: item.status,
              agenda: item,
              bloqueada: item.bloqueada,
            };
          })}
          components={{
            event: CustomEvent,
          }}
          eventPropGetter={(event: any) => {
            if (event.bloqueada) {
              return {
                style: {
                  backgroundColor: corDataBloqueada,
                  color: "#888",
                  pointerEvents: "none",
                  cursor: "not-allowed",
                },
              };
            }

            const cor = StatusAgendaPescariaColor[event.status];

            return {
              style: {
                backgroundColor: cor,
                color: "white",
                borderRadius: "4px",
                border: "none",
                display: "block",
                padding: "2px 4px",
              },
            };
          }}
          onSelectEvent={async (event) => {
            if (event.bloqueada) {
              show("Data bloqueada", "error");
              return;
            }
            selecionarAgenda(event.agenda);
          }}
          onNavigate={async (date) => {
            await init(moment(date).format("YYYY-MM-DD"));
            setDataAtual(moment(date).format("YYYY-MM-DD"));
          }}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          step={60}
          selectable
          showMultiDayTimes
          onSelectSlot={(slotInfo: any) => {
            if (slotInfo.bloqueada) {
              show("Data bloqueada", "error");
              return;
            }
            const dataSplit = slotInfo.start.toLocaleDateString().split("/");
            const dia = parseInt(dataSplit[0].toString(), 10);
            const mes = parseInt(dataSplit[1].toString(), 10);
            const bloqueada = agenda.some(
              (x: any) => x.dia === dia && x.mes === mes && x.bloqueada
            );

            if (bloqueada) {
              show("Data bloqueada", "error");
              return;
            }
            abrirModal(slotInfo.start.toLocaleDateString());
          }}
        />
      </div>
    </Fragment>
  );
}

function CustomEvent(props: any) {
  return (
    <BoxApp>
      <TextApp titulo={props.event.title} color="white" />
    </BoxApp>
  );
}
