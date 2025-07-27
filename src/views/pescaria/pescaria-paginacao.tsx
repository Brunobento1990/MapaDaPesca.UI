"use client";

import { pescariaRotasApi } from "@/api/rotas/pescaria-rotas-api";
import { TableIndex } from "@/component/paginacao";
import { rotasApp } from "@/config/rotas-app";
import { IPescaria } from "@/types/pescaria";
import { formatMoney } from "@/utils/format-money";

export function PescariaPaginacao() {
  return (
    <TableIndex
      columns={[
        {
          field: "titulo",
          headerName: "Título",
          sortable: true,
        },
        {
          field: "descricao",
          headerName: "Descrição",
          renderCell: (row: IPescaria) => {
            if (row.descricao && row.descricao.length > 50) {
              return row.descricao.substring(0, 50) + "...";
            }

            return row.descricao;
          },
          sortable: true,
        },
        {
          field: "local",
          headerName: "Local",
          sortable: true,
        },
        {
          field: "valor",
          headerName: "Valor",
          renderCell: (row: IPescaria) => formatMoney(row.valor),
          sortable: true,
        },
        {
          field: "quantidadeDeHorasPescaria",
          headerName: "Duração (horas)",
        },
      ]}
      urlAdd={rotasApp.pescaria.adicionar}
      urlEdit={rotasApp.pescaria.editar}
      urlView={rotasApp.pescaria.visualizar}
      urlDelete={pescariaRotasApi.excluir}
      url={pescariaRotasApi.paginacao}
    />
  );
}
