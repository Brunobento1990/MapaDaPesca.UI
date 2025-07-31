import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { pescariaRotasApi } from "@/api/rotas/pescaria-rotas-api";
import { useAgendaApi } from "@/api/use/use-agenda-api";
import { DropDownApp } from "@/component/dropdown/drop-down-app";
import { DropDownAutoFetchApp } from "@/component/dropdown/drop-down-auto-fetch-app";
import { FormApp } from "@/component/form/form-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { InputApp } from "@/component/input/input-app";
import { ModalChildren } from "@/component/modal/modal-children";
import {
  IAgendaPescaria,
  IAgendarPescaria,
  opcoesStatusAgendaPescaria,
} from "@/types/agenda-pescaria";
import { formatPadraoJson } from "@/utils/format-date";

interface ModalAgendamentoProps {
  open: boolean;
  selectedDate: string;
  fechar: (agenda: IAgendaPescaria) => void;
  close: () => void;
}

export function ModalAgendamento(props: ModalAgendamentoProps) {
  const { agendarPescaria, editarPescaria } = useAgendaApi();

  const form = useFormikAdapter<IAgendarPescaria>({
    onSubmit: agendar,
    initialValues: {
      pescariaId: "",
      dataDeAgendamento: formatPadraoJson(props.selectedDate),
    },
    validationSchema: new YupAdapter().string("pescariaId").build(),
  });

  function fecharModal(agenda: IAgendaPescaria) {
    props.fechar(agenda);
    form.limpar();
  }

  async function agendar() {
    const body = {
      ...form.values,
    };

    const response = await agendarPescaria.fetch(body);

    if (response) {
      fecharModal(response);
    }
  }

  return (
    <ModalChildren
      titulo={`Mapa da pesca - Agendar no dia ${props.selectedDate}`}
      retirarFooter
      maxWidth="lg"
      fullWidth
      open={props.open}
      close={props.close}
    >
      <FormApp
        submit={form.onSubmit}
        heigth="calc(100vh - 200px)"
        textoButton="Agendar"
        loading={agendarPescaria.loading || editarPescaria.loading}
      >
        <FormRow>
          <FormItemRow sm={6} xs={12}>
            <DropDownAutoFetchApp
              retornarObjetoCompleto
              id="pescariaId"
              keyLabel={"titulo"}
              label="Pescaria"
              url={pescariaRotasApi.paginacao}
              value={form.values.pescaria}
              autoFocus
              required
              onChange={(_, value) => {
                form.setValue({
                  pescaria: value,
                  pescariaId: value?.id,
                });
              }}
              error={form.error("pescariaId")}
              helperText={form.helperText("pescariaId")}
            />
          </FormItemRow>
          <FormItemRow sm={3} xs={12}>
            <InputApp
              label="Qtd de pescador"
              value={
                form.values.quantidadeDePescador ??
                form.values.pescaria?.quantidadePescador
              }
              id="quantidadeDePescador"
              type="number"
              onChange={form.onChange}
              fullWidth
            />
          </FormItemRow>
          <FormItemRow sm={3} xs={12}>
            <DropDownApp
              values={opcoesStatusAgendaPescaria}
              id="status"
              keyLabel="descricao"
              label="Status"
              onChange={form.onChange}
              value={opcoesStatusAgendaPescaria.find(
                (x) => x.id === form.values.status
              )}
            />
          </FormItemRow>
        </FormRow>
        <FormRow>
          <FormItemRow sm={3} xs={12}>
            <InputApp
              label="Hora inicial"
              value={
                form.values.horaInicial ?? form.values.pescaria?.horaInicial
              }
              id="horaInicial"
              type="number"
              onChange={form.onChange}
              fullWidth
            />
          </FormItemRow>
          <FormItemRow sm={3} xs={12}>
            <InputApp
              label="Hora final"
              value={form.values.horaFinal ?? form.values.pescaria?.horaFinal}
              id="horaFinal"
              type="number"
              onChange={form.onChange}
              fullWidth
            />
          </FormItemRow>
        </FormRow>
        <FormRow>
          <FormItemRow sm={12} xs={12}>
            <InputApp
              label="Observação"
              value={form.values.observacao}
              id="observacao"
              maxLength={255}
              onChange={form.onChange}
              fullWidth
            />
          </FormItemRow>
        </FormRow>
      </FormApp>
    </ModalChildren>
  );
}
