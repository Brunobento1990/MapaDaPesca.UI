"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { pescariaRotasApi } from "@/api/rotas/pescaria-rotas-api";
import { useAgendaApi } from "@/api/use/use-agenda-api";
import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { DropDownApp } from "@/component/dropdown/drop-down-app";
import { DropDownAutoFetchApp } from "@/component/dropdown/drop-down-auto-fetch-app";
import { FormApp } from "@/component/form/form-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import GaleriaApp from "@/component/galeria/galeria-app";
import { InputApp } from "@/component/input/input-app";
import { InputFile } from "@/component/input/input-file";
import { rotasApp } from "@/config/rotas-app";
import { useArquivo } from "@/hooks/use-arquivo";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import {
  IAgendaPescaria,
  IGaleriaAgendamento,
  opcoesStatusAgendaPescaria,
} from "@/types/agenda-pescaria";
import { formatDate } from "@/utils/format-date";
import { removerItemDeArrayPorIndex } from "@/utils/remover-item-array";
import { useEffect, useState } from "react";
import { ModalReagendar } from "./modal-reagendar";

export function AgendaVisualizarView() {
  const [open, setOpen] = useState(false);
  const { obterPorId, editarPescaria } = useAgendaApi();
  const { resolveUploadImagem, recortarBase64 } = useArquivo();
  const { navigate, params } = useNavigateApp();
  const form = useFormikAdapter<IAgendaPescaria>({
    onSubmit: submit,
  });

  async function init() {
    const response = await obterPorId.fetch(params.id as string);
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    const response = await editarPescaria.fetch({
      ...form.values,
      galeria:
        form.values.galeria
          ?.filter((x) => !x.id)
          .map((item) => {
            return {
              id: undefined!,
              url: recortarBase64(item.url).base64,
            };
          }) ?? [],
      fotosExcluidas: form.values.fotosExcluidas?.filter((x) => x),
    });
    if (response) {
      navigate(rotasApp.agenda);
    }
  }

  async function upload(files: FileList) {
    // eslint-disable-next-line prefer-const
    let imagens: IGaleriaAgendamento[] = [];
    for (const file of Array.from(files)) {
      const resultado = await resolveUploadImagem(file);
      if (resultado) {
        imagens.push({
          id: "",
          url: resultado.src,
        });
      }
    }

    const novasImagens = [...(form.values.galeria || []), ...imagens];

    form.setValue({
      galeria: novasImagens,
    });
  }

  function excluirImagem(index: number) {
    form.setValue({
      galeria: removerItemDeArrayPorIndex(index, form.values.galeria || []),
      fotosExcluidas: [
        ...(form.values.fotosExcluidas || []),
        form.values.galeria?.[index].id ?? "",
      ],
    });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormApp
      titulo={`Agenda do dia ${
        formatDate(form.values.dataDeAgendamento) ?? ""
      }`}
      submit={form.onSubmit}
      urlVoltar={rotasApp.agenda}
      footer={{
        children: (
          <BoxApp>
            <ButtonApp
              onClick={() => setOpen(true)}
              variant="outlined"
              title="Reagendar"
            />
          </BoxApp>
        ),
      }}
    >
      <ModalReagendar
        id={form.values.id}
        open={open}
        onClose={(agenda) => {
          setOpen(false);
          if (agenda) {
            form.setValue(agenda);
          }
        }}
      />
      <FormRow>
        <FormItemRow sm={6} xs={12}>
          <DropDownAutoFetchApp
            retornarObjetoCompleto
            id="pescariaId"
            keyLabel={"titulo"}
            label="Pescaria"
            url={pescariaRotasApi.paginacao}
            value={form.values.pescaria}
            autoFocus
            required
            onChange={(_, value) => {
              form.setValue({
                pescaria: value,
                pescariaId: value?.id,
              });
            }}
            error={form.error("pescariaId")}
            helperText={form.helperText("pescariaId")}
          />
        </FormItemRow>
        <FormItemRow sm={3} xs={12}>
          <InputApp
            label="Qtd de pescador"
            value={
              form.values.quantidadeDePescador ??
              form.values.pescaria?.quantidadePescador
            }
            id="quantidadeDePescador"
            type="number"
            onChange={form.onChange}
            fullWidth
          />
        </FormItemRow>
        <FormItemRow sm={3} xs={12}>
          <DropDownApp
            values={opcoesStatusAgendaPescaria}
            id="status"
            keyLabel="descricao"
            label="Status"
            onChange={form.onChange}
            value={opcoesStatusAgendaPescaria.find(
              (x) => x.id === form.values.status
            )}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow sm={3} xs={12}>
          <InputApp
            label="Hora inicial"
            value={form.values.horaInicial ?? form.values.pescaria?.horaInicial}
            id="horaInicial"
            type="number"
            onChange={form.onChange}
            fullWidth
          />
        </FormItemRow>
        <FormItemRow sm={3} xs={12}>
          <InputApp
            label="Hora final"
            value={form.values.horaFinal ?? form.values.pescaria?.horaFinal}
            id="horaFinal"
            type="number"
            onChange={form.onChange}
            fullWidth
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow sm={12} xs={12}>
          <InputApp
            label="Observação"
            value={form.values.observacao}
            id="observacao"
            maxLength={255}
            onChange={form.onChange}
            fullWidth
          />
        </FormItemRow>
      </FormRow>
      <InputFile
        multiple
        allowedTypes={["image/*"]}
        maxSizeInMB={5}
        onChange={upload}
      />
      <GaleriaApp imagens={form.values.galeria ?? []} excluir={excluirImagem} />
    </FormApp>
  );
}
