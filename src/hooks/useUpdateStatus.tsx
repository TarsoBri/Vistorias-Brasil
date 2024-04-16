import { useState } from "react";
import { api } from "../Apis/api";

// context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useAuthenticate from "./useContexts/useAuthenticate";

// interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { UpdateStatus } from "../interfaces/UpdateStatus";
interface Config extends ConfigAxios {
  data: UpdateStatus;
}

export const useUpdateStatus = (url: string | undefined) => {
  const { tokenAuth } = useAuthToUseContext();

  const { keyToken } = useAuthenticate();

  const [loading, setLoading] = useState<boolean>(false);
  const [sucess, setSucess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUpdateStatus = async (data: UpdateStatus) => {
    if (url !== undefined) {
      setLoading(true);
      setSucess(false);

      const config: Config = {
        url,
        method: "patch",
        data: data,
        headers: {
          "Token-Auth": tokenAuth,
          "Login-Auth": keyToken.token,
        },
      };

      await api
        .request(config)
        .then(() => {
          setSucess(true);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  return { handleUpdateStatus, sucess, error, setError, loading };
};
