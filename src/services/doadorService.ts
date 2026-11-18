import type { Doador, DoadorRequest, ProximaDoacao } from "../types/api";
import { requisitar } from "./api";

/** POST /doadores — cadastra um doador. */
export function cadastrarDoador(dados: DoadorRequest): Promise<Doador> {
  return requisitar<Doador>("/doadores", { metodo: "POST", corpo: dados });
}

/** GET /doadores/{id} — busca um doador pelo código. */
export function buscarDoador(id: number, sinal?: AbortSignal): Promise<Doador> {
  return requisitar<Doador>(`/doadores/${id}`, { sinal });
}

/** GET /doadores/{id}/proxima-doacao — "Posso doar?" calculado pela API. */
export function buscarProximaDoacao(id: number, sinal?: AbortSignal): Promise<ProximaDoacao> {
  return requisitar<ProximaDoacao>(`/doadores/${id}/proxima-doacao`, { sinal });
}
