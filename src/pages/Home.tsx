import Botao from "../components/Botao";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import { IconeCalendario, IconeCheck, IconeGota, IconeLocal, IconeSino, IconeUsuario } from "../components/Icones";
import Mensagem from "../components/Mensagem";
import SeloTipoSanguineo from "../components/SeloTipoSanguineo";
import { useRequisicao } from "../hooks/useRequisicao";
import { listarHemocentros } from "../services/hemocentroService";

const DADOS = [
  { valor: "1,6%", texto: "da população brasileira doou sangue pelo SUS em 2023" },
  { valor: "1% a 3%", texto: "é a faixa de doadores que a OMS recomenda para cada país" },
  { valor: "3,2 mi", texto: "de bolsas de sangue foram coletadas pelo SUS em 2023" },
  { valor: "32", texto: "hemocentros coordenadores estaduais no Brasil" },
];

const PROBLEMAS = [
  {
    titulo: "Tipo errado",
    texto: "A campanha chama a cidade inteira e aparece quem tem A+ quando o que falta é O−.",
  },
  {
    titulo: "Fora do prazo",
    texto: "A pessoa vai até o hemocentro e só lá descobre que ainda não completou os 60 ou 90 dias.",
  },
  {
    titulo: "Doador que sumiu",
    texto: "Quem doou uma vez nunca mais é lembrado de voltar, mesmo quando o tipo dele está em falta.",
  },
];

const PASSOS = [
  { icone: IconeUsuario, titulo: "Cadastro", texto: "O doador informa os dados básicos e o tipo sanguíneo." },
  { icone: IconeGota, titulo: "Estoque", texto: "O hemocentro informa quais tipos estão em falta." },
  { icone: IconeSino, titulo: "Aviso certo", texto: "Só os doadores daquele tipo que já podem doar são chamados." },
  { icone: IconeCalendario, titulo: "Agendamento", texto: "O doador escolhe dia e horário, dentro das regras oficiais." },
];

/** Página inicial: o problema, a solução e os hemocentros reais vindos da API. */
export default function Home() {
  const hemocentros = useRequisicao((sinal) => listarHemocentros(sinal), []);

  return (
    <>
      <title>RedLink | O sangue certo, do doador certo, na hora certa</title>

      {/* Destaque */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sangue-50 via-white to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-sangue-700 shadow-sm ring-1 ring-sangue-100">
              <IconeGota className="size-4" /> Doação de sangue inteligente
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              O sangue certo, do doador certo, <span className="text-sangue-600">na hora certa.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              A RedLink avisa somente os doadores do tipo sanguíneo que está em falta e que já podem doar de novo. Sem
              campanhas para a cidade inteira, sem viagem perdida ao hemocentro.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Botao para="/posso-doar" tamanho="lg">
                Posso doar?
              </Botao>
              <Botao para="/cadastro" tamanho="lg" variante="contorno">
                Quero ser doador
              </Botao>
            </div>
          </div>

          {/* Exemplo do aviso que o doador recebe */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-0 rounded-[2rem] bg-sangue-100/60 blur-2xl" aria-hidden="true" />
            <figure className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <figcaption className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Exemplo de aviso da RedLink
              </figcaption>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-sangue-600 text-white">
                  <IconeSino className="size-6" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">João, seu tipo está em falta</p>
                  <p className="text-sm text-slate-500">Hemocentro Central · hoje</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">Tipo em falta</span>
                <SeloTipoSanguineo tipo="O-" />
              </div>
              <p className="mt-4 flex items-start gap-2 text-sm text-emerald-800">
                <IconeCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                Sua última doação foi há 70 dias. Você já pode doar de novo.
              </p>
              <Botao para="/doadores" larguraTotal className="mt-5">
                Agendar minha doação
              </Botao>
            </figure>
          </div>
        </div>
      </section>

      {/* Números */}
      <section aria-labelledby="titulo-numeros" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 id="titulo-numeros" className="sr-only">
            A doação de sangue no Brasil em números
          </h2>
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {DADOS.map((dado) => (
              <div key={dado.valor} className="flex flex-col rounded-2xl bg-slate-50 p-5">
                <dt className="text-sm leading-snug text-slate-600">{dado.texto}</dt>
                <dd className="order-first mb-2 text-3xl font-extrabold text-sangue-600">{dado.valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-slate-500">Fonte: Agência Gov, 2024.</p>
        </div>
      </section>

      {/* Problema */}
      <section aria-labelledby="titulo-problema" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-sangue-700">O problema</p>
        <h2 id="titulo-problema" className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900">
          Não é que ninguém doa. É que falta o tipo certo, na hora certa.
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          O Brasil está dentro da faixa recomendada pela OMS, mas o estoque de cada tipo sobe e desce de forma diferente.
          Quando um tipo fica baixo, a resposta costuma ser uma campanha genérica, que desperdiça esforço de três jeitos:
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {PROBLEMAS.map((problema, indice) => (
            <li key={problema.titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-sm font-bold text-sangue-600">0{indice + 1}</span>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{problema.titulo}</h3>
              <p className="mt-2 text-slate-600">{problema.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="titulo-como" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-sangue-300">A solução</p>
          <h2 id="titulo-como" className="mt-2 text-3xl font-extrabold tracking-tight">
            Como a RedLink funciona
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS.map((passo, indice) => (
              <li key={passo.titulo} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="grid size-11 place-items-center rounded-xl bg-sangue-600">
                  <passo.icone className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">
                  {indice + 1}. {passo.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hemocentros (dados reais da API) */}
      <section aria-labelledby="titulo-hemocentros" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sangue-700">Onde doar</p>
            <h2 id="titulo-hemocentros" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Hemocentros parceiros
            </h2>
          </div>
          <Botao para="/doadores" variante="contorno">
            Agendar uma doação
          </Botao>
        </div>

        <div className="mt-8">
          {hemocentros.carregando && <Carregando texto="Buscando os hemocentros..." />}

          {hemocentros.erro && (
            <Mensagem
              tipo="erro"
              titulo="Não foi possível carregar os hemocentros"
              acao={
                <Botao variante="contorno" onClick={hemocentros.recarregar}>
                  Tentar novamente
                </Botao>
              }
            >
              {hemocentros.erro.message}
            </Mensagem>
          )}

          {hemocentros.dados && hemocentros.dados.length === 0 && (
            <EstadoVazio
              titulo="Nenhum hemocentro cadastrado ainda"
              descricao="Assim que um hemocentro entrar na RedLink, ele aparece aqui."
            />
          )}

          {hemocentros.dados && hemocentros.dados.length > 0 && (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hemocentros.dados.map((hemocentro) => (
                <li key={hemocentro.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="grid size-10 place-items-center rounded-xl bg-sangue-50 text-sangue-600">
                    <IconeLocal className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{hemocentro.nome}</h3>
                  <p className="mt-1 break-words text-sm text-slate-600">{hemocentro.endereco}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{hemocentro.cidade}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Chamada final */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-sangue-600 p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Uma doação pode salvar até quatro vidas.</h2>
            <p className="mt-2 max-w-xl text-sangue-100">
              Descubra em segundos se você já pode doar e a partir de quando.
            </p>
          </div>
          <Botao para="/posso-doar" tamanho="lg" variante="secundario" className="shrink-0">
            Fazer o teste
          </Botao>
        </div>
      </section>
    </>
  );
}
