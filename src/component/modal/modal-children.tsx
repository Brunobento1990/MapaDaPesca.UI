import { ReactNode } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { BootstrapDialog } from "./use-modal";
import { IconApp } from "../icon/icon-app";
import { ButtonApp } from "../button/button-app";
import { TextApp } from "../text/text-app";

interface propsHeaderModalChildren {
  height?: string;
  padding?: string;
  fontSize?: string;
}

interface propsModalChildren {
  open: boolean;
  children: ReactNode;
  action?: () => void;
  titulo?: string;
  close?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  maxWidth?: "lg" | "md" | "sm" | "xs" | "xl";
  textoButton?: string;
  retirarFooter?: boolean;
  padding?: string;
  header?: propsHeaderModalChildren;
}

export function ModalChildren(props: propsModalChildren) {
  return (
    <BootstrapDialog
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && props.close) {
          props.close();
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: props.header?.padding ?? "2",
          height: props.header?.height,
        }}
        id="customized-dialog-title"
      >
        <TextApp
          titulo={props.titulo ?? "Mapa da pesca"}
          fontSize={props.header?.fontSize ?? "22px"}
          fontWeight={600}
        />
      </DialogTitle>
      {props.close && (
        <IconButton
          aria-label="close"
          onClick={props.close}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IconApp icon="mdi:close" />
        </IconButton>
      )}
      <DialogContent
        dividers
        sx={{
          padding: props.padding,
          "&.MuiDialogContent-root": {
            padding: props.padding,
          },
        }}
      >
        {props.children}
      </DialogContent>
      {!props.retirarFooter && (
        <DialogActions>
          <ButtonApp
            variant="contained"
            onClick={props.action}
            loading={props.loading}
            title={props.textoButton}
          />
        </DialogActions>
      )}
    </BootstrapDialog>
  );
}
