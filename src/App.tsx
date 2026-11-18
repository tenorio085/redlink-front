import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

/** Estrutura comum a todas as páginas: cabeçalho, a página da rota atual (Outlet) e rodapé. */
function App() {
  const { pathname } = useLocation();

  // Ao trocar de página, volta para o topo
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-lg bg-sangue-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
