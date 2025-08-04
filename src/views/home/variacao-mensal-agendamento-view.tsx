import { BoxApp } from "@/component/box/box-app";
import { DividerApp } from "@/component/divider/divider-app";
import { IconApp } from "@/component/icon/icon-app";
import { TextApp } from "@/component/text/text-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { IVariacaoMensalAgendamento } from "@/types/home";
import { Card } from "@mui/material";

interface VariacaoMensalAgendamentoViewProps {
  variacaoMensalAgendamento?: IVariacaoMensalAgendamento;
}

export function VariacaoMensalAgendamentoView(
  props: VariacaoMensalAgendamentoViewProps
) {
  if (!props.variacaoMensalAgendamento) {
    return <></>;
  }
  const variacao = props.variacaoMensalAgendamento;
  const corVariacaoPorcentagem = variacao.porcentagem > 0 ? "green" : "red";
  return (
    <Card>
      <BoxApp padding="1rem">
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextApp fontWeight={600} titulo={`Mês: ${variacao.mes}`} />
          <BoxApp
            backgroundColor="red"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="35px"
            height="35px"
            borderRadius="50%"
          >
            <IconApp icon={listaDeIcones.calendario} color="white" />
          </BoxApp>
        </BoxApp>
        <BoxApp display="flex" alignItems="center">
          <TextApp
            fontSize="1.2rem"
            fontWeight={600}
            titulo={`${variacao.porcentagem}%`}
            color={corVariacaoPorcentagem}
          />
          <IconApp
            icon={
              variacao.porcentagem > 0 ? "lucide:arrow-up" : "lucide:arrow-down"
            }
            color={corVariacaoPorcentagem}
          />
        </BoxApp>
        <DividerApp width="100%" />
        <BoxApp marginTop="1rem">
          <TextApp
            titulo={`${variacao.anoAnterior}: ${variacao.totalAnoAnterior} agendamentos`}
          />
          <TextApp
            titulo={`${variacao.anoAtual}: ${variacao.totalAnoAtual} agendamentos`}
          />
        </BoxApp>
      </BoxApp>
    </Card>
  );
}
