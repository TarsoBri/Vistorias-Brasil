import { useState } from "react";
import { api } from "../Apis/api";

// Context
import useAuthToUseContext from "./useAuthToUseContext";

// Interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
interface Passwords {
  password: string;
  newPassword: string;
}
interface Config extends ConfigAxios {
  data: {
    newData: {
      update_at: string;
      password: string;
      newPassword: string;
    };
  };
}

export const useChangePassword = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();

  const [sucess, setSucess] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePasswordApi = async (data: Passwords) => {
    setLoading(true);

    const newData = { ...data, update_at: new Date().toLocaleString() };

    const config: Config = {
      url,
      method: "patch",
      data: {
        newData,
      },
      headers: {
        "Token-Auth": tokenAuth,
      },
    };

    await api
      .request(config)
      .then(() => setSucess("Sua senha foi alterada com sucesso!"))
      .catch((err) => {
        console.log(err)
        setErro(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return { handleChangePasswordApi, sucess, setSucess, loading, erro, setErro };
};
