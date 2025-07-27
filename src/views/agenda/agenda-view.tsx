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

export function AgendaView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [dataAtual, setDataAtual] = useState(moment().format("YYYY-MM-DD"));
  const [agenda, setAgenda] = useState<IAgendaPescaria[]>([]);
  const [agendaSelecionada, setAgendaSelecionada] = useState<IAgendaPescaria>();
  moment.locale("pt-br");
  const localizer = momentLocalizer(moment);
  const { agendaDoMes, obterPorId } = useAgendaApi();

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
    setAgendaSelecionada(undefined);
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
      setAgenda(response);
    }
  }

  async function selecionarAgenda(agenda: IAgendaPescaria) {
    const response = await obterPorId.fetch(agenda.id);
    if (response) {
      setAgendaSelecionada(response);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {openModal || agendaSelecionada ? (
        <ModalAgendamento
          open={openModal || agendaSelecionada !== undefined}
          selectedDate={selectedDate}
          fechar={(agenda) => {
            setAgenda((prev) => [...prev, agenda]);
            fecharModal();
          }}
          confirmarEdicao={(agenda) => {
            setAgenda((prev) =>
              prev.map((item) => (item.id === agenda.id ? agenda : item))
            );
            fecharModal();
          }}
          close={fecharModal}
          agendaSelecionada={agendaSelecionada}
        />
      ) : (
        <></>
      )}
      <BoxApp display="flex" flexDirection="column" gap="10px">
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
        </BoxApp>
      </BoxApp>
      {agendaDoMes.loading ||
        (obterPorId.loading && (
          <LoadingApp comBox texto="Carregando agenda..." />
        ))}
      <DividerApp marginBotton="1rem" marginTop="1rem" />
      <div style={{ height: "600px" }}>
        <Calendar
          localizer={localizer}
          events={agenda.map((item) => {
            return {
              start: new Date(`${item.ano}-${item.mes}-${item.dia}`),
              end: new Date(`${item.ano}-${item.mes}-${item.dia}`),
              title: item.pescaria?.titulo || "Pescaria",
              status: item.status,
              agenda: item,
            };
          })}
          components={{
            event: CustomEvent,
          }}
          eventPropGetter={(event: any) => {
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
          onSelectEvent={async (event) => await selecionarAgenda(event.agenda)}
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
          onSelectSlot={(slotInfo) => {
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
