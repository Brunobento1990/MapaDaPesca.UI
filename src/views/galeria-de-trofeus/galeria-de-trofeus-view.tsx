"use client";

import { useGaleriaDeTrofeuApi } from "@/api/use/use-galeria-de-trofeu-api";
import { BoxApp } from "@/component/box/box-app";
import GaleriaApp from "@/component/galeria/galeria-app";
import { InputFile } from "@/component/input/input-file";
import { TextApp } from "@/component/text/text-app";
import { useArquivo } from "@/hooks/use-arquivo";
import {
  IGaleriaDeTrofeu,
  IGaleriaDeTrofeuAdicionar,
} from "@/types/galeria-de-trofeu";
import { useEffect, useState } from "react";
import { ModalAdicionar } from "./modal-adicionar";
import { LoadingApp } from "@/component/loading/loading-app";
import { removerItemDeArrayPorIndex } from "@/utils/remover-item-array";
import { useModal } from "@/component/modal/use-modal";

export function GaleriaDeTrofeusView() {
  const { resolveUploadImagem } = useArquivo();
  const { excluir, obter } = useGaleriaDeTrofeuApi();
  const { show } = useModal();
  const [galeria, setGaleria] = useState<IGaleriaDeTrofeu[]>([]);
  const [novasFotos, setNovasFotos] = useState<IGaleriaDeTrofeuAdicionar[]>([]);
  const [openModal, setOpenModal] = useState(false);

  async function init() {
    const response = await obter.fetch();
    if (response) {
      setGaleria(response);
    }
  }

  async function handleAdicionarFotos(files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }
    // eslint-disable-next-line prefer-const
    let fotos: IGaleriaDeTrofeuAdicionar[] = [];
    for (const file of files) {
      const url = await resolveUploadImagem(file);
      fotos.push({
        base64: url.src,
      });
    }
    setNovasFotos(fotos);
    setOpenModal(fotos.length > 0);
  }

  async function excluirFoto(index: number) {
    if (!index) {
      return;
    }
    const foto = galeria[index];
    if (!foto) {
      return;
    }
    const response = await excluir.fetch(foto.id);
    if (response) {
      setGaleria(removerItemDeArrayPorIndex(index, galeria));
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoxApp>
      {novasFotos.length > 0 && (
        <ModalAdicionar
          close={(novasFotos) => {
            setOpenModal(false);
            if (novasFotos) {
              setGaleria((prev) => [...prev, ...novasFotos]);
            }
            setNovasFotos([]);
          }}
          open={openModal}
          fotos={novasFotos}
        />
      )}
      {excluir.loading && <LoadingApp comBox texto="Excluindo foto..." />}
      {galeria.length > 0 ? (
        <GaleriaApp
          excluir={(i) => {
            show({
              confirmarPromise: () => excluirFoto(i),
              mensagem: "Deseja realmente excluir a foto?",
            });
          }}
          imagens={galeria}
        />
      ) : (
        <BoxApp textAlign="center" padding="20px">
          <TextApp fontWeight={600} titulo="Nenhuma imagem encontrada" />
        </BoxApp>
      )}
      <InputFile
        multiple
        allowedTypes={["image/*"]}
        onChange={handleAdicionarFotos}
      />
    </BoxApp>
  );
}
