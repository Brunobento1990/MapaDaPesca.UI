"use client";

import { useHomeApi } from "@/api/use/use-home-api";
import { BoxApp } from "@/component/box/box-app";
import { DividerApp } from "@/component/divider/divider-app";
import { GridApp } from "@/component/grid/grid-app";
import { IconApp } from "@/component/icon/icon-app";
import { LoadingApp } from "@/component/loading/loading-app";
import { TextApp } from "@/component/text/text-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { useContextGeoLocalizacao } from "@/contexts/geolocalizacao-context";
import { useContextGuiaDePesca } from "@/contexts/guia-pe-pesca-context";
import { useThemeApp } from "@/hooks/use-theme-app";
import {
  opcoesStatusAgendaPescaria,
  StatusAgendaPescariaColor,
} from "@/types/agenda-pescaria";
import { IHome } from "@/types/home";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { formatDate, obterHorarioDaData } from "@/utils/format-date";
import { formatMoney } from "@/utils/format-money";
import { CardChartHomeView } from "@/views/home/card-chart-home-view";
import { useEffect, useState } from "react";

export default function Page() {
  const [home, setHome] = useState<IHome>();
  const { obter } = useHomeApi();
  const { borderRadius, shadow, cores, backgroundColor } = useThemeApp();
  const { guiaDePesca } = useContextGuiaDePesca();
  const { localizacao } = useContextGeoLocalizacao();

  const labels = home?.transacoes?.map((d) => formatDate(d.data)) ?? [];
  const valores = home?.transacoes?.map((d) => d.valor) ?? [];

  async function init() {
    if (localizacao && !home) {
      const response = await obter.fetch(
        localizacao.latitude,
        localizacao.longitude
      );
      if (response) {
        setHome(response);
      }
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localizacao]);

  return (
    <BoxApp padding="1rem" width="100%" height="100%">
      <BoxApp
        display="flex"
        flexDirection="column"
        gap="1rem"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {obter.loading && <LoadingApp />}
        <GridApp container spacing={2}>
          <GridApp item xs={12} width="100%" sm={6}>
            {home?.agendaDeHoje && (
              <BoxApp
                boxShadow={shadow}
                borderRadius={borderRadius}
                overflowy="auto"
                width="100%"
                height="100%"
                padding="1rem"
                display="flex"
                alignItems="start"
                flexDirection="column"
                gap="1rem"
                backgroundColor={backgroundColor.card}
              >
                <BoxApp display="flex" width="100%">
                  <TextApp
                    fontSize="1.2rem"
                    fontWeight={600}
                    titulo={"Bem-vindo de volta,"}
                  />
                  <TextApp
                    fontSize="1.2rem"
                    fontWeight={600}
                    titulo={guiaDePesca?.pessoa.nome}
                    color="primary"
                  />
                </BoxApp>
                <TextApp titulo="Seu próximo destino de pesca está a um clique." />
                <DividerApp width="100%" />
                <BoxApp
                  width="100%"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <IconApp
                    color={cores.primary.main}
                    icon={listaDeIcones.pescaria}
                  />
                  <TextApp
                    titulo="Agenda"
                    fontWeight={600}
                    fontSize="1.2rem"
                    color="primary"
                  />
                </BoxApp>
                {home.agendaDeHoje.length === 0 ? (
                  <TextApp titulo="Nenhuma pescaria agendada para hoje." />
                ) : (
                  <>
                    <TextApp
                      fontWeight={600}
                      color="primary"
                      titulo={`Hoje: ${
                        formatDate(home.agendaDeHoje[0].dataDeAgendamento) ?? ""
                      }`}
                    />
                    {home.agendaDeHoje.map((agenda, index) => {
                      const status = StatusAgendaPescariaColor[agenda.status];
                      const statusDescricao =
                        opcoesStatusAgendaPescaria.find(
                          (x) => x.id === agenda.status
                        )?.descricao || "";
                      return (
                        <BoxApp
                          key={agenda.id}
                          display="flex"
                          gap="0.5rem"
                          alignItems="center"
                          flexDirection="column"
                          width="100%"
                        >
                          <BoxApp
                            display="flex"
                            gap="0.5rem"
                            alignItems="center"
                            width="100%"
                          >
                            <TextApp titulo={`${agenda.pescaria.titulo}: `} />
                            <BoxApp
                              backgroundColor={status}
                              padding="0.1rem"
                              borderRadius={borderRadius}
                              width="100px"
                              textAlign="center"
                            >
                              <TextApp
                                color="white"
                                titulo={`${statusDescricao}`}
                              />
                            </BoxApp>
                          </BoxApp>
                          <BoxApp
                            display="flex"
                            flexDirection="column"
                            alignItems="start"
                            width="100%"
                          >
                            <TextApp
                              titulo={`Início: ${agenda.horaInicial ?? ""}`}
                            />
                            <TextApp
                              titulo={`Final: ${agenda.horaFinal ?? ""}`}
                            />
                          </BoxApp>
                          {index < home.agendaDeHoje.length - 1 && (
                            <DividerApp width="100%" />
                          )}
                        </BoxApp>
                      );
                    })}
                  </>
                )}
                <DividerApp width="100%" />
                {home.agendaDeAmanha.length === 0 ? (
                  <TextApp titulo="Nenhuma pescaria agendada para amanhã." />
                ) : (
                  <>
                    <TextApp
                      fontWeight={600}
                      color="primary"
                      titulo={`Amanhã: ${
                        formatDate(home.agendaDeAmanha[0].dataDeAgendamento) ??
                        ""
                      }`}
                    />
                    {home.agendaDeAmanha.map((agenda, index) => {
                      const status = StatusAgendaPescariaColor[agenda.status];
                      const statusDescricao =
                        opcoesStatusAgendaPescaria.find(
                          (x) => x.id === agenda.status
                        )?.descricao || "";
                      return (
                        <BoxApp
                          key={agenda.id}
                          display="flex"
                          gap="0.5rem"
                          alignItems="center"
                          flexDirection="column"
                          width="100%"
                        >
                          <BoxApp
                            display="flex"
                            gap="0.5rem"
                            alignItems="center"
                            width="100%"
                          >
                            <TextApp titulo={`${agenda.pescaria.titulo}: `} />
                            <BoxApp
                              backgroundColor={status}
                              padding="0.1rem"
                              borderRadius={borderRadius}
                              width="100px"
                              textAlign="center"
                            >
                              <TextApp
                                color="white"
                                titulo={`${statusDescricao}`}
                              />
                            </BoxApp>
                          </BoxApp>
                          <BoxApp
                            display="flex"
                            flexDirection="column"
                            alignItems="start"
                            width="100%"
                          >
                            <TextApp
                              titulo={`Início: ${agenda.horaInicial ?? ""}`}
                            />
                            <TextApp
                              titulo={`Final: ${agenda.horaFinal ?? ""}`}
                            />
                          </BoxApp>
                          {index < home.agendaDeAmanha.length - 1 && (
                            <DividerApp width="100%" />
                          )}
                        </BoxApp>
                      );
                    })}
                  </>
                )}
              </BoxApp>
            )}
          </GridApp>
          <GridApp item xs={12} width="100%" sm={6}>
            {home?.fatura && (
              <BoxApp
                boxShadow={shadow}
                borderRadius={borderRadius}
                overflowy="auto"
                width="100%"
                height="100%"
                padding="1rem"
                display="flex"
                alignItems="start"
                flexDirection="column"
                gap="1rem"
                backgroundColor={backgroundColor.card}
              >
                <TextApp
                  fontSize="1.2rem"
                  fontWeight={600}
                  titulo="Faturamento do mês"
                  color="primary"
                />
                <BoxApp width="100%">
                  <BoxApp
                    display="flex"
                    gap="0.5rem"
                    justifyContent="space-between"
                  >
                    <TextApp fontWeight={600} titulo={`Recebido:`} />
                    <TextApp
                      fontWeight={600}
                      color="success"
                      titulo={`${formatMoney(home.fatura.valorRecebido)}`}
                    />
                  </BoxApp>
                  <DividerApp width="100%" />
                  <BoxApp
                    display="flex"
                    gap="0.5rem"
                    justifyContent="space-between"
                  >
                    <TextApp fontWeight={600} titulo={`A receber:`} />
                    <TextApp
                      fontWeight={600}
                      color="success"
                      titulo={`${formatMoney(home.fatura.valorAReceber)}`}
                    />
                  </BoxApp>
                  <DividerApp width="100%" />
                  <BoxApp
                    display="flex"
                    gap="0.5rem"
                    justifyContent="space-between"
                  >
                    <TextApp fontWeight={600} titulo={`Total:`} />
                    <TextApp
                      fontWeight={600}
                      color="success"
                      titulo={`${formatMoney(home.fatura.valorTotal)}`}
                    />
                  </BoxApp>
                </BoxApp>
              </BoxApp>
            )}
          </GridApp>
        </GridApp>
        <Card sx={{ width: "100%", padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recebimentos Diários
            </Typography>

            <LineChart
              xAxis={[{ scaleType: "point", data: labels }]}
              series={[{ data: valores, label: "R$ Recebido" }]}
              height={300}
              margin={{ left: 10, right: 40 }}
            />
          </CardContent>
        </Card>
        <BoxApp flexGrow={1} width="100%">
          <GridApp container spacing={2}>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.informacoesDoMar?.alturasDaMare ?? []}
                dadosLabel={
                  home?.informacoesDoMar?.dias?.map((x) =>
                    obterHorarioDaData(x)
                  ) ?? []
                }
                tituloDados={`Maré (${
                  home?.informacoesDoMar?.unidadeDeMedida?.alturaDaMare ?? ""
                })`}
                area
              />
            </GridApp>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.informacoesDoMar?.temperaturasDoMar ?? []}
                dadosLabel={
                  home?.informacoesDoMar?.dias?.map((x) =>
                    obterHorarioDaData(x)
                  ) ?? []
                }
                tituloDados={`Temperatura do Mar (${
                  home?.informacoesDoMar?.unidadeDeMedida?.temperaturaDoMar ??
                  ""
                })`}
                area
              />
            </GridApp>
          </GridApp>
        </BoxApp>
        <BoxApp flexGrow={1} width="100%">
          <GridApp container spacing={2}>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.informacoesDoMar?.alturasDasOndas ?? []}
                dadosLabel={
                  home?.informacoesDoMar?.dias?.map((x) =>
                    obterHorarioDaData(x)
                  ) ?? []
                }
                tituloDados={`Ondas (${
                  home?.informacoesDoMar?.unidadeDeMedida?.alturaDaOnda ?? ""
                })`}
                area
              />
            </GridApp>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.clima?.velocidadeDoVento ?? []}
                dadosLabel={
                  home?.clima?.dias?.map((x) => obterHorarioDaData(x)) ?? []
                }
                tituloDados={`Velocidade do vento (${
                  home?.clima?.unidadeDeMedida?.velocidadeDoVento ?? ""
                })`}
                area
              />
            </GridApp>
          </GridApp>
        </BoxApp>
        <BoxApp flexGrow={1} width="100%">
          <GridApp container spacing={2}>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.clima?.direcaoDoVento ?? []}
                dadosLabel={
                  home?.clima?.dias?.map((x) => obterHorarioDaData(x)) ?? []
                }
                tituloDados={`Direção do vento (${
                  home?.clima?.unidadeDeMedida?.direcaoDoVento ?? ""
                })`}
                area
              />
            </GridApp>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.clima?.temperaturas ?? []}
                dadosLabel={
                  home?.clima?.dias?.map((x) => obterHorarioDaData(x)) ?? []
                }
                tituloDados={`Temperatura (${
                  home?.clima?.unidadeDeMedida?.temperatura ?? ""
                })`}
                area
              />
            </GridApp>
          </GridApp>
        </BoxApp>
        <BoxApp flexGrow={1} width="100%">
          <GridApp container spacing={2}>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.clima?.pressaoAtmosferica ?? []}
                dadosLabel={
                  home?.clima?.dias?.map((x) => obterHorarioDaData(x)) ?? []
                }
                tituloDados={`Pressão atmosférica (${
                  home?.clima?.unidadeDeMedida?.pressaoAtmosferica ?? ""
                })`}
                area
              />
            </GridApp>
            <GridApp width="100%" item xs={12} sm={6}>
              <CardChartHomeView
                backgroundColor={backgroundColor.card}
                shadown={shadow}
                borderRadius={borderRadius}
                dados={home?.clima?.chuva ?? []}
                dadosLabel={
                  home?.clima?.dias?.map((x) => obterHorarioDaData(x)) ?? []
                }
                tituloDados={`Chuva (${
                  home?.clima?.unidadeDeMedida?.chuva ?? ""
                })`}
                area
              />
            </GridApp>
          </GridApp>
        </BoxApp>
      </BoxApp>
    </BoxApp>
  );
}
