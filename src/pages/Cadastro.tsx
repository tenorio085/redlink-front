import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import Botao from "../components/Botao";
import { CampoEscolha, CampoTexto } from "../components/Campos";
import { IconeEscudo } from "../components/Icones";
import Mensagem from "../components/Mensagem";
import TituloPagina from "../components/TituloPagina";
import useDoador from "../hooks/useDoador";
import { esquemaCadastro, paraNumero, type FormCadastro } from "../schemas/esquemas";
import { paraErroApi } from "../services/api";
import { cadastrarDoador } from "../services/doadorService";
import type { DoadorRequest, Sexo, TipoSanguineo } from "../types/api";
import { hojeIso } from "../utils/datas";
import { mascararCpf, mascararTelefone, somenteDigitos, TIPOS_SANGUINEOS } from "../utils/validacoes";

const OPCOES_SEXO = [
  { valor: "M", rotulo: "Masculino" },
  { valor: "F", rotulo: "Feminino" },
];

const OPCOES_TIPO = TIPOS_SANGUINEOS.map((tipo) => ({ valor: tipo, rotulo: tipo }));

const CAMPOS_DO_FORMULARIO = ["nome", "cpf", "sexo", "dataNascimento", "peso", "email", "telefone", "tipoSanguineo"];

/** Cadastro de doador: valida com Yup e envia para a API Java (POST /doadores). */
export default function Cadastro() {
  const navigate = useNavigate();
  const { entrar } = useDoador();
  const [erroApi, setErroApi] = useState<{ titulo: string; mensagem: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormCadastro>({
    resolver: yupResolver(esquemaCadastro),
    mode: "onTouched",
    defaultValues: {
      nome: "",
      cpf: "",
      sexo: "",
      dataNascimento: "",
      peso: "",
      email: "",
      telefone: "",
      tipoSanguineo: "",
    },
  });

  // Valores acompanhados ao vivo, só para pintar a opção escolhida
  const sexo = useWatch({ control, name: "sexo" });
  const tipoSanguineo = useWatch({ control, name: "tipoSanguineo" });

  const handleCadastro = async (dados: FormCadastro) => {
    setErroApi(null);

    const doador: DoadorRequest = {
      nome: dados.nome,
      cpf: somenteDigitos(dados.cpf),
      sexo: dados.sexo as Sexo,
      dataNascimento: dados.dataNascimento,
      peso: paraNumero(dados.peso),
      email: dados.email,
      tipoSanguineo: dados.tipoSanguineo as TipoSanguineo,
      // telefone é opcional: só vai para a API se foi preenchido
      ...(dados.telefone ? { telefone: somenteDigitos(dados.telefone) } : {}),
    };

    try {
      const criado = await cadastrarDoador(doador);
      entrar(criado.id); // guarda o código no Context
      navigate(`/doadores/${criado.id}`, { state: { cadastroNovo: true } });
    } catch (erro) {
      const falha = paraErroApi(erro);
      // Erro 400: a API diz qual campo está errado; a mensagem aparece embaixo do campo
      for (const campo of falha.campos) {
        if (CAMPOS_DO_FORMULARIO.includes(campo.campo)) {
          setError(campo.campo as keyof FormCadastro, { message: campo.mensagem });
        }
      }
      setErroApi({ titulo: falha.titulo, mensagem: falha.message });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const temErros = Object.keys(errors).length > 0;

  return (
    <>
      <TituloPagina
        chamada="Seja um doador"
        titulo="Cadastro de doador"
        descricao="Leva menos de dois minutos. Com o cadastro, você agenda doações e sabe quando pode doar de novo."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <form noValidate onSubmit={handleSubmit(handleCadastro)} className="space-y-6 lg:col-span-2" aria-busy={isSubmitting}>
          {erroApi && (
            <Mensagem tipo="erro" titulo={erroApi.titulo}>
              {erroApi.mensagem}
            </Mensagem>
          )}
          {temErros && isSubmitted && !erroApi && (
            <Mensagem tipo="erro" titulo="Confira os campos destacados">
              Alguns dados estão faltando ou em formato inválido.
            </Mensagem>
          )}

          <fieldset className="space-y-5 rounded-2xl border border-slate-200 p-5 sm:p-6">
            <legend className="px-2 text-base font-bold text-slate-900">Dados pessoais</legend>
            <CampoTexto
              id="nome"
              rotulo="Nome completo"
              obrigatorio
              autoComplete="name"
              maxLength={100}
              erro={errors.nome?.message}
              {...register("nome")}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <CampoTexto
                id="cpf"
                rotulo="CPF"
                obrigatorio
                inputMode="numeric"
                placeholder="000.000.000-00"
                dica="Usado só para evitar cadastro duplicado. Não aparece em nenhuma tela."
                erro={errors.cpf?.message}
                {...register("cpf", { onChange: (e) => setValue("cpf", mascararCpf(e.target.value), { shouldValidate: Boolean(errors.cpf) }) })}
              />
              <CampoTexto
                id="dataNascimento"
                rotulo="Data de nascimento"
                type="date"
                obrigatorio
                max={hojeIso()}
                erro={errors.dataNascimento?.message}
                {...register("dataNascimento")}
              />
            </div>
            <CampoEscolha
              legenda="Sexo"
              opcoes={OPCOES_SEXO}
              registro={register("sexo")}
              valorAtual={sexo}
              erro={errors.sexo?.message}
            />
          </fieldset>

          <fieldset className="space-y-5 rounded-2xl border border-slate-200 p-5 sm:p-6">
            <legend className="px-2 text-base font-bold text-slate-900">Dados para a doação</legend>
            <CampoEscolha
              legenda="Tipo sanguíneo"
              opcoes={OPCOES_TIPO}
              registro={register("tipoSanguineo")}
              valorAtual={tipoSanguineo}
              erro={errors.tipoSanguineo?.message}
              colunas="grid-cols-4"
            />
            <CampoTexto
              id="peso"
              rotulo="Peso (kg)"
              obrigatorio
              inputMode="decimal"
              placeholder="Ex.: 72,5"
              className="sm:max-w-xs"
              erro={errors.peso?.message}
              {...register("peso")}
            />
          </fieldset>

          <fieldset className="space-y-5 rounded-2xl border border-slate-200 p-5 sm:p-6">
            <legend className="px-2 text-base font-bold text-slate-900">Contato</legend>
            <div className="grid gap-5 sm:grid-cols-2">
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
              <CampoTexto
                id="telefone"
                rotulo="Celular"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="(11) 99999-0000"
                erro={errors.telefone?.message}
                {...register("telefone", { onChange: (e) => setValue("telefone", mascararTelefone(e.target.value), { shouldValidate: Boolean(errors.telefone) }) })}
              />
            </div>
          </fieldset>

          <Botao type="submit" tamanho="lg" carregando={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Enviando cadastro..." : "Concluir cadastro"}
          </Botao>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-6">
            <p className="font-bold text-slate-900">Quem pode doar</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Ter de 16 a 69 anos</li>
              <li>• Pesar pelo menos 50 kg</li>
              <li>• Estar em boas condições de saúde</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <IconeEscudo className="size-6 text-sangue-600" />
            <p className="mt-3 font-bold text-slate-900">Seus dados protegidos</p>
            <p className="mt-2 text-sm text-slate-600">
              Guardamos só o necessário para o agendamento. O CPF não é exibido depois do cadastro.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
