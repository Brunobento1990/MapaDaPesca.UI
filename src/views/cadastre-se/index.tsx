"use client";

import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useGuiaDePescaApi } from "@/api/use/use-guia-de-pesca-api";
import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { DividerApp } from "@/component/divider/divider-app";
import { IconApp } from "@/component/icon/icon-app";
import { InputApp, MaskType } from "@/component/input/input-app";
import { TextApp } from "@/component/text/text-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { rotasApp } from "@/config/rotas-app";
import { useArquivo } from "@/hooks/use-arquivo";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { IGuiaDePescaCreate } from "@/types/guia-de-pesca-create";
import { Avatar, Button, styled } from "@mui/material";

export function CadastreSeView() {
  const { cadastrar } = useGuiaDePescaApi();
  const { navigate } = useNavigateApp();
  const { backgroundColor, borderRadius, shadow, cores } = useThemeApp();
  const { resolveUploadImagem, recortarBase64 } = useArquivo();
  const form = useFormikAdapter<IGuiaDePescaCreate>({
    initialValues: {
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      reSenha: "",
      telefone: "",
    },
    validationSchema: new YupAdapter()
      .string("nome")
      .string("cpf")
      .string("email")
      .string("senha")
      .string("reSenha")
      .string("telefone")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await cadastrar.fetch({
      ...form.values,
      urlFoto: form.values.urlFoto
        ? recortarBase64(form.values.urlFoto).base64
        : undefined,
    });
    if (response) {
      navigate(rotasApp.cadastroEfetuado);
    }
  }

  return (
    <BoxApp
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor={backgroundColor.default}
      padding="1rem"
    >
      <form
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: borderRadius,
          boxShadow: shadow,
          backgroundColor: backgroundColor.card,
          height: "100%",
          overflowY: "auto",
        }}
        onSubmit={form.onSubmit}
      >
        <BoxApp textAlign="center" padding="1rem">
          <TextApp
            color={cores.primary.main}
            titulo="Mapa da pesca"
            fontSize="1.2rem"
            fontWeight={600}
          />
          <TextApp titulo="Cadastre-se agora para começar a gerenciar suas saídas de pesca, clientes e reservas de forma prática e rápida." />
        </BoxApp>
        <DividerApp />
        <BoxApp padding="1rem" display="flex" flexDirection="column" gap="1rem">
          <InputApp
            label="Nome"
            required
            id="nome"
            onChange={form.onChange}
            onBlur={form.onBlur}
            autoFocus
            error={form.error("nome")}
            helperText={form.helperText("nome")}
            value={form.values.nome}
            maxLength={255}
            fullWidth
          />
          <InputApp
            label="CPF"
            required
            id="cpf"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("cpf")}
            helperText={form.helperText("cpf")}
            value={form.values.cpf}
            maxLength={255}
            fullWidth
            mask={MaskType.CPF}
          />
          <InputApp
            label="E-mail"
            required
            id="email"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("email")}
            helperText={form.helperText("email")}
            value={form.values.email}
            maxLength={255}
            fullWidth
          />
          <InputApp
            label="Telefone"
            required
            id="telefone"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("telefone")}
            helperText={form.helperText("telefone")}
            value={form.values.telefone}
            mask={MaskType.TELEFONE}
            fullWidth
          />
          <InputApp
            label="Senha"
            required
            id="senha"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("senha")}
            helperText={form.helperText("senha")}
            value={form.values.senha}
            isPassword
            fullWidth
          />
          <InputApp
            label="Confirme Senha"
            required
            id="reSenha"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("reSenha")}
            helperText={form.helperText("reSenha")}
            value={form.values.reSenha}
            isPassword
            fullWidth
          />
          <BoxApp
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={form.values.urlFoto}
              alt={"foto usuário"}
            />
            <BoxApp>
              <TextApp titulo="Opcional" />
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
                      urlFoto: result.src,
                    });
                  }}
                  accept="image/*"
                />
              </Button>
            </BoxApp>
          </BoxApp>
          <ButtonApp
            loading={cadastrar.loading}
            title="Cadastrar"
            type="submit"
            onClick={form.onSubmit}
          />
        </BoxApp>
      </form>
    </BoxApp>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
