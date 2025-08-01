"use client";

import axios, { GenericAbortSignal } from "axios";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { useLocalStorage } from "./use-local-storage-app";
import { keysLocalStorage } from "@/config/keys-local-storage";
import { useContextGuiaDePesca } from "@/contexts/guia-pe-pesca-context";
import { IErrorResponse } from "@/types/erro-response";

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
export type StatusRequisicao = "loading" | "success" | "error";

export const tipoStatusRequisicao = {
  loading: "loading",
  success: "success",
  error: "error",
};

interface propsUseApi {
  method: TypeMethod;
  url: string;
  naoRenderizarErro?: boolean;
  naoRenderizarResposta?: boolean;
  header?: any;
  statusInicial?: StatusRequisicao;
}

interface propsFecth {
  body?: any;
  urlParams?: string;
  message?: string;
  signal?: GenericAbortSignal;
}

function getMessage(method: TypeMethod): string {
  switch (method) {
    case "DELETE":
      return "Registro excluido com sucesso!";
    case "PUT":
      return "Registro editado com sucesso!";
    default:
      return "Registro criado com sucesso!";
  }
}

export function useApi(props: propsUseApi) {
  const [status, setStatus] = useState<StatusRequisicao | undefined>(
    props.statusInicial
  );
  const [error, setError] = useState<any>();
  const { sair } = useContextGuiaDePesca();
  const URL_API = process.env.NEXT_PUBLIC_URL_API;
  const { show } = useSnackbar();
  const { getItem, setItem } = useLocalStorage();
  const abortControllerRef = useRef<any>(null);

  const api = axios.create({
    baseURL: URL_API,
  });

  useEffect(() => {
    return () => {
      setError(undefined);
      setStatus(undefined);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  function erro(error: any) {
    const erros: IErrorResponse | undefined = error.response?.data;
    if (error.response?.status === 401) {
      if (Array.isArray(erros?.erros)) {
        show(
          erros.erros.map((x) => x.erro),
          "error"
        );
      } else {
        show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
      }
      sair();
      return;
    }
    if (Array.isArray(erros?.erros)) {
      show(
        erros.erros.map((x) => x.erro),
        "error"
      );
      return;
    }
    show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
  }

  async function action<T = unknown>(
    propsFecth?: propsFecth
  ): Promise<T | undefined> {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (!status || status !== tipoStatusRequisicao.loading) {
        setStatus("loading");
      }
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const jwt = getItem(keysLocalStorage.jwt);
      const refreshJwt = getItem(keysLocalStorage.refreshJwt);
      const meManterLogado = getItem(keysLocalStorage.lembrarCheckBox);
      const schemaJwt = getItem(keysLocalStorage.schemaJwt);
      const headers = {
        Authorization: `${schemaJwt ?? ""} ${jwt ?? ""}`,
        RefreshToken: `${refreshJwt ?? ""}`,
        MeManterLogado: `${meManterLogado ?? ""}`,
        ...(props.header ?? {}),
      };
      const response = await api.request({
        url: propsFecth?.urlParams
          ? `${props.url}${propsFecth?.urlParams}`
          : props.url,
        data: propsFecth?.body,
        method: props.method,
        headers,
        signal,
      });
      const message = propsFecth?.message ?? getMessage(props.method);
      if (message && !props.naoRenderizarResposta && props.method !== "GET") {
        show(message, "success");
      }
      const responseHeader = response.headers as any;
      if (responseHeader["novotoken"]) {
        setItem(keysLocalStorage.jwt, responseHeader["novotoken"]?.toString());
      }
      setStatus("success");
      return response?.data as T;
    } catch (err: any) {
      setError(err);
      setStatus("error");
      if (err?.code === "ERR_CANCELED") {
        return undefined;
      }
      if (!props.naoRenderizarErro) {
        erro(err);
      }
      return undefined;
    }
  }

  return {
    action,
    status,
    error,
  };
}
