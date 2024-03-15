import { Dispatch, SetStateAction, useState } from "react";
import { api } from "../Apis/api";
import { Clients } from "../interfaces/Clients";

export const DeleteData = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleDeleteClient = async (
    id: string | undefined,
    data: Clients[],
    setData: Dispatch<SetStateAction<Clients[]>>
  ) => {
    setLoading(true);

    await api
      .delete(`${url}/${id}`)
      .catch(() => setErro("Erro em excluír cliente."))
      .finally(() => setLoading(false));

    const items = data.filter((item) => item._id !== id);
    setData(items);
  };

  return { handleDeleteClient, loading, erro };
};
