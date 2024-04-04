import { ReactNode, createContext, useEffect } from "react";

import { useAuthToUse } from "../hooks/useAuthToUse";

// interfaces
interface Props {
  children: ReactNode;
}

interface Context {
  tokenAuth: string;
}

export const AuthToUse = createContext<Context>({ tokenAuth: "" });

export const AuthToUseProvider = ({ children }: Props) => {
  // Auth to use
  const { handleAuthToUse, tokenAuthToUse } = useAuthToUse();

  useEffect(() => {
    handleAuthToUse();
  }, []);

  if (tokenAuthToUse.tokenAuth != "") {
    const { tokenAuth } = tokenAuthToUse;
    return (
      <AuthToUse.Provider value={{ tokenAuth }}>{children}</AuthToUse.Provider>
    );
  }
};
