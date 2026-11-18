import type { CampoInvalido, ErroResposta } from "../types/api";

/** Endereço da API Java. Pode ser trocado pela variável VITE_API_URL (arquivo .env). */
export const API_URL = (import.meta.env.VITE_API_URL ?? "https://redlink-api-4n0s.onrender.com").replace(/\/+$/, "");

const MENSAGEM_SEM_CONEXAO =
  "Não conseguimos falar com o servidor agora. Verifique sua internet e tente de novo em alguns segundos.";

/** Erro devolvido pela API (ou falha de rede), já no formato que a interface mostra. */
export class ErroApi extends Error {
  readonly status: number;
  readonly titulo: string;
  readonly campos: CampoInvalido[];

  constructor(status: number, titulo: string, mensagem: string, campos: CampoInvalido[] = []) {
    super(mensagem);
    this.name = "ErroApi";
    this.status = status;
    this.titulo = titulo;
    this.campos = campos;
  }
}

type Metodo = "GET" | "POST" | "PUT" | "DELETE";

type OpcoesRequisicao = {
  metodo?: Metodo;
  corpo?: unknown;
  sinal?: AbortSignal;
}

/**
 * Faz uma requisição à API Java usando a Fetch API e devolve o JSON já tipado.
 * Qualquer resposta de erro vira um ErroApi com a mensagem padronizada da API.
 */
export async function requisitar<T>(caminho: string, opcoes: OpcoesRequisicao = {}): Promise<T> {
  const { metodo = "GET", corpo, sinal } = opcoes;

  const cabecalhos: Record<string, string> = { Accept: "application/json" };
  if (corpo !== undefined) cabecalhos["Content-Type"] = "application/json";

  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
      signal: sinal,
    });
  } catch (erro) {
    if (erro instanceof DOMException && erro.name === "AbortError") throw erro;
    throw new ErroApi(0, "Sem conexão com o servidor", MENSAGEM_SEM_CONEXAO);
  }

  // 204 No Content: sucesso sem corpo (remoções)
  if (resposta.status === 204) return undefined as T;

  const texto = await resposta.text();
  let dados: unknown;
  try {
    dados = texto ? JSON.parse(texto) : undefined;
  } catch {
    dados = undefined;
  }

  if (!resposta.ok) {
    const erro = dados as Partial<ErroResposta> | undefined;
    throw new ErroApi(
      resposta.status,
      erro?.erro ?? "Erro na requisição",
      erro?.mensagem ?? `O servidor respondeu com o código ${resposta.status}. Tente novamente em instantes.`,
      erro?.campos ?? [],
    );
  }

  return dados as T;
}

/** Converte qualquer erro em ErroApi, para a interface tratar tudo do mesmo jeito. */
export function paraErroApi(erro: unknown): ErroApi {
  if (erro instanceof ErroApi) return erro;
  return new ErroApi(0, "Erro inesperado", MENSAGEM_SEM_CONEXAO);
}
