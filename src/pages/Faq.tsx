import Acordeao from "../components/Acordeao";
import Botao from "../components/Botao";
import TituloPagina from "../components/TituloPagina";
import { PERGUNTAS } from "../data/faq";

/** Perguntas frequentes sobre doação e sobre a RedLink. */
export default function Faq() {
  return (
    <>
      <TituloPagina
        chamada="Dúvidas"
        titulo="Perguntas frequentes"
        tituloAba="FAQ"
        descricao="Quem pode doar, de quanto em quanto tempo, o que impede a doação e como agendar pela RedLink."
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Acordeao itens={PERGUNTAS} />

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900">Não encontrou a sua dúvida?</p>
            <p className="text-sm text-slate-600">Fale com a equipe da RedLink.</p>
          </div>
          <Botao para="/contato" variante="contorno">
            Ir para o contato
          </Botao>
        </div>
      </section>
    </>
  );
}
