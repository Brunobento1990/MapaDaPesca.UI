import { useApi } from "@/hooks/use-api";
import { embarcacaoRotasApi } from "../rotas/embarcacao-rotas-api";
import { IEmbarcacao } from "@/types/embarcacao";

export function useEmbarcacaoApi() {
  const apiCriar = useApi({
    method: "POST",
    url: embarcacaoRotasApi.criar,
  });

  const apiEditar = useApi({
    method: "PUT",
    url: embarcacaoRotasApi.editar,
  });

  const apiVisualizar = useApi({
    method: "GET",
    url: embarcacaoRotasApi.obterPorId,
  });

  async function criarEmbarcacao(
    body: Partial<IEmbarcacao>
  ): Promise<IEmbarcacao | undefined> {
    return await apiCriar.action({ body });
  }

  async function editarEmbarcacao(
    body: Partial<IEmbarcacao>
  ): Promise<IEmbarcacao | undefined> {
    return await apiEditar.action({ body });
  }

  async function visualizarEmbarcacao(
    id: string
  ): Promise<IEmbarcacao | undefined> {
    return await apiVisualizar.action({ urlParams: `?id=${id}` });
  }

  return {
    criarEmbarcacao: {
      fetch: criarEmbarcacao,
      loading: apiCriar.status === "loading",
    },
    editarEmbarcacao: {
      fetch: editarEmbarcacao,
      loading: apiEditar.status === "loading",
    },
    visualizarEmbarcacao: {
      fetch: visualizarEmbarcacao,
      loading: apiVisualizar.status === "loading",
    },
  };
}
