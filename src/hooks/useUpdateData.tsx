import { useState } from "react";
import { api } from "../Apis/api";

// interfaces
import { Clients } from "../interfaces/Clients";
import UpdateStatus from "../interfaces/UpdateStatus";

import useAuthenticate from "./useAuthenticate";

export const useUpdateData = (url: string | undefined) => {
  const { user, setUser } = useAuthenticate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUpdateData = async (data: Clients | UpdateStatus) => {
    if (url !== undefined) {
      setLoading(true);
      await api
        .patch(url, data)
        .then((res) => {
          if (user && user._id === data._id) {
            setUser(res.data);
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  return { handleUpdateData, error, setError, loading };
};
