import { tipoStatusRequisicao, useApi } from "@/hooks/use-api";
import { homeRotasApi } from "../rotas/home-rotas-api";
import { IHome } from "@/types/home";

export function useHomeApi() {
  const api = useApi({
    method: "GET",
    url: homeRotasApi.home,
    statusInicial: tipoStatusRequisicao.loading,
  });

  async function obter(
    latitude: number,
    longitude: number
  ): Promise<IHome | undefined> {
    return await api.action({
      urlParams: `?latitude=${latitude}&longitude=${longitude}`,
    });
  }

  return {
    obter: {
      fetch: obter,
      loading: api.status === tipoStatusRequisicao.loading,
    },
  };
}
