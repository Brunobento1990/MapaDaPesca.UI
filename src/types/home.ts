import { IAgendaPescaria } from "./agenda-pescaria";
import { IClima } from "./clima";
import { IInformacoesDoMar } from "./informacoes-do-mar";

export interface IHome {
  informacoesDoMar?: IInformacoesDoMar;
  clima?: IClima;
  agendaDeHoje: IAgendaPescaria[];
  agendaDeAmanha: IAgendaPescaria[];
}
