import { useState } from "react";

// interfaces
import { Clients } from "../interfaces/Clients";

// api
import { api } from "../Apis/api";

// hooks
import { useFetchData } from "./useFetchData";

export const useCreateData = (url: string) => {
  const { setData } = useFetchData(url);

  const [loading, setLoading] = useState<boolean>(false);
  const [sucess, setSucess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCreateClient = async (data: Clients) => {
    setLoading(true);

    await api
      .post(url, data)
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
