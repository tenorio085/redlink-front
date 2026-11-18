import type { Doacao, StatusDoacao } from "../types/api";
import { formatarData, formatarHora, hojeIso } from "../utils/datas";
import Botao from "./Botao";
import { IconeCalendario, IconeLocal, IconeRelogio } from "./Icones";

const STATUS: Record<StatusDoacao, { rotulo: string; estilo: string }> = {
  AGENDADA: { rotulo: "Agendada", estilo: "bg-sky-100 text-sky-800" },
  REALIZADA: { rotulo: "Realizada", estilo: "bg-emerald-100 text-emerald-800" },
  NAO_COMPARECEU: { rotulo: "Não compareceu", estilo: "bg-amber-100 text-amber-800" },
  CANCELADA: { rotulo: "Cancelada", estilo: "bg-slate-200 text-slate-700" },
};

type CardDoacaoProps = {
  doacao: Doacao;
  /** Se informado, mostra o botão de cancelar nas doações agendadas para o futuro. */
  aoCancelar?: (doacao: Doacao) => void;
  cancelando?: boolean;
}

/** Cartão de uma doação: data, horário, hemocentro e situação. */
export default function CardDoacao({ doacao, aoCancelar, cancelando = false }: CardDoacaoProps) {
  const status = STATUS[doacao.status];
  const podeCancelar = aoCancelar && doacao.status === "AGENDADA" && doacao.dataDoacao.slice(0, 10) >= hojeIso();

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-2">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${status.estilo}`}>{status.rotulo}</span>
        <p className="flex items-center gap-2 font-semibold text-slate-900">
          <IconeCalendario className="size-4 shrink-0 text-sangue-600" />
          {formatarData(doacao.dataDoacao)}
          <span className="inline-flex items-center gap-1 font-normal text-slate-600">
            <IconeRelogio className="size-4 shrink-0" />
            {formatarHora(doacao.dataDoacao)}
          </span>
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <IconeLocal className="size-4 shrink-0" />
          <span className="break-words">{doacao.hemocentroNome}</span>
        </p>
      </div>

      {podeCancelar && (
        <Botao variante="perigo" onClick={() => aoCancelar(doacao)} carregando={cancelando} className="sm:shrink-0">
          Cancelar agendamento
        </Botao>
      )}
    </article>
  );
}
