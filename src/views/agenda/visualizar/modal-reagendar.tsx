import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { useAgendaApi } from "@/api/use/use-agenda-api";
import { BoxApp } from "@/component/box/box-app";
import { DividerApp } from "@/component/divider/divider-app";
import { FormApp } from "@/component/form/form-app";
import { FormInputDateRow } from "@/component/form/form-input-data-row";
import { FormRow } from "@/component/form/form-row-app";
import { LoadingApp } from "@/component/loading/loading-app";
import { ModalChildren } from "@/component/modal/modal-children";
import { TextApp } from "@/component/text/text-app";
import { IAgendaPescaria, IAgendaResponse, IReagendarPescaria } from "@/types/agenda-pescaria";
import { formatDate } from "@/utils/format-date";
import { useState } from "react";

interface ModalReagendarProps {
  id: string;
  open: boolean;
  onClose: (agenda?: IAgendaPescaria) => void;
}

export function ModalReagendar({ id, open, onClose }: ModalReagendarProps) {
  const [agenda, setAgenda] = useState<IAgendaResponse>();
  const { agendaDoMes, reagendarPescaria } = useAgendaApi();
  const form = useFormikAdapter<IReagendarPescaria>({
    initialValues: {
      id,
      dataDeAgendamento: "",
    },
    validationSchema: new YupAdapter().string("dataDeAgendamento").build(),
    onSubmit: submit,
  });

  async function obterAgendaDoMes() {
    if (!form.values.dataDeAgendamento) {
      return;
    }
    const dataSplit = form.values.dataDeAgendamento.split("-");
    const response = await agendaDoMes.fetch(dataSplit[1], dataSplit[0]);
    if (response) {
      setAgenda(response);
    }
  }

  async function submit() {
    const response = await reagendarPescaria.fetch({
      ...form.values,
      id: form.values.id || id,
    });
    if (response) {
      form.limpar();
      onClose(response);
    }
  }

  return (
    <ModalChildren
      retirarFooter
      fullWidth
      maxWidth="md"
      open={open}
      close={onClose}
    >
      <FormApp
        loading={reagendarPescaria.loading}
        submit={form.onSubmit}
        heigth="calc(100vh - 250px)"
      >
        {!form.values.dataDeAgendamento && (
          <TextApp
            titulo="Informe uma data para verificar a disponibilidade"
            color="info"
          />
        )}
        {agendaDoMes.loading && (
          <LoadingApp comBox texto="Verificando disponibilidade..." />
        )}
        <FormRow>
          <FormInputDateRow
            label="Data de agendamento"
            xs={12}
            sm={6}
            onChange={form.onChange}
            id="dataDeAgendamento"
            onClose={obterAgendaDoMes}
            error={form.error("dataDeAgendamento")}
            helperText={form.helperText("dataDeAgendamento")}
            value={form.values.dataDeAgendamento}
            required
          />
        </FormRow>
        {agenda && (
          <BoxApp display="flex" flexDirection="column" gap="1rem">
            <DividerApp chip="Agenda do mês" />
            {agenda.agenda && agenda.agenda.length > 0 ? (
              agenda.agenda
                .filter((x) => x.id !== form.values.id)
                .map((item) => (
                  <BoxApp key={item.id}>
                    <TextApp titulo={formatDate(item.dataDeAgendamento)} />
                  </BoxApp>
                ))
            ) : (
              <TextApp titulo="Nenhum agendamento encontrado para o mês." />
            )}
            <DividerApp chip="Agenda bloqueada" />
            {agenda.agendaBloqueada && agenda.agendaBloqueada.length > 0 ? (
              agenda.agendaBloqueada.map((item) => (
                <BoxApp key={item.id}>
                  <TextApp titulo={formatDate(item.data)} />
                </BoxApp>
              ))
            ) : (
              <TextApp titulo="Nenhum agendamento bloqueado encontrado para o mês." />
            )}
          </BoxApp>
        )}
      </FormApp>
    </ModalChildren>
  );
}
