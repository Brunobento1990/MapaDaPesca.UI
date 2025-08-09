"use client";

import { useGuiaDePescaApi } from "@/api/use/use-guia-de-pesca-api";
import { BoxApp } from "@/component/box/box-app";
import { ButtonApp } from "@/component/button/button-app";
import { DividerApp } from "@/component/divider/divider-app";
import GaleriaApp from "@/component/galeria/galeria-app";
import { IconApp } from "@/component/icon/icon-app";
import { LoadingApp } from "@/component/loading/loading-app";
import { ModalChildren } from "@/component/modal/modal-children";
import { TextApp } from "@/component/text/text-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { rotasApp } from "@/config/rotas-app";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useThemeApp } from "@/hooks/use-theme-app";
import { IEmbarcacao } from "@/types/embarcacao";
import { IGuiaDePesca } from "@/types/guia-de-pesca";
import { formatMoney } from "@/utils/format-money";
import { maskPhone } from "@/utils/marcara-telefone";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export function PerfilView() {
  const [guia, setGuia] = useState<IGuiaDePesca>();
  const [modalEmbarcacao, setModalEmbarcacao] = useState(false);
  const [embarcacaoSelecionada, setEmbarcacaoSelecionada] =
    useState<IEmbarcacao>();
  const { borderRadius, shadow, backgroundColor, cores } = useThemeApp();
  const { perfil } = useGuiaDePescaApi();
  const { params, navigate } = useNavigateApp();

  async function init() {
    const response = await perfil.fetch(params.id as string);
    if (response) {
      setGuia(response);
    }
  }

  function fecharModalEmbarcacao() {
    setModalEmbarcacao(false);
    setEmbarcacaoSelecionada(undefined);
  }

  function abrirModalEmbarcacao(embarcacao: IEmbarcacao) {
    setEmbarcacaoSelecionada(embarcacao);
    setModalEmbarcacao(true);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoxApp
      width="100vw"
      overflowx="hidden"
      overflowy="auto"
      height="100vh"
      padding="1rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor={backgroundColor.default}
    >
      {perfil.loading && <LoadingApp comBox />}
      {guia && (
        <>
          <ModalChildren
            retirarFooter
            open={modalEmbarcacao}
            close={fecharModalEmbarcacao}
            fullWidth
            maxWidth="md"
          >
            <BoxApp display="flex" alignItems="center" gap="0.5rem">
              <IconApp icon={listaDeIcones.barco} />
              <TextApp
                fontSize="1rem"
                titulo={`${embarcacaoSelecionada?.nome}`}
              />
            </BoxApp>
            {embarcacaoSelecionada?.motor && (
              <BoxApp display="flex" alignItems="center" gap="0.5rem">
                <IconApp icon={listaDeIcones.motor} />
                <TextApp fontWeight={600} titulo="Motor:" />
                <TextApp titulo={`${embarcacaoSelecionada.motor}`} />
              </BoxApp>
            )}
            {embarcacaoSelecionada?.motorEletrico && (
              <BoxApp display="flex" alignItems="center" gap="0.5rem">
                <IconApp icon={listaDeIcones.motorEletrico} />
                <TextApp fontWeight={600} titulo="Motor Elétrico:" />
                <TextApp titulo={`${embarcacaoSelecionada.motorEletrico}`} />
              </BoxApp>
            )}
            {embarcacaoSelecionada?.galeria && (
              <GaleriaApp
                height="100%"
                imagens={embarcacaoSelecionada.galeria}
              />
            )}
          </ModalChildren>
          <BoxApp
            height="100%"
            maxWidth="750px"
            display="flex"
            gap="1rem"
            flexDirection="column"
          >
            <BoxApp
              boxShadow={shadow}
              borderRadius={borderRadius}
              backgroundColor={backgroundColor.card}
              display="flex"
              gap="1rem"
              padding="1rem"
              flexDirection="column"
            >
              <BoxApp display="flex" justifyContent="space-between" gap="1rem">
                <BoxApp display="flex" gap="1rem">
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={guia.pessoa.urlFoto}
                    alt={guia.pessoa.nome}
                  />
                  <BoxApp display="flex" gap="1rem" flexDirection="column">
                    <BoxApp display="flex" alignItems="center" gap="0.5rem">
                      <IconApp icon={listaDeIcones.pessoas} />
                      <TextApp fontWeight={600} titulo={guia.pessoa.nome} />
                    </BoxApp>
                    <BoxApp display="flex" alignItems="center" gap="0.5rem">
                      <IconApp icon={listaDeIcones.whatsApp} />
                      <TextApp titulo={maskPhone(guia.pessoa.telefone)} />
                    </BoxApp>
                  </BoxApp>
                </BoxApp>
                <BoxApp>
                  <ButtonApp
                    onClick={() =>
                      navigate(`${rotasApp.agendaDoGuia}/${guia.id}`)
                    }
                    title="Agendar"
                  />
                </BoxApp>
              </BoxApp>
            </BoxApp>
            <BoxApp
              boxShadow={shadow}
              borderRadius={borderRadius}
              backgroundColor={backgroundColor.card}
              display="flex"
              gap="1rem"
              padding="1rem"
              flexDirection="column"
            >
              <DividerApp chip="Pescarias" width="100%" />
              {guia.pescarias?.map((pescaria, index) => {
                const ultimaLinha = index === (guia.pescarias?.length ?? 0) - 1;
                return (
                  <BoxApp
                    key={pescaria.id}
                    display="flex"
                    flexDirection="column"
                    gap="0.5rem"
                  >
                    <TextApp titulo={pescaria.titulo} fontWeight={600} />
                    <TextApp titulo={pescaria.descricao} />
                    <BoxApp
                      display="flex"
                      justifyContent="space-between"
                      alignItems="end"
                    >
                      <BoxApp
                        display="flex"
                        flexDirection="column"
                        gap="0.5rem"
                      >
                        {pescaria.quantidadePescador && (
                          <BoxApp
                            display="flex"
                            alignItems="center"
                            gap="0.5rem"
                          >
                            <IconApp icon={listaDeIcones.pessoas} />
                            <TextApp fontWeight={600} titulo="Qtd pescador:" />
                            <TextApp
                              titulo={`${pescaria.quantidadePescador}`}
                            />
                          </BoxApp>
                        )}
                        {pescaria.horaInicial && (
                          <BoxApp
                            display="flex"
                            alignItems="center"
                            gap="0.5rem"
                          >
                            <IconApp
                              color={cores.primary.main}
                              icon={listaDeIcones.calendario}
                            />
                            <TextApp fontWeight={600} titulo="Hora inicial:" />
                            <TextApp titulo={`${pescaria.horaInicial}`} />
                          </BoxApp>
                        )}
                        {pescaria.horaFinal && (
                          <BoxApp
                            display="flex"
                            alignItems="center"
                            gap="0.5rem"
                          >
                            <IconApp
                              color={cores.primary.main}
                              icon={listaDeIcones.calendario}
                            />
                            <TextApp fontWeight={600} titulo="Hora final:" />
                            <TextApp titulo={`${pescaria.horaFinal}`} />
                          </BoxApp>
                        )}
                        <BoxApp display="flex" alignItems="center" gap="0.5rem">
                          <IconApp icon={listaDeIcones.dinheiro} />
                          <TextApp fontWeight={600} titulo="Valor:" />
                          <TextApp
                            fontWeight={600}
                            color="success"
                            titulo={`${formatMoney(pescaria.valor)}`}
                          />
                        </BoxApp>
                      </BoxApp>
                      {pescaria.embarcacao && (
                        <ButtonApp
                          title="Embarcação"
                          endIcon={listaDeIcones.barco}
                          onClick={() =>
                            abrirModalEmbarcacao(pescaria.embarcacao!)
                          }
                        />
                      )}
                    </BoxApp>
                    {!ultimaLinha && <DividerApp />}
                  </BoxApp>
                );
              })}
            </BoxApp>
            {guia.galeriaDeTrofeu && (
              <BoxApp
                boxShadow={shadow}
                borderRadius={borderRadius}
                backgroundColor={backgroundColor.card}
                display="flex"
                gap="1rem"
                padding="1rem"
                flexDirection="column"
              >
                <DividerApp chip="Galeria de Troféus" width="100%" />
                <GaleriaApp height="100%" imagens={guia.galeriaDeTrofeu} />
              </BoxApp>
            )}
          </BoxApp>
        </>
      )}
    </BoxApp>
  );
}
