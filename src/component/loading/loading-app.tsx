import { CircularProgress } from "@mui/material";
import { BoxApp } from "../box/box-app";
import { TextApp } from "../text/text-app";

interface propsLoadingApp {
  texto?: string;
  size?: number;
  marginBottom?: string;
  comBox?: boolean;
  marginTop?: string;
  height?: string;
}

export function LoadingApp(props: propsLoadingApp) {
  if (props.comBox) {
    return (
      <BoxApp
        width="100%"
        display="flex"
        alignItems="center"
        marginBottom={props.marginBottom}
        marginTop={props.marginTop ?? "1rem"}
        justifyContent="center"
        gap="1rem"
        height={props.height}
      >
        <TextApp titulo={props.texto ?? "Carregando..."} />
        <CircularProgress size={props.size ?? 20} />
      </BoxApp>
    );
  }

  return (
    <BoxApp display="flex" gap="1rem" marginBottom={props.marginBottom}>
      <TextApp titulo={props.texto ?? "Carregando..."} />
      <CircularProgress size={props.size ?? 20} />
    </BoxApp>
  );
}
