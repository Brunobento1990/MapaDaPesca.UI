import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { IconApp } from "../icon/icon-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { Box } from "@mui/material";
import { useThemeApp } from "@/hooks/use-theme-app";

interface GaleriaAppProps {
  excluir?: (index: number) => void;
  readonly?: boolean;
  imagens: ITipoGaleira[];
  height?: string | number;
}

interface ITipoGaleira {
  id: string;
  url: string;
  descricao?: string;
}

export default function GaleriaApp(props: GaleriaAppProps) {
  const { cores, borderRadius } = useThemeApp();
  return (
    <Box
      sx={{
        width: "100%",
        height: props.height ?? 450,
        overflowY: "scroll",
        marginTop: "1rem",
      }}
    >
      <ImageList cols={3} gap={8}>
        {props.imagens.map((item, index) => (
          <ImageListItem
            key={item.id || index}
            sx={{
              borderRadius: borderRadius,
              border: `1px solid ${cores.divider}`,
            }}
          >
            <img
              srcSet={`${item.url}`}
              src={`${item.url}`}
              alt={`${item.id || index}`}
              loading="lazy"
              style={{ borderRadius: borderRadius }}
            />
            <ImageListItemBar
              title={item.descricao}
              actionIcon={
                props.excluir && !props.readonly ? (
                  <IconButton
                    onClick={() => {
                      if (props.excluir) {
                        props.excluir(index);
                      }
                    }}
                    sx={{ color: "white" }}
                  >
                    <IconApp color="red" icon={listaDeIcones.excluir} />
                  </IconButton>
                ) : null
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
