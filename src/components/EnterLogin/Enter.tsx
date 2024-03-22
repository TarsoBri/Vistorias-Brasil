import styles from "./Enter.module.css";

//components
import Loading from "../Loading/Loading";

// hooks
import { useState, ChangeEvent, FormEvent } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";

const Enter = () => {
  const url = "/clients/login";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      <h2>Entrar para analisar vistoria</h2>
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
