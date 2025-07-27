"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useGuiaDePescaApi } from "@/api/use/use-guia-de-pesca-api";
import { useLoginApi } from "@/api/use/use-login-api";
import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { ButtonLoginGoogle } from "@/component/button/button-login-google";
import { InputApp, MaskType } from "@/component/input/input-app";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { useContextGuiaDePesca } from "@/contexts/guia-pe-pesca-context";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { ILoginRequest } from "@/types/login-request";

export function LoginView() {
  const { borderRadius, shadow, backgroundColor } = useThemeApp();
  const { login } = useLoginApi();
  const { show } = useSnackbar();
  const { esqueceSenha } = useGuiaDePescaApi();
  const { navigate } = useNavigateApp();
  const { logar } = useContextGuiaDePesca();
  const form = useFormikAdapter<ILoginRequest>({
    initialValues: {
      cpf: "",
      senha: "",
    },
    onSubmit: submit,
    validationSchema: new YupAdapter().string("cpf").string("senha").build(),
  });

  async function submit() {
    const response = await login.fetch(form.values);
    if (response) {
      logar(response);
    }
  }

  async function esqueceSenhaHandler() {
    if (!form.values.cpf) {
      show("Por favor, informe o CPF", "error");
      return;
    }
    const response = await esqueceSenha.fetch(form.values.cpf);
    if (response) {
      show(response, "success");
    }
  }

  return (
    <BoxApp
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="2rem"
      backgroundColor={backgroundColor.default}
    >
      <BoxApp
        borderRadius={borderRadius}
        boxShadow={shadow}
        width="100%"
        height="100%"
        maxWidth="450px"
      >
        <form
          style={{
            width: "100%",
            height: "100%",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "space-around",
          }}
          onSubmit={form.onSubmit}
        >
          <BoxApp textAlign="center">
            <TextApp titulo="Login" fontSize="1.5rem" fontWeight={600} />
            <TextApp titulo="Efetue o login com suas credenciais" />
          </BoxApp>
          <BoxApp display="flex" flexDirection="column" gap="1rem">
            <InputApp
              fullWidth
              required
              mask={MaskType.CPF}
              value={form.values.cpf}
              label="CPF"
              id="cpf"
              autoFocus
              onChange={form.onChange}
              error={form.error("cpf")}
              helperText={form.helperText("cpf")}
            />
            <InputApp
              fullWidth
              required
              isPassword
              value={form.values.senha}
              label="Senha"
              id="senha"
              onChange={form.onChange}
              error={form.error("senha")}
              helperText={form.helperText("senha")}
            />
          </BoxApp>
          <BoxApp
            display="flex"
            flexDirection="column"
            gap="1rem"
            alignItems="center"
            justifyContent="center"
          >
            <ButtonApp
              type="submit"
              onClick={form.onSubmit}
              fullWidth
              title="Entrar"
              loading={login.loading}
            />
            <ButtonLoginGoogle />
            <ButtonApp
              onClick={esqueceSenhaHandler}
              loading={esqueceSenha.loading}
              fullWidth
              variant="text"
              title="Esqueceu sua senha?"
            />
          </BoxApp>
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <TextApp titulo="Ainda não tem conta?" />
            <ButtonApp
              variant="text"
              title="Criar conta"
              onClick={() => navigate(rotasApp.cadastreSe)}
            />
          </BoxApp>
        </form>
      </BoxApp>
    </BoxApp>
  );
}
