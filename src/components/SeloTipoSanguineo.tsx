import type { TipoSanguineo } from "../types/api";
import { IconeGota } from "./Icones";

type SeloTipoSanguineoProps = {
  tipo: TipoSanguineo;
  tamanho?: "sm" | "lg";
}

/** Selo com a gota e o tipo sanguíneo (ex.: O-). */
export default function SeloTipoSanguineo({ tipo, tamanho = "sm" }: SeloTipoSanguineoProps) {
  const grande = tamanho === "lg";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-sangue-600 font-bold text-white ${
        grande ? "px-4 py-2 text-lg" : "px-3 py-1 text-sm"
      }`}
      aria-label={`Tipo sanguíneo ${tipo}`}
    >
      <IconeGota className={grande ? "size-5" : "size-4"} />
      {tipo}
    </span>
  );
}
