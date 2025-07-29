"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { usePescariaApi } from "@/api/use/use-pescaria-api";
import { CollapseApp } from "@/component/collapse/collapse-app";
import { FormApp } from "@/component/form/form-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useTab } from "@/hooks/use-tab";
import { IFormTypes } from "@/types/form";
import { IPescaria } from "@/types/pescaria";
import { cleanFormatMoney } from "@/utils/format-money";
import { useEffect } from "react";
import { TabGeralPescaria } from "./tab-geral-pescaria";
import { TabDataPescaria } from "./tab-data-pescaria";
import { TabMapaPescaria } from "./tab-mapa-pescaria";

export function PescariaForma(props: IFormTypes) {
  const readonly = props.action === "view";
  const { Component, value } = useTab();
  const { criarPescaria, editarPescaria, visualizarPescaria } =
    usePescariaApi();
  const { navigate, params } = useNavigateApp();
  const form = useFormikAdapter<IPescaria>({
    initialValues: {
      titulo: "",
      descricao: "",
      local: "",
      valor: 0,
    },
    validationSchema: new YupAdapter()
      .string("titulo")
      .string("descricao")
      .string("local")
      .string("valor")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const body = {
      ...form.values,
      valor: cleanFormatMoney(form.values.valor),
      datasBloqueadas: form.values.datasBloqueadas?.map((x) => x.data),
    } as any;
    const response =
      props.action === "create"
        ? await criarPescaria.fetch(body)
        : await editarPescaria.fetch(body);
    if (response) {
      navigate(rotasApp.pescaria.paginacao);
    }
  }

  async function init() {
    if (props.action === "create") {
      return;
    }

    const response = await visualizarPescaria.fetch(params.id as string);
    if (response) {
      form.setValue(response);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormApp
      urlVoltar={rotasApp.pescaria.paginacao}
      submit={form.onSubmit}
      readonly={readonly}
      loading={
        criarPescaria.loading ||
        editarPescaria.loading ||
        visualizarPescaria.loading
      }
      titulo="Pescaria"
    >
      <Component
        tabs={[{ titulo: "Geral" }, { titulo: "Datas" }, { titulo: "Mapa" }]}
      />
      <CollapseApp in={value === 0}>
        <TabGeralPescaria form={form} readonly={readonly} />
      </CollapseApp>
      <CollapseApp in={value === 1}>
        <TabDataPescaria form={form} readonly={readonly} />
      </CollapseApp>
      <CollapseApp in={value === 2}>
        <TabMapaPescaria form={form} readonly={readonly} />
      </CollapseApp>
    </FormApp>
  );
}
