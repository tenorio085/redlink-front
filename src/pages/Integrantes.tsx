import CardIntegrante from "../components/CardIntegrante";
import TituloPagina from "../components/TituloPagina";
import { INTEGRANTES } from "../data/integrantes";

/** Lista da equipe. Cada cartão leva para /integrantes/:rm. */
export default function Integrantes() {
  return (
    <>
      <TituloPagina
        chamada="Equipe"
        titulo="Integrantes"
        descricao="Quem construiu a RedLink na Global Solution 2026/2 da FIAP. Clique em um integrante para ver o perfil."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRANTES.map((integrante) => (
            <li key={integrante.rm}>
              <CardIntegrante integrante={integrante} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
