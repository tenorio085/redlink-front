import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type Variante = "primario" | "secundario" | "contorno" | "fantasma" | "perigo";
type Tamanho = "md" | "lg";

const ESTILOS_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 text-center";

const ESTILOS_VARIANTE: Record<Variante, string> = {
  primario: "bg-sangue-600 text-white shadow-sm hover:bg-sangue-700 active:bg-sangue-800",
  secundario: "bg-slate-900 text-white shadow-sm hover:bg-slate-800",
  contorno: "border border-slate-300 bg-white text-slate-800 hover:border-sangue-300 hover:bg-sangue-50",
  fantasma: "text-sangue-700 hover:bg-sangue-50",
  perigo: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
};

const ESTILOS_TAMANHO: Record<Tamanho, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  tamanho?: Tamanho;
  /** Quando informado, o botão vira um link para essa rota. */
  para?: string;
  carregando?: boolean;
  larguraTotal?: boolean;
  children: ReactNode;
}

/** Botão padrão da RedLink. Funciona como <button> ou, com "para", como link de navegação. */
export default function Botao({
  variante = "primario",
  tamanho = "md",
  para,
  carregando = false,
  larguraTotal = false,
  className = "",
  children,
  type = "button",
  disabled,
  ...resto
}: BotaoProps) {
  const classes = `${ESTILOS_BASE} ${ESTILOS_VARIANTE[variante]} ${ESTILOS_TAMANHO[tamanho]} ${
    larguraTotal ? "w-full" : ""
  } ${className}`;

  if (para) {
    return (
      <Link to={para} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || carregando} aria-busy={carregando} {...resto}>
      {carregando && (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
