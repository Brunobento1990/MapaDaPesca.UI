import { useApi } from "@/hooks/use-api";
import { loginRotasApi } from "../rotas/login-rotas-api";
import { ILoginResponse } from "@/types/login-response";
import { ILoginRequest } from "@/types/login-request";

export function useLoginApi() {
  const api = useApi({
    method: "POST",
    url: loginRotasApi.loginGuiaDePesca,
    naoRenderizarResposta: true,
  });

  const apiLoginComGoogle = useApi({
    method: "POST",
    url: loginRotasApi.loginComGoogle,
    naoRenderizarResposta: true,
  });

  async function login(
    body: ILoginRequest
  ): Promise<ILoginResponse | undefined> {
    return await api.action({ body });
  }

  async function loginComGoogle(
    token: string
  ): Promise<ILoginResponse | undefined> {
    return await apiLoginComGoogle.action({ body: { token } });
  }

  return {
    login: {
      fetch: login,
      loading: api.status === "loading",
    },
    loginComGoogle: {
      fetch: loginComGoogle,
      loading: apiLoginComGoogle.status === "loading",
    },
  };
}
