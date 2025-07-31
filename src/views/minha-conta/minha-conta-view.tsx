"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { useGuiaDePescaApi } from "@/api/use/use-guia-de-pesca-api";
import { BoxApp } from "@/component/box/box-app";
import { FormApp } from "@/component/form/form-app";
import { IconApp } from "@/component/icon/icon-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { IGuiaDePesca } from "@/types/guia-de-pesca";
import { Avatar, Button } from "@mui/material";
import { useEffect } from "react";
import { VisuallyHiddenInput } from "../cadastre-se";
import { useArquivo } from "@/hooks/use-arquivo";
import { FormRow } from "@/component/form/form-row-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { InputApp, MaskType } from "@/component/input/input-app";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useContextGuiaDePesca } from "@/contexts/guia-pe-pesca-context";

export function MinhaContaView() {
  const { minhaConta, editarMinhaConta } = useGuiaDePescaApi();
  const { resolveUploadImagem, recortarBase64 } = useArquivo();
  const { atualizarGuiaDePesca } = useContextGuiaDePesca();
  const form = useFormikAdapter<IGuiaDePesca>({
    validationSchema: new YupAdapter()
      .object(
        "pessoa",
        new YupAdapter()
          .string("nome")
          .string("cpf")
          .string("telefone")
          .email("email")
          .build()
      )
      .build(),
    onSubmit: submit,
  });

  async function init() {
    const response = await minhaConta.fetch();
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    const response = await editarMinhaConta.fetch({
      urlFoto: form.values.pessoa?.urlFoto?.startsWith("http")
        ? form.values.pessoa?.urlFoto
        : recortarBase64(form.values.pessoa?.urlFoto ?? "").base64,
      email: form.values.pessoa?.email,
      nome: form.values.pessoa?.nome,
      telefone: form.values.pessoa?.telefone,
    });
    if (response) {
      atualizarGuiaDePesca(response);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormApp
      titulo="Minha Conta"
      loading={minhaConta.loading || editarMinhaConta.loading}
      submit={form.onSubmit}
    >
      <BoxApp
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Avatar
          sx={{ width: 200, height: 200 }}
          src={form.values.pessoa?.urlFoto}
          alt={"foto usuário"}
        />
        <BoxApp>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<IconApp icon={listaDeIcones.foto} />}
          >
            Sua foto
            <VisuallyHiddenInput
              type="file"
              onChange={async (event) => {
                if (!event.target.files || event.target.files.length === 0)
                  return;
                const file = event.target.files[0];
                const result = await resolveUploadImagem(file);
                form.setValue({
                  pessoa: {
                    ...form.values.pessoa,
                    urlFoto: result.src,
                  },
                });
              }}
              accept="image/*"
            />
          </Button>
        </BoxApp>
      </BoxApp>
      <FormRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="CPF"
            required
            id="pessoa.cpf"
            onChange={form.onChange}
            onBlur={form.onBlur}
            readonly
            error={form.errorObject("pessoa", "cpf")}
            helperText={form.helperTextObj("pessoa", "cpf")}
            value={form.values.pessoa?.cpf}
            maxLength={255}
            fullWidth
            mask={MaskType.CPF}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Nome"
            required
            id="pessoa.nome"
            onChange={form.onChange}
            onBlur={form.onBlur}
            autoFocus
            error={form.errorObject("pessoa", "nome")}
            helperText={form.helperTextObj("pessoa", "nome")}
            value={form.values.pessoa?.nome}
            maxLength={255}
            fullWidth
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Telefone"
            required
            id="pessoa.telefone"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.errorObject("pessoa", "telefone")}
            helperText={form.helperTextObj("pessoa", "telefone")}
            value={form.values.pessoa?.telefone}
            maxLength={255}
            fullWidth
            mask={MaskType.TELEFONE}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Email"
            required
            id="pessoa.email"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.errorObject("pessoa", "email")}
            helperText={form.helperTextObj("pessoa", "email")}
            value={form.values.pessoa?.email}
            maxLength={255}
            fullWidth
            type="email"
          />
        </FormItemRow>
      </FormRow>
    </FormApp>
  );
}
