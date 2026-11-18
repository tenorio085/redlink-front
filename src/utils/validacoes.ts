import type { TipoSanguineo } from "../types/api";

export const TIPOS_SANGUINEOS: readonly TipoSanguineo[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

export function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
}

/** Mesma regra da API: 11 dígitos. Também recusa sequências repetidas como 111.111.111-11. */
export function cpfValido(valor: string): boolean {
  const digitos = somenteDigitos(valor);
  return digitos.length === 11 && !/^(\d)\1{10}$/.test(digitos);
}

/** DDD + número: 10 ou 11 dígitos. */
export function telefoneValido(valor: string): boolean {
  const digitos = somenteDigitos(valor);
  return digitos.length === 10 || digitos.length === 11;
}

/** 000.000.000-00 enquanto a pessoa digita. */
export function mascararCpf(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

/** (11) 99999-0000 enquanto a pessoa digita. */
export function mascararTelefone(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Mostra o e-mail sem expor tudo: "joao.silva@email.com" -> "jo***@email.com". */
export function ocultarEmail(email: string): string {
  const [usuario, dominio] = email.split("@");
  if (!dominio) return email;
  return `${usuario.slice(0, 2)}***@${dominio}`;
}
