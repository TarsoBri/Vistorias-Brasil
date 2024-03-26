import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useSessionStorage } from "@uidotdev/usehooks";

//axios
import { api } from "../Apis/api";

// Token
import { jwtDecode } from "jwt-decode";

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
interface Decode {
  exp: number;
  iat: number;
  userId: string;
}

export const Authenticate = createContext<Context | undefined>(undefined);

export const AutheticateProvider = ({ children }: Props) => {
  const url: string = "/cliesnt/login/confirm";
  const [user, setUser] = useState<Clients | undefined>();
  const [keyToken, setKeyToken] = useSessionStorage<Token>("UserAuth", {
    token: "",
  });
  console.log(keyToken);

  // Authorization user
  useEffect(() => {
    const authorizeToken = async () => {
      if (keyToken.token != "") {
        const decodedToken = jwtDecode<Decode>(keyToken.token);
        if (decodedToken && decodedToken.userId) {
          await api
            .post(url, {
              token: keyToken.token,
              userId: decodedToken.userId,
              key: import.meta.env.VITE_TOKEN_PASSWORD,
            })
            .then((res) => setUser(res.data))
            .catch(() => {
              console.error("Usuário não autorizado a entrar.");
              setKeyToken({ token: "" });
              setUser(undefined);
            });
        }
      }
    };
    authorizeToken();
  }, [keyToken.token]);
  console.log(user);
  const handleModalLogout = (logout: boolean): void => {
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
