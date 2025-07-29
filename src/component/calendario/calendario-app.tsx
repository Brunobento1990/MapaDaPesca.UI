import { useThemeApp } from "@/hooks/use-theme-app";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

export const pt_br = {
  name: "pt_br",
  months: [
    ["Janeiro", "Jan"],
    ["Fevereiro", "Fev"],
    ["Março", "Mar"],
    ["Abril", "Abr"],
    ["Maio", "Mai"],
    ["Junho", "Jun"],
    ["Julho", "Jul"],
    ["Agosto", "Ago"],
    ["Setembro", "Set"],
    ["Outubro", "Out"],
    ["Novembro", "Nov"],
    ["Dezembro", "Dez"],
  ],
  weekDays: [
    ["Domingo", "Dom"],
    ["Segunda-feira", "Seg"],
    ["Terça-feira", "Ter"],
    ["Quarta-feira", "Qua"],
    ["Quinta-feira", "Qui"],
    ["Sexta-feira", "Sex"],
    ["Sábado", "Sáb"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["AM", "am"],
    ["PM", "pm"],
  ],
};

interface ICalendarioAppProps {
  values?: string[];
  setValues: (values: string[]) => void;
  multiple?: boolean;
}

export function CalendarioApp(props: ICalendarioAppProps) {
  const { cores } = useThemeApp();
  return (
    <DatePicker
      multiple={props.multiple}
      value={props.values ?? []}
      locale={pt_br as any}
      style={{
        border: `1px solid ${cores.primary.main}`,
        width: "100%",
        height: "50px"
      }}
      onChange={(dateObjects: any) => {
        const dates = Array.isArray(dateObjects)
          ? dateObjects.map((d) =>
              typeof d?.toDate === "function" ? d.toDate() : d
            )
          : [];
        props.setValues(dates);
      }}
      dateSeparator=" | "
      format="DD/MM/YYYY"
    />
  );
}
