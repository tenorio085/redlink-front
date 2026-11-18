import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

// Campos de formulário reutilizáveis: rótulo, campo, dica e mensagem de erro.
// Funcionam com o register do React Hook Form: <CampoTexto {...register("nome")} />
// O erro fica ligado ao campo por aria-invalid e aria-describedby (o leitor de tela anuncia).

const ESTILO_CAMPO =
  "mt-1.5 block w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:text-slate-400";

function estiloBorda(erro?: string) {
  return erro
    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
    : "border-slate-300 focus:border-sangue-500 focus:ring-sangue-100";
}

type BaseCampo = {
  id: string;
  rotulo: string;
  erro?: string;
  dica?: ReactNode;
  obrigatorio?: boolean;
};

function Rotulo({ id, rotulo, obrigatorio }: { id: string; rotulo: string; obrigatorio?: boolean }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
      {rotulo}
      {obrigatorio ? (
        <span className="text-sangue-600" aria-hidden="true">
          {" "}
          *
        </span>
      ) : (
        <span className="font-normal text-slate-500"> (opcional)</span>
      )}
    </label>
  );
}

function Rodape({ id, erro, dica }: { id: string; erro?: string; dica?: ReactNode }) {
  return (
    <>
      {dica && !erro && (
        <p id={`${id}-dica`} className="mt-1.5 text-sm text-slate-500">
          {dica}
        </p>
      )}
      {erro && (
        <span id={`${id}-erro`} className="mt-1.5 block text-sm font-medium text-red-700">
          {erro}
        </span>
      )}
    </>
  );
}

function descritoPor(id: string, erro?: string, dica?: ReactNode) {
  if (erro) return `${id}-erro`;
  if (dica) return `${id}-dica`;
  return undefined;
}

type CampoTextoProps = BaseCampo & InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };

export function CampoTexto({ id, rotulo, erro, dica, obrigatorio, className = "", ...input }: CampoTextoProps) {
  return (
    <div className={className}>
      <Rotulo id={id} rotulo={rotulo} obrigatorio={obrigatorio} />
      <input
        id={id}
        aria-required={obrigatorio}
        aria-invalid={Boolean(erro)}
        aria-describedby={descritoPor(id, erro, dica)}
        className={`${ESTILO_CAMPO} ${estiloBorda(erro)}`}
        {...input}
      />
      <Rodape id={id} erro={erro} dica={dica} />
    </div>
  );
}

type CampoSelecaoProps = BaseCampo &
  SelectHTMLAttributes<HTMLSelectElement> & { ref?: React.Ref<HTMLSelectElement>; children: ReactNode };

export function CampoSelecao({ id, rotulo, erro, dica, obrigatorio, className = "", children, ...select }: CampoSelecaoProps) {
  return (
    <div className={className}>
      <Rotulo id={id} rotulo={rotulo} obrigatorio={obrigatorio} />
      <select
        id={id}
        aria-required={obrigatorio}
        aria-invalid={Boolean(erro)}
        aria-describedby={descritoPor(id, erro, dica)}
        className={`${ESTILO_CAMPO} ${estiloBorda(erro)}`}
        {...select}
      >
        {children}
      </select>
      <Rodape id={id} erro={erro} dica={dica} />
    </div>
  );
}

type CampoAreaTextoProps = BaseCampo &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: React.Ref<HTMLTextAreaElement> };

export function CampoAreaTexto({ id, rotulo, erro, dica, obrigatorio, className = "", ...area }: CampoAreaTextoProps) {
  return (
    <div className={className}>
      <Rotulo id={id} rotulo={rotulo} obrigatorio={obrigatorio} />
      <textarea
        id={id}
        aria-required={obrigatorio}
        aria-invalid={Boolean(erro)}
        aria-describedby={descritoPor(id, erro, dica)}
        className={`${ESTILO_CAMPO} ${estiloBorda(erro)} min-h-32 resize-y`}
        {...area}
      />
      <Rodape id={id} erro={erro} dica={dica} />
    </div>
  );
}

type OpcaoEscolha = {
  valor: string;
  rotulo: string;
};

type CampoEscolhaProps = {
  legenda: string;
  opcoes: readonly OpcaoEscolha[];
  /** Resultado do register("campo") do React Hook Form. */
  registro: UseFormRegisterReturn;
  /** Valor marcado agora (vem do watch), usado só para pintar a opção escolhida. */
  valorAtual?: string;
  erro?: string;
  colunas?: string; // classes de grade, ex.: "grid-cols-4"
};

/** Grupo de opções em botões (rádio), usado para sexo e tipo sanguíneo. */
export function CampoEscolha({ legenda, opcoes, registro, valorAtual, erro, colunas = "grid-cols-2" }: CampoEscolhaProps) {
  const idErro = `${registro.name}-erro`;
  return (
    <fieldset aria-describedby={erro ? idErro : undefined}>
      <legend className="block text-sm font-semibold text-slate-800">
        {legenda}
        <span className="text-sangue-600" aria-hidden="true">
          {" "}
          *
        </span>
      </legend>
      <div className={`mt-1.5 grid gap-2 ${colunas}`}>
        {opcoes.map((opcao) => {
          const marcado = valorAtual === opcao.valor;
          return (
            <label
              key={opcao.valor}
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sangue-600 ${
                marcado
                  ? "border-sangue-600 bg-sangue-600 text-white"
                  : erro
                    ? "border-red-300 bg-white text-slate-700 hover:bg-sangue-50"
                    : "border-slate-300 bg-white text-slate-700 hover:border-sangue-300 hover:bg-sangue-50"
              }`}
            >
              <input type="radio" value={opcao.valor} className="sr-only" {...registro} />
              {opcao.rotulo}
            </label>
          );
        })}
      </div>
      {erro && (
        <span id={idErro} className="mt-1.5 block text-sm font-medium text-red-700">
          {erro}
        </span>
      )}
    </fieldset>
  );
}
