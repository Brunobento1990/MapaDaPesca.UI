"use client";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { useState } from "react";
import { BoxApp } from "../box/box-app";
import { TextApp } from "../text/text-app";

let loaderHandler: (
  isLoading: boolean,
  message?: string | string[],
  severity?: AlertColor
) => void;

function SnackbarCustom() {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | string[]>("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  loaderHandler = (
    isLoading: boolean,
    message?: string | string[],
    severityParams?: AlertColor
  ) => {
    setMessage(
      message || "Ocorreu um erro interno, tente novamente mais tarde!"
    );
    setOpen(isLoading);
    if (severityParams) setSeverity(severityParams);
  };

  function closeSnack() {
    setOpen(false);
  }

  if (!open) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={closeSnack}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={closeSnack}
      >
        {Array.isArray(message) ? (
          <BoxApp display="flex" flexDirection="column" gap="0.5rem">
            {message.map((x, i) => (
              <TextApp color="white" key={i} titulo={x} />
            ))}
          </BoxApp>
        ) : (
          <TextApp color="white" titulo={message} />
        )}
      </MuiAlert>
    </Snackbar>
  );
}

export function useSnackbar() {
  return {
    Componet: SnackbarCustom,
    show: (message?: string | string[], severity?: AlertColor) =>
      loaderHandler(true, message, severity),
  };
}
