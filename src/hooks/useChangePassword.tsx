import { useState } from "react";
import { api } from "../Apis/api";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";

// Interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
import { PasswordData } from "../interfaces/PasswordData";
import { PasswordDataRecovery } from "../interfaces/PasswordDataRecovery";
interface Config extends ConfigAxios {
  data: PasswordDataRecovery | PasswordData;
}

export const useChangePassword = (url: string) => {
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
      data: data,
      headers: {
        "Token-Auth": tokenAuth,
      },
    };

    await api
      .request(config)
      .then(() => {
        setSucess(true);
      })
      .catch((err) => {
        console.log(err);
        setErro(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return {
    handleChangePasswordApi,
    sucess,
    setSucess,
    loading,
    erro,
    setErro,
  };
};
