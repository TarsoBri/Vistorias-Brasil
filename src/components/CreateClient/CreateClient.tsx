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
import { useCreateData } from "../../hooks/useCreateData";
import { useFetchDataIBGE } from "../../hooks/useFetchDataIBGE";

const CreateClient = () => {
  const url: string = "/clients";
  const urlStateIBGE: string = "https://brasilapi.com.br/api/ibge/uf/v1";
  const navigate = useNavigate();

  const { handleCreateClient, loading, redirect, error } = useCreateData(url);

  const { handleFetchIBGE: fetchStatesIBGE, data: statesIBGE } =
    useFetchDataIBGE();
  useEffect(() => {
    fetchStatesIBGE(urlStateIBGE);
  }, [urlStateIBGE]);

  const {
    handleFetchIBGE: fetchCitysIBGE,
    data: citysIBGE,
    loading: loadingCityIBGE,
  } = useFetchDataIBGE();

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
    };

    handleCreateClient(formData);

    if (!error) {
      setPassword("");
      setConfirmedPassword("");
      setFirstName("");
      setEmail("");
      setAddress(initialAddressState);
    }
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove todos os caracteres que não são números
    input = input.replace(/\D/g, "");

    // Formata o número de telefone
    if (input.length <= 2) {
      // Adiciona o DDD
      input = `(${input}`;
    } else if (input.length <= 6) {
      // Adiciona o primeiro bloco de números
      input = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    } else if (input.length <= 10) {
      // Adiciona o segundo bloco de números
      input = `(${input.slice(0, 2)}) ${input.slice(2, 6)}-${input.slice(6)}`;
    } else {
      // Adiciona o código de país e formata o restante
      input = `+${input.slice(0, 2)} (${input.slice(2, 4)}) ${input.slice(
        4,
        9
      )}-${input.slice(9)}`;
    }

    setPhone(input);
  };

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
          <span>Telefone: </span>
          <input
            type="text"
            value={phone}
            required
            placeholder="Digite seu telefone"
            onChange={handleChangePhone}
            minLength={18}
            maxLength={19}
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
