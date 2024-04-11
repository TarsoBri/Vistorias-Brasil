import { useState } from "react";

// axios
import { api } from "../Apis/api";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useAuthenticate from "./useContexts/useAuthenticate";

// interface
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { Clients } from "../interfaces/Clients";

// decode
import { jwtDecode } from "jwt-decode";

interface Config extends ConfigAxios {
  data: {
    token: string;
  };
}

export const useAutenticateTokenUser = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();

  const [data, setData] = useState<Clients>();
  const [erro, setErro] = useState<boolean>(false);

  const authorizeToken = async (token: string) => {
    if (token != "") {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const expirationTime = decodedToken.iat && decodedToken.iat + 3600;
      console.log(expirationTime, currentTime);
      if (expirationTime && expirationTime < currentTime) {
        setErro(true);
        alert("Login expirado!");
      } else {
        const config: Config = {
          url,
          method: "post",
          data: {
            token,
          },
          headers: {
            "Token-Auth": tokenAuth,
          },
        };
        await api
          .request(config)
          .then((res) => setData(res.data))
          .catch(() => setErro(true));
      }
    }
  };
  return { authorizeToken, data, erro };
};
