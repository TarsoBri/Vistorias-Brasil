import styles from "./ClientsList.module.css";

import { useFetchData } from "../../hooks/useFetchData";
import { useEffect } from "react";

const ClientsList = () => {
  const url: string = "/clients";

  const { handleFetch, data: users, loading, error } = useFetchData(url);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className={styles.clients_container}>
      {!error ? (
        <>
          {!loading ? (
            <>
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id}>
                    <h2>Nome: {user.firstName}</h2>
                    <p>Email: {user.email}</p>
                    <p>
                      {user.address.city} - {user.address.state}
                    </p>
                    <div className={styles.status}>
                      <p>
                        Status:
                        {user.status
                          ? " Vistoria realizada!"
                          : " Vistoria não realizada!"}
                      </p>
                      <div
                        className={styles.status_icon}
                        style={{
                          backgroundColor: user.status ? "green" : "red",
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Não há clientes cadastrados</p>
              )}
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </>
      ) : (
        <p>Erro ao carregar clientes</p>
      )}
    </div>
  );
};

export default ClientsList;
