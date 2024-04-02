import { useState } from "react";
import { api } from "../Apis/api";

interface Passwords {
  password: string;
  newPassword: string;
}

export const useChangePassword = (url: string) => {
  const [sucess, setSucess] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePasswordApi = async (data: Passwords) => {
    setLoading(true);

    const newData = { ...data, update_at: new Date().toLocaleString() };

    await api
      .patch(url, newData)
      .then(() => setSucess("Sua senha foi alterada com sucesso!"))
      .catch((err) => {
        setErro(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return { handleChangePasswordApi, sucess, setSucess, loading, erro, setErro };
};
