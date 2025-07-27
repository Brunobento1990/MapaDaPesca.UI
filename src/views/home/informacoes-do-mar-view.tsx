"use client";

import { BoxApp } from "@/component/box/box-app";
import { IInformacoesDoMar } from "@/types/informacoes-do-mar";
import { obterHorarioDaData } from "@/utils/format-date";
import { LineChart } from "@mui/x-charts";

interface InformacoesDoMarViewProps {
  informacoesDoMar?: IInformacoesDoMar;
}

const margin = { right: 24 };

export function InformacoesDoMarView(props: InformacoesDoMarViewProps) {
  if (!props.informacoesDoMar) {
    return <></>;
  }
  return (
    <BoxApp overflowy="auto" width="100%" height="100%">
      <LineChart
        height={300}
        series={[
          {
            data: props.informacoesDoMar.alturasDaMare,
            label: "Altura da Maré",
          },
          {
            data: props.informacoesDoMar.alturasDasOndas,
            label: "Altura das Ondas",
          },
          {
            data: props.informacoesDoMar.temperaturasDoMar,
            label: "Temperatura do Mar",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: props.informacoesDoMar.dias.map((dia) =>
              obterHorarioDaData(dia)
            ),
          },
        ]}
        yAxis={[{ width: 50 }]}
        margin={margin}
      />
    </BoxApp>
  );
}
