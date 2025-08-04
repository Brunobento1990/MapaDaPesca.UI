import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useFaturaAgendaApi } from "@/api/use/use-fatura-agenda-api";
import { BoxApp } from "@/component/box/box-app";
import { DividerApp } from "@/component/divider/divider-app";
import { DropDownApp } from "@/component/dropdown/drop-down-app";
import { FormApp } from "@/component/form/form-app";
import { FormInputDateRow } from "@/component/form/form-input-data-row";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { InputApp, MaskType } from "@/component/input/input-app";
import { LoadingApp } from "@/component/loading/loading-app";
import { ModalChildren } from "@/component/modal/modal-children";
import { useSnackbar } from "@/component/snack-bar/use-snack-bar";
import { TextApp } from "@/component/text/text-app";
import {
  IFaturaAgendaPescaria,
  MeioDePagamento,
  opcoesMeiosDePagamento,
} from "@/types/fatura-agenda-pescaria";
import { cleanFormatMoney, formatMoney } from "@/utils/format-money";
import { useEffect, useState } from "react";

interface ModalFaturaProps {
  open: boolean;
  close: () => void;
  agendaPescariaId: string;
}

export function ModalFatura(props: ModalFaturaProps) {
  const [meioDePagamento, setMeioDePagamento] = useState<MeioDePagamento>();
  const { show } = useSnackbar();
  const { obterFaturaDaAgenda, gerarFaturaDaAgenda, pagarFaturaDaAgenda } =
    useFaturaAgendaApi();
  const form = useFormikAdapter<IFaturaAgendaPescaria>({
    validationSchema: new YupAdapter()
      .string("dataDeVencimento")
      .string("valor")
      .build(),
    onSubmit: submit,
  });

  async function init() {
    if (!props.open) return;
    const response = await obterFaturaDaAgenda.fetch(props.agendaPescariaId);
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    if (!form.values.id) {
      const response = await gerarFaturaDaAgenda.fetch({
        dataDeVencimento: form.values.dataDeVencimento,
        valor: cleanFormatMoney(form.values.valor) ?? 0,
        agendaPescariaId: props.agendaPescariaId,
        descricao: form.values.descricao,
      });
      if (response) {
        form.limpar();
        props.close();
      }
      return;
    }

    if (!meioDePagamento) {
      show("Selecione um meio de pagamento", "error");
      return;
    }
    const response = await pagarFaturaDaAgenda.fetch({
      id: form.values.id,
      meioDePagamento,
      valor: cleanFormatMoney(form.values.valor) ?? 0,
      descricao: form.values.descricao,
    });
    if (response) {
      form.limpar();
      props.close();
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <ModalChildren
      open={props.open}
      close={props.close}
      retirarFooter
      fullWidth
      maxWidth="md"
    >
      <FormApp
        readonly={form.values.quitada}
        textoButton={form.values.id ? "Faturar" : "Gerar fatura"}
        submit={form.onSubmit}
        heigth="calc(100vh - 250px)"
        loading={
          obterFaturaDaAgenda.loading ||
          gerarFaturaDaAgenda.loading ||
          pagarFaturaDaAgenda.loading
        }
      >
        {obterFaturaDaAgenda.loading && (
          <LoadingApp comBox texto="Carregando fatura..." />
        )}
        {!form.values.id && !obterFaturaDaAgenda.loading && (
          <TextApp
            titulo="Não há fatura para esta pescaria"
            color="info"
            fontWeight={600}
          />
        )}
        {form.values.vencida && (
          <TextApp
            titulo="Esta fatura está vencida"
            color="info"
            fontWeight={600}
          />
        )}
        {form.values.quitada && (
          <TextApp
            titulo="Esta fatura está quitada"
            color="success"
            fontWeight={600}
          />
        )}
        <FormRow>
          <FormInputDateRow
            xs={12}
            sm={6}
            label="Vencimento"
            value={form.values.dataDeVencimento}
            id="dataDeVencimento"
            fullWidth
            required
            onChange={form.onChange}
            error={form.error("dataDeVencimento")}
            helperText={form.helperText("dataDeVencimento")}
            readonly
          />
          <FormItemRow xs={12} sm={6}>
            <InputApp
              fullWidth
              label="Valor"
              required
              mask={MaskType.MONEY}
              value={form.values.valor}
              error={form.error("valor")}
              helperText={form.helperText("valor")}
              id="valor"
              onChange={form.onChange}
              readonly={form.values.quitada}
            />
          </FormItemRow>
        </FormRow>
        <FormRow>
          <FormItemRow xs={12} sm={6}>
            <InputApp
              fullWidth
              label="Valor a receber"
              mask={MaskType.MONEY}
              value={form.values.valorAReceber}
              id="valorAReceber"
              readonly
            />
          </FormItemRow>
          <FormItemRow xs={12} sm={6}>
            <InputApp
              fullWidth
              label="Valor recebido"
              mask={MaskType.MONEY}
              value={form.values.valorRecebido}
              id="valorRecebido"
              readonly
            />
          </FormItemRow>
        </FormRow>
        <FormRow>
          <FormItemRow xs={12} sm={12}>
            <InputApp
              fullWidth
              label="Descrição"
              value={form.values.descricao}
              id="descricao"
              maxLength={255}
              onChange={form.onChange}
              readonly={form.values.quitada}
            />
          </FormItemRow>
        </FormRow>
        {form.values.id && (
          <FormRow>
            <FormItemRow xs={12} sm={6}>
              <DropDownApp
                values={opcoesMeiosDePagamento}
                id="meioDePagamento"
                keyLabel="descricao"
                label="Meio de pagamento"
                value={opcoesMeiosDePagamento.find(
                  (x) => x.id === meioDePagamento
                )}
                onChange={(_, value) => setMeioDePagamento(value)}
                readonly={form.values.quitada}
              />
            </FormItemRow>
          </FormRow>
        )}
        {form.values.transacoes && (
          <>
            <DividerApp chip="Pagamentos" />
            {form.values.transacoes.map((transacao) => (
              <BoxApp key={transacao.id}>
                <BoxApp display="flex" gap="0.5rem">
                  <TextApp fontWeight={600} titulo="Valor:" />
                  <TextApp
                    fontWeight={600}
                    color={transacao.tipoTransacao === 1 ? "success" : "error"}
                    titulo={`${formatMoney(transacao.valor)}`}
                  />
                </BoxApp>
                <BoxApp display="flex" gap="0.5rem">
                  <TextApp fontWeight={600} titulo="Meio de pagamento:" />
                  <TextApp
                    titulo={`${
                      opcoesMeiosDePagamento.find(
                        (x) => x.id == transacao.meioDePagamento
                      )?.descricao ?? ""
                    }`}
                  />
                </BoxApp>
                <BoxApp display="flex" gap="0.5rem">
                  <TextApp fontWeight={600} titulo="Tipo transação:" />
                  <TextApp
                    fontWeight={600}
                    color={transacao.tipoTransacao === 1 ? "success" : "error"}
                    titulo={`${
                      transacao.tipoTransacao === 1 ? "Entrada" : "Saída"
                    }`}
                  />
                </BoxApp>
                <BoxApp display="flex" gap="0.5rem">
                  <TextApp fontWeight={600} titulo="Descrição:" />
                  <TextApp titulo={`${transacao.descricao ?? ""}`} />
                </BoxApp>
              </BoxApp>
            ))}
          </>
        )}
      </FormApp>
    </ModalChildren>
  );
}
