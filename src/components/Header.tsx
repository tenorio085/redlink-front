import { useCallback, useState } from "react";
import { NavLink } from "react-router";
import useDoador from "../hooks/useDoador";
import Botao from "./Botao";
import { IconeMenu } from "./Icones";
import Logo from "./Logo";
import MenuMobile from "./MenuMobile";
import { LINKS_PRINCIPAIS } from "./navegacao";

/** Cabeçalho fixo: menu completo no desktop e botão de menu nas telas menores. */
export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const fecharMenu = useCallback(() => setMenuAberto(false), []);
  const { codigo, conectado } = useDoador();

  // Se o doador já entrou, "Minhas doações" leva direto para a página dele
  const links = LINKS_PRINCIPAIS.map((link) =>
    link.para === "/doadores" && conectado ? { ...link, para: `/doadores/${codigo}` } : link,
  );

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.para}>
                <NavLink
                  to={link.para}
                  end={link.para === "/"}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "bg-sangue-50 text-sangue-700" : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  {link.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Botao para="/cadastro">Quero ser doador</Botao>
          </div>
          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            className="grid size-11 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
          >
            <IconeMenu className="size-6" />
          </button>
        </div>
      </div>
    </header>

    {/* Fora do <header>: o desfoque do cabeçalho prenderia o menu dentro dele */}
    <MenuMobile aberto={menuAberto} aoFechar={fecharMenu} links={links} />
    </>
  );
}
