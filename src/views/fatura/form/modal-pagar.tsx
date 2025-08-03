import { useFaturaAgendaApi } from "@/api/use/use-fatura-agenda-api";
import { DropDownApp } from "@/component/dropdown/drop-down-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { InputApp, MaskType } from "@/component/input/input-app";
import { ModalChildren } from "@/component/modal/modal-children";
import {
  IFaturaAgendaPescaria,
  IPagarFatura,
  opcoesMeiosDePagamento,
} from "@/types/fatura-agenda-pescaria";
import { cleanFormatMoney } from "@/utils/format-money";
import { useState } from "react";

interface ModalEstornarProps {
  open: boolean;
  close: (fatura?: IFaturaAgendaPescaria) => void;
  id: string;
  valor: number;
  descricao?: string;
}

export function ModalPagar({
  open,
  close,
  id,
  valor,
  descricao,
}: ModalEstornarProps) {
  const { pagarFaturaDaAgenda } = useFaturaAgendaApi();
  const [form, setForm] = useState<IPagarFatura>({
    id,
    valor,
    descricao,
    meioDePagamento: undefined!,
  });

  function setFormLocal(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function pagar() {
    if (!id || !form) {
      return;
    }

    const response = await pagarFaturaDaAgenda.fetch({
      id,
      valor: cleanFormatMoney(form?.valor) ?? 0,
      meioDePagamento: form.meioDePagamento,
      descricao: form.descricao,
    });
    if (response) {
      close(response);
    }
  }

  return (
    <ModalChildren
      open={open}
      close={() => close(undefined)}
      textoButton="Baixar"
      loading={pagarFaturaDaAgenda.loading}
      action={pagar}
      fullWidth
      maxWidth="md"
    >
      <FormRow>
        <FormItemRow xs={12} sm={6}>
          <InputApp
            label="Valor"
            value={form?.valor}
            required
            id="valor"
            mask={MaskType.MONEY}
            fullWidth
            onChange={setFormLocal}
          />
        </FormItemRow>
        <FormItemRow xs={12} sm={6}>
          <DropDownApp
            values={opcoesMeiosDePagamento}
            id="meioDePagamento"
            keyLabel="descricao"
            label="Meio de pagamento"
            value={opcoesMeiosDePagamento.find(
              (x) => x.id === form.meioDePagamento
            )}
            onChange={setFormLocal}
          />
        </FormItemRow>
      </FormRow>
      <FormRow>
        <FormItemRow xs={12} sm={12}>
          <InputApp
            fullWidth
            label="Descrição"
            value={form.descricao}
            id="descricao"
            maxLength={255}
            onChange={setFormLocal}
          />
        </FormItemRow>
      </FormRow>
    </ModalChildren>
  );
}
