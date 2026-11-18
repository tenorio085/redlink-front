import type { PerguntaFrequente } from "../types/app";

// Fonte das regras: Secretaria da Saúde do Estado de São Paulo,
// "Requisitos básicos para doação de sangue".
export const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Quem pode doar sangue?",
    resposta:
      "Pessoas de 16 a 69 anos, com pelo menos 50 kg e em boas condições de saúde. A primeira doação precisa ser feita até os 60 anos, e menores de 18 anos precisam de autorização do responsável.",
  },
  {
    pergunta: "De quanto em quanto tempo posso doar?",
    resposta:
      "Homens precisam esperar 60 dias entre uma doação e outra e podem doar até 4 vezes por ano. Mulheres precisam esperar 90 dias e podem doar até 3 vezes por ano. A página “Posso doar?” calcula a sua próxima data.",
  },
  {
    pergunta: "Quais situações impedem a doação por um tempo?",
    resposta:
      "Alguns exemplos: gripe ou resfriado (aguarde 7 dias depois do fim dos sintomas) e tatuagem ou maquiagem definitiva (aguarde 12 meses). A lista completa é avaliada na triagem do hemocentro.",
  },
  {
    pergunta: "Como funciona o agendamento pela RedLink?",
    resposta:
      "Faça o seu cadastro, guarde o código de doador e acesse a sua área. Lá você escolhe o hemocentro, o dia e o horário. Se ainda não tiver completado o intervalo mínimo, o sistema avisa a data a partir da qual você pode doar.",
  },
  {
    pergunta: "O que levar no dia da doação?",
    resposta:
      "Um documento oficial com foto. Durma bem na noite anterior, alimente-se (evite comidas gordurosas nas 4 horas anteriores) e beba bastante água.",
  },
  {
    pergunta: "A RedLink substitui a triagem do hemocentro?",
    resposta:
      "Não. A RedLink só evita que você vá ao hemocentro antes do prazo e ajuda o hemocentro a chamar quem pode doar. A avaliação de saúde continua sendo feita pela equipe do hemocentro no dia da doação.",
  },
  {
    pergunta: "Como a RedLink cuida dos meus dados?",
    resposta:
      "O tipo sanguíneo é um dado de saúde, considerado sensível pela LGPD. Guardamos só o necessário para o agendamento, o CPF não aparece em nenhuma tela depois do cadastro e o e-mail é exibido parcialmente oculto.",
  },
  {
    pergunta: "Esqueci o meu código de doador. E agora?",
    resposta:
      "O código aparece na tela logo depois do cadastro. Se você o perdeu, fale com o hemocentro ou use a página de Contato para pedir ajuda à equipe.",
  },
];
