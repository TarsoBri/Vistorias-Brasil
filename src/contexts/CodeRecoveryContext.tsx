import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

// interfaces
interface Props {
  children: ReactNode;
}
interface Code {
  hashedCode: string;
  email: string;
  id: string;
}
interface Context {
  codeHashed: Code | undefined;
  setCodeHashed: Dispatch<SetStateAction<Code | undefined>>;
}

export const CodeRecovery = createContext<Context | undefined>(undefined);

export const CodeRecoveryProvider = ({ children }: Props) => {
  const [codeHashed, setCodeHashed] = useState<Code | undefined>(undefined);
  console.log(codeHashed);
  return (
    <CodeRecovery.Provider value={{ codeHashed, setCodeHashed }}>
      {children}
    </CodeRecovery.Provider>
  );
};
