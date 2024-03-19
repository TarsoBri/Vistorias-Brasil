import { useState } from "react";
import { useFetchData } from "./useFetchData";

import { Clients } from "../interfaces/Clients";

// api
import { api } from "../Apis/api";
import { useNavigate } from "react-router-dom";

export const useCreateData = (url: string) => {
  const { setData } = useFetchData(url);

  const navogate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCreateClient = async (data: Clients) => {
    setLoading(true);

    await api
      .post(url, data)
      .then((res) => {
        setData((prevData) => [...prevData, res.data]);
        navogate("/");
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleCreateClient, loading, error };
};
