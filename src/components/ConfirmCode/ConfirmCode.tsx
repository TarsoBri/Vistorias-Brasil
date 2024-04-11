import styles from "./ConfirmCode.module.css";

// Router
import { Link } from "react-router-dom";

//components
import Loading from "../Loading/Loading";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// hooks
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useCodeHashed from "../../hooks/useContexts/useCodeHashed";
import useConfirmCode from "../../hooks/useConfirmCode";
import { useChangePassword } from "../../hooks/useChangePassword";

// Interfaces
import PasswordData from "../../interfaces/PasswordData";

const ConfirmCode = () => {
  const url: string = "/sendMailRecovery/confirm";

  const { codeHashed } = useCodeHashed();
  const { handleConfirmCode, data, error, loading } = useConfirmCode(url);

  const urlChangePassword: string = `/clients/changePassword/${
    codeHashed && codeHashed.id
  }`;
  const navigate = useNavigate();

  const { handleChangePasswordApi } = useChangePassword(urlChangePassword);

  const [code, setCode] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmedPasswordVisibility, setConfirmedPasswordVisibility] =
    useState(false);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "confirmedPassword":
        setConfirmedPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmitPassword = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      return setErrorPassword("Senhas diferentes!");
    } else {
      setErrorPassword("");
    }

    const passwordData: PasswordData = {
      _id: codeHashed!.id,
      password,
      newPassword,
    };

    handleChangePassword();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (codeHashed && codeHashed.code) {
      handleConfirmCode(code, codeHashed.code);
    }
  };

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>

      <h2>Redefinição de senha</h2>

      {data !== "APPROVED" ? (
        <>
          <h3>Insira sua nova senha:</h3>
          <form className={styles.form} onSubmit={handleSubmitPassword}>
            <label>
              <span>
                Senha<span className={styles.mandatoryInput}> *</span>:
              </span>
              <div className={styles.password_input}>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Insira sua senha."
                  required
                  value={password}
                  autoComplete="current-password"
                  minLength={8}
                  onChange={handleChangePassword}
                />

                <span
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </label>

            <label>
              <span>
                Confirmar senha<span className={styles.mandatoryInput}> *</span>
                :
              </span>
              <div className={styles.password_input}>
                <input
                  type={confirmedPasswordVisibility ? "text" : "password"}
                  name="confirmedPassword"
                  placeholder="Confirme sua senha."
                  required
                  value={confirmedPassword}
                  autoComplete="current-password"
                  onChange={handleChangePassword}
                />

                <span
                  onClick={() =>
                    setConfirmedPasswordVisibility(!confirmedPasswordVisibility)
                  }
                >
                  {confirmedPasswordVisibility ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </label>

            <button
              type="submit"
              className={!loading ? "submit" : "submit_loading"}
            >
              {!loading ? "Alterar senha" : <Loading />}
            </button>
            {errorPassword && (
              <div className="container_erro">
                <p>{errorPassword}</p>
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          <h3>Insira o código de validação</h3>

          {codeHashed && codeHashed.email && (
            <p>Código enviado para: {codeHashed.email}</p>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              <span>Código: </span>
              <input
                type="text"
                required
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
            </label>

            <button
              type="submit"
              className={!loading ? "submit" : "submit_loading"}
            >
              {!loading ? "Confirmar" : <Loading />}
            </button>
            {error && (
              <div className="container_erro">
                <p>{error}</p>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default ConfirmCode;
