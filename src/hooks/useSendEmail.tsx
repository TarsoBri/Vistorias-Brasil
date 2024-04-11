import { useState } from "react";

// Contexts
import useAuthToUseContext from "./useContexts/useAuthToUseContext";
import useCodeHashed from "./useContexts/useCodeHashed";

// api
import { api } from "../Apis/api";

// interfaces
import { ConfigAxios } from "../interfaces/ConfigAxios";
interface Config extends ConfigAxios {
  data: {
    email: string;
  };
}

const useSendEmail = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();
  const { codeHashed, setCodeHashed } = useCodeHashed();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSendEmail = async (email: string) => {
    setLoading(true);
    const config: Config = {
      url,
      method: "post",
      data: { email },
      headers: {
        "Token-Auth": tokenAuth,
      },
    };
    await api
      .request(config)
      .then((res) => {
        setCodeHashed(res.data);
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleSendEmail, codeHashed, loading, error };
};

export default useSendEmail;
