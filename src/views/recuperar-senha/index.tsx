"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useGuiaDePescaApi } from "@/api/use/use-guia-de-pesca-api";
import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { DividerApp } from "@/component/divider/divider-app";
import { InputApp } from "@/component/input/input-app";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { IRecuperarSenha } from "@/types/recuperar-senha";

export function RecuperarSenhaView() {
  const { navigate, params } = useNavigateApp();
  const { show } = useSnackbar();
  const { recuperarSenha } = useGuiaDePescaApi();
  const { backgroundColor, borderRadius, shadow, cores } = useThemeApp();

  const form = useFormikAdapter<IRecuperarSenha>({
    initialValues: {
      tokenEsqueceuSenha: params.id || "",
      senha: "",
      reSenha: "",
    },
    validationSchema: new YupAdapter()
      .string("senha")
      .string("reSenha")
      .build(),
    onSubmit: handleRecuperarSenha,
  });

  async function handleRecuperarSenha() {
    const response = await recuperarSenha.fetch({
      tokenEsqueceuSenha:
        (form.values.tokenEsqueceuSenha || (params.id as string)) ?? "",
      senha: form.values.senha,
      reSenha: form.values.reSenha,
    });
    if (response) {
      show(response, "success");
      navigate(rotasApp.login);
    }
  }

  return (
    <BoxApp
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor={backgroundColor.default}
      padding="1rem"
    >
      <form
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: borderRadius,
          boxShadow: shadow,
          backgroundColor: backgroundColor.card,
          height: "100%",
          overflowY: "auto",
        }}
        onSubmit={form.onSubmit}
      >
        <BoxApp textAlign="center" padding="1rem">
          <TextApp
            color={cores.primary.main}
            titulo="Mapa da pesca"
            fontSize="1.2rem"
            fontWeight={600}
          />
          <TextApp titulo="Informe uma senha segura." />
        </BoxApp>
        <DividerApp />
        <BoxApp padding="1rem" display="flex" flexDirection="column" gap="1rem">
          <InputApp
            label="Senha"
            required
            id="senha"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("senha")}
            helperText={form.helperText("senha")}
            value={form.values.senha}
            isPassword
            fullWidth
          />
          <InputApp
            label="Confirme Senha"
            required
            id="reSenha"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("reSenha")}
            helperText={form.helperText("reSenha")}
            value={form.values.reSenha}
            isPassword
            fullWidth
          />
          <ButtonApp
            loading={recuperarSenha.loading}
            title="Recuperar Senha"
            type="submit"
            onClick={form.onSubmit}
          />
        </BoxApp>
      </form>
    </BoxApp>
  );
}
