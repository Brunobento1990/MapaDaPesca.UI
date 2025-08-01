import { InputAppProps } from "../input/input-app";
import { InputDataApp } from "../input/input-data-app";
import { FormItemRow } from "./form-item-row";

interface propsInputRowDateUnApp extends InputAppProps {
  xs?: number;
  md?: number;
  sm?: number;
  marginTop?: string;
}

export function FormInputDateRow(props: propsInputRowDateUnApp) {
  return (
    <FormItemRow {...props} marginTop={props.marginTop ?? "-16px"}>
      <InputDataApp {...props} />
    </FormItemRow>
  );
}
