import { TypeMethod, useApi } from "@/hooks/use-api";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { ISort, ISortingTable, TableApp } from "./table";
import { useNavigateApp } from "@/hooks/use-navigate-app";
import { IPaginacaoResponse } from "@/types/paginacao";
import { BoxApp } from "../box/box-app";
import { HeaderTable } from "./header";
import { LoadingApp } from "../loading/loading-app";
import { FooterTable } from "./footer";
import { DefaultColuns } from "./default-coluns";

interface tableProps {
  columns: any[];
  url: string;
  checkboxSelection?: boolean;
  urlDelete?: string;
  urlAdd?: string;
  urlView?: string;
  urlEdit?: string;
  notShowHeader?: boolean;
  notBtnAdd?: boolean;
  refreshPai?: boolean;
  nomeColunaAcoes?: string;
  desabilitarColunaAcoes?: boolean;
  metodo?: TypeMethod;
  childrenHeader?: ReactNode;
  minWidth?: number;
  orderBy?: string;
  order?: ISort;
  acoesExtras?: React.ReactNode;
}

export function TableIndex(props: tableProps) {
  const { navigate } = useNavigateApp();
  const [pagina, setPagina] = useState<number>(1);
  const [quantidadePorPagina, setQuantidadePorPagina] = useState<number>(15);
  const [sorting, setSorting] = useState<ISortingTable>({
    field: props.orderBy ?? "dataDeCadastro",
    sort: props.order ?? "desc",
  });
  const [quantidadePagina, setQuantidadePagina] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const { action, status } = useApi({
    method: props.metodo ?? "GET",
    url: props.url,
    naoRenderizarResposta: true,
    statusInicial: "loading",
  });

  async function refresh(searchP?: string) {
    const response = await action<IPaginacaoResponse>({
      urlParams: `?skip=${pagina}&take=${quantidadePorPagina}&orderBy=${
        sorting.field
      }&asc=${sorting.sort === "asc"}&search=${searchP ?? ""}`,
    });
    if (response && response.lista.length > 0) {
      setRows(response.lista);
      setQuantidadePagina(response.quantidadeDePaginas);
    } else {
      if (rows?.length > 0) {
        setRows([]);
      }
    }
  }

  const defaultColuns = DefaultColuns({
    urlDelete: props.urlDelete,
    urlEdit: props.urlEdit,
    urlView: props.urlView,
    reload: refresh,
    nomeColunaAcoes: props.nomeColunaAcoes,
  });

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, quantidadePorPagina, sorting, props.refreshPai]);

  const onDoubleClick = useCallback(
    (item: any) => navigate(`${props.urlEdit}/${item?.id}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  const onDoubleClickView = useCallback(
    (item: any) => navigate(`${props.urlView}/${item?.id}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  const newColumns = [...props.columns, defaultColuns];

  return (
    <BoxApp
      overflowy="auto"
      height="calc(100vh - 120px)"
      boxSizing="border-box"
      display="flex"
      flexDirection="column"
      gap=".5rem"
      width="100%"
      minWidth="600px"
    >
      {!props.notShowHeader && (
        <HeaderTable
          urlAdd={props.urlAdd}
          notBtnAdd={props.notBtnAdd}
          pesquisar={refresh}
          childrenHeader={props.childrenHeader}
          acoesExtras={props.acoesExtras}
        />
      )}
      {status === "loading" ? (
        <LoadingApp comBox height="calc(100vh - 220px)" />
      ) : (
        <>
          <TableApp
            onDoubleClick={
              !props.urlEdit
                ? !props.urlView
                  ? undefined
                  : onDoubleClickView
                : onDoubleClick
            }
            height="calc(100vh - 190px)"
            columns={newColumns}
            rows={rows}
            sorting={sorting}
            setSorting={setSorting}
            minWidth={props.minWidth}
            stickyHeader
          />
        </>
      )}
      <FooterTable
        setQuantidadePorPagina={setQuantidadePorPagina}
        pagina={pagina}
        setPagina={setPagina}
        quantidadePagina={quantidadePagina}
      />
    </BoxApp>
  );
}
