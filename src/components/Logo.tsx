import { Link } from "react-router";
import { IconeGota } from "./Icones";

type LogoProps = {
  claro?: boolean; // versão para fundo escuro (rodapé)
  aoClicar?: () => void;
}

/** Marca da RedLink: a gota e o nome. Leva para a Home. */
export default function Logo({ claro = false, aoClicar }: LogoProps) {
  return (
    <Link to="/" onClick={aoClicar} className="inline-flex items-center gap-2 rounded-lg" aria-label="RedLink, página inicial">
      <span className="grid size-9 place-items-center rounded-xl bg-sangue-600 text-white shadow-sm">
        <IconeGota className="size-5" />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${claro ? "text-white" : "text-slate-900"}`}>
        Red<span className={claro ? "text-sangue-300" : "text-sangue-600"}>Link</span>
      </span>
    </Link>
  );
}
