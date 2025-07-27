import { useApi } from "@/hooks/use-api";
import { pescariaRotasApi } from "../rotas/pescaria-rotas-api";
import { IPescaria } from "@/types/pescaria";

export function usePescariaApi() {
  const apiCriar = useApi({
    method: "POST",
    url: pescariaRotasApi.adicionar,
  });

  const apiEditar = useApi({
    method: "PUT",
    url: pescariaRotasApi.editar,
  });

  const apiVisualizar = useApi({
    method: "GET",
    url: pescariaRotasApi.visualizar,
  });

  async function criarPescaria(
    body: Partial<IPescaria>
  ): Promise<IPescaria | undefined> {
    return await apiCriar.action({ body });
  }

  async function editarPescaria(
    body: Partial<IPescaria>
  ): Promise<IPescaria | undefined> {
    return await apiEditar.action({ body });
  }

  async function visualizarPescaria(
    id: string
  ): Promise<IPescaria | undefined> {
    return await apiVisualizar.action({ urlParams: `?id=${id}` });
  }

  return {
    criarPescaria: {
      fetch: criarPescaria,
      loading: apiCriar.status === "loading",
    },
    editarPescaria: {
      fetch: editarPescaria,
      loading: apiEditar.status === "loading",
    },
    visualizarPescaria: {
      fetch: visualizarPescaria,
      loading: apiVisualizar.status === "loading",
    },
  };
}
