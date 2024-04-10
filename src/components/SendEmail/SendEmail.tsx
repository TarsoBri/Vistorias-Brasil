import styles from "./SendEmail.module.css";

// Router
import { Link } from "react-router-dom";

//components
import Loading from "../Loading/Loading";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// hooks
import { useState, ChangeEvent, FormEvent } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";



const SendEmail = () => {
  const url = "/clients/login";
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [emailErro, setEmailErro] = useState<string>("");



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

  };

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
            value={email}
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

export default SendEmail;
