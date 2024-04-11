import { useState } from "react";

// Context
import useAuthToUseContext from "./useContexts/useAuthToUseContext";

// api
import { api } from "../Apis/api";

// Interfaces
import { Clients } from "../interfaces/Clients";
import { ConfigAxios } from "../interfaces/ConfigAxios";
interface Props {
  url: string;
  order: string;
}
interface Filters {
  filter: string;
  stateFilter?: string;
}

export const useFetchData = ({ url, order }: Props) => {
  const { tokenAuth } = useAuthToUseContext();

  const [data, setData] = useState<Clients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const convertDate = (dateString: string | undefined): Date | undefined => {
    return dateString
      ? new Date(dateString.split("/").reverse().join("-"))
      : undefined;
  };
  if (data && (order === "news" || order === "olds")) {
    const sortOrder = order === "news" ? -1 : 1;
    data.sort((a, b) => {
      const dateA = convertDate(a.created_at);
      const dateB = convertDate(b.created_at);
      return dateA && dateB
        ? sortOrder * (dateA.getTime() - dateB.getTime())
        : 0;
    });
  }
  const handleFetch = async ({ filter, stateFilter }: Filters) => {
    setLoading(true);
    const config: ConfigAxios = {
      url,
      method: "get",
      headers: {
        "Token-Auth": tokenAuth,
      },
    };
    await api
      .request(config)
      .then((res) => {
        if (filter) {
          let filteredData = res.data.filter(
            (user: Clients) => user.surveyor !== true
          );

          if (stateFilter) {
            filteredData = filteredData.filter(
              (user: Clients) =>
                user.address.state === stateFilter && user.surveyor !== true
            );
          }

          switch (filter) {
            case "every":
              break;
            case "done":
              filteredData = filteredData.filter(
                (user: Clients) =>
                  user.status === true && user.surveyor !== true
              );
              break;
            case "notDone":
              filteredData = filteredData.filter(
                (user: Clients) =>
                  user.status !== true && user.surveyor !== true
              );
              break;
            default:
              throw new Error("Nenhum filtro encontrado!");
          }
          setData(filteredData);
        }
      })
      .catch((err) => setError(`Erro na API: ${err.message}`));
    setLoading(false);
  };

  return { handleFetch, data, setData, loading, error };
};
