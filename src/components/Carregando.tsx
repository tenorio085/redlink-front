import { useEffect, useState } from "react";

type CarregandoProps = {
  texto?: string;
  className?: string;
}

/**
 * Indicador de carregamento. Se a resposta demorar, avisa que o servidor pode estar "acordando"
 * (a API fica no plano gratuito do Render, que desliga quando passa um tempo sem uso).
 */
export default function Carregando({ texto = "Carregando...", className = "" }: CarregandoProps) {
  const [demorando, setDemorando] = useState(false);

  useEffect(() => {
    const temporizador = window.setTimeout(() => setDemorando(true), 6000);
    return () => window.clearTimeout(temporizador);
  }, []);

  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center gap-3 py-10 text-center ${className}`}>
      <span className="size-9 animate-spin rounded-full border-4 border-sangue-100 border-t-sangue-600" aria-hidden="true" />
      <p className="font-medium text-slate-700">{texto}</p>
      {demorando && (
        <p className="max-w-sm text-sm text-slate-500">
          O servidor pode levar até um minuto para responder na primeira vez. Aguarde só mais um pouco.
        </p>
      )}
    </div>
  );
}
