import { useContextGeoLocalizacao } from "@/contexts/geolocalizacao-context";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { LoadingApp } from "../loading/loading-app";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface IMapaAppProps {
  lat?: number;
  lng?: number;
  onClick?: (lat?: number, lng?: number) => void;
}

export function MapaApp(props: IMapaAppProps) {
  const { localizacao } = useContextGeoLocalizacao();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <LoadingApp comBox texto="Carregando mapa..." />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: props.lat || localizacao?.latitude || -23.5505,
        lng: props.lng || localizacao?.longitude || -46.6333,
      }}
      zoom={12}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e.latLng?.lat(), e.latLng?.lng());
        }
      }}
    >
      {props.lat && props.lng && (
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      )}
    </GoogleMap>
  );
}
