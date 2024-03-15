import styles from "./ClientsList.module.css";

import { FetchData } from "../../hooks/FetchData";
import { DeleteData } from "../../hooks/DeleteData";
import { useEffect } from "react";

const ClientsList = () => {
  const url: string = "/clients";

  const {
    handleFetch,
    data: clients,
    setData,
    loading,
    error,
  } = FetchData(url);

  useEffect(() => {
    handleFetch();
  }, []);

  const {
    handleDeleteClient,
    // loading: loading_delete,
    // erro: error_delete,
  } = DeleteData(url);

  return (
    <div className={styles.clients_container}>
      {!error ? (
        <>
          {!loading ? (
            <>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <div key={client._id}>
                    <h2>Nome: {client.firstName}</h2>
                    <p>Email: {client.email}</p>
                    <p>
                      {client.address.city} - {client.address.state}
                    </p>
                    <div className={styles.status}>
                      <p>Vistoria</p>
                      <div
                        className={styles.status_icon}
                        style={{
                          backgroundColor: client.status ? "green" : "red",
                        }}
                      ></div>
                    </div>
                    <button
                      onClick={() =>
                        handleDeleteClient(client._id, clients, setData)
                      }
                    >
                      Excluir
                    </button>
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
