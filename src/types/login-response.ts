import { IGuiaDePesca } from "./guia-de-pesca";

export interface ILoginResponse {
  token: string;
  tokenSchema: string;
  refreshToken: string;
  guiaDePesca: IGuiaDePesca;
}
