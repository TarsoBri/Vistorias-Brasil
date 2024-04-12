import styles from "./ConfirmCode.module.css";

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
import { useFetchDataById } from "../../hooks/useFetchDataById";
import { useLoginUser } from "../../hooks/useLoginUser";
import { Login } from "../../interfaces/Login";
import { PasswordDataRecovery } from "../../interfaces/PasswordDataRecovery";

const ConfirmCode = () => {
  const { codeHashed, setCodeHashed } = useCodeHashed();

  const url: string = "/sendMailRecovery/confirm";
  const urlId: string = `/clients/${codeHashed && codeHashed.id}`;
  const urlChangePassword: string = `/clients/changePassword/${
    codeHashed && codeHashed.id
  }`;
  const urlLogin: string = "/clients/login";

  const { handleConfirmCode, data, error, loading } = useConfirmCode(url);

  const navigate = useNavigate();

  const {
    handleChangePasswordApi,
    sucess,
    user,
    erro: errorChangePassword,
  } = useChangePassword(urlChangePassword);
  const { handleFetchById, data: client } = useFetchDataById(urlId);
  const {
    handleLoginUser,
    loading: loadingLogin,
    error: errorlogin,
  } = useLoginUser(urlLogin);

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

  useEffect(() => {
    if (data === "APPROVED") {
      handleFetchById();
    }
  }, [data]);

  useEffect(() => {
    if (sucess) {
      const userLogin: Login = {
        email: client!.email,
        password: password,
      };

      setCodeHashed(undefined);
      handleLoginUser(userLogin);
    }
  }, [sucess]);

  const handleSubmitPassword = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      return setErrorPassword("Senhas diferentes!");
    } else {
      setErrorPassword("");
    }

    if (!client) {
      return setErrorPassword("Usuário não encontrado!");
    } else {
      setErrorPassword("");
    }
    const passwordData: PasswordDataRecovery = {
      _id: codeHashed!.id,
      password: client!.password,
      newPassword: password,
      code: code,
      hashedCode: codeHashed!.hashedCode,
    };
    handleChangePasswordApi(passwordData);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(codeHashed);
    if (codeHashed && codeHashed.hashedCode) {
      handleConfirmCode(code, codeHashed.hashedCode);
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

      {data === "APPROVED" ? (
        <>
          <h3>Insira sua nova senha:</h3>
          <form className={styles.form} onSubmit={handleSubmitPassword}>
            <label>
              <span>
                Nova senha<span className={styles.mandatoryInput}> *</span>:
              </span>
              <div className={styles.password_input}>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Insira sua nova senha."
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
                Confirmar nova senha
                <span className={styles.mandatoryInput}> *</span>:
              </span>
              <div className={styles.password_input}>
                <input
                  type={confirmedPasswordVisibility ? "text" : "password"}
                  name="confirmedPassword"
                  placeholder="Confirme sua nova senha."
                  required
                  minLength={8}
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
              className={!loadingLogin ? "submit" : "submit_loading"}
            >
              {!loadingLogin ? "Alterar senha" : <Loading />}
            </button>

            {[errorChangePassword, errorPassword, errorlogin].filter(Boolean)
              .length > 0 && (
              <div className="container_erro">
                {[errorChangePassword, errorPassword, errorlogin]
                  .filter(Boolean)
                  .map((err, index) => (
                    <p key={index}>{err}</p>
                  ))}
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          <h3>Insira o código de validação</h3>

          <form className={styles.form} onSubmit={handleSubmit}>
            {codeHashed && codeHashed.email && (
              <div className={styles.textEmail}>
                <p>Código enviado para:</p>
                <p>
                  <b>{codeHashed.email}</b>
                </p>
              </div>
            )}

            <label>
              <span>Código: </span>
              <input
                type="text"
                required
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
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
              <div className={"container_erro"}>
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
