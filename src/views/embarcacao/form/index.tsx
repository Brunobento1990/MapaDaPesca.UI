"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useEmbarcacaoApi } from "@/api/use/use-embarcacao-api";
import { FormApp } from "@/component/form/form-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import GaleriaApp from "@/component/galeria/galeria-app";
import { InputApp } from "@/component/input/input-app";
import { InputFile } from "@/component/input/input-file";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { rotasApp } from "@/config/rotas-app";
import { useArquivo } from "@/hooks/use-arquivo";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IEmbarcacao, IGaleriaEmbarcacao } from "@/types/embarcacao";
import { IFormTypes } from "@/types/form";
import { removerItemDeArrayPorIndex } from "@/utils/remover-item-array";
import { useEffect } from "react";

export function EmbarcacaoForm(props: IFormTypes) {
  const readonly = props.action === "view";
  const { criarEmbarcacao, editarEmbarcacao, visualizarEmbarcacao } =
    useEmbarcacaoApi();
  const { resolveUploadImagem, recortarBase64 } = useArquivo();
  const { show } = useSnackbar();
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
      galeria: form.values.galeria?.map((item) => ({
        id: item.id && item.id.length > 0 ? item.id : undefined,
        url: recortarBase64(item.url).base64,
      })),
      fotosExcluidas:
        props.action !== "edit"
          ? undefined
          : form.values.fotosExcluidas?.filter((x) => x !== "" && x !== null),
    } as any;
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

  async function adicionarFotos(fotos: FileList) {
    if (!fotos || fotos.length === 0) {
      return;
    }

    const maxFotos = (form.values.galeria?.length || 0) + fotos.length;

    if (maxFotos > 10) {
      show("Você pode adicionar no máximo 10 fotos.", "error");
      return;
    }
    // eslint-disable-next-line prefer-const
    let novaGaleria: IGaleriaEmbarcacao[] = [];
    for (const foto of fotos) {
      const f = await resolveUploadImagem(foto);
      novaGaleria.push({ id: "", url: f.src });
    }
    form.setValue({
      galeria: [...(form.values.galeria || []), ...novaGaleria],
    });
  }

  function excluirFoto(index: number) {
    if (readonly) {
      return;
    }
    form.setValue({
      galeria: removerItemDeArrayPorIndex(index, form.values.galeria || []),
      fotosExcluidas:
        props.action === "edit"
          ? [
              ...(form.values.fotosExcluidas || []),
              form.values.galeria?.[index].id ?? "",
            ]
          : [],
    });
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
      <InputFile
        allowedTypes={["image/*"]}
        multiple
        onChange={adicionarFotos}
      />
      {form.values.galeria && (
        <GaleriaApp
          imagens={form.values.galeria ?? []}
          excluir={excluirFoto}
          readonly={readonly}
        />
      )}
    </FormApp>
  );
}
