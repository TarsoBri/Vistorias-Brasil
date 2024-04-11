import { useContext } from "react";
import { CodeRecovery } from "../../contexts/CodeRecoveryContext";

const useCodeHashed = () => {
  const context = useContext(CodeRecovery);
  if (!context) {
    throw new Error("O contexto não está disponível!");
  }
  const { codeHashed, setCodeHashed } = context;
  return { codeHashed, setCodeHashed };
};

export default useCodeHashed;
