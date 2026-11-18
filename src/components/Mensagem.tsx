import type { ReactNode } from "react";
import type { TipoMensagem } from "../types/app";
import { IconeAlerta, IconeCheck, IconeErro, IconeInfo } from "./Icones";

const ESTILOS: Record<TipoMensagem, { caixa: string; icone: ReactNode }> = {
  sucesso: { caixa: "border-emerald-200 bg-emerald-50 text-emerald-900", icone: <IconeCheck className="size-5 text-emerald-600" /> },
  erro: { caixa: "border-red-200 bg-red-50 text-red-900", icone: <IconeErro className="size-5 text-red-600" /> },
  aviso: { caixa: "border-amber-200 bg-amber-50 text-amber-900", icone: <IconeAlerta className="size-5 text-amber-600" /> },
  info: { caixa: "border-sky-200 bg-sky-50 text-sky-900", icone: <IconeInfo className="size-5 text-sky-600" /> },
};

type MensagemProps = {
  tipo: TipoMensagem;
  titulo?: string;
  children?: ReactNode;
  /** Conteúdo extra embaixo do texto, como um botão "Tentar novamente". */
  acao?: ReactNode;
  className?: string;
}

/** Caixa de mensagem para sucesso, erro, aviso ou informação. É lida pelos leitores de tela. */
export default function Mensagem({ tipo, titulo, children, acao, className = "" }: MensagemProps) {
  const estilo = ESTILOS[tipo];
  return (
    <div
      role={tipo === "erro" ? "alert" : "status"}
      className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${estilo.caixa} ${className}`}
    >
      <span className="mt-0.5 shrink-0">{estilo.icone}</span>
      <div className="min-w-0 flex-1 break-words">
        {titulo && <p className="font-semibold">{titulo}</p>}
        {children && <div className={titulo ? "mt-1" : ""}>{children}</div>}
        {acao && <div className="mt-3">{acao}</div>}
      </div>
    </div>
  );
}
