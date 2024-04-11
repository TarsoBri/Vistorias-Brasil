import { useState } from "react";
import { api } from "../Apis/api";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useAuthenticate from "./useContexts/useAuthenticate";

// Interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
import PasswordData from "../interfaces/PasswordData";
interface Config extends ConfigAxios {
  data: {
    update_at: string;
    password: string;
    newPassword: string;
  };
}

export const useChangePassword = (url: string) => {
  const { user, setUser } = useAuthenticate();

  const { tokenAuth } = useAuthToUseContext();

  const [sucess, setSucess] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePasswordApi = async (data: PasswordData) => {
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
      .then((res) => {
        if (user && user._id === data._id) {
          setUser(res.data);
          setErro("");
          setSucess("Senha alterada com sucesso!");
        }
      })
      .catch((err) => {
        console.log(err);
        setSucess("");
        setErro(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return { handleChangePasswordApi, sucess, setSucess, loading, erro, setErro };
};
