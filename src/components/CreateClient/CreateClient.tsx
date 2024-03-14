import styles from "./CreateClient.module.css";

// Interface
import { Clients } from "../../interfaces/Clients";
import { Address } from "../../interfaces/Address";

// Navigate
import { useNavigate } from "react-router-dom";

// Components
import Loading from "../Loading/Loading";

// hooks
import { useState, ChangeEvent, useEffect } from "react";
import { CreateData } from "../../hooks/CreateData";
import { FetchDataIBGE } from "../../hooks/FetchDataIBGE";

const CreateClient = () => {
  const url: string = "/clients";
  const urlStateIBGE: string = "https://brasilapi.com.br/api/ibge/uf/v1";
  const navigate = useNavigate();

  const { createClient, loading, redirect, error } = CreateData(url);

  const { fetchIBGE: fetchStatesIBGE, data: statesIBGE } = FetchDataIBGE();
  useEffect(() => {
    fetchStatesIBGE(urlStateIBGE);
  }, [urlStateIBGE]);

  const {
    fetchIBGE: fetchCitysIBGE,
    data: citysIBGE,
    loading: loadingCityIBGE,
  } = FetchDataIBGE();

  const initialAddressState: Address = {
    CEP: 0,
    state: "",
    city: "",
    road: "",
    number: 0,
    reference: "",
  };

  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>(initialAddressState);

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
      return setErrorPassword("Erro: Senhas diferentes!");
    }
    const formData: Clients = {
      firstName,
      password,
      email,
      status,
      address,
    };

    createClient(formData);
  };

  useEffect(() => {
    if (!error) {
      setPassword("");
      setConfirmedPassword("");
      setFirstName("");
      setEmail("");
      setAddress(initialAddressState);

      redirect && navigate("/");
    }
  }, [redirect, navigate, error]);

  return (
    <div className={styles.form_div}>
      <h2>Criar vistoria para sua casa</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Nome: </span>
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
          <span>Email: </span>
          <input
            type="text"
            name="email"
            placeholder="Insira seu email."
            required
            autoComplete="username"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha."
            required
            value={password}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Confirmar senha: </span>
          <input
            type="password"
            name="confirmedPassword"
            placeholder="Confirme sua senha."
            required
            value={confirmedPassword}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </label>

        <h3>Seu endereço:</h3>

        <label>
          <span>Cep: </span>
          <input
            type="number"
            name="CEP"
            placeholder="Insira seu CEP."
            required
            value={address.CEP > 0 ? address.CEP : ""}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Estado: </span>
          <select
            name="state"
            required
            value={address.state}
            onChange={handleChange}
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
            value={address.number > 0 ? address.number : ""}
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
          className={!loading ? styles.submit : styles.submit_loading}
        >
          {!loading ? "Enviar" : <Loading />}
        </button>
        {error && (
          <div className="container_erro">
            <p>{error}</p>
          </div>
        )}
        {errorPassword && (
          <div className="container_erro">
            <p>{errorPassword}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateClient;
