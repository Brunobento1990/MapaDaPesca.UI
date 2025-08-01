import { tipoStatusRequisicao, useApi } from "@/hooks/use-api";
import { faturaAgendaRotasApi } from "../rotas/fatura-agenda-rotas-api";
import {
  IFaturaAgendaPescaria,
  IPagarFatura,
} from "@/types/fatura-agenda-pescaria";

export function useFaturaAgendaApi() {
  const apiObterFaturaDoAgendamento = useApi({
    method: "GET",
    url: faturaAgendaRotasApi.obterFaturaDaAgenda,
    naoRenderizarErro: true,
  });

  const apiGerarFaturaDoAgendamento = useApi({
    method: "POST",
    url: faturaAgendaRotasApi.gerarFaturaDaAgenda,
  });

  const apiPagarFaturaDoAgendamento = useApi({
    method: "POST",
    url: faturaAgendaRotasApi.pagarFaturaDaAgenda,
  });

  async function obterFaturaDaAgenda(
    agendaPescariaId: string
  ): Promise<IFaturaAgendaPescaria | undefined> {
    return await apiObterFaturaDoAgendamento.action({
      urlParams: `?agendaPescariaId=${agendaPescariaId}`,
    });
  }

  async function gerarFaturaDaAgenda(
    body: Partial<IFaturaAgendaPescaria>
  ): Promise<IFaturaAgendaPescaria | undefined> {
    return await apiGerarFaturaDoAgendamento.action({
      body,
    });
  }

  async function pagarFaturaDaAgenda(
    body: IPagarFatura
  ): Promise<IFaturaAgendaPescaria | undefined> {
    return await apiPagarFaturaDoAgendamento.action({
      body,
    });
  }

  return {
    obterFaturaDaAgenda: {
      fetch: obterFaturaDaAgenda,
      loading:
        apiObterFaturaDoAgendamento.status == tipoStatusRequisicao.loading,
    },
    gerarFaturaDaAgenda: {
      fetch: gerarFaturaDaAgenda,
      loading:
        apiGerarFaturaDoAgendamento.status == tipoStatusRequisicao.loading,
    },
    pagarFaturaDaAgenda: {
      fetch: pagarFaturaDaAgenda,
      loading:
        apiPagarFaturaDoAgendamento.status == tipoStatusRequisicao.loading,
    },
  };
}
