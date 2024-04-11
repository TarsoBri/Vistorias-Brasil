import { useContext } from "react";
import { AuthToUse } from "../../contexts/authToUseContext";

const useAuthToUseContext = () => {
  const context = useContext(AuthToUse);
  if (!context) {
    throw new Error("O contexto não está disponível!");
  }
  const { tokenAuth } = context;
  return { tokenAuth };
};

export default useAuthToUseContext;
