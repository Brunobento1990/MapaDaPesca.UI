"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { embarcacaoRotasApi } from "@/api/rotas/embarcacao-rotas-api";
import { usePescariaApi } from "@/api/use/use-pescaria-api";
import { DropDownAutoFetchApp } from "@/component/dropdown/drop-down-auto-fetch-app";
import { FormApp } from "@/component/form/form-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { CheckBoxApp } from "@/component/input/check-box-app";
import { InputApp, MaskType } from "@/component/input/input-app";
import { MapaApp } from "@/component/mapa/mapa-app";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IFormTypes } from "@/types/form";
import { IPescaria } from "@/types/pescaria";
import { cleanFormatMoney } from "@/utils/format-money";
import { useEffect } from "react";

export function PescariaForma(props: IFormTypes) {
  const readonly = props.action === "view";
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
    };
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
      <FormRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Título"
            maxLength={100}
            required
            value={form.values.titulo}
            fullWidth
            error={form.error("titulo")}
            helperText={form.helperText("titulo")}
            id="titulo"
            onChange={form.onChange}
            onBlur={form.onBlur}
            autoFocus
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            onBlur={form.onBlur}
            label="Descrição"
            maxLength={255}
            required
            value={form.values.descricao}
            fullWidth
            error={form.error("descricao")}
            helperText={form.helperText("descricao")}
            id="descricao"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Local"
            maxLength={100}
            required
            value={form.values.local}
            fullWidth
            error={form.error("local")}
            helperText={form.helperText("local")}
            id="local"
            onChange={form.onChange}
            onBlur={form.onBlur}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Valor"
            maxLength={255}
            required
            value={form.values.valor}
            fullWidth
            error={form.error("valor")}
            helperText={form.helperText("valor")}
            id="valor"
            mask={MaskType.MONEY}
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="N° Pescadores"
            maxLength={255}
            value={form.values.quantidadePescador}
            fullWidth
            id="quantidadePescador"
            type="number"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Hora inicial"
            value={form.values.horaInicial}
            fullWidth
            id="horaInicial"
            type="number"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Hora final"
            value={form.values.horaFinal}
            fullWidth
            id="horaFinal"
            type="number"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Qtd agendamentos no dia"
            value={form.values.quantidadeMaximaDeAgendamentosNoDia}
            fullWidth
            id="quantidadeMaximaDeAgendamentosNoDia"
            type="number"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <DropDownAutoFetchApp
            retornarObjetoCompleto
            id="embarcacaoId"
            keyLabel={"nome"}
            label="Embarcação"
            url={embarcacaoRotasApi.paginacao}
            value={form.values.embarcacao}
            onChange={(_, value) => {
              form.setValue({
                embarcacao: value,
                embarcacaoId: value?.id,
              });
            }}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. segunda-feira"
            value={form.values.bloquearSegundaFeira}
            id="bloquearSegundaFeira"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. terça-feira"
            value={form.values.bloquearTercaFeira}
            id="bloquearTercaFeira"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. quarta-feira"
            value={form.values.bloquearQuartaFeira}
            id="bloquearQuartaFeira"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. quinta-feira"
            value={form.values.bloquearQuintaFeira}
            id="bloquearQuintaFeira"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. sexta-feira"
            value={form.values.bloquearSextaFeira}
            id="bloquearSextaFeira"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. sábado"
            value={form.values.bloquearSabado}
            id="bloquearSabado"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <CheckBoxApp
            label="Bloquear ag. domingo"
            value={form.values.bloquearDomingo}
            id="bloquearDomingo"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
      <TextApp
        fontWeight={600}
        titulo="O ponto marcado será usado para indicar a área onde você atua, ajudando pescadores a encontrar e contratar seu serviço de guia de pesca com mais facilidade."
      />
      <MapaApp
        lat={form.values.latitude}
        lng={form.values.longitude}
        onClick={(lat, lng) => {
          form.setValue({
            latitude: lat,
            longitude: lng,
          });
        }}
      />
    </FormApp>
  );
}
