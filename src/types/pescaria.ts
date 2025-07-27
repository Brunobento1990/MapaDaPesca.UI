import { IBase } from "./base";
import { IGuiaDePesca } from "./guia-de-pesca";

export interface IPescaria extends IBase {
  titulo: string;
  descricao: string;
  local: string;
  valor: number;
  horaInicial?: number;
  horaFinal?: number;
  quantidadePescador?: number;
  guiaDePescaId: string;
  guiaDePesca: IGuiaDePesca;
  quantidadeMaximaDeAgendamentosNoDia?: number;
  bloquearSegundaFeira: boolean;
  bloquearTercaFeira: boolean;
  bloquearQuartaFeira: boolean;
  bloquearQuintaFeira: boolean;
  bloquearSextaFeira: boolean;
  bloquearSabado: boolean;
  bloquearDomingo: boolean;
}
