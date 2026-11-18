// Tipos usados só pelo front-end.

export type Integrante = {
  nome: string;
  rm: string; // usado na rota /integrantes/:rm
  turma: string;
  papel?: string;
  descricao?: string;
  github?: string; // endereço completo do perfil
  linkedin?: string; // endereço completo do perfil
  foto?: string; // caminho dentro de /public, ex.: "/integrantes/foto-1.jpg"
  posicaoFoto?: string; // recorte da foto no círculo, ex.: "50% 25%"
}

export type PerguntaFrequente = {
  pergunta: string;
  resposta: string;
}

/** Mapa de erros de um formulário: nome do campo -> mensagem. */
export type ErrosFormulario<T> = Partial<Record<keyof T, string>>;

export type TipoMensagem = "sucesso" | "erro" | "aviso" | "info";

export type LinkNavegacao = {
  para: string;
  rotulo: string;
}
