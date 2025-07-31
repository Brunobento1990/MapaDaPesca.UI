import { IBase } from "./base";
import { IEmbarcacao } from "./embarcacao";
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
  latitude?: number;
  longitude?: number;
  embarcacaoId?: string;
  embarcacao?: IEmbarcacao;
  datasBloqueadas?: IBloqueioDataPescaria[];
}

export interface IBloqueioDataPescaria {
  id: string;
  data: string;
  titulo: string;
}
