import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { DoadorProvider } from "./Context/DoadorContext.tsx";
import AreaDoador from "./pages/AreaDoador.tsx";
import Cadastro from "./pages/Cadastro.tsx";
import Contato from "./pages/Contato.tsx";
import DoadorDetalhe from "./pages/DoadorDetalhe.tsx";
import Faq from "./pages/Faq.tsx";
import Home from "./pages/Home.tsx";
import IntegranteDetalhe from "./pages/IntegranteDetalhe.tsx";
import Integrantes from "./pages/Integrantes.tsx";
import NaoEncontrada from "./pages/NaoEncontrada.tsx";
import PossoDoar from "./pages/PossoDoar.tsx";
import Sobre from "./pages/Sobre.tsx";

// Rotas da aplicação. O App é o layout (cabeçalho + rodapé) e as páginas aparecem no <Outlet />.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Páginas institucionais
      { path: "/", element: <Home /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> }, // rota com parâmetro
      { path: "/sobre", element: <Sobre /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contato", element: <Contato /> },
      // Páginas da solução
      { path: "/posso-doar", element: <PossoDoar /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/doadores", element: <AreaDoador /> },
      { path: "/doadores/:id", element: <DoadorDetalhe /> }, // rota com parâmetro (integra com a API)
      // Qualquer outro endereço
      { path: "*", element: <NaoEncontrada /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DoadorProvider>
      <RouterProvider router={router} />
    </DoadorProvider>
  </StrictMode>,
);
