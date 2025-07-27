"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IGeoLocalizacao {
  latitude: number;
  longitude: number;
}

interface ILocalizacao {
  localizacao: IGeoLocalizacao | undefined;
  permissaoLocalizacao: boolean;
}

interface IGeoLocalizacaoProvider {
  children: ReactNode;
}

export const GeoLocalizacaoContext = createContext({} as ILocalizacao);

export function GeoLocalizacaoProvider(props: IGeoLocalizacaoProvider) {
  const [localizacao, setLocalizacao] = useState<IGeoLocalizacao | undefined>();
  const [permissaoLocalizacao, setPermissaoLocalizacao] =
    useState<boolean>(false);

  function init() {
    obterLocalizacao();
    setPermissaoLocalizacao(localizacao === undefined);
  }

  function obterLocalizacao() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocalizacao({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GeoLocalizacaoContext.Provider
      value={{
        localizacao: localizacao,
        permissaoLocalizacao: permissaoLocalizacao,
      }}
    >
      {props.children}
    </GeoLocalizacaoContext.Provider>
  );
}

export const useContextGeoLocalizacao = () => useContext(GeoLocalizacaoContext);
