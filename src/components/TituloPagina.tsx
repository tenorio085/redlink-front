import type { ReactNode } from "react";

type TituloPaginaProps = {
  /** Texto pequeno acima do título. */
  chamada?: string;
  titulo: string;
  descricao?: ReactNode;
  /** Título da aba do navegador. Se não for informado, usa o título da página. */
  tituloAba?: string;
}

/** Cabeçalho padrão das páginas internas (também define o título da aba). */
export default function TituloPagina({ chamada, titulo, descricao, tituloAba }: TituloPaginaProps) {
  return (
    <header className="border-b border-slate-200 bg-gradient-to-b from-sangue-50 to-white">
      <title>{`${tituloAba ?? titulo} | RedLink`}</title>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {chamada && <p className="text-sm font-semibold uppercase tracking-wider text-sangue-700">{chamada}</p>}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{titulo}</h1>
        {descricao && <div className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">{descricao}</div>}
      </div>
    </header>
  );
}
