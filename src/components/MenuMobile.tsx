import { useEffect, useRef } from "react";
import { NavLink } from "react-router";
import type { LinkNavegacao } from "../types/app";
import Botao from "./Botao";
import { IconeFechar } from "./Icones";
import Logo from "./Logo";

type MenuMobileProps = {
  aberto: boolean;
  aoFechar: () => void;
  links: LinkNavegacao[];
}

/** Menu lateral para telas pequenas. Fecha com o X, com a tecla Esc ou clicando fora. */
export default function MenuMobile({ aberto, aoFechar, links }: MenuMobileProps) {
  const botaoFechar = useRef<HTMLButtonElement>(null);

  // Esc fecha o menu; enquanto aberto, a página de trás não rola
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") aoFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    botaoFechar.current?.focus();
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [aberto, aoFechar]);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${aberto ? "" : "pointer-events-none"}`} aria-hidden={!aberto}>
      {/* Fundo escurecido */}
      <div
        className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${aberto ? "opacity-100" : "opacity-0"}`}
        onClick={aoFechar}
      />

      {/* Painel */}
      <nav
        id="menu-mobile"
        aria-label="Menu principal"
        className={`absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          aberto ? "translate-x-0" : "translate-x-full"
        }`}
        inert={!aberto}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <Logo aoClicar={aoFechar} />
          <button
            ref={botaoFechar}
            type="button"
            onClick={aoFechar}
            className="grid size-10 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Fechar menu"
          >
            <IconeFechar className="size-6" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-3 py-4">
          {links.map((link) => (
            <li key={link.para}>
              <NavLink
                to={link.para}
                end={link.para === "/"}
                onClick={aoFechar}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-semibold ${
                    isActive ? "bg-sangue-50 text-sangue-700" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-200 p-4" onClick={aoFechar}>
          <Botao para="/cadastro" larguraTotal tamanho="lg">
            Quero ser doador
          </Botao>
        </div>
      </nav>
    </div>
  );
}
