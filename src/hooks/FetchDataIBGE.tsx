import { useState } from "react";
import axios from "axios";

import { Regions } from "../interfaces/Regions";

export const FetchDataIBGE = () => {
  const [data, setData] = useState<Regions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFetchIBGE = async (url: string) => {
    setLoading(true);
    await axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(`Erro na API: ${err.message}`));
    setLoading(false);
  };

  return { handleFetchIBGE, data, loading, error };
};
