import { useEffect, useState } from "react";

// api
import { api } from "../Apis/api";

// Interfaces
import { Clients } from "../interfaces/Clients";
interface FiltersOrders {
  filter: string;
  order: string;
  stateFilter?: string;
}

export const useFetchData = (url: string) => {
  const [data, setData] = useState<Clients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const convertDate = (dateString: string | undefined): Date | undefined => {
    return dateString
      ? new Date(dateString.split("/").reverse().join("-"))
      : undefined;
  };
  if (data && (date === "news" || date === "olds")) {
    const sortOrder = date === "news" ? -1 : 1;
    data.sort((a, b) => {
      const dateA = convertDate(a.created_at);
      const dateB = convertDate(b.created_at);
      return dateA && dateB
        ? sortOrder * (dateA.getTime() - dateB.getTime())
        : 0;
    });
  }
  const handleFetch = async ({ filter, order, stateFilter }: FiltersOrders) => {
    setLoading(true);
    setDate(order);
    await api
      .get(url)
      .then((res) => {
        if (filter) {
          switch (filter) {
            case "every":
              setData(
                res.data.filter((user: Clients) => user.surveyor !== true)
              );
              break;
            case "done":
              setData(
                res.data.filter(
                  (user: Clients) =>
                    user.surveyor !== true && user.status === true
                )
              );
              break;
            case "notDone":
              setData(
                res.data.filter(
                  (user: Clients) =>
                    user.surveyor !== true && user.status !== true
                )
              );
              break;
          }

          if (stateFilter) {
            setData(
              res.data.filter(
                (user: Clients) =>
                  user.surveyor !== true && user.address.state === stateFilter
              )
            );
          }
        }
      })
      .catch((err) => setError(`Erro na API: ${err.message}`));
    setLoading(false);
  };

  return { handleFetch, data, setData, loading, error };
};
