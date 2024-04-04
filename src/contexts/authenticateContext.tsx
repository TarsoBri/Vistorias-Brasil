import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

// Hooks
import { useAutenticateTokenUser } from "../hooks/useAutenticateTokenUser";

// SessionStorage
import { useSessionStorage } from "@uidotdev/usehooks";

//Interfaces
import { Clients } from "../interfaces/Clients";

interface Context {
  user: Clients | undefined;
  setUser: Dispatch<SetStateAction<Clients | undefined>>;
  handleModalLogout: (logout: boolean) => void;
  keyToken: Token;
  setKeyToken: Dispatch<SetStateAction<Token>>;
}

interface Props {
  children: ReactNode;
}
interface Token {
  token: string;
}

export const Authenticate = createContext<Context | undefined>(undefined);

export const AutheticateProvider = ({ children }: Props) => {
  const url: string = "/clients/login/confirm";
  const [user, setUser] = useState<Clients | undefined>();
  const [keyToken, setKeyToken] = useSessionStorage<Token>("UserAuth", {
    token: "",
  });
  console.log(keyToken);

  // Confirm auth user
  const { authorizeToken, data, erro } = useAutenticateTokenUser(url);

  useEffect(() => {
    authorizeToken(keyToken.token);
  }, [keyToken.token]);

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (erro) {
      setKeyToken({ token: "" });
      setUser(undefined);
    }
  }, [data, erro]);

  console.log(user);

  // Modal logout func
  const handleModalLogout = (logout: boolean) => {
    const modal_logout = document.getElementById("modal_logout");

    modal_logout?.classList.toggle("hide");

    if (logout) {
      setKeyToken({ token: "" });
      setUser(undefined);
    }
  };

  return (
    <Authenticate.Provider
      value={{ user, setUser, handleModalLogout, keyToken, setKeyToken }}
    >
      {children}
    </Authenticate.Provider>
  );
};
