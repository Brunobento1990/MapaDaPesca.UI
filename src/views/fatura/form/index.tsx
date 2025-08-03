"use client";

import { useFaturaAgendaApi } from "@/api/use/use-fatura-agenda-api";
import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { FormApp } from "@/component/form/form-app";
import { FormInputDateRow } from "@/component/form/form-input-data-row";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { InputApp, MaskType } from "@/component/input/input-app";
import { TextApp } from "@/component/text/text-app";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IFaturaAgendaPescaria } from "@/types/fatura-agenda-pescaria";
import { useEffect, useState } from "react";
import { ModalEstornar } from "./modal-estornar";
import { ModalPagar } from "./modal-pagar";

export function FaturaEditarView() {
  const { obterFaturaPorId } = useFaturaAgendaApi();
  const { params } = useNavigateApp();
  const [open, setOpen] = useState(false);
  const [openPagar, setOpenPagar] = useState(false);
  const [fatura, setFatura] = useState<IFaturaAgendaPescaria>();

  async function init() {
    const response = await obterFaturaPorId.fetch(params.id as string);
    if (response) {
      setFatura(response);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormApp
      titulo="Fatura"
      submit={async () => {}}
      urlVoltar={rotasApp.fatura.paginacao}
      readonly
      footer={{
        children: (
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <ButtonApp
              title="Estornar"
              onClick={() => setOpen(true)}
              disabled={!((fatura?.valorRecebido ?? 0) > 0)}
            />
            <ButtonApp
              onClick={() => setOpenPagar(true)}
              title="Baixar"
              disabled={fatura?.quitada}
            />
          </BoxApp>
        ),
      }}
    >
      {fatura && (
        <ModalEstornar
          open={open}
          close={(params) => {
            setOpen(false);
            if (params) {
              setFatura(params);
            }
          }}
          id={fatura.id}
        />
      )}
      {fatura && openPagar && (
        <ModalPagar
          valor={fatura.valorAReceber || fatura.valor}
          descricao={fatura.descricao}
          open={openPagar}
          close={(params) => {
            setOpenPagar(false);
            if (params) {
              setFatura(params);
            }
          }}
          id={fatura.id}
        />
      )}
      <FormRow>
        {fatura?.vencida && (
          <TextApp titulo="Fatura vencida" color="error" fontWeight={600} />
        )}
        <FormInputDateRow
          label="Vencimento"
          value={fatura?.dataDeVencimento}
          id="dataDeVencimento"
          required
          readonly
          fullWidth
          xs={12}
          sm={3}
        />
        <FormItemRow xs={12} sm={3}>
          <InputApp
            id="valor"
            label="Valor"
            required
            value={fatura?.valor}
            readonly
            fullWidth
            mask={MaskType.MONEY}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            id="valorAReceber"
            label="Valor a receber"
            required
            value={fatura?.valorAReceber}
            readonly
            fullWidth
            mask={MaskType.MONEY}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={3}>
          <InputApp
            id="valorRecebido"
            label="Valor recebido"
            required
            value={fatura?.valorRecebido}
            readonly
            fullWidth
            mask={MaskType.MONEY}
          />
        </FormItemRow>
      </FormRow>
    </FormApp>
  );
}
