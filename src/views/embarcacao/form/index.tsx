"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useEmbarcacaoApi } from "@/api/use/use-embarcacao-api";
import { FormApp } from "@/component/form/form-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { InputApp } from "@/component/input/input-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IEmbarcacao } from "@/types/embarcacao";
import { IFormTypes } from "@/types/form";
import { useEffect } from "react";

export function EmbarcacaoForm(props: IFormTypes) {
  const readonly = props.action === "view";
  const { criarEmbarcacao, editarEmbarcacao, visualizarEmbarcacao } =
    useEmbarcacaoApi();
  const { navigate, params } = useNavigateApp();
  const form = useFormikAdapter<IEmbarcacao>({
    initialValues: {
      nome: "",
    },
    validationSchema: new YupAdapter().string("nome").build(),
    onSubmit: submit,
  });

  async function submit() {
    const body = {
      ...form.values,
    };
    const response =
      props.action === "create"
        ? await criarEmbarcacao.fetch(body)
        : await editarEmbarcacao.fetch(body);
    if (response) {
      navigate(rotasApp.embarcacao.paginacao);
    }
  }

  async function init() {
    if (props.action === "create") {
      return;
    }

    const response = await visualizarEmbarcacao.fetch(params.id as string);
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
      urlVoltar={rotasApp.embarcacao.paginacao}
      submit={form.onSubmit}
      readonly={readonly}
      loading={
        criarEmbarcacao.loading ||
        editarEmbarcacao.loading ||
        visualizarEmbarcacao.loading
      }
      titulo="Embarcação"
    >
      <FormRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Nome"
            maxLength={255}
            required
            value={form.values.nome}
            fullWidth
            error={form.error("nome")}
            helperText={form.helperText("nome")}
            id="nome"
            onChange={form.onChange}
            onBlur={form.onBlur}
            autoFocus
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Motor"
            maxLength={255}
            value={form.values.motor}
            fullWidth
            id="motor"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Motor Elétrico"
            maxLength={255}
            value={form.values.motorEletrico}
            fullWidth
            id="motorEletrico"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Largura"
            maxLength={255}
            value={form.values.largura}
            fullWidth
            id="largura"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Comprimento"
            maxLength={255}
            value={form.values.comprimento}
            fullWidth
            id="comprimento"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            onBlur={form.onBlur}
            label="Qtd. de Lugar"
            type="number"
            value={form.values.quantidadeDeLugar}
            fullWidth
            id="quantidadeDeLugar"
            onChange={form.onChange}
            readonly={readonly}
          />
        </FormItemRow>
      </FormRow>
    </FormApp>
  );
}
