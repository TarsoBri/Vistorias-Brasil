import { useState } from "react";

// axios
import { api } from "../Apis/api";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";

// interface
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { Clients } from "../interfaces/Clients";

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
  };
  return { authorizeToken, data, erro };
};
