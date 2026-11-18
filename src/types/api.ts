// Tipos que espelham os DTOs da API Java (Domain Driven Design Using Java).
// Os nomes dos campos são exatamente os que a API recebe e devolve.

export type Sexo = "M" | "F";

export type TipoSanguineo = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type StatusDoacao = "AGENDADA" | "REALIZADA" | "NAO_COMPARECEU" | "CANCELADA";

/** Resposta de GET /doadores/{id} (DoadorResponseDTO). O CPF não é devolvido pela API (LGPD). */
export type Doador = {
  id: number;
  nome: string;
  sexo: Sexo;
  dataNascimento: string; // "AAAA-MM-DD"
  peso: number;
  email: string;
  telefone: string | null;
  tipoSanguineo: TipoSanguineo;
}

/** Corpo de POST /doadores (DoadorRequestDTO). */
export type DoadorRequest = {
  nome: string;
  cpf: string; // 11 dígitos, sem pontos nem traço
  sexo: Sexo;
  dataNascimento: string;
  peso: number;
  email: string;
  telefone?: string; // opcional: 10 ou 11 dígitos
  tipoSanguineo: TipoSanguineo;
}

/** Resposta de GET /hemocentros (HemocentroResponseDTO). */
export type Hemocentro = {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
}

/** Resposta das rotas de doação (DoacaoResponseDTO). */
export type Doacao = {
  id: number;
  dataDoacao: string; // "AAAA-MM-DDTHH:MM:SS"
  status: StatusDoacao;
  doadorId: number;
  doadorNome: string;
  hemocentroId: number;
  hemocentroNome: string;
}

/** Corpo de POST /doadores/{id}/doacoes (DoacaoRequestDTO). */
export type DoacaoRequest = {
  dataDoacao: string;
  hemocentroId: number;
}

/** Corpo de PUT /doacoes/{id} (DoacaoUpdateDTO). */
export type DoacaoUpdate = DoacaoRequest & {
  status: StatusDoacao;
}

/** Resposta de GET /doadores/{id}/proxima-doacao ("Posso doar?"). */
export type ProximaDoacao = {
  doadorId: number;
  podeDoar: boolean;
  proximaDataPermitida: string;
  intervaloMinimoDias: number;
  mensagem: string;
}

/** Um campo que não passou na validação da API (erro 400). */
export type CampoInvalido = {
  campo: string;
  mensagem: string;
}

/** Formato padronizado de erro da API (ErroDTO). */
export type ErroResposta = {
  status: number;
  erro: string;
  mensagem: string;
  timestamp: string;
  campos?: CampoInvalido[];
}
