import { Link, useParams } from "react-router";
import Avatar from "../components/Avatar";
import Botao from "../components/Botao";
import EstadoVazio from "../components/EstadoVazio";
import { IconeGithub, IconeLinkedin, IconeVoltar } from "../components/Icones";
import { buscarIntegrante, INTEGRANTES } from "../data/integrantes";

/** Perfil de um integrante. Rota com parâmetro: /integrantes/:rm */
export default function IntegranteDetalhe() {
  const { rm = "" } = useParams<{ rm: string }>();
  const integrante = buscarIntegrante(rm);

  if (!integrante) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <title>Integrante não encontrado | RedLink</title>
        <EstadoVazio
          titulo={`Não encontramos o RM ${rm}`}
          descricao="Confira o número ou volte para a lista da equipe."
          acao={<Botao para="/integrantes">Ver todos os integrantes</Botao>}
        />
      </section>
    );
  }

  const outros = INTEGRANTES.filter((outro) => outro.rm !== integrante.rm);

  return (
    <>
      <title>{`${integrante.nome} | RedLink`}</title>
      <section className="bg-gradient-to-b from-sangue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Link to="/integrantes" className="inline-flex items-center gap-2 text-sm font-semibold text-sangue-700 hover:underline">
            <IconeVoltar className="size-4" /> Voltar para a equipe
          </Link>

          <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            <Avatar integrante={integrante} tamanho="lg" />
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{integrante.nome}</h1>
              {integrante.papel && <p className="mt-2 text-lg font-semibold text-sangue-700">{integrante.papel}</p>}
              <dl className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                <div className="rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase text-slate-500">RM</dt>
                  <dd className="font-bold text-slate-900">{integrante.rm}</dd>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase text-slate-500">Turma</dt>
                  <dd className="font-bold text-slate-900">{integrante.turma}</dd>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase text-slate-500">Curso</dt>
                  <dd className="font-bold text-slate-900">Análise e Desenvolvimento de Sistemas</dd>
                </div>
              </dl>
            </div>
          </div>

          {integrante.descricao && <p className="mt-8 text-lg leading-relaxed text-slate-700">{integrante.descricao}</p>}

          {(integrante.github || integrante.linkedin) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {integrante.github && (
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  <IconeGithub /> GitHub
                </a>
              )}
              {integrante.linkedin && (
                <a
                  href={integrante.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a66c2] px-5 py-3 font-semibold text-white hover:bg-[#09579f]"
                >
                  <IconeLinkedin /> LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-slate-900">Outros integrantes</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {outros.map((outro) => (
            <li key={outro.rm}>
              <Link
                to={`/integrantes/${outro.rm}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:border-sangue-200 hover:bg-sangue-50"
              >
                <span className="min-w-0 truncate font-semibold text-slate-800">{outro.nome}</span>
                <span className="shrink-0 text-sm text-slate-500">RM {outro.rm}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
