import { useState } from "react";

// api
import { api } from "../Apis/api";

// Interfaces
import { Clients } from "../interfaces/Clients";

export const useFetchDataById = (url: string) => {
  const [data, setData] = useState<Clients>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleFetchById = async () => {
    setLoading(true);
    await api
      .get(url)
      .then((res) => setData(res.data[0]))
      .catch((err) => setError(`Erro na API: ${err.message}`));
    setLoading(false);
  };

  return { handleFetchById, data, loading, error };
};
