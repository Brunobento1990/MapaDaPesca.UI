import { useFormikAdapter } from "@/adapters/formik-adapters";
import { YupAdapter } from "@/adapters/yup-adapters";
import { pescariaRotasApi } from "@/api/rotas/pescaria-rotas-api";
import { useAgendaApi } from "@/api/use/use-agenda-api";
import { BoxApp } from "@/component/box/box-app";
import { DropDownApp } from "@/component/dropdown/drop-down-app";
import { DropDownAutoFetchApp } from "@/component/dropdown/drop-down-auto-fetch-app";
import { FormApp } from "@/component/form/form-app";
import { FormItemRow } from "@/component/form/form-item-row";
import { FormRow } from "@/component/form/form-row-app";
import { IconButtonApp } from "@/component/icon/icon-button-app";
import { InputApp } from "@/component/input/input-app";
import { InputFile } from "@/component/input/input-file";
import { ModalChildren } from "@/component/modal/modal-children";
import { TextApp } from "@/component/text/text-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { useArquivo } from "@/hooks/use-arquivo";
import {
  IAgendaPescaria,
  IAgendarPescaria,
  IGaleriaAgendamento,
  opcoesStatusAgendaPescaria,
} from "@/types/agenda-pescaria";
import { formatPadraoJson } from "@/utils/format-date";
import { Box, Slide } from "@mui/material";
import { useState } from "react";

interface ModalAgendamentoProps {
  open: boolean;
  selectedDate: string;
  fechar: (agenda: IAgendaPescaria) => void;
  confirmarEdicao: (agenda: IAgendaPescaria) => void;
  close: () => void;
  agendaSelecionada?: IAgendaPescaria;
}

export function ModalAgendamento(props: ModalAgendamentoProps) {
  const { agendarPescaria, editarPescaria } = useAgendaApi();
  const { resolveUploadImagem, recortarBase64 } = useArquivo();

  const form = useFormikAdapter<IAgendarPescaria>({
    onSubmit: agendar,
    initialValues: {
      ...props.agendaSelecionada,
      pescaria: props.agendaSelecionada?.pescaria,
      pescariaId: props.agendaSelecionada?.pescariaId || "",
      dataDeAgendamento:
        props.agendaSelecionada?.dataDeAgendamento ||
        formatPadraoJson(props.selectedDate),
      agendaPescariaId: props.agendaSelecionada?.id,
    },
    validationSchema: new YupAdapter().string("pescariaId").build(),
  });

  const total = form.values.galeria?.length ?? 0;
  const windowSize = 3;

  const [posicaoInicial, setPosicaoInicial] = useState(0);
  const [posicaoFinal, setPosicaoFinal] = useState(Math.min(windowSize, total));

  const [direction, setDirection] = useState<"left" | "right" | "up" | "down">(
    "left"
  );

  const handlePrev = () => {
    if (posicaoInicial > 0) {
      setDirection("right");
      setPosicaoInicial((prev) => prev - 1);
      setPosicaoFinal((prev) => Math.max(prev - 1, windowSize));
    }
  };

  const handleNext = () => {
    if (posicaoFinal < total) {
      setDirection("left");
      setPosicaoInicial((prev) => prev + 1);
      setPosicaoFinal((prev) => Math.min(prev + 1, total));
    }
  };

  function fecharModal(agenda: IAgendaPescaria) {
    props.fechar(agenda);
    form.limpar();
  }

  async function agendar() {
    const body = {
      ...form.values,
      galeria: form.values.galeria?.map((item) => ({
        id: item.id,
        url: recortarBase64(item.url).base64,
      })),
    };
    if (props.agendaSelecionada?.id) {
      const response = await editarPescaria.fetch(body);
      if (response) {
        props.confirmarEdicao(response);
      }
      return;
    }

    const response = await agendarPescaria.fetch(body);

    if (response) {
      fecharModal(response);
    }
  }

  async function upload(files: FileList) {
    // eslint-disable-next-line prefer-const
    let imagens: IGaleriaAgendamento[] = [];
    for (const file of Array.from(files)) {
      const resultado = await resolveUploadImagem(file);
      if (resultado) {
        imagens.push({
          id: "",
          url: resultado.src,
        });
      }
    }

    const novasImagens = [...(form.values.galeria || []), ...imagens];

    form.setValue({
      galeria: novasImagens,
    });

    setPosicaoFinal(
      novasImagens.length > 3 ? posicaoFinal + 3 : novasImagens.length
    );
  }

  const readonly =
    form.values.status === 3 && props.agendaSelecionada?.status === 3; //Cancelado
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
        readonly={readonly}
      >
        {readonly && (
          <BoxApp marginBottom="1rem">
            <TextApp
              color="error"
              fontWeight={600}
              titulo="Não é possível alterar agendamento cancelado"
            />
          </BoxApp>
        )}
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
              readonly={readonly}
              error={form.error("pescariaId")}
              helperText={form.helperText("pescariaId")}
            />
          </FormItemRow>
          <FormItemRow sm={3} xs={12}>
            <InputApp
              readonly={readonly}
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
              readonly={readonly}
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
              readonly={readonly}
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
              readonly={readonly}
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
              readonly={readonly}
              label="Observação"
              value={form.values.observacao}
              id="observacao"
              maxLength={255}
              onChange={form.onChange}
              fullWidth
            />
          </FormItemRow>
        </FormRow>
        <TextApp titulo="Galeria de fotos" fontWeight={600} />
        <InputFile
          multiple
          allowedTypes={["image/*"]}
          maxSizeInMB={5}
          onChange={upload}
        />
        {form.values.galeria && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            marginTop="1rem"
          >
            <IconButtonApp
              onClick={handlePrev}
              icon={listaDeIcones.setaParaEsquerda}
              disabled={posicaoInicial === 0}
            />
            <Box
              display="flex"
              overflow="hidden"
              width="100%"
              maxWidth={"500px"}
              justifyContent="center"
              padding={3}
            >
              {form.values.galeria
                .slice(posicaoInicial, posicaoFinal)
                .map((item, index) => {
                  const isMiddle = index === 1;
                  return (
                    <Slide
                      key={index}
                      in={true}
                      direction={direction}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Box
                        mx={2}
                        sx={{
                          transform: isMiddle
                            ? "translateY(-20px) scale(1.5)"
                            : "scale(1)",
                          transition: "transform 0.3s ease",
                          boxShadow: isMiddle
                            ? "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
                            : "0px 2px 6px rgba(0,0,0,0.1)",
                          borderRadius: "4px",
                        }}
                      >
                        <img
                          src={item.url}
                          alt={`Imagem ${index + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "3px",
                          }}
                        />
                      </Box>
                    </Slide>
                  );
                })}
            </Box>
            <IconButtonApp
              onClick={handleNext}
              icon={listaDeIcones.setaPraDireita}
              disabled={posicaoFinal >= total}
            />
          </Box>
        )}
      </FormApp>
    </ModalChildren>
  );
}
