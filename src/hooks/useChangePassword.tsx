import { useState } from "react";
import { api } from "../Apis/api";

interface Passwords {
  password: string;
  newPassword: string;
}

export const useChangePassword = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");

  const handleChangePasswordApi = async (data: Passwords) => {
    setLoading(false);

    const newData = { ...data, update_at: new Date().toLocaleString() };

    await api
      .patch(url, newData)
      .then(() => console.log("senha alterada!"))
      .catch((err) => {
        setErro(err.response.data);
      });
    setLoading(true);
  };

  return { handleChangePasswordApi, loading, erro, setErro };
};
