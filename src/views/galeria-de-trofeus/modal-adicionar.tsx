import { useGaleriaDeTrofeuApi } from "@/api/use/use-galeria-de-trofeu-api";
import { BoxApp } from "@/component/box/box-app";
import { InputApp } from "@/component/input/input-app";
import { ModalChildren } from "@/component/modal/modal-children";
import { useArquivo } from "@/hooks/use-arquivo";
import { useThemeApp } from "@/hooks/use-theme-app";
import {
  IGaleriaDeTrofeu,
  IGaleriaDeTrofeuAdicionar,
} from "@/types/galeria-de-trofeu";
import { Grid } from "@mui/material";
import { useState } from "react";

interface IModalAdicionarProps {
  fotos: IGaleriaDeTrofeuAdicionar[];
  open: boolean;
  close: (galeria?: IGaleriaDeTrofeu[]) => void;
}

export function ModalAdicionar(props: IModalAdicionarProps) {
  const { cores, borderRadius } = useThemeApp();
  const { recortarBase64 } = useArquivo();
  const { adicionar } = useGaleriaDeTrofeuApi();
  const [novasFotos, setNovasFotos] = useState<IGaleriaDeTrofeuAdicionar[]>(
    props.fotos
  );

  const handleDescricaoChange = (index: number, descricao: string) => {
    const novasFotosArray = [...novasFotos];
    novasFotosArray[index] = { ...novasFotosArray[index], descricao };
    setNovasFotos(novasFotosArray);
  };

  async function handleAdicionar() {
    const response = await adicionar.fetch(
      novasFotos.map((x) => {
        return {
          ...x,
          base64: recortarBase64(x.base64).base64,
        };
      })
    );
    if (response) {
      props.close(response);
    }
  }

  return (
    <ModalChildren
      fullWidth
      maxWidth="xl"
      open={props.open}
      action={handleAdicionar}
      textoButton="Adicionar fotos"
      close={() => props.close(undefined)}
      loading={adicionar.loading}
    >
      <Grid container spacing={2}>
        {novasFotos.map((foto, index) => (
          <Grid key={index}>
            <BoxApp
              border={`1px solid ${cores.divider}`}
              borderRadius={borderRadius}
              padding={"2"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="1rem"
            >
              <img
                src={foto.base64}
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                }}
                alt={`Foto ${index + 1}`}
              />

              <InputApp
                fullWidth
                id={`descricao-${index}`}
                label="Descrição"
                value={foto.descricao}
                onChange={(_, value) => handleDescricaoChange(index, value)}
                maxLength={255}
              />
            </BoxApp>
          </Grid>
        ))}
      </Grid>
    </ModalChildren>
  );
}
