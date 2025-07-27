"use client";

import { embarcacaoRotasApi } from "@/api/rotas/embarcacao-rotas-api";
import { TableIndex } from "@/component/paginacao";
import { rotasApp } from "@/config/rotas-app";

export function EmbacacaoPaginacaoView() {
  return (
    <TableIndex
      columns={[
        {
          field: "nome",
          headerName: "Nome",
          sortable: true,
        },
        {
          field: "motor",
          headerName: "Motor",
          sortable: true,
        },
        {
          field: "largura",
          headerName: "Largura",
          sortable: true,
        },
        {
          field: "comprimento",
          headerName: "Comprimento",
          sortable: true,
        },
      ]}
      urlAdd={rotasApp.embarcacao.adicionar}
      urlEdit={rotasApp.embarcacao.editar}
      urlView={rotasApp.embarcacao.visualizar}
      urlDelete={embarcacaoRotasApi.delete}
      url={embarcacaoRotasApi.paginacao}
    />
  );
}
