import { Link } from "react-router";
import type { Integrante } from "../types/app";
import Avatar from "./Avatar";
import { IconeSeta } from "./Icones";

type CardIntegranteProps = {
  integrante: Integrante;
}

/** Cartão de um integrante na lista. Leva para a página com o RM na rota. */
export default function CardIntegrante({ integrante }: CardIntegranteProps) {
  return (
    <Link
      to={`/integrantes/${integrante.rm}`}
      className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-sangue-200 hover:shadow-md"
    >
      <Avatar integrante={integrante} />
      <h2 className="mt-4 text-lg font-bold text-slate-900">{integrante.nome}</h2>
      <p className="mt-1 text-sm text-slate-600">
        RM {integrante.rm} · {integrante.turma}
      </p>
      {integrante.papel && <p className="mt-2 text-sm font-medium text-sangue-700">{integrante.papel}</p>}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sangue-700 group-hover:gap-2">
        Ver perfil <IconeSeta className="size-4 transition-all" />
      </span>
    </Link>
  );
}
