import * as yup from "yup";
import { calcularIdade, hojeIso } from "../utils/datas";
import { IDADE_MAXIMA, IDADE_MINIMA, PESO_MINIMO } from "../utils/regrasDoacao";
import { cpfValido, emailValido, telefoneValido, TIPOS_SANGUINEOS } from "../utils/validacoes";

// Esquemas de validação (Yup) usados pelos formulários com React Hook Form.
// As regras do cadastro são as mesmas da API Java, para o erro aparecer antes de enviar.

/** Aceita "72,5" ou "72.5" e devolve um número (ou NaN se não for número). */
function paraNumero(valor: string) {
  return Number(String(valor).replace(",", "."));
}

const dataNoPassado = yup
  .string()
  .required("Informe a data de nascimento.")
  .test("passado", "A data de nascimento precisa estar no passado.", (valor) => !valor || valor < hojeIso());

const peso = yup
  .string()
  .required("Informe o seu peso.")
  .test("numero", "Digite um peso válido, em kg.", (valor) => {
    const numero = paraNumero(valor ?? "");
    return Number.isFinite(numero) && numero > 0 && numero <= 300;
  });

// ---------------------------------------------------------------- Cadastro de doador

export const esquemaCadastro = yup.object({
  nome: yup
    .string()
    .trim()
    .required("Informe o nome completo.")
    .min(3, "Informe o nome completo.")
    .max(100, "O nome pode ter no máximo 100 caracteres."),
  cpf: yup.string().required("Informe o CPF.").test("cpf", "Digite os 11 números do CPF.", (valor) => cpfValido(valor ?? "")),
  sexo: yup.string().required("Escolha uma opção.").oneOf(["M", "F"], "Escolha uma opção."),
  dataNascimento: dataNoPassado.test("idade", function (valor) {
    if (!valor || valor >= hojeIso()) return true;
    const idade = calcularIdade(valor);
    return idade >= IDADE_MINIMA && idade <= IDADE_MAXIMA
      ? true
      : this.createError({ message: `É preciso ter de ${IDADE_MINIMA} a ${IDADE_MAXIMA} anos para doar (você tem ${idade}).` });
  }),
  peso: peso.test("minimo", `O peso mínimo para doar sangue é ${PESO_MINIMO} kg.`, (valor) => {
    const numero = paraNumero(valor ?? "");
    return !Number.isFinite(numero) || numero >= PESO_MINIMO;
  }),
  email: yup
    .string()
    .trim()
    .required("Informe o seu e-mail.")
    .test("email", "Digite um e-mail válido, como nome@email.com.", (valor) => emailValido(valor ?? "")),
  telefone: yup
    .string()
    .default("")
    .test("telefone", "Digite o DDD e o número, como (11) 99999-0000.", (valor) => !valor || telefoneValido(valor)),
  tipoSanguineo: yup
    .string()
    .required("Escolha o seu tipo sanguíneo.")
    .test("tipo", "Escolha o seu tipo sanguíneo.", (valor) => (TIPOS_SANGUINEOS as readonly string[]).includes(valor ?? "")),
});
export type FormCadastro = yup.InferType<typeof esquemaCadastro>;

// ---------------------------------------------------------------- Posso doar?

export const esquemaPossoDoar = yup.object({
  sexo: yup.string().required("Escolha uma opção.").oneOf(["M", "F"], "Escolha uma opção."),
  dataNascimento: dataNoPassado,
  peso,
  nuncaDoei: yup.boolean().default(false),
  ultimaDoacao: yup
    .string()
    .default("")
    .when("nuncaDoei", {
      is: false,
      then: (campo) =>
        campo
          .required("Informe a data da última doação ou marque “Nunca doei”.")
          .test("futuro", "A última doação não pode estar no futuro.", (valor) => !valor || valor <= hojeIso()),
    }),
});
export type FormPossoDoar = yup.InferType<typeof esquemaPossoDoar>;

// ---------------------------------------------------------------- Contato

export const MINIMO_MENSAGEM = 20;

export const esquemaContato = yup.object({
  nome: yup.string().trim().required("Informe o seu nome.").min(3, "Informe o seu nome (pelo menos 3 letras)."),
  email: yup
    .string()
    .trim()
    .required("Informe o seu e-mail.")
    .test("email", "Digite um e-mail válido, como nome@email.com.", (valor) => emailValido(valor ?? "")),
  assunto: yup.string().required("Escolha um assunto."),
  mensagem: yup
    .string()
    .trim()
    .required("Escreva a sua mensagem.")
    .min(MINIMO_MENSAGEM, `Escreva pelo menos ${MINIMO_MENSAGEM} caracteres para podermos ajudar.`),
});
export type FormContato = yup.InferType<typeof esquemaContato>;

// ---------------------------------------------------------------- Agendamento de doação

export const esquemaAgendamento = yup.object({
  hemocentroId: yup.string().required("Escolha o hemocentro."),
  data: yup
    .string()
    .required("Escolha o dia da doação.")
    .test("futuro", "Escolha um dia a partir de amanhã.", (valor) => !valor || valor > hojeIso()),
  horario: yup.string().required("Escolha o horário."),
});
export type FormAgendamento = yup.InferType<typeof esquemaAgendamento>;

export { paraNumero };
