"use client";

import { faturaAgendaRotasApi } from "@/api/rotas/fatura-agenda-rotas-api";
import { TableIndex } from "@/component/paginacao";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { IFaturaAgendaPescaria } from "@/types/fatura-agenda-pescaria";
import { formatDate } from "@/utils/format-date";
import { formatMoney } from "@/utils/format-money";

export function FaturaPaginacaoView() {
  return (
    <TableIndex
      columns={[
        {
          field: "dataDeVencimento",
          headerName: "Data de Vencimento",
          renderCell: (row: IFaturaAgendaPescaria) =>
            formatDate(row.dataDeVencimento),
        },
        {
          field: "valor",
          headerName: "Valor",
          renderCell: (row: IFaturaAgendaPescaria) => formatMoney(row.valor),
        },
        {
          field: "aReceber",
          headerName: "Valor a Receber",
          renderCell: (row: IFaturaAgendaPescaria) =>
            formatMoney(row.valorAReceber),
        },
        {
          field: "recebido",
          headerName: "Valor Recebido",
          renderCell: (row: IFaturaAgendaPescaria) => (
            <TextApp
              fontWeight={600}
              color="success"
              titulo={`${formatMoney(row.valorRecebido)}`}
            />
          ),
        },
      ]}
      urlEdit={rotasApp.fatura.editar}
      url={faturaAgendaRotasApi.paginacao}
    />
  );
}
