import { useState } from "react";
import { api } from "../Apis/api";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useAuthenticate from "./useContexts/useAuthenticate";

// Interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { PasswordData } from "../interfaces/PasswordData";
import { PasswordDataRecovery } from "../interfaces/PasswordDataRecovery";
interface Config extends ConfigAxios {
  data: {
    update_at: string;
    password: string | undefined;
    newPassword: string;
  };
}

export const useChangePassword = (url: string) => {
  const { user, setUser } = useAuthenticate();

  const { tokenAuth } = useAuthToUseContext();

  const [erro, setErro] = useState<string>("");
  const [sucess, setSucess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePasswordApi = async (
    data: PasswordData | PasswordDataRecovery
  ) => {
    setLoading(true);

    const config: Config = {
      url,
      method: "patch",
      data: {
        ...data,
        update_at: new Date().toLocaleString(),
      },
      headers: {
        "Token-Auth": tokenAuth,
      },
    };

    await api
      .request(config)
      .then(() => {
        setErro("");
        setSucess(true);
      })
      .catch((err) => {
        console.log(err);
        setSucess(false);
        setErro(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return {
    handleChangePasswordApi,
    user,
    sucess,
    setSucess,
    loading,
    erro,
    setErro,
  };
};
