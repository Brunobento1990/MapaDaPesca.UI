import { Pagination } from "@mui/material";
import { BoxApp } from "../box/box-app";
import { DividerApp } from "../divider/divider-app";

interface propsFooterTable {
  pagina: number;
  setPagina: (newPage: number) => void;
  setQuantidadePorPagina: (newPage: number) => void;
  quantidadePagina: number;
}

export function FooterTable(props: propsFooterTable) {
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="center"
      flexDirection="column"
      gap=".5rem"
    >
      <DividerApp width="100%" />
      <BoxApp
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="end"
      >
        <Pagination
          count={props.quantidadePagina}
          page={props.pagina}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={(_, newPage) => props.setPagina(newPage)}
          size="small"
        />
      </BoxApp>
    </BoxApp>
  );
}
