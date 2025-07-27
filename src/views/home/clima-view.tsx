"use client";

import { BoxApp } from "@/component/box/box-app";
import { IClima } from "@/types/clima";
import { obterHorarioDaData } from "@/utils/format-date";
import { LineChart } from "@mui/x-charts";

interface ClimaViewProps {
  clima?: IClima;
}

const margin = { right: 24 };

export function ClimaView(props: ClimaViewProps) {
  if (!props.clima) {
    return <></>;
  }
  console.log("ClimaView", props.clima);
  return (
    <BoxApp overflowy="auto" width="100%" height="100%">
      <LineChart
        id="clima-chart"
        height={300}
        series={[
          {
            data: props.clima.temperaturas ?? [],
            label: `Temperatura (${props.clima.unidadeDeMedida.temperatura})`,
            valueFormatter: (value) =>
              `${value} ${props.clima?.unidadeDeMedida.temperatura}`,
          },
          {
            data: props.clima.direcaoDoVento ?? [],
            label: `Direção do Vento (${props.clima.unidadeDeMedida.direcaoDoVento})`,
            valueFormatter: (value) =>
              `${value} ${props.clima?.unidadeDeMedida.direcaoDoVento}`,  
          },
          {
            data: props.clima.velocidadeDoVento ?? [],
            label: `Velocidade do Vento (${props.clima.unidadeDeMedida.velocidadeDoVento})`,
            valueFormatter: (value) =>
              `${value} ${props.clima?.unidadeDeMedida.velocidadeDoVento}`,
          },
          {
            data: props.clima.pressaoAtmosferica ?? [],
            label: `Pressão Atmosférica (${props.clima.unidadeDeMedida.pressaoAtmosferica})`,
            valueFormatter: (value) =>
              `${value} ${props.clima?.unidadeDeMedida.pressaoAtmosferica}`,
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: props.clima.dias.map((dia) => obterHorarioDaData(dia)),
          },
        ]}
        yAxis={[{ width: 50 }]}
        margin={margin}
      />
    </BoxApp>
  );
}
