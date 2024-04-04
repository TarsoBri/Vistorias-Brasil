import { useState } from "react";

// Contexts
import useAuthToUseContext from "./useAuthToUseContext";

// api
import { api } from "../Apis/api";

// hooks
import { useFetchData } from "./useFetchData";

// interfaces
import { Clients } from "../interfaces/Clients";
import { ConfigAxios } from "../interfaces/ConfigAxios";
interface Config extends ConfigAxios {
  data: Clients;
}

export const useCreateData = (url: string) => {
  const { setData } = useFetchData({ url, order: "news" });

  const { tokenAuth } = useAuthToUseContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [sucess, setSucess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCreateClient = async (data: Clients) => {
    setLoading(true);
    const config: Config = {
      url,
      method: "post",
      data,
      headers: {
        "Token-Auth": tokenAuth,
      },
    };
    await api
      .request(config)
      .then((res) => {
        setData((prevData) => [...prevData, res.data]);
        setError("");
        setSucess(true);
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleCreateClient, sucess, loading, error };
};
