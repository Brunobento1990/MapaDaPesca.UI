export function formatDate(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const newValue = date.slice(0, 10).split("-");
  return `${newValue[2]}/${newValue[1]}/${newValue[0]}`;
}

export function obterHorarioDaData(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const newValue = date.split("T");
  const horario = newValue[1]?.split(":");
  return `${horario[0]}:${horario[1]}`;
}

export function formatDateComHoras(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const data = date.split("T");
  const newValue = data[0].slice(0, 10).split("-");
  const horas = data[1].slice(0, 5);
  return `${newValue[2]}/${newValue[1]}/${newValue[0]} ${horas}`;
}

export function formatPadraoAmericano(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const newValue = date.slice(0, 10).split("-");
  return `${newValue[0]}-${newValue[2]}-${newValue[1]}`;
}

export function formatPadraoJson(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const newValue = date.slice(0, 10).split("/");
  return `${newValue[2]}-${newValue[1]}-${newValue[0]}`;
}

export function formatDateExtensa(data: string): string {
  if (!data || data.length === 0) return "";
  const newValue = data.slice(0, 10).split("-");
  return `${newValue[2]} de ${obterDescricaoDoMes(Number(newValue[1]))} de ${
    newValue[0]
  }`;
}

export function obterDescricaoDoMes(mes: number): string {
  switch (mes) {
    case 0:
      return "Janeiro";
    case 1:
      return "Fevereiro";
    case 2:
      return "Março";
    case 3:
      return "Abril";
    case 4:
      return "Maio";
    case 5:
      return "Junho";
    case 6:
      return "Julho";
    case 7:
      return "Agosto";
    case 8:
      return "Setembro";
    case 9:
      return "Outubro";
    case 10:
      return "Novembro";
    default:
      return "Dezembro";
  }
}
