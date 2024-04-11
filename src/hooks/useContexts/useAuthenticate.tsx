import { useContext } from "react";
import { Authenticate } from "../../contexts/authenticateContext";

const useAuthenticate = () => {
  const context = useContext(Authenticate);
  if (!context) {
    throw new Error("O contexto não está disponível!");
  }
  const { user, setUser, handleModalLogout, keyToken, setKeyToken } = context;
  return { user, setUser, handleModalLogout, keyToken, setKeyToken };
};

export default useAuthenticate;
