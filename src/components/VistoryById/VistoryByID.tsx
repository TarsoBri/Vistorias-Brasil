import styles from "./VistoryById.module.css";

// components
import Loading from "../Loading/Loading";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// hooks
import { useEffect } from "react";
import { useFetchDataById } from "../../hooks/useFetchDataById";
import { useUpdateData } from "../../hooks/useUpdateData";

// interface
import UpdateStatus from "../../interfaces/UpdateStatus";

import { useNavigate } from "react-router-dom";
interface Props {
  id: string | undefined;
}

const VistoryByID = ({ id }: Props) => {
  const urlId = `/clients/${id}`;

  const navigate = useNavigate();

  const {
    handleFetchById,
    loading: loadingFetch,
    error: errorFetch,
    data: user,
  } = useFetchDataById(urlId);

  const { handleUpdateData, loading, error } = useUpdateData(urlId);

  useEffect(() => {
    handleFetchById();
  }, [urlId, loading]);

  const handleChange = () => {
    const updateData: UpdateStatus = {
      status: user && !user.status,
    };
    console.log(updateData);
    handleUpdateData(updateData);
  };

  return (
    <div>
      {!error || !errorFetch ? (
        <>
          {!loadingFetch ? (
            <>
              {user && (
                <div className={styles.userData}>
                  <div className="return_btn">
                    <button onClick={() => navigate(-1)}>
                      <FaArrowLeftLong />
                    </button>
                  </div>
                  <h2>Vistoria de {user.firstName}</h2>
                  <h3>Status de vistoria:</h3>
                  <div className={styles.status}>
                    <label className="toggler-wrapper style-check">
                      <input
                        type="checkbox"
                        checked={user.status}
                        onChange={handleChange}
                      />
                      <div className="toggler-slider">
                        <div className="toggler-knob"></div>
                      </div>
                    </label>
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
                  <div className={styles.userData_content}>
                    <h3>Dados de contato:</h3>
                    <p>
                      <span>Email:</span> {user.email}
                    </p>
                    <p>
                      <span>Telefone:</span> {user.phone}
                    </p>

                    <h3>Endereço da residência:</h3>
                    <p>
                      <span>CEP:</span> {user.address.CEP}
                    </p>
                    <p>
                      <span>Cidade:</span> {user.address.city}
                    </p>
                    <p>
                      <span>Estado:</span> {user.address.state}
                    </p>
                    <p>
                      <span>Rua:</span> {user.address.road}
                      {user.address.number && `, nº ${user.address.number}`}
                    </p>
                    {user.address.reference && (
                      <p>
                        <span>Referência:</span> {user.address.reference}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="loading">
              <div className="opacity"></div>
              <Loading />
            </div>
          )}
        </>
      ) : (
        <p>Erro ao carregar Vistoria</p>
      )}
    </div>
  );
};

export default VistoryByID;
