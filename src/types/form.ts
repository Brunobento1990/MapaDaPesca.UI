import { ReactNode } from "react";

export type FormAction = "create" | "edit" | "view";

export interface IFormTypes {
  action: FormAction;
}

export interface propsFormRow {
  children: ReactNode;
  spacing?: number;
  xs?: number;
  md?: number;
  sm?: number;
  marginTop?: string;
  width?: string;
  direction?: "column" | "row";
  borderBottom?: string;
  backGroudnColor?: string;
  marginBotton?: string;
  padding?: string;
  borderRadius?: string;
}
