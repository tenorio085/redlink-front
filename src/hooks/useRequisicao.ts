import { useCallback, useEffect, useState } from "react";
import { ErroApi, paraErroApi } from "../services/api";

type Resultado<T> = {
  chave: string; // a qual busca este resultado pertence
  chaveDependencias: string;
  dados: T | null;
  erro: ErroApi | null;
};

/**
 * Executa uma busca na API quando a tela abre (ou quando as dependências mudam)
 * e devolve os três estados da tela: carregando, erro e dados.
 */
export function useRequisicao<T>(buscar: (sinal: AbortSignal) => Promise<T>, dependencias: unknown[]) {
  const [versao, setVersao] = useState(0);
  const [resultado, setResultado] = useState<Resultado<T> | null>(null);

  const chaveDependencias = JSON.stringify(dependencias);
  const chave = `${chaveDependencias}#${versao}`;

  useEffect(() => {
    const controle = new AbortController();

    buscar(controle.signal)
      .then((dados) => setResultado({ chave, chaveDependencias, dados, erro: null }))
      .catch((erro: unknown) => {
        if (controle.signal.aborted) return; // a tela foi fechada antes da resposta
        setResultado({ chave, chaveDependencias, dados: null, erro: paraErroApi(erro) });
      });

    // Se a tela fechar ou a busca mudar, cancela a requisição anterior
    return () => controle.abort();
    // A busca é refeita sempre que as dependências (ou a versão) mudam.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  /** Busca de novo (ex.: botão "Tentar novamente" ou depois de agendar). */
  const recarregar = useCallback(() => setVersao((v) => v + 1), []);

  const carregando = resultado?.chave !== chave;
  // Ao recarregar a mesma tela, mantém os dados antigos visíveis até chegar a resposta nova
  const mesmaTela = resultado?.chaveDependencias === chaveDependencias;

  return {
    dados: mesmaTela ? (resultado?.dados ?? null) : null,
    erro: carregando ? null : (resultado?.erro ?? null),
    carregando,
    recarregar,
  };
}
