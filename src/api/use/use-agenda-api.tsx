import { useApi } from "@/hooks/use-api";
import { agendaRotasApi } from "../rotas/agenda-rotas-api";
import { IAgendaPescaria, IAgendarPescaria } from "@/types/agenda-pescaria";

export function useAgendaApi() {
  const apiAgendar = useApi({
    url: agendaRotasApi.agendar,
    method: "POST",
  });

  const apiEditarPescaria = useApi({
    url: agendaRotasApi.editar,
    method: "PUT",
  });

  const apiAgendaDoMes = useApi({
    url: agendaRotasApi.agendaDoMes,
    method: "GET",
  });

  const apiObterAgenda = useApi({
    url: agendaRotasApi.obterPorId,
    method: "GET",
  });

  async function agendarPescaria(
    body: Partial<IAgendarPescaria>
  ): Promise<IAgendaPescaria | undefined> {
    return apiAgendar.action({
      body,
      message: "Pescaria agendada com sucesso!",
    });
  }

  async function editarAgendaPescaria(
    body: Partial<IAgendarPescaria>
  ): Promise<IAgendaPescaria | undefined> {
    return apiEditarPescaria.action({
      body,
      message: "Agenda editada com sucesso!",
    });
  }

  async function obterPorId(id: string): Promise<IAgendaPescaria | undefined> {
    return apiObterAgenda.action({
      urlParams: `?id=${id}`,
    });
  }

  async function agendaDoMes(
    mes: string,
    ano: string
  ): Promise<IAgendaPescaria[] | undefined> {
    return apiAgendaDoMes.action({
      urlParams: `?mes=${mes}&ano=${ano}`,
    });
  }

  return {
    agendarPescaria: {
      fetch: agendarPescaria,
      loading: apiAgendar.status === "loading",
    },
    agendaDoMes: {
      fetch: agendaDoMes,
      loading: apiAgendaDoMes.status === "loading",
    },
    obterPorId: {
      fetch: obterPorId,
      loading: apiObterAgenda.status === "loading",
    },
    editarPescaria: {
      fetch: editarAgendaPescaria,
      loading: apiEditarPescaria.status === "loading",
    },
  };
}
