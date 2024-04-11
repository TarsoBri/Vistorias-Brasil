import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { api } from "../Apis/api";

// context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useAuthenticate from "./useContexts/useAuthenticate";

// interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { Login } from "../interfaces/Login";
interface Config extends ConfigAxios {
  data: Login;
}

export const useLoginUser = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user, setKeyToken } = useAuthenticate();

  const handleLoginUser = async (data: Login) => {
    setLoading(true);

    const config: Config = {
      url,
      method: "post",
      data: data,
      headers: {
        "Token-Auth": tokenAuth,
      },
    };
    await api
      .request(config)
      .then((res) => {
        setKeyToken(res.data);
        navigate("/");
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleLoginUser, user, loading, error };
};
