import { useState } from "react";

// api
import { api } from "../Apis/api";

// Interfaces
import { Clients } from "../interfaces/Clients";
interface Props {
  url: string;
  order: string;
}
interface Filters {
  filter: string;
  stateFilter?: string;
}

export const useFetchData = ({ url, order }: Props) => {
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
    await api
      .get(url)
      .then((res) => {
        if (filter) {
          let filteredData = res.data.filter(
            (user: Clients) => user.surveyor !== true
          );

          if (stateFilter) {
            filteredData = filteredData.filter(
              (user: Clients) => user.address.state === stateFilter
            );
          }

          switch (filter) {
            case "every":
              break;
            case "done":
              filteredData = filteredData.filter(
                (user: Clients) => user.status === true
              );
              break;
            case "notDone":
              filteredData = filteredData.filter(
                (user: Clients) => user.status !== true
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
