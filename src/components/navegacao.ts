import type { LinkNavegacao } from "../types/app";

/** Links do menu principal, usados no cabeçalho, no menu mobile e no rodapé. */
export const LINKS_PRINCIPAIS: LinkNavegacao[] = [
  { para: "/", rotulo: "Início" },
  { para: "/posso-doar", rotulo: "Posso doar?" },
  { para: "/doadores", rotulo: "Minhas doações" },
  { para: "/sobre", rotulo: "Sobre" },
  { para: "/faq", rotulo: "FAQ" },
  { para: "/integrantes", rotulo: "Integrantes" },
  { para: "/contato", rotulo: "Contato" },
];
