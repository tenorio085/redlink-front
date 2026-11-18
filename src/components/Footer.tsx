import { Link } from "react-router";
import { INTEGRANTES } from "../data/integrantes";
import Logo from "./Logo";
import { LINKS_PRINCIPAIS } from "./navegacao";

/** Rodapé com navegação, a equipe e o aviso de que a RedLink não substitui a triagem. */
export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo claro />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            O sangue certo, do doador certo, na hora certa. Projeto da Global Solution 2026/2 · CitizenTech · FIAP.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-sm font-semibold text-white">Navegação</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {LINKS_PRINCIPAIS.map((link) => (
              <li key={link.para}>
                <Link to={link.para} className="hover:text-white">
                  {link.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cadastro" className="hover:text-white">
                Cadastro
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-white">Equipe</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {INTEGRANTES.map((integrante) => (
              <li key={integrante.rm}>
                <Link to={`/integrantes/${integrante.rm}`} className="hover:text-white">
                  {integrante.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-slate-500 sm:px-6 lg:px-8">
          A RedLink não substitui a triagem clínica feita pelo hemocentro. Dados de exemplo são fictícios.
        </p>
      </div>
    </footer>
  );
}
