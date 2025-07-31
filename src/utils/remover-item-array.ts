export function removerItemDeArray(
  index: number,
  key: string,
  array: any[]
): any[] {
  const removes = array?.splice(index, 1);
  return array?.filter((e: any) => removes.some((x: any) => e[key] !== x[key]));
}

export function removerItemDeArrayPorIndex<T>(index: number, array: T[]): T[] {
  return [...(array.slice(0, index) ?? []), ...(array.slice(index + 1) ?? [])];
}
