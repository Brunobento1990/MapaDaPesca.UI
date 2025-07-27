import { Box } from "@mui/material";
import { GridApp } from "../grid/grid-app";
import { propsFormRow } from "@/types/form";

export function FormRow(props: propsFormRow) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: props.marginBotton ?? "12px",
        width: props.width,
        padding: props.padding,
        marginTop: props.marginTop ?? "5px",
        borderBottom: props.borderBottom,
        backgroundColor: props.backGroudnColor,
        borderRadius: props.borderRadius,
      }}
    >
      <GridApp container spacing={props.spacing ?? 3}>
        {props.children}
      </GridApp>
    </Box>
  );
}
