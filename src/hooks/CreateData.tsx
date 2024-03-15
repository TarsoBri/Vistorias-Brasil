import { useState } from "react";
import { FetchData } from "./FetchData";

import { Clients } from "../interfaces/Clients";

// api
import { api } from "../Apis/api";

export const CreateData = (url: string) => {
  const { setData } = FetchData(url);

  const [loading, setLoading] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCreateClient = async (data: Clients) => {
    setLoading(true);

    await api
      .post(url, data)
      .then((res) => setData((prevData) => [...prevData, res.data]))
      .catch(() => setError("Houve algum erro ao criar o cliente."))
      .finally(() => {
        setLoading(false);
        setRedirect(true);
      });
  };

  return { handleCreateClient, loading, error, redirect };
};
