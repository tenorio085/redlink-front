import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Botao from "../components/Botao";
import { CampoSelecao, CampoTexto } from "../components/Campos";
import CardDoacao from "../components/CardDoacao";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import { IconeCalendario, IconeCheck, IconeVoltar } from "../components/Icones";
import Mensagem from "../components/Mensagem";
import Modal from "../components/Modal";
import SeloTipoSanguineo from "../components/SeloTipoSanguineo";
import useDoador from "../hooks/useDoador";
import { useRequisicao } from "../hooks/useRequisicao";
import { esquemaAgendamento, type FormAgendamento } from "../schemas/esquemas";
import { paraErroApi } from "../services/api";
import { agendarDoacao, cancelarDoacao, listarDoacoesDoDoador } from "../services/doacaoService";
import { buscarDoador, buscarProximaDoacao } from "../services/doadorService";
import { listarHemocentros } from "../services/hemocentroService";
import type { Doacao } from "../types/api";
import type { TipoMensagem } from "../types/app";
import { calcularIdade, formatarData, formatarDiaMes, formatarHora, hojeIso, somarDias } from "../utils/datas";
import { ocultarEmail } from "../utils/validacoes";

const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

type Aviso = { tipo: TipoMensagem; titulo: string; texto: string };

/** Área do doador: dados, "posso doar?", agendamento (POST) e cancelamento (PUT). Rota: /doadores/:id */
export default function DoadorDetalhe() {
  const { id = "" } = useParams<{ id: string }>();
  const codigo = Number(id);
  const codigoValido = Number.isInteger(codigo) && codigo > 0;
  const location = useLocation();
  const navigate = useNavigate();
  const { codigo: codigoConectado, entrar, sair } = useDoador();
  const cadastroNovo = (location.state as { cadastroNovo?: boolean } | null)?.cadastroNovo === true;

  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [paraCancelar, setParaCancelar] = useState<Doacao | null>(null);
  const [cancelando, setCancelando] = useState(false);

  // GET do doador, das doações dele e da próxima data permitida, ao mesmo tempo
  const painel = useRequisicao(
    async (sinal) => {
      if (!codigoValido) throw paraErroApi(null);
      const [doador, doacoes, proxima] = await Promise.all([
        buscarDoador(codigo, sinal),
        listarDoacoesDoDoador(codigo, sinal),
        buscarProximaDoacao(codigo, sinal),
      ]);
      return { doador, doacoes, proxima };
    },
    [codigo],
  );
  const hemocentros = useRequisicao((sinal) => listarHemocentros(sinal), []);

  // Quem abriu a área de um doador existente fica "conectado" com esse código (Context)
  useEffect(() => {
    if (painel.dados && codigoConectado !== codigo) entrar(codigo);
  }, [painel.dados, codigo, codigoConectado, entrar]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormAgendamento>({
    resolver: yupResolver(esquemaAgendamento),
    defaultValues: { hemocentroId: "", data: "", horario: "" },
  });

  const handleAgendar = async (dados: FormAgendamento) => {
    setAviso(null);
    try {
      const doacao = await agendarDoacao(codigo, {
        dataDoacao: `${dados.data}T${dados.horario}:00`,
        hemocentroId: Number(dados.hemocentroId),
      });
      setAviso({
        tipo: "sucesso",
        titulo: "Doação agendada!",
        texto: `Doação agendada para ${formatarDiaMes(doacao.dataDoacao)} às ${formatarHora(doacao.dataDoacao)} no ${doacao.hemocentroNome}. Lembre-se de se alimentar bem e levar um documento com foto.`,
      });
      reset();
      painel.recarregar();
    } catch (erro) {
      const falha = paraErroApi(erro);
      // 409: a API recusou pelas regras oficiais e devolve a explicação pronta para mostrar
      setAviso({ tipo: "erro", titulo: falha.titulo, texto: falha.message });
    }
    document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const confirmarCancelamento = async () => {
    if (!paraCancelar) return;
    setCancelando(true);
    try {
      await cancelarDoacao(paraCancelar);
      setAviso({
        tipo: "info",
        titulo: "Agendamento cancelado",
        texto: `A doação de ${formatarData(paraCancelar.dataDoacao)} foi cancelada. Quando quiser, é só agendar de novo.`,
      });
      painel.recarregar();
    } catch (erro) {
      const falha = paraErroApi(erro);
      setAviso({ tipo: "erro", titulo: falha.titulo, texto: falha.message });
    } finally {
      setCancelando(false);
      setParaCancelar(null);
    }
  };

  const handleSair = () => {
    sair();
    navigate("/doadores");
  };

  // ------------------------------------------------------------ estados da tela

  if (painel.carregando && !painel.dados) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <title>Minhas doações | RedLink</title>
        <Carregando texto="Buscando o histórico das suas doações..." />
      </section>
    );
  }

  if (painel.erro || !painel.dados) {
    const naoExiste = !codigoValido || painel.erro?.status === 404;
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <title>Minhas doações | RedLink</title>
        {naoExiste ? (
          <EstadoVazio
            titulo={`Não encontramos o doador de código ${id}`}
            descricao="Confira o número que apareceu no fim do cadastro. Se ainda não é doador, faça o seu cadastro."
            acao={
              <div className="flex flex-col gap-3 sm:flex-row">
                <Botao para="/doadores" variante="contorno">
                  Tentar outro código
                </Botao>
                <Botao para="/cadastro">Fazer cadastro</Botao>
              </div>
            }
          />
        ) : (
          <Mensagem
            tipo="erro"
            titulo="Não conseguimos carregar as suas doações"
            acao={
              <Botao variante="contorno" onClick={painel.recarregar}>
                Tentar novamente
              </Botao>
            }
          >
            {painel.erro?.message}
          </Mensagem>
        )}
      </section>
    );
  }

  const { doador, doacoes, proxima } = painel.dados;
  const amanha = somarDias(hojeIso(), 1);

  return (
    <>
      <title>{`${doador.nome} | RedLink`}</title>

      {/* Cabeçalho do doador */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-sangue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link to="/doadores" className="inline-flex items-center gap-2 text-sm font-semibold text-sangue-700 hover:underline">
            <IconeVoltar className="size-4" /> Área do doador
          </Link>

          {cadastroNovo && (
            <Mensagem tipo="sucesso" titulo="Cadastro concluído!" className="mt-6">
              Seu código de doador é <strong>{doador.id}</strong>. Guarde esse número: é com ele que você acessa esta página.
            </Mensagem>
          )}

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-sangue-700">Doador nº {doador.id}</p>
              <h1 className="mt-1 break-words text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{doador.nome}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                <SeloTipoSanguineo tipo={doador.tipoSanguineo} />
                <span>{calcularIdade(doador.dataNascimento)} anos</span>
                <span className="break-all">{ocultarEmail(doador.email)}</span>
              </div>
            </div>
            <Botao variante="fantasma" onClick={handleSair} className="self-start md:self-auto">
              Sair da área do doador
            </Botao>
          </div>

          {/* Posso doar? (calculado pela API) */}
          <div
            className={`mt-8 flex items-start gap-4 rounded-2xl p-5 ${
              proxima.podeDoar ? "bg-emerald-600 text-white" : "bg-white text-slate-800 ring-1 ring-slate-200"
            }`}
          >
            {proxima.podeDoar ? (
              <IconeCheck className="size-8 shrink-0" />
            ) : (
              <IconeCalendario className="size-8 shrink-0 text-sangue-600" />
            )}
            <div>
              <p className="text-lg font-bold">
                {proxima.podeDoar ? "Você já pode doar!" : `Próxima doação a partir de ${formatarData(proxima.proximaDataPermitida)}`}
              </p>
              <p className={proxima.podeDoar ? "text-emerald-50" : "text-slate-600"}>
                O intervalo mínimo para você é de {proxima.intervaloMinimoDias} dias entre doações.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Agendar (POST) */}
        <section id="agendar" aria-labelledby="titulo-agendar" className="scroll-mt-24 lg:col-span-2">
          <h2 id="titulo-agendar" className="text-xl font-bold text-slate-900">
            Agendar doação
          </h2>

          {aviso && (
            <Mensagem tipo={aviso.tipo} titulo={aviso.titulo} className="mt-4">
              {aviso.texto}
            </Mensagem>
          )}

          <form noValidate onSubmit={handleSubmit(handleAgendar)} className="mt-4 space-y-5 rounded-2xl border border-slate-200 p-5 sm:p-6">
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
            <CampoSelecao
              id="hemocentroId"
              rotulo="Hemocentro"
              obrigatorio
              disabled={hemocentros.carregando}
              erro={errors.hemocentroId?.message}
              {...register("hemocentroId")}
            >
              <option value="">{hemocentros.carregando ? "Carregando hemocentros..." : "Escolha o hemocentro"}</option>
              {hemocentros.dados?.map((hemocentro) => (
                <option key={hemocentro.id} value={hemocentro.id}>
                  {hemocentro.nome} · {hemocentro.cidade}
                </option>
              ))}
            </CampoSelecao>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <CampoTexto
                id="data"
                rotulo="Dia"
                type="date"
                obrigatorio
                min={amanha}
                erro={errors.data?.message}
                dica={proxima.podeDoar ? undefined : `Você pode doar a partir de ${formatarData(proxima.proximaDataPermitida)}.`}
                {...register("data")}
              />
              <CampoSelecao id="horario" rotulo="Horário" obrigatorio erro={errors.horario?.message} {...register("horario")}>
                <option value="">Escolha</option>
                {HORARIOS.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </CampoSelecao>
            </div>
            <Botao type="submit" larguraTotal tamanho="lg" carregando={isSubmitting}>
              {isSubmitting ? "Agendando..." : "Agendar doação"}
            </Botao>
          </form>
        </section>

        {/* Histórico (GET) */}
        <section aria-labelledby="titulo-historico" className="lg:col-span-3">
          <div className="flex items-center justify-between gap-4">
            <h2 id="titulo-historico" className="text-xl font-bold text-slate-900">
              Minhas doações
            </h2>
            {painel.carregando && <span className="text-sm text-slate-500">Atualizando...</span>}
          </div>

          <div className="mt-4">
            {doacoes.length === 0 ? (
              <EstadoVazio
                titulo="Você ainda não tem doações registradas."
                descricao="Que tal agendar a primeira? Escolha o hemocentro, o dia e o horário no formulário."
                acao={
                  <Botao onClick={() => document.getElementById("hemocentroId")?.focus()}>Agendar a primeira doação</Botao>
                }
              />
            ) : (
              <ul className="space-y-4">
                {doacoes.map((doacao) => (
                  <li key={doacao.id}>
                    <CardDoacao
                      doacao={doacao}
                      aoCancelar={setParaCancelar}
                      cancelando={cancelando && paraCancelar?.id === doacao.id}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* Confirmação do cancelamento (PUT) */}
      <Modal
        aberto={paraCancelar !== null}
        titulo="Cancelar este agendamento?"
        aoFechar={() => !cancelando && setParaCancelar(null)}
        acoes={
          <>
            <Botao variante="contorno" onClick={() => setParaCancelar(null)} disabled={cancelando}>
              Manter agendamento
            </Botao>
            <Botao onClick={confirmarCancelamento} carregando={cancelando}>
              Sim, cancelar
            </Botao>
          </>
        }
      >
        {paraCancelar && (
          <p>
            A doação de <strong>{formatarData(paraCancelar.dataDoacao)}</strong> às{" "}
            <strong>{formatarHora(paraCancelar.dataDoacao)}</strong> no <strong>{paraCancelar.hemocentroNome}</strong> será
            cancelada.
          </p>
        )}
      </Modal>
    </>
  );
}
