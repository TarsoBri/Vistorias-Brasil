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
    code: string;
    hashedCode: string;
  };
}

const useConfirmCode = (url: string) => {
  const { tokenAuth } = useAuthToUseContext();

  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleConfirmCode = async (code: string, hashedCode: string) => {
    setLoading(true);
    const config: Config = {
      url,
      method: "post",
      data: { code, hashedCode },
      headers: {
        "Token-Auth": tokenAuth,
      },
    };
    await api
      .request(config)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };

  return { handleConfirmCode, data, loading, error };
};

export default useConfirmCode;
