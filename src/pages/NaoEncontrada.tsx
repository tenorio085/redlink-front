import Botao from "../components/Botao";
import { IconeGota } from "../components/Icones";

/** Página mostrada quando a rota digitada não existe. */
export default function NaoEncontrada() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <title>Página não encontrada | RedLink</title>
      <span className="grid size-16 place-items-center rounded-full bg-sangue-50 text-sangue-600">
        <IconeGota className="size-8" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-sangue-700">Erro 404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Página não encontrada</h1>
      <p className="mt-3 text-slate-600">O endereço digitado não existe ou mudou de lugar.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Botao para="/">Voltar ao início</Botao>
        <Botao para="/posso-doar" variante="contorno">
          Posso doar?
        </Botao>
      </div>
    </section>
  );
}
