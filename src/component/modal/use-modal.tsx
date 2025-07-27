import { forwardRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconApp } from "../icon/icon-app";
import { BoxApp } from "../box/box-app";
import { TextApp } from "../text/text-app";
import { ButtonApp } from "../button/button-app";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

let close: () => void;
let show: (args?: IModalShow) => void;
let action: () => void | undefined;
let actionPromise: () => Promise<any> | undefined;
let actionClose: () => void | undefined;

interface IModalShow {
  mensagem?: string | string[];
  confirmed?: () => void;
  confirmarPromise?: () => Promise<any>;
  closeConfirmed?: () => void;
}

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Modal() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string | string[]>(
    "Deseja realmente excluir o registro?"
  );

  show = async (args?: IModalShow) => {
    setOpen(true);
    actionPromise = args?.confirmarPromise as any;
    action = args?.confirmed as any;
    actionClose = args?.closeConfirmed as any;
    if (args?.mensagem) {
      setMensagem(args.mensagem);
    }
  };

  close = () => {
    if (actionClose) {
      actionClose();
    }
    setOpen(false);
  };

  async function click() {
    if (action) {
      action();
    }
    if (actionPromise) {
      setLoading(true);
      await actionPromise();
      setLoading(false);
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <BootstrapDialog
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          close();
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Mapa da pesca
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <IconApp icon="mdi:close" />
      </IconButton>
      <DialogContent dividers>
        {Array.isArray(mensagem) ? (
          <>
            {mensagem.map((x, index) => (
              <BoxApp key={index}>
                <TextApp titulo={x} />
              </BoxApp>
            ))}
          </>
        ) : (
          <Typography gutterBottom>{mensagem}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <ButtonApp variant="outlined" onClick={close} title={"Não"} />
        <ButtonApp
          loading={loading}
          variant="contained"
          autoFocus
          onClick={click}
          title={"Sim"}
        />
      </DialogActions>
    </BootstrapDialog>
  );
}

export function useModal() {
  return {
    Component: Modal,
    show,
    close,
  };
}
