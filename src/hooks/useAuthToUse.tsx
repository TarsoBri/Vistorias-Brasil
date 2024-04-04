import { useState } from "react";
import { api } from "../Apis/api";

interface Token {
  tokenAuth: string;
}

export const useAuthToUse = () => {
  const [tokenAuthToUse, setTokenAuthToUse] = useState<Token>({
    tokenAuth: "",
  });
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthToUse = async () => {
    setLoading(true);

    await api
      .get("/auth")
      .then((res) => setTokenAuthToUse(res.data))
      .catch((err) => {
        setErro(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return { handleAuthToUse, tokenAuthToUse, loading, erro, setErro };
};
