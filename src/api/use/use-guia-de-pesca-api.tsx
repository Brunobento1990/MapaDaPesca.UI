import { tipoStatusRequisicao, useApi } from "@/hooks/use-api";
import { guiaDePescaRotasApi } from "../rotas/guia-de-pesca-rotas-api";
import { IGuiaDePescaCreate } from "@/types/guia-de-pesca-create";
import { IRecuperarSenha } from "@/types/recuperar-senha";
import { IGuiaDePesca } from "@/types/guia-de-pesca";

export function useGuiaDePescaApi() {
  const apiCadastrar = useApi({
    method: "POST",
    url: guiaDePescaRotasApi.cadastrar,
    naoRenderizarResposta: true,
  });

  const apiConfirmarConta = useApi({
    method: "PUT",
    url: guiaDePescaRotasApi.confirmarConta,
    statusInicial: tipoStatusRequisicao.loading as any,
  });

  const apiMinhaConta = useApi({
    method: "GET",
    url: guiaDePescaRotasApi.minhaConta,
    statusInicial: tipoStatusRequisicao.loading as any,
  });

  const apiEsqueceSenha = useApi({
    method: "PUT",
    url: guiaDePescaRotasApi.esqueceSenha,
    naoRenderizarResposta: true,
  });

  const apiEditarMinhaConta = useApi({
    method: "PUT",
    url: guiaDePescaRotasApi.editarMinhaConta,
  });

  const apiRecuperarSenha = useApi({
    method: "PUT",
    url: guiaDePescaRotasApi.recuperarSenha,
    naoRenderizarResposta: true,
  });

  const cadastrar = async (body: IGuiaDePescaCreate) => {
    return apiCadastrar.action({
      body,
    });
  };

  const confirmarConta = async (token: string): Promise<string | undefined> => {
    return apiConfirmarConta.action({
      urlParams: `?token=${token}`,
      message: "Conta confirmada com sucesso!",
    });
  };

  const esqueceSenha = async (cpf: string): Promise<string | undefined> => {
    return apiEsqueceSenha.action({
      body: { cpf },
    });
  };

  const recuperarSenha = async (
    body: IRecuperarSenha
  ): Promise<string | undefined> => {
    return apiRecuperarSenha.action({
      body,
    });
  };

  const minhaConta = async (): Promise<IGuiaDePesca | undefined> => {
    return apiMinhaConta.action();
  };

  const editarMinhaConta = async (
    body: Partial<IGuiaDePescaCreate>
  ): Promise<IGuiaDePesca | undefined> => {
    return apiEditarMinhaConta.action({
      body,
      message: "Dados atualizados com sucesso!",
    });
  };

  return {
    cadastrar: {
      fetch: cadastrar,
      loading: apiCadastrar.status === tipoStatusRequisicao.loading,
    },
    confirmarConta: {
      fetch: confirmarConta,
      loading: apiConfirmarConta.status === tipoStatusRequisicao.loading,
    },
    esqueceSenha: {
      fetch: esqueceSenha,
      loading: apiEsqueceSenha.status === tipoStatusRequisicao.loading,
    },
    recuperarSenha: {
      fetch: recuperarSenha,
      loading: apiRecuperarSenha.status === tipoStatusRequisicao.loading,
    },
    minhaConta: {
      fetch: minhaConta,
      loading: apiMinhaConta.status === tipoStatusRequisicao.loading,
    },
    editarMinhaConta: {
      fetch: editarMinhaConta,
      loading: apiEditarMinhaConta.status === tipoStatusRequisicao.loading,
    },
  };
}
