"use client";

import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";

export default function CadastroEfetuadoPage() {
  const { navigate } = useNavigateApp();
  const { backgroundColor, borderRadius, shadow, cores } = useThemeApp();
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
      <BoxApp
        width="100%"
        maxWidth="400px"
        borderRadius={borderRadius}
        boxShadow={shadow}
        backgroundColor={backgroundColor.card}
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <BoxApp textAlign="center" padding="1rem">
          <TextApp
            color={cores.primary.main}
            titulo="Cadastro realizado com sucesso! 🎉"
            fontSize="1.2rem"
            fontWeight={600}
          />
          <TextApp
            titulo="Obrigado por se cadastrar! Enviamos um e-mail de confirmação para seu e-mail.
Por favor, verifique sua caixa de entrada (ou a pasta de spam) e clique no link de confirmação para ativar sua conta."
          />
        </BoxApp>
        <ButtonApp
          title="Ir para login"
          onClick={() => navigate(rotasApp.login)}
        />
      </BoxApp>
    </BoxApp>
  );
}
