import { useNavigateApp } from "@/hooks/use-navigate-app";
import { ReactNode, useState } from "react";
import { ButtonApp } from "../button/button-app";
import { BoxApp } from "../box/box-app";
import { InputApp } from "../input/input-app";

interface propsHeaderTable {
  urlAdd?: string;
  notBtnAdd?: boolean;
  pesquisar: (search?: string) => void;
  childrenHeader?: ReactNode;
  acoesExtras?: React.ReactNode;
}

export function HeaderTable(props: propsHeaderTable) {
  const { navigate } = useNavigateApp();
  const [search, setSearch] = useState("");
  function handleBtnAdicionar() {
    if (props.notBtnAdd || !props.urlAdd) {
      return <></>;
    }

    return (
      <ButtonApp
        title="Adicionar"
        onClick={() => navigate(props.urlAdd)}
        variant="contained"
      />
    );
  }
  
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="20px"
      width="100%"
      //height='45px'
    >
      {handleBtnAdicionar()}
      <form
        style={{
          width: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (props.pesquisar) {
            props.pesquisar(search?.length === 0 ? undefined : search);
          }
        }}
      >
        <BoxApp display="flex" alignItems="center" gap="0.5rem">
          <InputApp
            size="small"
            label="Pesquisar"
            name="pesquisar"
            id="pesquisar"
            value={search}
            onChange={(_, e) => {
              setSearch(e);
              if (e?.length === 0) {
                props.pesquisar(undefined);
              }
            }}
            endIcon="ic:twotone-search"
            fullWidth
          />

          {props.acoesExtras && props.acoesExtras}
        </BoxApp>
      </form>
      {props.childrenHeader}
    </BoxApp>
  );
}
