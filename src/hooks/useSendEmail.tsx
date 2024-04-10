import { useState } from "react";

// Contexts
import useAuthToUseContext from "./useAuthToUseContext";

// api
import { api } from "../Apis/api";

// interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";

const useSendEmail = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();

  const [data, setData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSendEmail = async () => {
    setLoading(true);
    const config: ConfigAxios = {
      url,
      method: "post",
      headers: {
        "Token-Auth": tokenAuth,
      },
    };
    await api
      .request(config)
      .then((res) => {
        setData(res.data);
        setError("");
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleSendEmail, loading, error };
};

export default useSendEmail;
