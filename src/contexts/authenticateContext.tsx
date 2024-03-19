import { createContext, ReactNode, Dispatch, SetStateAction } from "react";

import { Clients } from "../interfaces/Clients";

import { useSessionStorage } from "@uidotdev/usehooks";

import { Navigate } from "react-router-dom";

interface Context {
  user: Clients | undefined;
  setUser: Dispatch<SetStateAction<Clients | undefined>>;
  handleModalLogout: (logout: boolean) => void;
}

interface Props {
  children: ReactNode;
}

export const Authenticate = createContext<Context | undefined>(undefined);

export const AutheticateProvider = ({ children }: Props) => {
  const [user, setUser] = useSessionStorage<Clients | undefined>(
    "UserAuth",
    undefined
  );
  console.log(user);

  const handleModalLogout = (logout: boolean): void => {
    const modal_logout = document.getElementById("modal_logout");

    modal_logout?.classList.toggle("hide");

    logout && setUser(undefined);
  };

  return (
    <Authenticate.Provider value={{ user, setUser, handleModalLogout }}>
      {children}
    </Authenticate.Provider>
  );
};
