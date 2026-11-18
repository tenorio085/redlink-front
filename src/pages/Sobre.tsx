import Botao from "../components/Botao";
import { IconeEscudo, IconeGota } from "../components/Icones";
import TituloPagina from "../components/TituloPagina";
import { API_URL } from "../services/api";

const REGRAS = [
  { regra: "Idade", valor: "De 16 a 69 anos (primeira doação até os 60; menores de 18 com autorização)" },
  { regra: "Peso mínimo", valor: "50 kg" },
  { regra: "Intervalo para homens", valor: "60 dias entre doações, até 4 por ano" },
  { regra: "Intervalo para mulheres", valor: "90 dias entre doações, até 3 por ano" },
];

const ODS = [
  { numero: "3", nome: "Saúde e bem-estar", texto: "Sangue disponível para cirurgias, tratamentos e emergências." },
  { numero: "9", nome: "Indústria, inovação e infraestrutura", texto: "Dados e tecnologia para melhorar um serviço público." },
  { numero: "11", nome: "Cidades e comunidades sustentáveis", texto: "A comunidade se organiza para cuidar de si mesma." },
];

const TECNOLOGIAS = [
  { nome: "React + Vite", uso: "Aplicação de página única (SPA), rápida e componentizada." },
  { nome: "TypeScript", uso: "Tipos para as props, os estados e os dados da API." },
  { nome: "Tailwind CSS", uso: "Estilo com classes utilitárias e layout responsivo." },
  { nome: "Fetch API", uso: "Comunicação com a API Java, sem bibliotecas extras." },
  { nome: "API Java (Spring Boot)", uso: "Back-end com as regras de doação, publicado no Render." },
  { nome: "Oracle", uso: "Banco de dados com doadores, hemocentros e doações." },
];

/** Sobre o projeto: objetivo, regras oficiais, ODS e tecnologias. */
export default function Sobre() {
  return (
    <>
      <TituloPagina
        chamada="Sobre o projeto"
        titulo="O que é a RedLink"
        descricao="Uma plataforma em que o hemocentro informa quais tipos sanguíneos estão em falta e o sistema avisa somente os doadores daquele tipo que já podem doar de novo."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-slate-900">Objetivo</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Uma bolsa de sangue não se fabrica: ela só existe se alguém doar. Os hemocentros precisam de todos os tipos o
            tempo todo, mas o estoque de cada tipo sobe e desce de forma diferente. A RedLink troca a campanha genérica pelo
            chamado certo: quando falta O−, ela não chama a cidade inteira, chama quem tem O− e já pode doar.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            Pense em um mercado que fica sem arroz. Em vez de anunciar no rádio para todo mundo, ele manda mensagem só para
            o fornecedor de arroz. A RedLink faz isso com o sangue.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">As regras oficiais de doação</h2>
          <p className="mt-3 text-slate-600">
            São a base de todo o sistema e estão aplicadas tanto na API Java quanto nesta interface.
          </p>
          <dl className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {REGRAS.map((item) => (
              <div key={item.regra} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                <dt className="font-semibold text-slate-900 sm:w-48 sm:shrink-0">{item.regra}</dt>
                <dd className="text-slate-600">{item.valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-slate-500">
            Fonte: Secretaria da Saúde do Estado de São Paulo, “Requisitos básicos para doação de sangue”.
          </p>
        </div>

        <aside className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl bg-sangue-600 p-6 text-white">
            <IconeGota className="size-8" />
            <p className="mt-3 text-xl font-bold">O tipo certo, na hora certa.</p>
            <p className="mt-2 text-sangue-100">
              O Brasil está dentro da faixa recomendada pela OMS. O que falta é chamar a pessoa certa quando um tipo fica
              baixo.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <IconeEscudo className="size-7 text-sangue-600" />
            <p className="mt-3 font-bold text-slate-900">Privacidade (LGPD)</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Tipo sanguíneo é dado de saúde. Guardamos só o necessário, o CPF não aparece em nenhuma tela depois do cadastro
              e a RedLink não substitui a triagem clínica do hemocentro.
            </p>
          </div>
        </aside>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Objetivos de Desenvolvimento Sustentável</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {ODS.map((ods) => (
              <li key={ods.numero} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <span className="text-4xl font-extrabold text-sangue-600">ODS {ods.numero}</span>
                <p className="mt-2 font-bold text-slate-900">{ods.nome}</p>
                <p className="mt-1 text-sm text-slate-600">{ods.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Tecnologias</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECNOLOGIAS.map((tecnologia) => (
            <li key={tecnologia.nome} className="rounded-2xl border border-slate-200 p-5">
              <p className="font-bold text-slate-900">{tecnologia.nome}</p>
              <p className="mt-1 text-sm text-slate-600">{tecnologia.uso}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 text-sm text-slate-600">
            API Java em uso: <span className="break-all font-mono text-slate-900">{API_URL}</span>
          </p>
          <Botao para="/integrantes" variante="contorno" className="shrink-0">
            Conheça a equipe
          </Botao>
        </div>
      </section>
    </>
  );
}
