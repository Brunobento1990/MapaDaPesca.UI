import { CircularProgress, Paper, TextField } from "@mui/material";
import { Fragment, useDeferredValue, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { ButtonApp } from "../button/button-app";
import { listaDeIcones } from "@/config/lista-de-icones";
import { tipoStatusRequisicao, TypeMethod, useApi } from "@/hooks/use-api";
import { IPaginacaoResponse } from "@/types/paginacao";

interface propsDropDown {
  value: any;
  onChange?: (id: string, newValue?: any) => void;
  label: string;
  keyLabel: string | string[];
  url: string;
  size?: "small" | "medium";
  id: string;
  required?: boolean;
  helperText?: any;
  error?: boolean;
  method?: TypeMethod;
  readonly?: boolean;
  retornarObjetoCompleto?: boolean;
  orderBy?: string;
  autoFocus?: boolean;
  renderOption?: (props: any, value: any) => React.ReactNode;
  asc?: boolean;
  textoBotaoNovoRegistro?: string;
  onClickBotaoNovoRegistro?: (search?: string) => void;
  textoNaoEncontrado?: string;
  startAdornment?: React.ReactNode;
  body?: any;
}

interface propsCustomListbox extends React.HTMLAttributes<HTMLUListElement> {
  textoBotaoNovoRegistro?: string;
  onClickBotaoNovoRegistro?: (search?: string) => void;
  valorDigitado?: string;
}

export function CustomListbox(props: propsCustomListbox) {
  const {
    children,
    textoBotaoNovoRegistro,
    onClickBotaoNovoRegistro,
    valorDigitado,
    ...other
  } = props;

  return (
    <Paper
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
      }}
      component="ul"
      {...other}
    >
      {children}
      {onClickBotaoNovoRegistro && (
        <li
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "8px",
          }}
        >
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClickBotaoNovoRegistro(valorDigitado);
            }}
            style={{ width: "100%" }}
          >
            <ButtonApp
              fullWidth
              title={textoBotaoNovoRegistro}
              endIcon={listaDeIcones.plus}
            />
          </div>
        </li>
      )}
    </Paper>
  );
}

export function DropDownAutoFetchApp(props: propsDropDown) {
  const { action, status } = useApi({
    method: props.method ?? "GET",
    url: props.url,
    naoRenderizarResposta: true,
  });
  const [values, setValues] = useState<any[]>([]);
  const [valuesOriginais, setValuesOriginais] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const defer = useDeferredValue(search);
  const textoNaoEncontrado = props.textoNaoEncontrado ?? "S/R";
  const loading = status === tipoStatusRequisicao.loading;
  const labelValueSelecionado = getLabel(props?.value);

  function getLabel(value: any) {
    if (!value) return "";

    const labels = Array.isArray(props.keyLabel)
      ? props.keyLabel
      : [props.keyLabel];

    return labels
      .map((key) => {
        if (key?.includes(".")) {
          const keys = key.split(".");
          let valorFinal = value;
          // Corrigido o loop para percorrer do início ao fim
          for (let i = 0; i < keys.length; i++) {
            valorFinal = valorFinal?.[keys[i]];
            // Adicionado verificação de null/undefined
            if (valorFinal == null) break;
          }
          return valorFinal;
        }

        return value[key];
      })
      .filter(Boolean)
      .join(" - ");
  }

  async function init() {
    if (props.readonly) {
      return;
    }

    const response = await action<IPaginacaoResponse>({
      urlParams: `?skip=0&take=50&orderBy=dataDeCadastro&asc=false&search=${
        defer ?? ""
      }`,
    });

    if (Array.isArray(response?.lista)) {
      if (props.retornarObjetoCompleto) {
        setValuesOriginais(response?.lista ?? []);
      }
      setValues(
        response.lista.map((value: any) => {
          const newLabel = getLabel(value);
          return {
            id: value?.id,
            label: newLabel ? newLabel : textoNaoEncontrado,
          };
        })
      );
    } else if (Array.isArray(response)) {
      if (props.retornarObjetoCompleto) {
        setValuesOriginais(response ?? []);
      }
      setValues(
        response.map((value: any) => {
          const newLabel = getLabel(value);
          return {
            id: value?.id,
            label: newLabel ? newLabel : textoNaoEncontrado,
          };
        })
      );
    }
  }

  function renderOptions(params: any, value: any) {
    if (props.renderOption) {
      return props.renderOption(
        params,
        valuesOriginais.find((x) => x.id === value.id)
      );
    }

    return null;
  }

  const value =
    typeof props.value === "string" && props.value.length === 0
      ? null
      : props.value === undefined
      ? null
      : {
          id: props?.value?.id,
          label: labelValueSelecionado
            ? labelValueSelecionado
            : props?.value?.id
            ? textoNaoEncontrado
            : "",
        };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defer]);

  return (
    <Autocomplete
      noOptionsText={"Não há registros"}
      id={props.id}
      value={value}
      loading={loading}
      loadingText="Carregando..."
      getOptionLabel={(opt) => `${opt?.label || ""}`}
      onChange={(_, newValue: any, reason) => {
        const newV = reason !== "clear" ? newValue : undefined;
        if (props.onChange) {
          if (props.retornarObjetoCompleto) {
            props.onChange(
              props.id,
              valuesOriginais.find((x) => x?.id === newV?.id)
            );
            return;
          }
          props.onChange(props.id, newV?.id);
        }
      }}
      renderOption={props.renderOption ? renderOptions : undefined}
      slotProps={{
        paper: {
          component: (props2) => (
            <CustomListbox
              {...props2}
              textoBotaoNovoRegistro={props.textoBotaoNovoRegistro}
              onClickBotaoNovoRegistro={props.onClickBotaoNovoRegistro}
              valorDigitado={search}
            />
          ),
        },
      }}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      readOnly={props.readonly}
      fullWidth
      options={values}
      size={props.size ?? "small"}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          autoFocus={props.autoFocus}
          value={search}
          required={props.required}
          helperText={props.helperText}
          error={props.error}
          disabled={props.readonly}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: props.startAdornment,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
