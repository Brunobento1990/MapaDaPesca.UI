import { ReactNode } from "react";
import { BoxApp, justifyContent } from "../box/box-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { ButtonApp } from "../button/button-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { TextApp } from "../text/text-app";

interface propsForm {
  children: ReactNode;
  submit: () => Promise<any>;
  loading?: boolean;
  urlVoltar?: string;
  padding?: string;
  width?: string;
  readonly?: boolean;
  maxWidth?: string;
  heigth?: string;
  footer?: IFooterForm;
  textoButton?: string;
  paddingFooter?: string;
  marginTop?: string;
  titulo?: string;
}

interface IFooterForm {
  children?: ReactNode;
  justifyContent?: justifyContent;
}

export function FormApp(props: propsForm) {
  const { navigate } = useNavigateApp();
  const { backgroundColor } = useThemeApp();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await props.submit();
      }}
      style={{
        height: props.heigth ?? "calc(100vh - 90px)",
        width: "100%",
        maxWidth: props.maxWidth,
        padding: props.padding ?? "0.5rem",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        justifyContent: "space-between",
        backgroundColor: backgroundColor.card,
      }}
    >
      <BoxApp
        boxShadow="none"
        marginTop={props.marginTop ?? "10px"}
        height={props.heigth ?? "100%"}
        overflowy="auto"
        overflowx="hidden"
        width={props.width}
      >
        {props.titulo && (
          <TextApp
            color="primary"
            fontSize="1.2rem"
            fontWeight={600}
            titulo={props.titulo}
          />
        )}
        {props.children}
      </BoxApp>
      <BoxApp
        display="flex"
        justifyContent={props.footer?.justifyContent ?? "end"}
        gap="20px"
        height="30px"
        alignItems="center"
        width="100%"
        boxSizing="border-box"
      >
        {props.footer?.children}
        <BoxApp
          display="flex"
          justifyContent={"end"}
          gap="20px"
          alignItems="center"
          width={props.readonly || !props.urlVoltar ? "150px" : "300px"}
        >
          {props.urlVoltar && (
            <ButtonApp
              fullWidth
              variant="outlined"
              title="Voltar"
              onClick={() => navigate(props.urlVoltar)}
            />
          )}
          {!props.readonly && (
            <ButtonApp
              fullWidth
              loading={props.loading}
              onClick={props.submit}
              type="submit"
              title={props.textoButton ?? "Gravar"}
            />
          )}
        </BoxApp>
      </BoxApp>
    </form>
  );
}
