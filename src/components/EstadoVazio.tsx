import type { ReactNode } from "react";
import { IconeGota } from "./Icones";

type EstadoVazioProps = {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}

/** Mostrado quando a API responde, mas não há dados para exibir. */
export default function EstadoVazio({ titulo, descricao, acao }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-sangue-50 text-sangue-500">
        <IconeGota className="size-6" />
      </span>
      <p className="font-semibold text-slate-800">{titulo}</p>
      {descricao && <p className="max-w-md text-sm text-slate-600">{descricao}</p>}
      {acao && <div className="mt-1">{acao}</div>}
    </div>
  );
}
