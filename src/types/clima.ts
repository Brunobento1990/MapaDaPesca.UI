export interface IClima {
  dias: string[];
  chuva: number[];
  velocidadeDoVento: number[];
  direcaoDoVento: number[];
  temperaturas: number[];
  pressaoAtmosferica: number[];
  unidadeDeMedida: {
    temperatura: string;
    chuva: string;
    velocidadeDoVento: string;
    direcaoDoVento: string;
    pressaoAtmosferica: string;
  };
  previsaoDeDias: number;
}
