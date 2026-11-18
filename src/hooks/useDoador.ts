import { useContext } from "react";
import { DoadorContext } from "../Context/DoadorContext";

/** Atalho para ler o doador conectado em qualquer componente. */
const useDoador = () => {
  return useContext(DoadorContext);
};

export default useDoador;
