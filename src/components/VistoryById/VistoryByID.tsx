import styles from "./VistoryById.module.css";

// components
import Loading from "../Loading/Loading";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// hooks
import { useEffect } from "react";
import { useFetchDataById } from "../../hooks/useFetchDataById";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";

// interface
import { UpdateStatus } from "../../interfaces/UpdateStatus";

import { useNavigate } from "react-router-dom";
interface Props {
  id: string | undefined;
}

const VistoryByID = ({ id }: Props) => {
  const urlId = `/clients/${id}`;
  const urlChangeStatus = `/clients/status/${id}`;

  const navigate = useNavigate();

  const {
    handleFetchById,
    loading: loadingFetch,
    error: errorFetch,
    data: user,
  } = useFetchDataById(urlId);

  const { handleUpdateStatus, sucess, error } =
    useUpdateStatus(urlChangeStatus);

  useEffect(() => {
    handleFetchById();
  }, [urlId, sucess]);

  const handleChange = () => {
    const updateData: UpdateStatus = {
      status: user && !user.status,
      update_at: new Date().toLocaleString(),
    };
    console.log(updateData);
    handleUpdateStatus(updateData);
  };

  return (
    <div className={styles.container}>
      {!error || !errorFetch ? (
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
                    color: loadingFetch
                      ? "white"
                      : user.status
                      ? "rgb(45, 220, 15)"
                      : "rgb(167, 0, 0)",
                  }}
                >
                  <span>Status: </span>
                  {loadingFetch
                    ? "Aguarde..."
                    : user.status
                    ? "Vistoria realizada!"
                    : "Vistoria não realizada!"}
                </p>
              </div>
              <div>
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
            </div>
          )}
        </>
      ) : (
        <p>Erro ao carregar Vistoria</p>
      )}

      {loadingFetch && (
        <div className={styles.loader}>
          <div className={styles.opacity}></div>
          <div className={styles.loader_icon}>
            <div className={styles.icon}>
              <Loading />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistoryByID;
