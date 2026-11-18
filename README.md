# RedLink — Front-End

> **O sangue certo, do doador certo, na hora certa.**
> Global Solution 2026/2 · CitizenTech · Front-End Design Engineering · FIAP

## Objetivo

A RedLink é uma plataforma em que o hemocentro informa quais tipos sanguíneos estão em falta e o sistema avisa
**somente os doadores daquele tipo que já podem doar de novo**, para que eles agendem a doação.

Este repositório é o front-end (SPA em React) da solução. Ele consome a **API REST em Java** desenvolvida na disciplina
de Domain Driven Design Using Java: lista hemocentros, cadastra doadores, mostra o histórico de doações, agenda
doações (respeitando as regras oficiais de 60/90 dias) e cancela agendamentos.

## Links

| O quê | Endereço |
|-------|----------|
| Aplicação na Vercel | https://redlink-front.vercel.app |
| Repositório do front-end (GitHub) | https://github.com/tenorio085/redlink-front |
| API Java publicada (Render) | https://redlink-api-4n0s.onrender.com |
| Repositório da API Java | https://github.com/tenorio085/redlink-api |
| Vídeo no YouTube (até 3 min) | _PREENCHER_ |

> A API está no plano gratuito do Render, que "dorme" quando fica sem uso. A primeira requisição pode levar
> até um minuto; a interface mostra um aviso enquanto espera.

## Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
|------|----|-------|--------|----------|
| Thiago Motitsuki Tan | RM570760 | 1TDSPI | [ThiagoTan](https://github.com/ThiagoTan) | [thiago-tan](https://www.linkedin.com/in/thiago-tan) |
| Felipe Tenorio Diniz | RM568828 | 1TDSPI | [tenorio085](https://github.com/tenorio085) | — |
| João Pedro Rodrigues Siqueira | RM571316 | 1TDSPI | [JoaoSiqueira12](https://github.com/JoaoSiqueira12) | [joão-siqueira](https://www.linkedin.com/in/jo%C3%A3o-siqueira-25a055410) |
| Arthur Netto Barbosa | RM569982 | 1TDSPI | [arthurnetto08](https://github.com/arthurnetto08) | [arthur-barbosa](https://www.linkedin.com/in/arthur-barbosa-8654353bb) |
| Gustavo Tenorio de Souza | RM569032 | 1TDSPK | — | — |

## Tecnologias

- **React 19 + Vite** — aplicação de página única (SPA)
- **TypeScript** — tipos para props, estados e respostas da API
- **Tailwind CSS 4** — estilização com classes utilitárias e layout responsivo
- **React Router** — rotas estáticas e com parâmetro (`createBrowserRouter`)
- **React Hook Form + Yup** — formulários com validação
- **Context API (`useContext`)** — lembra o doador conectado em todas as páginas
- **Fetch API** — todas as requisições HTTP (sem Axios ou outra biblioteca)
- **ESLint** — padronização do código

## Páginas e rotas

| Rota | Página | Integração com a API Java |
|------|--------|---------------------------|
| `/` | Home: o problema, a solução e os hemocentros parceiros | `GET /hemocentros` |
| `/integrantes` | Lista da equipe | — |
| `/integrantes/:rm` | Perfil de um integrante (**rota com parâmetro**) | — |
| `/sobre` | Objetivo, regras oficiais de doação, ODS e tecnologias | — |
| `/faq` | Perguntas frequentes (acordeão) | — |
| `/contato` | Formulário de contato com validação | — |
| `/posso-doar` | Calculadora: diz se a pessoa já pode doar e a partir de quando | — (regras no front) |
| `/cadastro` | Cadastro de doador | `POST /doadores` |
| `/doadores` | Entrada da área do doador (código de doador) | — |
| `/doadores/:id` | Área do doador (**rota com parâmetro**): dados, "posso doar?", histórico, agendar e cancelar | `GET /doadores/{id}`, `GET /doadores/{id}/doacoes`, `GET /doadores/{id}/proxima-doacao`, `GET /hemocentros`, `POST /doadores/{id}/doacoes`, `PUT /doacoes/{id}` |
| `*` | Página não encontrada | — |

Páginas institucionais: Home, Integrantes, Sobre, FAQ e Contato. Páginas da solução: Posso doar?, Cadastro e
Área do doador.

## Estrutura de pastas

```
src/
├── components/   componentes reutilizáveis (Header, Footer, MenuMobile, Botao, Mensagem, Carregando,
│                 Modal, Campos, CardDoacao, SeloTipoSanguineo, TituloPagina, Acordeao...)
├── Context/      DoadorContext: o código do doador conectado (useContext + localStorage)
├── data/         dados fixos da interface (integrantes e perguntas do FAQ)
├── hooks/        useDoador (lê o Context) e useRequisicao (carregando / erro / dados)
├── pages/        uma página por rota
├── schemas/      esquemas de validação com Yup
├── services/     chamadas à API Java com fetch (api.ts, doadorService, doacaoService, hemocentroService)
├── types/        tipos das respostas da API e da interface
├── utils/        datas, regras de doação e validações (CPF, e-mail, máscaras)
├── App.tsx       layout comum: cabeçalho, <Outlet /> e rodapé
├── main.tsx      rotas (createBrowserRouter) e o Provider do Context
└── index.css     Tailwind e o tema de cores da RedLink
```

## Como executar

Pré-requisito: Node.js 20 ou mais recente.

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

Outros comandos:

```bash
npm run build     # gera a versão de produção na pasta dist
npm run preview   # serve a versão de produção localmente
npm run lint      # verifica o código com o ESLint
```

### Endereço da API

Por padrão o front usa a API publicada no Render. Para usar outra (por exemplo, a API rodando no seu computador),
copie `.env.example` para `.env` e altere a variável:

```
VITE_API_URL=http://localhost:8080
```

## Deploy na Vercel

1. Na Vercel, **Add New > Project** e importe este repositório.
2. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`). Clique em **Deploy**.
3. O arquivo `vercel.json` faz todas as rotas abrirem o `index.html`, para que endereços como
   `/integrantes/570760` funcionem ao serem acessados direto ou ao recarregar a página.

## Contato

Equipe RedLink — FIAP, Análise e Desenvolvimento de Sistemas, 1º ano (turmas 1TDSPI e 1TDSPK).
Use a página `/contato` da aplicação ou abra uma *issue* neste repositório.
