import { useNavigateApp } from "@/hooks/use-navigate-app";
import { useModal } from "../modal/use-modal";
import { useApi } from "@/hooks/use-api";
import { IconButtonApp } from "../icon/icon-button-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { BoxApp } from "../box/box-app";

interface propsDefaultColumns {
  urlDelete?: string;
  urlEdit?: string;
  urlView?: string;
  reload?: () => Promise<any>;
  nomeColunaAcoes?: string;
}

export function DefaultColuns(props: propsDefaultColumns) {
  const { navigate } = useNavigateApp();
  const modal = useModal();
  const { action } = useApi({
    method: "DELETE",
    url: props.urlDelete ?? "",
  });

  async function excluir(arg: any) {
    modal.show({
      confirmarPromise: async () => {
        await action<any>({
          urlParams: `?id=${arg?.id}`,
          message: `Registro excluido com sucesso!`,
        });
        modal.close();
        if (props.reload) {
          await props.reload();
        }
      },
      mensagem: `Deseja realmente excluir o registro?`,
    });
  }

  function renderColunaVisualizar(params: any) {
    if (!props.urlView) {
      return null;
    }

    return (
      <IconButtonApp
        onClick={() => navigate(`${props.urlView}/${params.id}`)}
        icon={listaDeIcones.visualizar}
      />
    );
  }

  function renderColunaEditar(params: any) {
    if (!props.urlEdit) {
      return null;
    }
    return (
      <IconButtonApp
        onClick={() => navigate(`${props.urlEdit}/${params.id}`)}
        icon={listaDeIcones.editar}
      />
    );
  }

  function renderColunarInativar(params: any) {
    if (!props.urlDelete) {
      return null;
    }

    return (
      <IconButtonApp
        onClick={() => excluir(params)}
        icon={listaDeIcones.excluir}
      />
    );
  }

  function handleColuns(params: any) {
    return (
      <BoxApp display="flex">
        {renderColunaVisualizar(params)}
        {renderColunaEditar(params)}
        {renderColunarInativar(params)}
      </BoxApp>
    );
  }

  const defaultColumns: any = {
    field: "actions",
    headerName: props.nomeColunaAcoes ?? "Ações",
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => {
      return handleColuns(params);
    },
  };

  return defaultColumns;
}
