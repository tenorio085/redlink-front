import type { Sexo } from "../types/api";
import { calcularIdade, diferencaEmDias, hojeIso, somarDias } from "./datas";

// Regras oficiais de doação (Secretaria da Saúde do Estado de São Paulo).
// São as mesmas que a API Java aplica; aqui elas alimentam a página "Posso doar?".

export const PESO_MINIMO = 50;
export const IDADE_MINIMA = 16;
export const IDADE_MAXIMA = 69;
export const IDADE_MAXIMA_PRIMEIRA_DOACAO = 60;

export const INTERVALO_DIAS: Record<Sexo, number> = { M: 60, F: 90 };
export const LIMITE_POR_ANO: Record<Sexo, number> = { M: 4, F: 3 };

export type DadosPossoDoar = {
  sexo: Sexo;
  dataNascimento: string;
  peso: number;
  ultimaDoacao: string | null; // null = nunca doou
}

export type ResultadoPossoDoar =
  | { situacao: "pode"; motivo: string }
  | { situacao: "aguardar"; motivo: string; proximaData: string; diasRestantes: number }
  | { situacao: "nao-pode"; motivo: string };

/** Responde "posso doar hoje?" e, se ainda não puder, a partir de quando. */
export function verificarSePodeDoar(dados: DadosPossoDoar, hoje: string = hojeIso()): ResultadoPossoDoar {
  const idade = calcularIdade(dados.dataNascimento, hoje);
  const intervalo = INTERVALO_DIAS[dados.sexo];
  const grupo = dados.sexo === "M" ? "homens" : "mulheres";

  if (dados.peso < PESO_MINIMO) {
    return { situacao: "nao-pode", motivo: `O peso mínimo para doar sangue é ${PESO_MINIMO} kg.` };
  }
  if (idade < IDADE_MINIMA || idade > IDADE_MAXIMA) {
    return {
      situacao: "nao-pode",
      motivo: `Você tem ${idade} anos. A doação é permitida de ${IDADE_MINIMA} a ${IDADE_MAXIMA} anos.`,
    };
  }
  if (dados.ultimaDoacao === null) {
    if (idade > IDADE_MAXIMA_PRIMEIRA_DOACAO) {
      return {
        situacao: "nao-pode",
        motivo: `A primeira doação precisa ser feita até os ${IDADE_MAXIMA_PRIMEIRA_DOACAO} anos.`,
      };
    }
    const aviso = idade < 18 ? " Como você tem menos de 18 anos, leve a autorização do responsável." : "";
    return { situacao: "pode", motivo: `Você ainda não doou, então já pode fazer a primeira doação.${aviso}` };
  }

  const proximaData = somarDias(dados.ultimaDoacao, intervalo);
  const diasRestantes = diferencaEmDias(hoje, proximaData);
  if (diasRestantes > 0) {
    return {
      situacao: "aguardar",
      motivo: `Para ${grupo}, o intervalo mínimo entre doações é de ${intervalo} dias.`,
      proximaData,
      diasRestantes,
    };
  }
  return {
    situacao: "pode",
    motivo: `Já se passaram mais de ${intervalo} dias desde a sua última doação.`,
  };
}
