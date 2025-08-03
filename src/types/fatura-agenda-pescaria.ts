import { IBase } from "./base";

export interface IFaturaAgendaPescaria extends IBase {
  dataDeVencimento: string;
  valor: number;
  valorRecebido?: number;
  valorAReceber?: number;
  descricao?: string;
  vencida: boolean;
  quitada: boolean;
  agendaPescariaId: string;
  transacoes?: ITransacaoIFaturaAgendaPescaria[];
}

export interface ITransacaoIFaturaAgendaPescaria extends IBase {
  valor: number;
  descricao?: string;
  meioDePagamento: MeioDePagamento;
  tipoTransacao: TipoTransacao;
}

export interface IPagarFatura {
  id: string;
  valor: number;
  descricao?: string;
  meioDePagamento: MeioDePagamento;
}

export interface IEstornarFatura {
  id: string;
  descricao?: string;
}

export type TipoTransacao = 1 | 2; // 1: Entrada, 2: Saída
export type MeioDePagamento = 1 | 2 | 3 | 4 | 5 | 6; // 1: Dinheiro, 2: Pix, 3: CartãoCredito, 4: CartãoDebito, 5: Transferencia, 6: Boleto

export const opcoesMeiosDePagamento = [
  {
    id: 1,
    descricao: "Dinheiro",
  },
  { id: 2, descricao: "Pix" },
  { id: 3, descricao: "Cartão de Crédito" },
  {
    id: 4,
    descricao: "Cartão de Débito",
  },
  { id: 5, descricao: "Transferência" },
  { id: 6, descricao: "Boleto" },
];
