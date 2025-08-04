import { tipoStatusRequisicao, useApi } from "@/hooks/use-api";
import { galeriaDeTrofeusRotasApi } from "../rotas/galeria-de-trofeus-rotas-api";
import {
  IGaleriaDeTrofeu,
  IGaleriaDeTrofeuAdicionar,
} from "@/types/galeria-de-trofeu";

export function useGaleriaDeTrofeuApi() {
  const apiObter = useApi({
    method: "GET",
    url: galeriaDeTrofeusRotasApi.obter,
  });

  const apiAdicionar = useApi({
    method: "POST",
    url: galeriaDeTrofeusRotasApi.adicionar,
  });

  const apiExcluir = useApi({
    method: "DELETE",
    url: galeriaDeTrofeusRotasApi.excluir,
  });

  async function adicionar(
    body: IGaleriaDeTrofeuAdicionar[]
  ): Promise<IGaleriaDeTrofeu[] | undefined> {
    return await apiAdicionar.action({
      body,
      message: "Fotos adicionadas com sucesso!",
    });
  }

  async function obter(): Promise<IGaleriaDeTrofeu[] | undefined> {
    return await apiObter.action();
  }

  async function excluir(id: string): Promise<any> {
    await apiExcluir.action({
      urlParams: `?id=${id}`,
      message: "Foto excluída com sucesso!",
    });
  }

  return {
    obter: {
      fetch: obter,
      loading: apiObter.status === tipoStatusRequisicao.loading,
    },
    adicionar: {
      fetch: adicionar,
      loading: apiAdicionar.status === tipoStatusRequisicao.loading,
    },
    excluir: {
      fetch: excluir,
      loading: apiExcluir.status === tipoStatusRequisicao.loading,
    },
  };
}
