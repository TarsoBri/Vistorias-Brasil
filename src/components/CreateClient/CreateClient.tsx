import styles from "./CreateClient.module.css";

import { Clients } from "../../interfaces/Clients";

// Navigate
import { useNavigate } from "react-router-dom";

// hooks
import { useState, ChangeEvent, useEffect } from "react";
import { CreateData } from "../../hooks/CreateData";
import Loading from "../Loading/Loading";

const CreateClient = () => {
  const url: string = "/clients";

  const navigate = useNavigate();

  const { createClient, loading, redirect, error } = CreateData(url);

  const initialAddressState = {
    CEP: 0,
    state: "",
    city: "",
    road: "",
    number: 0,
    reference: "",
  };

  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [address, setAddress] = useState(initialAddressState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "status":
        setStatus(!status);
        break;
      case "CEP":
      case "state":
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
    const formData: Clients = {
      firstName,
      email,
      status,
      address,
    };

    createClient(formData);

    setFirstName("");
    setEmail("");
    setAddress(initialAddressState);
  };

  useEffect(() => {
    redirect && navigate("/");
  }, [redirect, navigate]);

  return (
    <div className={styles.form_div}>
      <h2>Criar cliente</h2>
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
            value={email}
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
          <input
            type="text"
            name="state"
            placeholder="Insira seu estado."
            required
            value={address.state}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Cidade: </span>
          <input
            type="text"
            name="city"
            placeholder="Insira sua cidade."
            required
            value={address.city}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Número: </span>
          <input
            type="number"
            name="number"
            placeholder="Insira seu número."
            required
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
      </form>
    </div>
  );
};

export default CreateClient;
