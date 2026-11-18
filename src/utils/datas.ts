// Funções de data. As datas trafegam como texto "AAAA-MM-DD" (igual à API Java),
// e são montadas sem fuso horário para não "voltar um dia" ao converter.

const MS_POR_DIA = 24 * 60 * 60 * 1000;

function paraData(iso: string): Date {
  const [ano, mes, dia] = iso.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia));
}

function paraIso(data: Date): string {
  return data.toISOString().slice(0, 10);
}

/** Data de hoje no formato "AAAA-MM-DD", no fuso do navegador. */
export function hojeIso(): string {
  const agora = new Date();
  return paraIso(new Date(Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate())));
}

export function somarDias(iso: string, dias: number): string {
  return paraIso(new Date(paraData(iso).getTime() + dias * MS_POR_DIA));
}

/** Quantos dias vão de "inicio" até "fim" (negativo se "fim" for antes). */
export function diferencaEmDias(inicio: string, fim: string): number {
  return Math.round((paraData(fim).getTime() - paraData(inicio).getTime()) / MS_POR_DIA);
}

/** Idade completa, em anos, na data de referência. */
export function calcularIdade(nascimento: string, referencia: string = hojeIso()): number {
  const n = paraData(nascimento);
  const r = paraData(referencia);
  let idade = r.getUTCFullYear() - n.getUTCFullYear();
  const aindaNaoFezAniversario =
    r.getUTCMonth() < n.getUTCMonth() || (r.getUTCMonth() === n.getUTCMonth() && r.getUTCDate() < n.getUTCDate());
  if (aindaNaoFezAniversario) idade--;
  return idade;
}

/** "2026-11-25" -> "25/11/2026" */
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}

/** "2026-11-25T10:00:00" -> "10h" ou "10h30" */
export function formatarHora(isoDataHora: string): string {
  const [hora, minuto] = isoDataHora.slice(11, 16).split(":");
  return minuto === "00" ? `${Number(hora)}h` : `${Number(hora)}h${minuto}`;
}

/** "2026-11-25T10:00:00" -> "25/11/2026 às 10h" */
export function formatarDataHora(isoDataHora: string): string {
  return `${formatarData(isoDataHora)} às ${formatarHora(isoDataHora)}`;
}

/** "2026-11-25T10:00:00" -> "25/11" */
export function formatarDiaMes(iso: string): string {
  return formatarData(iso).slice(0, 5);
}

/** Maior de duas datas "AAAA-MM-DD". */
export function maiorData(a: string, b: string): string {
  return a >= b ? a : b;
}
