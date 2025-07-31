import { IBase } from "./base";

export interface IEmbarcacao extends IBase {
  nome: string;
  motor?: string;
  motorEletrico?: string;
  largura?: string;
  comprimento?: string;
  quantidadeDeLugar?: number;
  galeria?: IGaleriaEmbarcacao[];
  fotosExcluidas?: string[];
}

export interface IGaleriaEmbarcacao {
  id: string;
  url: string;
}
