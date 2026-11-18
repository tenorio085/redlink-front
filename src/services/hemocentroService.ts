import type { Hemocentro } from "../types/api";
import { requisitar } from "./api";

/** GET /hemocentros — lista os hemocentros cadastrados na API. */
export function listarHemocentros(sinal?: AbortSignal): Promise<Hemocentro[]> {
  return requisitar<Hemocentro[]>("/hemocentros", { sinal });
}
