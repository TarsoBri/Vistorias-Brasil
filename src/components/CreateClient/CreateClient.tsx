import styles from "./CreateClient.module.css";

// Interface
import { Clients } from "../../interfaces/Clients";
import { Address } from "../../interfaces/Address";
import { Login } from "../../interfaces/Login";

// Components
import Loading from "../Loading/Loading";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// hooks
import { useState, ChangeEvent, useEffect } from "react";
import { useCreateData } from "../../hooks/useCreateData";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useFetchDataIBGE } from "../../hooks/useFetchDataIBGE";
import { useNavigate } from "react-router-dom";

const CreateClient = () => {
  const url: string = "/clients";
  const urlLogin: string = "/clients/login";
  const urlStateIBGE: string = "https://brasilapi.com.br/api/ibge/uf/v1";

  const navigate = useNavigate();

  const { handleCreateClient, sucess, loading, error } = useCreateData(url);

  const { handleLoginUser } = useLoginUser(urlLogin);

  const {
    handleFetchIBGE: fetchStatesIBGE,
    data: statesIBGE,
    loading: loadingStatesIBGE,
  } = useFetchDataIBGE();

  useEffect(() => {
    fetchStatesIBGE(urlStateIBGE);
  }, [urlStateIBGE]);

  const {
    handleFetchIBGE: fetchCitysIBGE,
    data: citysIBGE,
    loading: loadingCityIBGE,
  } = useFetchDataIBGE();

  const initialAddressState: Address = {
    CEP: "",
    state: "",
    city: "",
    road: "",
    number: 0,
    reference: "",
  };

  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>(initialAddressState);
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleChange = (
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
      case "confirmedPassword":
        setConfirmedPassword(value);
        break;
      case "state":
        setAddress((prevAddress) => ({
          ...prevAddress,
          [name]: value,
        }));
        fetchCitysIBGE(
          `https://brasilapi.com.br/api/ibge/municipios/v1/${value}?providers=dados-abertos-br,gov,wikipedia`
        );
        break;
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

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      return setErrorPassword("Senhas diferentes!");
    } else {
      setErrorPassword("");
    }

    const formData: Clients = {
      firstName,
      password,
      email,
      status,
      phone,
      address,
      created_at: new Date().toLocaleDateString(),
    };

    handleCreateClient(formData);
  };

  // Login acess after create vistory
  useEffect(() => {
    if (!error && sucess) {
      const login: Login = {
        email,
        password,
      };

      handleLoginUser(login);

      setPassword("");
      setPhone("");
      setConfirmedPassword("");
      setFirstName("");
      setEmail("");
      setAddress(initialAddressState);
    }
  }, [sucess, error]);

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className={styles.form_div}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>
      <h2>Cadastrar vistoria para sua casa</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>
            Nome<span className={styles.mandatoryInput}>*</span>:
          </span>
          <input
            type="text"
            name="firstName"
            placeholder="Insira seu nome."
            required
            value={firstName}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>
            Email<span className={styles.mandatoryInput}>*</span>:
          </span>
          <input
            type="email"
            name="email"
            placeholder="Insira seu email."
            required
            autoComplete="username"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>
            Telefone<span className={styles.mandatoryInput}>*</span>:
          </span>
          <input
            type="text"
            value={phone}
            required
            placeholder="Digite seu telefone"
            onChange={handleChangePhone}
            minLength={14}
            maxLength={15}
          />
        </label>

        <label>
          <span>
            Senha<span className={styles.mandatoryInput}>*</span>:
          </span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha."
            required
            value={password}
            minLength={8}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </label>

        <label>
          <span>
            Confirmar senha<span className={styles.mandatoryInput}>*</span>:
          </span>
          <input
            type="password"
            name="confirmedPassword"
            placeholder="Confirme sua senha."
            required
            value={confirmedPassword}
            minLength={8}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </label>

        <h3>Seu endereço:</h3>

        <label>
          <span>
            Cep<span className={styles.mandatoryInput}>*</span>:
          </span>
          <input
            type="text"
            name="CEP"
            placeholder="Insira seu CEP."
            required
            value={address.CEP}
            onChange={handleChange}
            minLength={8}
            maxLength={8}
          />
        </label>

        <label>
          <span>
            Estado<span className={styles.mandatoryInput}>*</span>:
          </span>
          <select
            name="state"
            required
            value={address.state}
            onChange={handleChange}
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
          <span>
            Cidade<span className={styles.mandatoryInput}>*</span>:{" "}
          </span>
          <select
            name="city"
            required
            value={address.city}
            onChange={handleChange}
            disabled={loadingCityIBGE ? true : false}
          >
            <option value="">
              {loadingCityIBGE ? "Aguarde..." : "Selecione sua cidade."}
            </option>
            {citysIBGE &&
              citysIBGE.map((data) => (
                <option key={data.codigo_ibge} value={data.nome}>
                  {data.nome}
                </option>
              ))}
          </select>
        </label>

        <label>
          <span>Rua: </span>
          <input
            type="text"
            name="road"
            placeholder="Insira sua rua."
            required
            value={address.road}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Número: </span>
          <input
            type="number"
            name="number"
            placeholder="Insira seu número."
            value={address.number && address.number > 0 ? address.number : ""}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Referência: </span>
          <input
            type="text"
            name="reference"
            placeholder="Insira sua referência."
            value={address.reference}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          className={!loading ? "submit" : "submit_loading"}
        >
          {!loading ? "Enviar" : <Loading />}
        </button>
        {[error, errorPassword].filter(Boolean).length > 0 && (
          <div className="container_erro">
            {[error, errorPassword].filter(Boolean).map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateClient;
