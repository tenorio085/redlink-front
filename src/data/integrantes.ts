import type { Integrante } from "../types/app";

// Dados da equipe. As fotos ficam em public/integrantes/.
// "posicaoFoto" ajusta o recorte da foto no círculo (horizontal e vertical), ex.: "50% 25%".
export const INTEGRANTES: Integrante[] = [
  {
    nome: "Thiago Motitsuki Tan",
    rm: "570760",
    foto: "/integrantes/570760.jpg",
    posicaoFoto: "50% 25%",
    turma: "1TDSPI",
    github: "https://github.com/ThiagoTan",
    linkedin: "https://www.linkedin.com/in/thiago-tan",
  },
  {
    nome: "Felipe Tenorio Diniz",
    rm: "568828",
    foto: "/integrantes/568828.jpg",
    posicaoFoto: "50% 55%",
    turma: "1TDSPI",
    github: "https://github.com/tenorio085",
  },
  {
    nome: "João Pedro Rodrigues Siqueira",
    rm: "571316",
    foto: "/integrantes/571316.jpg",
    posicaoFoto: "50% 0%",
    turma: "1TDSPI",
    github: "https://github.com/JoaoSiqueira12",
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-siqueira-25a055410",
  },
  {
    nome: "Arthur Netto Barbosa",
    rm: "569982",
    foto: "/integrantes/569982.jpg",
    posicaoFoto: "50% 10%",
    turma: "1TDSPI",
    github: "https://github.com/arthurnetto08",
    linkedin: "https://www.linkedin.com/in/arthur-barbosa-8654353bb",
  },
  {
    nome: "Gustavo Tenorio de Souza",
    rm: "569032",
    foto: "/integrantes/569032.png",
    posicaoFoto: "50% 40%",
    turma: "1TDSPK",
    github: "https://github.com/gustavoTT10",
    linkedin: "https://www.linkedin.com/in/gustavo-souza-9bb62a303",
  },
];

export function buscarIntegrante(rm: string): Integrante | undefined {
  return INTEGRANTES.find((integrante) => integrante.rm === rm);
}

/** "Thiago Motitsuki Tan" -> "TT" (usado quando ainda não há foto). */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}
