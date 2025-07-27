import { useApi } from "@/hooks/use-api";
import { guiaDePescaRotasApi } from "../rotas/guia-de-pesca-rotas-api";
import { IGuiaDePescaCreate } from "@/types/guia-de-pesca-create";
import { IRecuperarSenha } from "@/types/recuperar-senha";

export function useGuiaDePescaApi() {
  const apiCadastrar = useApi({
    method: "POST",
    url: guiaDePescaRotasApi.cadastrar,
    naoRenderizarResposta: true,
  });

  const apiConfirmarConta = useApi({
    method: "PUT",
    url: guiaDePescaRotasApi.confirmarConta,
    statusInicial: "loading",
  });

  const apiEsqueceSenha = useApi({
    method: "PUT",
    url: guiaDePescaRotasApi.esqueceSenha,
    naoRenderizarResposta: true,
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

  return {
    cadastrar: {
      fetch: cadastrar,
      loading: apiCadastrar.status === "loading",
    },
    confirmarConta: {
      fetch: confirmarConta,
      loading: apiConfirmarConta.status === "loading",
    },
    esqueceSenha: {
      fetch: esqueceSenha,
      loading: apiEsqueceSenha.status === "loading",
    },
    recuperarSenha: {
      fetch: recuperarSenha,
      loading: apiRecuperarSenha.status === "loading",
    },
  };
}
