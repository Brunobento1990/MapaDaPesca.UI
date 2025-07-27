import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import { IconApp } from "./icon-app";

interface propsIconButton {
  icon: string;
  onClick?: () => void;
  sx?: any;
  width?: string;
  cor?: string;
  href?: string;
  disabled?: boolean;
}

export function IconButtonApp(props: propsIconButton) {
  return (
    <InputAdornment position="end" sx={props.sx}>
      <IconButton
        disabled={props.disabled}
        onClick={props.onClick}
        href={props.href as any}
        component={props.href ? Link : (undefined as any)}
      >
        <IconApp icon={props.icon} width={props.width} color={props.cor} />
      </IconButton>
    </InputAdornment>
  );
}
