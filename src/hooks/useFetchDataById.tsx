import { useState } from "react";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";

// api
import { api } from "../Apis/api";

// Interfaces
import { Clients } from "../interfaces/Clients";
import { ConfigAxios } from "../interfaces/ConfigAxios";
import useAuthenticate from "./useContexts/useAuthenticate";

export const useFetchDataById = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();
  const { keyToken } = useAuthenticate();

  const [data, setData] = useState<Clients>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleFetchById = async () => {
    setLoading(true);

    const config: ConfigAxios = {
      url,
      method: "get",
      headers: {
        "Token-Auth": tokenAuth,
        "Login-Auth": keyToken.token,
      },
    };
    await api
      .request(config)
      .then((res) => setData(res.data))
      .catch((err) => setError(`Erro na API: ${err.message}`));
    setLoading(false);
  };

  return { handleFetchById, data, loading, error };
};
