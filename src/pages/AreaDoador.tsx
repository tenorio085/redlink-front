import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import Botao from "../components/Botao";
import { CampoTexto } from "../components/Campos";
import { IconeSeta, IconeUsuario } from "../components/Icones";
import TituloPagina from "../components/TituloPagina";
import useDoador from "../hooks/useDoador";

const esquemaCodigo = yup.object({
  codigo: yup
    .string()
    .required("Digite o seu código de doador.")
    .matches(/^\d+$/, "O código tem só números, como 12.")
    .test("positivo", "O código tem só números, como 12.", (valor) => Number(valor) > 0),
});
type FormCodigo = yup.InferType<typeof esquemaCodigo>;

/** Entrada da área do doador: a pessoa informa o código recebido no cadastro. */
export default function AreaDoador() {
  const navigate = useNavigate();
  const { codigo, conectado, entrar } = useDoador();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCodigo>({ resolver: yupResolver(esquemaCodigo), defaultValues: { codigo: "" } });

  const handleAcessar = (dados: FormCodigo) => {
    const numero = Number(dados.codigo);
    entrar(numero);
    navigate(`/doadores/${numero}`);
  };

  return (
    <>
      <TituloPagina
        chamada="Área do doador"
        titulo="Minhas doações"
        descricao="Acompanhe suas doações, veja quando pode doar de novo e agende a próxima."
      />

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="rounded-3xl border border-slate-200 p-6 shadow-sm sm:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-sangue-50 text-sangue-600">
            <IconeUsuario className="size-6" />
          </span>
          <h2 className="mt-4 text-xl font-bold text-slate-900">Já sou doador</h2>

          {conectado && (
            <Botao para={`/doadores/${codigo}`} larguraTotal tamanho="lg" className="mt-5">
              Continuar como doador nº {codigo} <IconeSeta className="size-5" />
            </Botao>
          )}

          <form noValidate onSubmit={handleSubmit(handleAcessar)} className="mt-5">
            <p className="text-sm text-slate-600">
              {conectado ? "Ou entre com outro código:" : "Use o código que apareceu ao concluir o cadastro."}
            </p>
            <CampoTexto
              id="codigo"
              rotulo="Código de doador"
              obrigatorio
              inputMode="numeric"
              placeholder="Ex.: 12"
              className="mt-3"
              erro={errors.codigo?.message}
              {...register("codigo")}
            />
            <Botao type="submit" larguraTotal tamanho="lg" variante={conectado ? "contorno" : "primario"} className="mt-5">
              Acessar minhas doações
            </Botao>
          </form>
        </div>

        <div className="flex flex-col justify-center rounded-3xl bg-sangue-600 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">Ainda não tem cadastro?</h2>
          <p className="mt-2 text-sangue-100">
            Cadastre-se para agendar doações, ser avisado quando o seu tipo estiver em falta e saber a data certa para
            voltar.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Botao para="/cadastro" variante="secundario">
              Fazer meu cadastro
            </Botao>
            <Botao para="/posso-doar" variante="contorno">
              Posso doar?
            </Botao>
          </div>
        </div>
      </section>
    </>
  );
}
