import { IFormikAdapter } from "@/adapters/formik-adapters";
import { BoxApp } from "@/component/box/box-app";
import { CalendarioApp } from "@/component/calendario/calendario-app";
import { DividerApp } from "@/component/divider/divider-app";
import { TextApp } from "@/component/text/text-app";
import { IPescaria } from "@/types/pescaria";
import { formatDate } from "@/utils/format-date";
import moment from "moment";

interface TabDataPescariaProps {
  form: IFormikAdapter<IPescaria>;
  readonly?: boolean;
}

export function TabDataPescaria({ form, readonly }: TabDataPescariaProps) {
  return (
    <>
      <BoxApp
        padding="1rem 0rem 1rem 0rem"
        width="100%"
        display="flex"
        overflowy="auto"
        flexDirection="column"
        gap="1rem"
      >
        <DividerApp chip="Bloquear datas sem agenda" />
        <TextApp
          titulo="Só serão salvas as datas do mês atual"
          color="primary"
        />
        <CalendarioApp
          readonly={readonly}
          setValues={(datas) => {
            form.setValue({
              datasBloqueadas: datas.map((x: any) => {
                return {
                  id: "",
                  data: moment(x).toJSON(),
                };
              }),
            });
          }}
          values={form.values.datasBloqueadas?.map(
            (x) => formatDate(x.data) ?? ""
          )}
        />
      </BoxApp>
    </>
  );
}
