import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>
      <div className={styles.login}>
        <div className={styles.adm}>
          <div>
            <h3>Cadastreie um novo vistoriador</h3>
            <Link to={"/RegisterSurveryor"} className="submit">
              Cadastrar-se
            </Link>
          </div>
          <div>
            <h3>Entrar como Vistoriador</h3>
            <Link to={"/EnterSurveryor"} className="button1">
              Entrar
            </Link>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.user}>
          <div>
            <h3>Cadastreie uma nova vistoria</h3>
            <Link to={"/RegisterClient"} className="submit">
              Cadastrar-se
            </Link>
          </div>
          <div>
            <h3>Analisar vistoria</h3>
            <Link to={"/EnterLogin"} className="button1">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
