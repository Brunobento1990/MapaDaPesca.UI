import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { IconApp } from "../icon/icon-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { Box } from "@mui/material";

interface GaleriaAppProps {
  excluir?: (index: number) => void;
  readonly?: boolean;
  imagens: ITipoGaleira[];
}

interface ITipoGaleira {
  id: string;
  url: string;
}

export default function GaleriaApp(props: GaleriaAppProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 450,
        overflowY: "scroll",
        marginTop: "1rem",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8}>
        {props.imagens.map((item, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${item.url}`}
              src={`${item.url}`}
              alt={`${index}`}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              //title={item.title}
              position="top"
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
    // <ImageList
    //   sx={{
    //     width: "100%",
    //     height: 450,
    //     transform: "translateZ(0)",
    //   }}
    //   rowHeight={200}
    //   gap={1}
    // >
    //   {props.imagens.map((item, index) => {
    //     return (
    //       <ImageListItem key={index}>
    //         <img {...srcset(item.url)} alt={`${index}`} loading="lazy" />
    //         <ImageListItemBar
    //           sx={{
    //             background:
    //               "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
    //               "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    //           }}
    //           //title={item.title}
    //           position="top"
    //           actionIcon={
    //             props.excluir && !props.readonly ? (
    //               <IconButton
    //                 onClick={() => {
    //                   if (props.excluir) {
    //                     props.excluir(index);
    //                   }
    //                 }}
    //                 sx={{ color: "white" }}
    //               >
    //                 <IconApp icon={listaDeIcones.excluir} />
    //               </IconButton>
    //             ) : null
    //           }
    //           actionPosition="left"
    //         />
    //       </ImageListItem>
    //     );
    //   })}
    // </ImageList>
  );
}
