import { BoxApp } from "@/component/box/box-app";
import { LineChart, lineElementClasses } from "@mui/x-charts";

const margin = { right: 24 };

interface CardChartHomeViewProps {
  dados: any[];
  dadosLabel: any[];
  tituloDados: string;
  area?: boolean;
  showMark?: boolean;
  shadown: string;
  borderRadius: string;
  backgroundColor: string;
}

export function CardChartHomeView(props: CardChartHomeViewProps) {
  return (
    <BoxApp
      boxShadow={props.shadown}
      borderRadius={props.borderRadius}
      overflowy="auto"
      width="100%"
      height="100%"
      backgroundColor={props.backgroundColor}
    >
      <LineChart
        height={300}
        series={[
          {
            data: props.dados,
            label: props.tituloDados,
            area: props.area,
            showMark: props.showMark,
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: props.dadosLabel,
          },
        ]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: "none",
          },
        }}
        yAxis={[{ width: 50 }]}
        margin={margin}
      />
    </BoxApp>
  );
}
