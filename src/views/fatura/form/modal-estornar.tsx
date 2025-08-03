import { useFaturaAgendaApi } from "@/api/use/use-fatura-agenda-api";
import { ModalChildren } from "@/component/modal/modal-children";
import { TextApp } from "@/component/text/text-app";
import { IFaturaAgendaPescaria } from "@/types/fatura-agenda-pescaria";

interface ModalEstornarProps {
  open: boolean;
  close: (fatura?: IFaturaAgendaPescaria) => void;
  id: string;
}

export function ModalEstornar({ open, close, id }: ModalEstornarProps) {
  const { estornarFaturaDaAgenda } = useFaturaAgendaApi();

  async function estornar() {
    if (!id) {
      return;
    }
    const response = await estornarFaturaDaAgenda.fetch({
      id,
    });
    if (response) {
      close(response);
    }
  }

  return (
    <ModalChildren
      open={open}
      close={() => close(undefined)}
      titulo="Estornar Fatura"
      textoButton="Estornar"
      loading={estornarFaturaDaAgenda.loading}
      action={estornar}
    >
      <TextApp
        fontWeight={600}
        titulo="Tem certeza que deseja estornar esta fatura?"
      />
    </ModalChildren>
  );
}
