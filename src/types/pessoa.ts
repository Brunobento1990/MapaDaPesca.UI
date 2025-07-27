import { IBase } from "./base";

export interface IPessoa extends IBase {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  urlFoto?: string;
}
