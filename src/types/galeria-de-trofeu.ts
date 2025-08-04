import { IBase } from "./base";

export interface IGaleriaDeTrofeu extends IBase {
  url: string;
  descricao?: string;
}

export interface IGaleriaDeTrofeuAdicionar {
  base64: string;
  descricao?: string;
}
