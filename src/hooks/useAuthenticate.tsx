import { useContext } from "react";
import { Authenticate } from "../contexts/authenticateContext";

const useAuthenticate = () => {
  const context = useContext(Authenticate);
  if (!context) {
    throw new Error("O contexto não está disponível!");
  }
  const { user, setUser, handleModalLogout } = context;
  return { user, setUser, handleModalLogout };
};

export default useAuthenticate;
