import styles from "./SendEmail.module.css";

//components
import Loading from "../Loading/Loading";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// hooks
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSendEmail from "../../hooks/useSendEmail";

const SendEmail = () => {
  const url: string = "/sendMailRecovery";
  const navigate = useNavigate();

  const { handleSendEmail, codeHashed, error, loading } = useSendEmail(url);

  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (email != "") {
      handleSendEmail(email);
    }
  };

  useEffect(() => {
    if (codeHashed && codeHashed.hashedCode != "") {
      navigate("/ConfirmCode");
    }
  }, [codeHashed]);

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>

      <h2>Insira seu email para redefinição</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="text"
            name="email"
            placeholder="Insira seu email."
            required
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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

export default SendEmail;
