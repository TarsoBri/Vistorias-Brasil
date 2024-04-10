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
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// Interfaces
import { Address } from "../../interfaces/Address";
import { Clients } from "../../interfaces/Clients";
import Loading from "../Loading/Loading";
import PasswordData from "../../interfaces/PasswordData";

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
    sucess: sucessChangePassword,
    setSucess: setSucessChangePassword,
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

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);

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
        setPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmitPassword = (e: FormEvent) => {
    e.preventDefault();

    const passwordData: PasswordData = {
      _id: user!._id,
      password,
      newPassword,
    };

    setSucessChangePassword("");
    setErroChangePassword("");

    handleChangePasswordApi(passwordData);

    setPassword("");
    setNewPassword("");

    window.scrollTo(0, 0);
  };

  const handleSubmitUpdateUser = (e: FormEvent) => {
    e.preventDefault();

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

    window.scrollTo(0, 0);
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

      {sucessChangePassword && (
        <div className={styles.container_notification}>
          <button onClick={() => setSucessChangePassword("")}>X</button>
          <p>{sucessChangePassword}</p>
        </div>
      )}

      {erroChangePassword && (
        <div className={styles.container_notificationError}>
          <button onClick={() => setErroChangePassword("")}>X</button>
          <p>{erroChangePassword}</p>
        </div>
      )}

      {erroEmail && (
        <div className={styles.container_notificationError}>
          <button onClick={() => setErrorEmail("")}>X</button>
          <p>{erroEmail}</p>
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
                <form
                  onSubmit={handleSubmitPassword}
                  className={styles.password_form}
                >
                  <label>
                    <span>Sua senha:</span>
                    <div className={styles.password_input}>
                      <input
                        type={passwordVisibility ? "text" : "password"}
                        name="password"
                        placeholder="Insira sua senha."
                        required
                        value={password}
                        onChange={handleChandePassword}
                      />

                      <span
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibility)
                        }
                      >
                        {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </label>
                  <label>
                    <span>Nova senha:</span>
                    <div className={styles.password_input}>
                      <input
                        type={newPasswordVisibility ? "text" : "password"}
                        name="newPassword"
                        placeholder="Insira sua nova senha."
                        minLength={8}
                        required
                        value={newPassword}
                        onChange={handleChandePassword}
                      />

                      <span
                        onClick={() =>
                          setNewPasswordVisibility(!newPasswordVisibility)
                        }
                      >
                        {newPasswordVisibility ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </label>

                  <div className={styles.div_updatePassword_btn}>
                    <button type="submit" className={styles.update_btn}>
                      {!loadingChangePassword ? "Alterar senha" : <Loading />}
                    </button>
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
