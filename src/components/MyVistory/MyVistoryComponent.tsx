import styles from "./MyVistory.module.css";

// hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAuthenticate from "../../hooks/useAuthenticate";
import { useUpdateData } from "../../hooks/useUpdateData";

// Interfaces
import { Address } from "../../interfaces/Address";
import { Clients } from "../../interfaces/Clients";

const MyVistoryComponent = () => {
  const { user } = useAuthenticate();

  const url = user && `/clients/${user._id}`;

  const { handleUpdateData, loading, error } = useUpdateData(url);
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
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>(initialAddressState);

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
      case "confirmedPassword":
        setConfirmedPassword(value);
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
      firstName,
      password,
      email,
      status,
      phone,
      address,
    };

    handleUpdateData(formData);
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
    <div className={styles.container}>
      <h2>Sua vistoria atual</h2>
      {user && (
        <>
          <div className={styles.status}>
            <h3>
              Status:
              {user.status
                ? " Vistoria realizada!"
                : " Vistoria não realizada!"}
            </h3>
            <div
              className={styles.status_icon}
              style={{
                backgroundColor: user.status ? "green" : "red",
              }}
            ></div>
          </div>
          <form className={styles.form}>
            <h3>Dados:</h3>
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
            {/* <label>
              <span>Email: </span>
              <input
                type="text"
                name="email"
                placeholder="Insira seu email."
                required
                autoComplete="username"
                value={user.email}
              />
            </label>

            <label>
              <span>Telefone: </span>
              <input
                type="text"
                value={user.phone}
                required
                placeholder="Digite seu telefone"
                onChange={handleChangePhone}
                minLength={18}
                maxLength={19}
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
                value={user.address.CEP > 0 ? user.address.CEP : ""}
              />
            </label>
            <label>
              <span>Estado: </span>
              <input
                type="text"
                name="road"
                placeholder="Insira seu estado."
                required
                value={user.address.state}
              />
            </label>
            <label>
              <span>Rua: </span>
              <input
                type="text"
                name="road"
                placeholder="Insira sua rua."
                required
                value={user.address.city}
              />
            </label>
            <label>
              <span>Cidade: </span>
              <input
                type="text"
                name="road"
                placeholder="Insira sua cidade."
                required
                value={user.address.road}
              />
            </label>
            <label>
              <span>Número: </span>
              <input
                type="number"
                name="number"
                placeholder="Insira seu número."
                value={
                  user.address.number && user.address.number > 0
                    ? user.address.number
                    : ""
                }
              />
            </label>
            <label>
              <span>Referência: </span>
              <input
                type="text"
                name="reference"
                placeholder="Insira sua referência."
                value={user.address.reference}
              />
            </label> */}
            <button onClick={handleSubmitUpdateUser}>Salvar Alterações</button>
          </form>
        </>
      )}
    </div>
  );
};

export default MyVistoryComponent;
