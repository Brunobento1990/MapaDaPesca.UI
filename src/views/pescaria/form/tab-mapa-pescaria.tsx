import { IFormikAdapter } from "@/adapters/formik-adapters";
import { MapaApp } from "@/component/mapa/mapa-app";
import { TextApp } from "@/component/text/text-app";
import { IPescaria } from "@/types/pescaria";

interface TabMapaPescariaProps {
  form: IFormikAdapter<IPescaria>;
  readonly?: boolean;
}

export function TabMapaPescaria({ form, readonly }: TabMapaPescariaProps) {
  return (
    <>
      <TextApp
        fontWeight={600}
        marginBotton="1rem"
        titulo="O ponto marcado será usado para indicar a área onde você atua, ajudando pescadores a encontrar e contratar seu serviço de guia de pesca com mais facilidade."
      />
      {!readonly && (
        <MapaApp
          lat={form.values.latitude}
          lng={form.values.longitude}
          onClick={(lat, lng) => {
            form.setValue({
              latitude: lat,
              longitude: lng,
            });
          }}
        />
      )}
    </>
  );
}
