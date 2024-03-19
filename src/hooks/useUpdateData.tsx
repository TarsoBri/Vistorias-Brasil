import { useState } from "react";
import { api } from "../Apis/api";

import { Clients } from "../interfaces/Clients";

import useAuthenticate from "./useAuthenticate";

export const useUpdateData = (url: string | undefined) => {
  const { setUser } = useAuthenticate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUpdateData = async (data_: Clients) => {
    if (url !== undefined) {
      setLoading(true);
      await api
        .patch(url, data_)
        .then((res) => setUser(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  return { handleUpdateData, error, loading };
};
