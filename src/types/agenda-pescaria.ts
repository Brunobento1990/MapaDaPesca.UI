import { IBase } from "./base";
import { IBloqueioDataPescaria, IPescaria } from "./pescaria";

export interface IAgendarPescaria {
  pescariaId: string;
  pescaria: IPescaria;
  quantidadeDePescador?: number;
  dataDeAgendamento: string;
  observacao?: string;
  status?: number;
  horaInicial?: number;
  horaFinal?: number;
  agendaPescariaId?: string;
  galeria?: IGaleriaAgendamento[];
}

export type StatusAgendaPescariaEnum = 1 | 2 | 3 | 4;

export const opcoesStatusAgendaPescaria = [
  {
    id: 1,
    descricao: "Pendente",
  },
  {
    id: 2,
    descricao: "Confirmado",
  },
  {
    id: 3,
    descricao: "Cancelado",
  },
  {
    id: 4,
    descricao: "Concluído",
  },
];

export const StatusAgendaPescariaColor: any = {
  1: "#1976d2",
  2: "#d2b419",
  3: "#fb1a1a",
  4: "#00c311",
} as const;

export interface IAgendaPescaria extends IBase {
  dia: number;
  mes: number;
  ano: number;
  horaInicio: number;
  horaFinal: number;
  observacao: string;
  status: number;
  pescariaId: string;
  pescaria: IPescaria;
  dataDeAgendamento?: string;
  galeria?: IGaleriaAgendamento[];
}

export interface IGaleriaAgendamento {
  id: string;
  url: string;
}

export interface IAgendaResponse{
  agenda: IAgendaPescaria[];
  agendaBloqueada: IBloqueioDataPescaria[];
}
