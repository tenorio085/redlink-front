import { useEffect, useId, useRef, type ReactNode } from "react";
import { IconeFechar } from "./Icones";

type ModalProps = {
  aberto: boolean;
  titulo: string;
  aoFechar: () => void;
  children: ReactNode;
  /** Botões do rodapé, como "Cancelar" e "Confirmar". */
  acoes?: ReactNode;
};

/** Janela sobre a página (feita com useState no componente pai). Fecha no X, no Esc ou clicando fora. */
export default function Modal({ aberto, titulo, aoFechar, children, acoes }: ModalProps) {
  const idTitulo = useId();
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") aoFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    caixa.current?.focus();
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-slate-900/60" onClick={aoFechar} aria-hidden="true" />
      <div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={idTitulo} className="text-lg font-bold text-slate-900">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={aoFechar}
            className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
            aria-label="Fechar"
          >
            <IconeFechar className="size-5" />
          </button>
        </div>
        <div className="mt-3 text-slate-600">{children}</div>
        {acoes && <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{acoes}</div>}
      </div>
    </div>
  );
}
