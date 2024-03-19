import styles from "./Enter.module.css";

//components
import Loading from "../Loading/Loading";

// hooks
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";

import { useNavigate } from "react-router-dom";

const Enter = () => {
  const url = "/clients/login";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLoginUser, loading, error } = useLoginUser(url);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };

    handleLoginUser(loginUser);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className={!loading ? "submit" : "submit_loading"}
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

export default Enter;
