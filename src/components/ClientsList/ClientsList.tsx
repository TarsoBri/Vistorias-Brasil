import styles from "./ClientsList.module.css";
import { Link } from "react-router-dom";

// components
import Loading from "../Loading/Loading";

//hooks
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useFetchDataIBGE } from "../../hooks/useFetchDataIBGE";

const ClientsList = () => {
  const { user: userContext } = useAuthenticate();
  const url: string = "/clients";
  const urlStateIBGE: string = "https://brasilapi.com.br/api/ibge/uf/v1";

  const { handleFetch, data: users, loading, error } = useFetchData(url);
  const {
    handleFetchIBGE,
    data: states,
    loading: loadingStates,
  } = useFetchDataIBGE();

  const [filter, setFilter] = useState<string>("every");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [order, setOrder] = useState<string>("news");
  const [stateSelect, setStateSelect] = useState<boolean>(false);

  useEffect(() => {
    handleFetch({ filter, order, stateFilter });

    if (stateSelect === true) {
      handleFetchIBGE(urlStateIBGE);
    }
  }, [filter, order, stateSelect, stateFilter]);

  const handleOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    if (name === "filter") {
      switch (value) {
        case "every":
        case "done":
        case "notDone":
          setStateSelect(false);
          setFilter(value);
          setStateFilter("");
          break;
        case "state":
          setStateSelect(true);
          setStateFilter("");
          break;
        default:
          return;
      }
    } else if (name === "order") {
      switch (value) {
        case "news":
        case "olds":
          setOrder(value);
          break;
        default:
          return;
      }
    } else if (name === "orderState") {
      setStateFilter(value);
    }
  };
  return (
    <div className={styles.clients_container}>
      <h2>Vistorias pelo Brasil</h2>
      <h3>Filtragem:</h3>
      {!error ? (
        <>
          <div className={styles.filters}>
            <label>
              <span>Ordenar por dia: </span>
              <select name="order" onChange={handleOrder}>
                <option value="news">Mais recente</option>
                <option value="olds">Menos recente</option>
              </select>
            </label>

            <label>
              <span>Filtrar por: </span>
              <select name="filter" onChange={handleOrder}>
                <option value="every">Todas</option>
                <option value="done">Realiazadas</option>
                <option value="notDone">Não realiazadas</option>
                <option value="state">Estados</option>
              </select>
            </label>

            {stateSelect && (
              <label>
                <span>Selecione um estado: </span>
                <select
                  disabled={!loadingStates ? false : true}
                  name="orderState"
                  onChange={handleOrder}
                >
                  <option value="">
                    {!loadingStates ? "Selecione" : "Aguarde..."}
                  </option>
                  {states &&
                    states.map((state) => (
                      <option key={state.id} value={state.sigla}>
                        {state.nome}
                      </option>
                    ))}
                </select>
              </label>
            )}
          </div>
          {!loading ? (
            <>
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id}>
                    {userContext && userContext.surveyor === true ? (
                      <Link className={styles.link} to={`/Vistory/${user._id}`}>
                        <div className={styles.clients}>
                          <div className={styles.clients_left}>
                            <div className={styles.clients_left_name}>
                              <p>Vistoria de:</p>
                              <h2>{user.firstName}</h2>
                            </div>
                            <p>
                              Local: {user.address.city} - {user.address.state}
                            </p>
                          </div>
                          <div className={styles.clients_rigth}>
                            <div className={styles.status}>
                              <p
                                style={{
                                  color: user.status
                                    ? "rgb(45, 220, 15)"
                                    : "rgb(167, 0, 0)",
                                }}
                              >
                                <span>Status:</span>
                                {user.status
                                  ? " Vistoria realizada!"
                                  : " Vistoria não realizada!"}
                              </p>
                            </div>
                            <p>Publicado: {user.created_at}</p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className={styles.clients}>
                        <div className={styles.clients_left}>
                          <div className={styles.clients_left_name}>
                            <p>Vistoria de:</p>
                            <h2>{user.firstName}</h2>
                          </div>
                          <p>
                            Local: {user.address.city} - {user.address.state}
                          </p>
                        </div>
                        <div className={styles.clients_rigth}>
                          <div className={styles.status}>
                            <p
                              style={{
                                color: user.status
                                  ? "rgb(45, 220, 15)"
                                  : "rgb(167, 0, 0)",
                              }}
                            >
                              <span>Status:</span>
                              {user.status
                                ? " Vistoria realizada!"
                                : " Vistoria não realizada!"}
                            </p>
                          </div>
                          <p>Publicado: {user.created_at}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Nenhuma vistoria encontrada!</p>
              )}
            </>
          ) : (
            <div className="loading">
              <Loading />
            </div>
          )}
        </>
      ) : (
        <p>Erro ao carregar clientes</p>
      )}
    </div>
  );
};

export default ClientsList;
