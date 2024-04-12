import { useState } from "react";
import { api } from "../Apis/api";

// context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useAuthenticate from "./useContexts/useAuthenticate";

// interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { Clients } from "../interfaces/Clients";
import { UpdateStatus } from "../interfaces/UpdateStatus";
interface Config extends ConfigAxios {
  data: Clients | UpdateStatus;
}

export const useUpdateData = (url: string | undefined) => {
  const { tokenAuth } = useAuthToUseContext();

  const { user, setUser } = useAuthenticate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUpdateData = async (data: Clients | UpdateStatus) => {
    if (url !== undefined) {
      setLoading(true);

      const config: Config = {
        url,
        method: "patch",
        data: data,
        headers: {
          "Token-Auth": tokenAuth,
        },
      };

      await api
        .request(config)
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
