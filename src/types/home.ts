import { IAgendaPescaria } from "./agenda-pescaria";
import { IClima } from "./clima";
import { IInformacoesDoMar } from "./informacoes-do-mar";

export interface IHome {
  informacoesDoMar?: IInformacoesDoMar;
  clima?: IClima;
  agendaDeHoje: IAgendaPescaria[];
  agendaDeAmanha: IAgendaPescaria[];
  fatura?: IFaturaHome;
  transacoes: any[];
  variacaoMensalAgendamento?: IVariacaoMensalAgendamento;
}

export interface IFaturaHome {
  mes: number;
  ano: number;
  valorTotal: number;
  valorAReceber?: number;
  valorRecebido?: number;
}

export interface IVariacaoMensalAgendamento {
  mes: string;
  totalAnoAnterior: number;
  totalAnoAtual: number;
  porcentagem: number;
  anoAtual: number;
  anoAnterior: number;
}
