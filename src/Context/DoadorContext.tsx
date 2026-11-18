import { createContext, useCallback, useState, type ReactNode } from "react";

// Guarda o código do doador "conectado" para todas as páginas (useContext),
// e também no localStorage, para continuar lembrado depois de recarregar a página.

const CHAVE = "redlink_doador";

type DoadorContextType = {
  codigo: number | null;
  conectado: boolean;
  entrar: (codigo: number) => void;
  sair: () => void;
};

type DoadorProviderProps = {
  children: ReactNode;
};

function lerCodigoSalvo(): number | null {
  try {
    const salvo = Number(localStorage.getItem(CHAVE));
    return Number.isInteger(salvo) && salvo > 0 ? salvo : null;
  } catch {
    return null; // navegador sem acesso ao localStorage (ex.: modo restrito)
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const DoadorContext = createContext<DoadorContextType>({} as DoadorContextType);

export const DoadorProvider = ({ children }: DoadorProviderProps) => {
  const [codigo, setCodigo] = useState<number | null>(lerCodigoSalvo);

  const entrar = useCallback((novoCodigo: number) => {
    setCodigo(novoCodigo);
    try {
      localStorage.setItem(CHAVE, String(novoCodigo));
    } catch {
      /* sem localStorage: fica só na memória */
    }
  }, []);

  const sair = useCallback(() => {
    setCodigo(null);
    try {
      localStorage.removeItem(CHAVE);
    } catch {
      /* nada a fazer */
    }
  }, []);

  return (
    <DoadorContext.Provider value={{ codigo, conectado: codigo !== null, entrar, sair }}>{children}</DoadorContext.Provider>
  );
};
