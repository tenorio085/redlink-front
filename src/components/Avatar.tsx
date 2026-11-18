import { iniciais } from "../data/integrantes";
import type { Integrante } from "../types/app";

type AvatarProps = {
  integrante: Integrante;
  tamanho?: "md" | "lg";
}

/** Foto do integrante ou, enquanto não houver foto, as iniciais do nome. */
export default function Avatar({ integrante, tamanho = "md" }: AvatarProps) {
  const classes = tamanho === "lg" ? "size-32 text-4xl" : "size-20 text-2xl";

  if (integrante.foto) {
    return (
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        className={`${classes} rounded-full object-cover ring-4 ring-white shadow-md`}
        style={{ objectPosition: integrante.posicaoFoto ?? "50% 50%" }}
      />
    );
  }

  return (
    <span
      className={`${classes} grid place-items-center rounded-full bg-gradient-to-br from-sangue-500 to-sangue-800 font-extrabold text-white ring-4 ring-white shadow-md`}
      aria-hidden="true"
    >
      {iniciais(integrante.nome)}
    </span>
  );
}
