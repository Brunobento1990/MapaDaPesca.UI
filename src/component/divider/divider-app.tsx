import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { ReactNode } from "react";

interface propsDividerApp {
  chip?: string;
  marginTop?: string;
  heigth?: string;
  width?: string;
  marginBotton?: string;
  cor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  variantChip?: "filled" | "outlined";
  children?: ReactNode;
}

interface propsChipApp {
  titulo: string;
  cor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  variantChip?: "filled" | "outlined";
  delete?: () => void;
}

export function ChipApp(props: propsChipApp) {
  return (
    <Chip
      color={props.cor}
      variant={props.variantChip}
      label={props.titulo}
      size="small"
      onDelete={props.delete}
    />
  );
}

export function DividerApp(props: propsDividerApp) {
  const sx = {
    marginTop: props.marginTop,
    height: props.heigth,
    width: props.width,
    marginBottom: props.marginBotton,
  };

  if (!props.chip) return <Divider sx={sx} />;

  return (
    <Divider sx={sx}>
      <Chip
        color={props.cor ?? "primary"}
        variant={props.variantChip}
        label={props.chip}
        size="small"
      />
      {props.children}
    </Divider>
  );
}
