import { IBase } from "./base";
import { IPessoa } from "./pessoa";

export interface IGuiaDePesca extends IBase {
  primeiroAcesso: boolean;
  pessoa: IPessoa;
}
