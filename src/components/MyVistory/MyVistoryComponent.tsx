import styles from "./MyVistory.module.css";

// hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useUpdateData } from "../../hooks/useUpdateData";
import { useFetchDataIBGE } from "../../hooks/useFetchDataIBGE";
import { useNavigate } from "react-router-dom";

// Interfaces
import { Address } from "../../interfaces/Address";
import { Clients } from "../../interfaces/Clients";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// Components
import Loading from "../Loading/Loading";

const MyVistoryComponent = () => {
  const { user } = useAuthenticate();
  const url = user && `/clients/${user._id}`;
  const urlStateIBGE: string = "https://brasilapi.com.br/api/ibge/uf/v1";

  const navigate = useNavigate();

  const {
    handleFetchIBGE,
    data: statesIBGE,
    loading: loadingStatesIBGE,
  } = useFetchDataIBGE();

  const { handleUpdateData, loading, error, setError } = useUpdateData(url);

  const initialAddressState: Address = {
    CEP: "",
    state: "",
    city: "",
    road: "",
    number: 0,
    reference: "",
  };

  const container_notification = document.getElementById("notification");

  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<boolean | undefined>(false);
  const [address, setAddress] = useState<Address>(initialAddressState);

  useEffect(() => {
    handleFetchIBGE(urlStateIBGE);
  }, [urlStateIBGE]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setEmail(user.email);
      setPhone(user.phone);
      setStatus(user.status);
      setAddress(user.address);
      setPassword(user.password);
    }
  }, [user]);

  const handleChangeUpdate = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "state":
      case "CEP":
      case "city":
      case "road":
      case "number":
      case "reference":
        setAddress((prevAddress) => ({
          ...prevAddress,
          [name]: value,
        }));
        break;
      default:
        return;
    }
  };

  const handleSubmitUpdateUser = (e: FormEvent) => {
    e.preventDefault();

    const formData: Clients = {
      _id: user!._id,
      firstName,
      password,
      email,
      status,
      phone,
      address,
      update_at: new Date().toLocaleString(),
    };

    handleUpdateData(formData);

    container_notification?.classList.remove("hide");

    window.scrollTo(0, 0);
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let input = e.target.value;

    input = input.replace(/\D/g, "");

    if (input.length <= 2) {
      input = `(${input}`;
    } else if (input.length <= 7) {
      input = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    } else if (input.length <= 11) {
      input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7)}`;
    } else {
      input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(
        7,
        11
      )}`;
    }

    setPhone(input);
  };

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>
      <h2>Sua vistoria atual</h2>
      <div id="notification" className="hide">
        <div className={styles.container_notification}>
          <button onClick={() => container_notification?.classList.add("hide")}>
            X
          </button>
          <p>Alterações salvas com sucesso!</p>
        </div>
      </div>

      {error && (
        <div className={styles.container_notificationError}>
          <button onClick={() => setError("")}>X</button>
          <p>{error}</p>
        </div>
      )}

      {!loading ? (
        <>
          {user && (
            <>
              <div className={styles.status}>
                <p
                  style={{
                    color: user.status ? "rgb(45, 220, 15)" : "rgb(167, 0, 0)",
                  }}
                >
                  <span>Status:</span>
                  {user.status
                    ? " Vistoria realizada!"
                    : " Vistoria não realizada!"}
                </p>
              </div>
              <form className={styles.form} onSubmit={handleSubmitUpdateUser}>
                <h3>Seus dados:</h3>

                <label>
                  <span>Nome: </span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Insira seu nome."
                    required
                    value={firstName}
                    onChange={handleChangeUpdate}
                  />
                </label>

                <label>
                  <span>Email: </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Insira seu email."
                    required
                    autoComplete="username"
                    value={email}
                    onChange={handleChangeUpdate}
                  />
                </label>

                <label>
                  <span>Telefone: </span>
                  <input
                    type="text"
                    value={phone}
                    required
                    placeholder="Digite seu telefone"
                    minLength={14}
                    maxLength={15}
                    onChange={handleChangePhone}
                  />
                </label>

                <h3>Seu endereço:</h3>

                <label>
                  <span>CEP: </span>
                  <input
                    type="text"
                    name="CEP"
                    placeholder="Insira seu CEP."
                    required
                    maxLength={8}
                    minLength={8}
                    value={address.CEP}
                    onChange={handleChangeUpdate}
                  />
                </label>

                <label>
                  <span>Estado: </span>
                  <select
                    name="state"
                    required
                    value={address.state}
                    onChange={handleChangeUpdate}
                    disabled={loadingStatesIBGE && true}
                  >
                    <option value="">Selecione seu estado.</option>
                    {statesIBGE &&
                      statesIBGE.map((data) => (
                        <option key={data.id} value={data.sigla}>
                          {data.nome}
                        </option>
                      ))}
                  </select>
                </label>

                <label>
                  <span>Cidade: </span>
                  <input
                    type="text"
                    name="city"
                    placeholder="Insira sua cidade."
                    required
                    value={address.city}
                    onChange={handleChangeUpdate}
                  />
                </label>

                <label>
                  <span>Rua: </span>
                  <input
                    type="text"
                    name="road"
                    placeholder="Insira sua rua."
                    required
                    value={address.road}
                    onChange={handleChangeUpdate}
                  />
                </label>

                <label>
                  <span>Número: </span>
                  <input
                    type="number"
                    name="number"
                    placeholder="Insira seu número."
                    value={
                      address.number && address.number > 0 ? address.number : ""
                    }
                    onChange={handleChangeUpdate}
                  />
                </label>

                <label>
                  <span>Referência: </span>
                  <input
                    type="text"
                    name="reference"
                    placeholder="Insira sua referência."
                    value={address.reference}
                    onChange={handleChangeUpdate}
                  />
                </label>
                <div className={styles.div_update_btn}>
                  <div>
                    <p>Cadastrado: {user.created_at}</p>
                    {user.update_at && <p>Editado: {user.update_at}</p>}
                  </div>

                  <button type="submit" className={styles.update_btn}>
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </>
          )}
        </>
      ) : (
        <div className="loading">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default MyVistoryComponent;
