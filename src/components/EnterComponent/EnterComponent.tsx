import styles from "./EnterComponent.module.css";

//components
import Loading from "../Loading/Loading";

// hooks
import { useState, ChangeEvent, FormEvent } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";

interface Props {
  title: string;
}

const EnterComponent = ({ title }: Props) => {
  const url = "/clients/login";

  const [email, setEmail] = useState<string>("");
  const [emailErro, setEmailErro] = useState<string>("");
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

    if (!email.includes("vistoriasbrasil")) {
      return setEmailErro("Email não qualificado!");
    } else setEmailErro("");
    const loginUser = {
      email,
      password,
    };

    handleLoginUser(loginUser);
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
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
        {[error, emailErro].filter(Boolean).length > 0 && (
          <div className="container_erro">
            {[error, emailErro].filter(Boolean).map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default EnterComponent;
