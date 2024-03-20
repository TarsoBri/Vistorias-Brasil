import styles from "./ClientsList.module.css";

import { useFetchData } from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const ClientsList = () => {
  const url: string = "/clients";
  const { handleFetch, data: users, loading, error } = useFetchData(url);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className={styles.clients_container}>
      <h2>Vistorias</h2>

      {!error ? (
        <>
          {!loading ? (
            <>
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id} className={styles.clients}>
                    <div className={styles.clients_left}>
                      <h2>Nome: {user.firstName}</h2>
                      <p>
                        {user.address.city} - {user.address.state}
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
                ))
              ) : (
                <p>Não há clientes cadastrados</p>
              )}
            </>
          ) : (
            <div className={styles.loading}>
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
