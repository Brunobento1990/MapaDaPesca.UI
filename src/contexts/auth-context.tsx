"use client";

import { keysLocalStorage } from "@/config/keys-local-storage";
import { rotasApp } from "@/config/rotas-app";
import { useLocalStorage } from "@/hooks/use-local-storage-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IGuiaDePesca } from "@/types/guia-de-pesca";
import { createContext, ReactNode, useEffect } from "react";

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({});

export function AuthProvider(props: IAuthProvider) {
  const { getItem } = useLocalStorage();
  const { navigate } = useNavigateApp();

  function init() {
    const jwt = getItem<IGuiaDePesca>(keysLocalStorage.jwt);
    if (!jwt) {
      navigate(rotasApp.login);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{}}>
      {props.children}
    </AuthContext.Provider>
  );
}
