import { useId, useState } from "react";
import type { PerguntaFrequente } from "../types/app";
import { IconeMais } from "./Icones";

type AcordeaoProps = {
  itens: PerguntaFrequente[];
}

/** Lista de perguntas que abrem e fecham. Só uma fica aberta por vez. */
export default function Acordeao({ itens }: AcordeaoProps) {
  const [aberto, setAberto] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {itens.map((item, indice) => {
        const estaAberto = aberto === indice;
        const idBotao = `${base}-botao-${indice}`;
        const idPainel = `${base}-painel-${indice}`;
        return (
          <li key={item.pergunta}>
            <h2>
              <button
                id={idBotao}
                type="button"
                aria-expanded={estaAberto}
                aria-controls={idPainel}
                onClick={() => setAberto(estaAberto ? null : indice)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-900 hover:bg-slate-50 sm:px-6"
              >
                {item.pergunta}
                <IconeMais
                  className={`size-5 shrink-0 text-sangue-600 transition-transform duration-200 ${estaAberto ? "rotate-45" : ""}`}
                />
              </button>
            </h2>
            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              hidden={!estaAberto}
              className="px-5 pb-5 text-slate-600 sm:px-6"
            >
              <p className="leading-relaxed">{item.resposta}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
