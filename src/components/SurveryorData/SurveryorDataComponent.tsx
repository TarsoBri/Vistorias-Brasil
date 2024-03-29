import styles from "./SurveryorDataComponent.module.css";

// hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useUpdateData } from "../../hooks/useUpdateData";
import { useFetchDataIBGE } from "../../hooks/useFetchDataIBGE";
import { useChangePassword } from "../../hooks/useChangePassword";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// Interfaces
import { Address } from "../../interfaces/Address";
import { Clients } from "../../interfaces/Clients";
import Loading from "../Loading/Loading";

interface PasswordData {
  password: string;
  newPassword: string;
}

const SurveryorDataComponent = () => {
  const initialAddressState: Address = {
    CEP: "",
    state: "",
    city: "",
    road: "",
    number: 0,
    reference: "",
  };

  const { user } = useAuthenticate();
  const url: string = `/clients/${user!._id}`;
  const urlChangePassword: string = `/clients/changePassword/${user!._id}`;
  const urlStateIBGE: string = "https://brasilapi.com.br/api/ibge/uf/v1";

  const navigate = useNavigate();

  const {
    handleFetchIBGE,
    data: statesIBGE,
    loading: loadingStatesIBGE,
  } = useFetchDataIBGE();

  const { handleUpdateData, loading, error, setError } = useUpdateData(url);

  const {
    handleChangePasswordApi,
    loading: loadingChangePassword,
    erro: erroChangePassword,
    setErro: setErroChangePassword,
  } = useChangePassword(urlChangePassword);

  useEffect(() => {
    handleFetchIBGE(urlStateIBGE);
  }, [urlStateIBGE]);

  const container_notification = document.getElementById("notification");

  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<Address>(initialAddressState);
  const [erroEmail, setErrorEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  // set values inputs
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

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

  const handleChandePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;

    switch (name) {
      case "password":
        return setPassword(value);
        break;
      case "newPassword":
        return setNewPassword(value);
    }
  };

  const handleSubmitPassword = (e: FormEvent) => {
    e.preventDefault();

    const passwordData: PasswordData = {
      password,
      newPassword,
    };

    handleChangePasswordApi(passwordData);
  };

  const handleSubmitUpdateUser = (e: FormEvent) => {
    e.preventDefault();

    window.scrollTo(0, 0);

    if (email.includes("vistoriasbrasil")) {
      setErrorEmail("");
    } else {
      return setErrorEmail("Email não qualificado!");
    }

    const formData: Omit<Clients, "password"> = {
      _id: user!._id,
      firstName,
      email,
      phone,
      address,
      update_at: new Date().toLocaleString(),
    };

    handleUpdateData(formData);

    container_notification?.classList.remove("hide");
  };

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>
      <h2>Seus dados como Vistorador</h2>

      <div id="notification" className="hide">
        <div className={styles.container_notification}>
          <button
            onClick={() => {
              container_notification?.classList.add("hide");
            }}
          >
            X
          </button>
          <p>Alterações salvas com sucesso!</p>
        </div>
      </div>
      {erroEmail && (
        <div className={styles.container_notificationError}>
          <button onClick={() => setErrorEmail("")}>X</button>
          <p>{erroEmail}</p>
        </div>
      )}
      {erroChangePassword && (
        <div className={styles.container_notificationError}>
          <button onClick={() => setErroChangePassword("")}>X</button>
          <p>{erroChangePassword}</p>
        </div>
      )}
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
                <p>Vistoriador</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmitUpdateUser}>
                <h3>Seus dados</h3>

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

                <h3>Seu endereço</h3>

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
                    required
                    placeholder="Insira sua cidade."
                    value={address.city}
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

              <div className={styles.form}>
                <h3>Redefinir Senha</h3>
                <form onSubmit={handleSubmitPassword}>
                  <label>
                    <span>Sua senha atual:</span>
                    <input
                      type="text"
                      name="password"
                      onChange={handleChandePassword}
                      value={password}
                    />
                  </label>
                  <label>
                    <span>Nova senha:</span>
                    <input
                      type="text"
                      name="newPassword"
                      onChange={handleChandePassword}
                      value={newPassword}
                    />
                  </label>
                  <div className={styles.div_updatePassword_btn}>
                    <input type="submit" className={styles.update_btn} />
                  </div>
                </form>
              </div>
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

export default SurveryorDataComponent;
