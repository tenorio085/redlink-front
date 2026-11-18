import type { Doacao, DoacaoRequest, DoacaoUpdate } from "../types/api";
import { requisitar } from "./api";

/** GET /doadores/{id}/doacoes — as doações de um doador (relacionamento 1:N). */
export function listarDoacoesDoDoador(doadorId: number, sinal?: AbortSignal): Promise<Doacao[]> {
  return requisitar<Doacao[]>(`/doadores/${doadorId}/doacoes`, { sinal });
}

/** POST /doadores/{id}/doacoes — agenda uma doação. A API aplica as regras de 60/90 dias. */
export function agendarDoacao(doadorId: number, dados: DoacaoRequest): Promise<Doacao> {
  return requisitar<Doacao>(`/doadores/${doadorId}/doacoes`, { metodo: "POST", corpo: dados });
}

/** PUT /doacoes/{id} — muda o status para CANCELADA, mantendo a data e o hemocentro. */
export function cancelarDoacao(doacao: Doacao): Promise<Doacao> {
  const corpo: DoacaoUpdate = {
    dataDoacao: doacao.dataDoacao,
    hemocentroId: doacao.hemocentroId,
    status: "CANCELADA",
  };
  return requisitar<Doacao>(`/doacoes/${doacao.id}`, { metodo: "PUT", corpo });
}
