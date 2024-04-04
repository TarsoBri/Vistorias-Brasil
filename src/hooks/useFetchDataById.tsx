import { useState } from "react";

// Context
import useAuthToUseContext from "./useAuthToUseContext";

// api
import { api } from "../Apis/api";

// Interfaces
import { Clients } from "../interfaces/Clients";
import { ConfigAxios } from "../interfaces/ConfigAxios";

export const useFetchDataById = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();

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
      },
    };
    await api
      .request(config)
      .then((res) => setData(res.data[0]))
      .catch((err) => setError(`Erro na API: ${err.message}`));
    setLoading(false);
  };

  return { handleFetchById, data, loading, error };
};
