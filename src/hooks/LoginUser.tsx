import { useState } from "react";

import { api } from "../Apis/api";
import { Login } from "../interfaces/Login";

export const LoginUser = (url: string) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginUser = async (data: Login) => {
    setLoading(true);
    await api
      .post(url, data)
      .then((res) => console.log(res.data))
      .catch(() => setError("Email ou senha incorretos!"))
      .finally(() => setLoading(false));
  };

  return { handleLoginUser, loading, error };
};
