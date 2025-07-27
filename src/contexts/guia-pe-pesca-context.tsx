"use client";

import { keysLocalStorage } from "@/config/keys-local-storage";
import { rotasApp } from "@/config/rotas-app";
import { useLocalStorage } from "@/hooks/use-local-storage-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IGuiaDePesca } from "@/types/guia-de-pesca";
import { ILoginResponse } from "@/types/login-response";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface IGuiaDePescaContext {
  guiaDePesca?: IGuiaDePesca;
  logar: (responseLogin: ILoginResponse) => void;
  sair: () => void;
}

interface IGuiaDePescaProvider {
  children: ReactNode;
}

export const GuiaDePescaContext = createContext({} as IGuiaDePescaContext);

export function GuiaDePescaProvider(props: IGuiaDePescaProvider) {
  const { getItem, removeItem, setItem } = useLocalStorage();
  const { navigate } = useNavigateApp();
  const [guiaDePesca, setGuiaDePesca] = useState<IGuiaDePesca | undefined>();

  function logar(responseLogin: ILoginResponse) {
    setItem(keysLocalStorage.jwt, responseLogin.token);
    setItem(keysLocalStorage.schemaJwt, responseLogin.tokenSchema);
    setItem(keysLocalStorage.refreshJwt, responseLogin.refreshToken);
    setItem(keysLocalStorage.guiaDePesca, responseLogin.guiaDePesca, true);
    setGuiaDePesca(responseLogin.guiaDePesca);
    navigate(rotasApp.home);
  }

  function sair() {
    removeItem(keysLocalStorage.jwt);
    removeItem(keysLocalStorage.refreshJwt);
    removeItem(keysLocalStorage.schemaJwt);
    removeItem(keysLocalStorage.guiaDePesca);
    setGuiaDePesca(undefined);
    navigate(rotasApp.login);
  }

  function init() {
    const guiaDePescaLocalStorage = getItem<IGuiaDePesca>(
      keysLocalStorage.guiaDePesca,
      true
    );
    if (guiaDePescaLocalStorage) {
      setGuiaDePesca(guiaDePescaLocalStorage);
    }
  }

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GuiaDePescaContext.Provider
      value={{
        logar,
        guiaDePesca,
        sair,
      }}
    >
      {props.children}
    </GuiaDePescaContext.Provider>
  );
}

export const useContextGuiaDePesca = () => useContext(GuiaDePescaContext);