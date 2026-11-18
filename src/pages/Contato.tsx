import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Botao from "../components/Botao";
import { CampoAreaTexto, CampoSelecao, CampoTexto } from "../components/Campos";
import { IconeGithub, IconeLocal } from "../components/Icones";
import Mensagem from "../components/Mensagem";
import TituloPagina from "../components/TituloPagina";
import { esquemaContato, MINIMO_MENSAGEM, type FormContato } from "../schemas/esquemas";

const ASSUNTOS = [
  "Dúvida sobre doação",
  "Problema com o cadastro ou agendamento",
  "Quero que meu hemocentro use a RedLink",
  "Sugestão",
  "Outro assunto",
];

/** Formulário de contato: React Hook Form + Yup, com validação ao sair de cada campo. */
export default function Contato() {
  const [enviadoPor, setEnviadoPor] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitted },
  } = useForm<FormContato>({
    resolver: yupResolver(esquemaContato),
    mode: "onTouched",
    defaultValues: { nome: "", email: "", assunto: "", mensagem: "" },
  });

  const tamanhoMensagem = (useWatch({ control, name: "mensagem" }) ?? "").trim().length;
  const restantes = Math.max(0, MINIMO_MENSAGEM - tamanhoMensagem);
  const temErros = Object.keys(errors).length > 0;

  const handleContato = (dados: FormContato) => {
    setEnviadoPor(dados.nome.split(" ")[0]);
    reset();
  };

  return (
    <>
      <TituloPagina
        chamada="Fale com a gente"
        titulo="Contato"
        descricao="Dúvidas, sugestões ou quer levar a RedLink para o seu hemocentro? Mande uma mensagem."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <form noValidate onSubmit={handleSubmit(handleContato)} className="space-y-5 lg:col-span-2">
          {enviadoPor && !temErros && (
            <Mensagem tipo="sucesso" titulo={`Obrigado, ${enviadoPor}!`}>
              Recebemos a sua mensagem. A equipe da RedLink responde pelo e-mail informado em até 2 dias úteis.
            </Mensagem>
          )}
          {temErros && isSubmitted && (
            <Mensagem tipo="erro" titulo="Confira os campos destacados">
              Alguns dados estão faltando ou em formato inválido.
            </Mensagem>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <CampoTexto id="nome" rotulo="Nome" obrigatorio autoComplete="name" erro={errors.nome?.message} {...register("nome")} />
            <CampoTexto
              id="email"
              rotulo="E-mail"
              type="email"
              obrigatorio
              autoComplete="email"
              placeholder="nome@email.com"
              erro={errors.email?.message}
              {...register("email")}
            />
          </div>

          <CampoSelecao id="assunto" rotulo="Assunto" obrigatorio erro={errors.assunto?.message} {...register("assunto")}>
            <option value="">Escolha um assunto</option>
            {ASSUNTOS.map((assunto) => (
              <option key={assunto} value={assunto}>
                {assunto}
              </option>
            ))}
          </CampoSelecao>

          <CampoAreaTexto
            id="mensagem"
            rotulo="Mensagem"
            obrigatorio
            erro={errors.mensagem?.message}
            dica={restantes > 0 ? `Faltam ${restantes} caracteres.` : "Tudo certo com o tamanho da mensagem."}
            {...register("mensagem")}
          />

          <Botao type="submit" tamanho="lg" className="w-full sm:w-auto">
            Enviar mensagem
          </Botao>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-6">
            <IconeLocal className="size-6 text-sangue-600" />
            <p className="mt-3 font-bold text-slate-900">Equipe RedLink</p>
            <p className="mt-1 text-sm text-slate-600">FIAP · Análise e Desenvolvimento de Sistemas · 1º ano</p>
          </div>
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <IconeGithub className="size-6" />
            <p className="mt-3 font-bold">Código aberto</p>
            <p className="mt-1 text-sm text-slate-300">
              O código do front-end e da API Java está no GitHub. Os links estão no README do projeto.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
