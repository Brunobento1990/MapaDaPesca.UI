import { IBase } from "./base";
import { IEmbarcacao } from "./embarcacao";
import { IGaleriaDeTrofeu } from "./galeria-de-trofeu";
import { IPescaria } from "./pescaria";
import { IPessoa } from "./pessoa";

export interface IGuiaDePesca extends IBase {
  primeiroAcesso: boolean;
  pessoa: IPessoa;
  pescarias?: IPescaria[];
  embarcacoes?: IEmbarcacao[];
  galeriaDeTrofeu?: IGaleriaDeTrofeu[];
}
