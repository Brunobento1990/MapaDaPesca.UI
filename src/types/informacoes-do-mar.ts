export interface IInformacoesDoMar {
  dias: string[];
  alturasDasOndas: number[];
  temperaturasDoMar: number[];
  alturasDaMare: number[];
  previsaoDeDias: number;
  unidadeDeMedida: {
    alturaDaOnda: string;
    temperaturaDoMar: string;
    alturaDaMare: string;
  };
}
