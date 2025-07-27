"use client";

import { useGuiaDePescaApi } from "@/api/use/use-guia-de-pesca-api";
import { BoxApp } from "@/component/box/box-app";
import { LoadingApp } from "@/component/loading/loading-app";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { useEffect, useState } from "react";

export default function ConfirmarContaView() {
  const { confirmarConta } = useGuiaDePescaApi();
  const { navigate, params } = useNavigateApp();
  const { borderRadius, shadow, backgroundColor } = useThemeApp();
  const [mensagem, setMensagem] = useState<string>(
    "Aguarde, estamos confirmando sua conta..."
  );

  const init = async () => {
    if (!params || !params.id) {
      return;
    }
    const response = await confirmarConta.fetch(params.id as string);
    if (response) {
      setMensagem(response);
      navigate(rotasApp.login);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoxApp
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor={backgroundColor.default}
      padding="1rem"
    >
      <BoxApp
        padding="1rem"
        backgroundColor={backgroundColor.card}
        borderRadius={borderRadius}
        boxShadow={shadow}
        height="100%"
        width="100%"
        maxWidth="500px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="1rem"
      >
        {confirmarConta.loading && <LoadingApp comBox />}
        <TextApp titulo={mensagem} />
      </BoxApp>
    </BoxApp>
  );
}
