import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Botao from "../components/Botao";
import { CampoEscolha, CampoTexto } from "../components/Campos";
import { IconeCalendario, IconeCheck, IconeErro } from "../components/Icones";
import Mensagem from "../components/Mensagem";
import TituloPagina from "../components/TituloPagina";
import { esquemaPossoDoar, paraNumero, type FormPossoDoar } from "../schemas/esquemas";
import type { Sexo } from "../types/api";
import { formatarData, hojeIso } from "../utils/datas";
import { PESO_MINIMO, verificarSePodeDoar, type ResultadoPossoDoar } from "../utils/regrasDoacao";

const OPCOES_SEXO = [
  { valor: "M", rotulo: "Masculino" },
  { valor: "F", rotulo: "Feminino" },
];

/** Calculadora "Posso doar?": aplica as regras oficiais no próprio navegador, sem cadastro. */
export default function PossoDoar() {
  const [resultado, setResultado] = useState<ResultadoPossoDoar | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormPossoDoar>({
    resolver: yupResolver(esquemaPossoDoar),
    mode: "onTouched",
    defaultValues: { sexo: "", dataNascimento: "", peso: "", nuncaDoei: false, ultimaDoacao: "" },
  });

  const nuncaDoei = useWatch({ control, name: "nuncaDoei" });
  const sexo = useWatch({ control, name: "sexo" });

  const handleCalcular = (dados: FormPossoDoar) => {
    setResultado(
      verificarSePodeDoar({
        sexo: dados.sexo as Sexo,
        dataNascimento: dados.dataNascimento,
        peso: paraNumero(dados.peso),
        ultimaDoacao: dados.nuncaDoei ? null : dados.ultimaDoacao,
      }),
    );
    window.setTimeout(() => document.getElementById("resultado")?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 50);
  };

  return (
    <>
      <TituloPagina
        chamada="Calculadora"
        titulo="Posso doar?"
        descricao="Informe alguns dados e descubra se você já pode doar sangue e, se ainda não puder, a partir de quando."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form noValidate onSubmit={handleSubmit(handleCalcular)} onChange={() => setResultado(null)} className="space-y-5">
          <CampoEscolha
            legenda="Sexo"
            opcoes={OPCOES_SEXO}
            registro={register("sexo")}
            valorAtual={sexo}
            erro={errors.sexo?.message}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <CampoTexto
              id="dataNascimento"
              rotulo="Data de nascimento"
              type="date"
              obrigatorio
              max={hojeIso()}
              erro={errors.dataNascimento?.message}
              {...register("dataNascimento")}
            />
            <CampoTexto
              id="peso"
              rotulo="Peso (kg)"
              inputMode="decimal"
              obrigatorio
              placeholder="Ex.: 68"
              dica={`O mínimo para doar é ${PESO_MINIMO} kg.`}
              erro={errors.peso?.message}
              {...register("peso")}
            />
          </div>

          <div>
            <CampoTexto
              id="ultimaDoacao"
              rotulo="Data da última doação"
              type="date"
              obrigatorio={!nuncaDoei}
              max={hojeIso()}
              disabled={nuncaDoei}
              erro={nuncaDoei ? undefined : errors.ultimaDoacao?.message}
              {...register("ultimaDoacao")}
            />
            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
              <input type="checkbox" className="size-4 rounded border-slate-300 accent-sangue-600" {...register("nuncaDoei")} />
              Nunca doei sangue
            </label>
          </div>

          <Botao type="submit" tamanho="lg" className="w-full sm:w-auto">
            Verificar
          </Botao>
        </form>

        <div id="resultado" aria-live="polite" className="scroll-mt-24">
          {!resultado && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <IconeCalendario className="mx-auto size-10 text-sangue-400" />
              <p className="mt-4 font-semibold text-slate-800">O resultado aparece aqui</p>
              <p className="mt-2 text-sm text-slate-600">
                Homens esperam 60 dias entre doações e mulheres, 90 dias. Peso mínimo de 50 kg e idade de 16 a 69 anos.
              </p>
            </div>
          )}

          {resultado?.situacao === "pode" && (
            <div className="rounded-3xl bg-emerald-600 p-8 text-white shadow-lg">
              <IconeCheck className="size-10" />
              <p className="mt-4 text-2xl font-extrabold">Você já pode doar!</p>
              <p className="mt-2 text-emerald-50">{resultado.motivo}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Botao para="/cadastro" variante="secundario">
                  Fazer meu cadastro
                </Botao>
                <Botao para="/doadores" variante="contorno">
                  Já tenho cadastro
                </Botao>
              </div>
            </div>
          )}

          {resultado?.situacao === "aguardar" && (
            <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <IconeCalendario className="size-10 text-sangue-600" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Você poderá doar a partir de</p>
              <p className="mt-1 text-4xl font-extrabold text-sangue-600">{formatarData(resultado.proximaData)}</p>
              <p className="mt-3 text-slate-700">
                Faltam <strong>{resultado.diasRestantes}</strong> {resultado.diasRestantes === 1 ? "dia" : "dias"}.{" "}
                {resultado.motivo}
              </p>
              <Botao para="/cadastro" variante="contorno" className="mt-6">
                Cadastrar e ser avisado
              </Botao>
            </div>
          )}

          {resultado?.situacao === "nao-pode" && (
            <Mensagem tipo="aviso" titulo="Pelas regras oficiais, a doação não é possível agora">
              <p>{resultado.motivo}</p>
              <p className="mt-2">Em caso de dúvida, procure o hemocentro: a avaliação final é sempre feita na triagem.</p>
            </Mensagem>
          )}

          {resultado && (
            <p className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <IconeErro className="mt-0.5 size-4 shrink-0" />
              Este cálculo segue as regras gerais de intervalo, idade e peso. Ele não substitui a triagem clínica do hemocentro.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
