import styles from "./Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.adm}>
          <h3>Cadastrar vistoriador</h3>
          <Link to={"/RegisterSurveryor"}>Cadastrar</Link>
          <p>Entrar como Vistoriador</p>
          <Link to={"/EnterSurveryor"}>Entrar</Link>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.user}>
          <h3>Cadastrar vistoria</h3>
          <Link to={"/RegisterClient"}>Cadastrar</Link>

          <p>Analisar vistoria</p>
          <Link to={"/EnterLogin"} className="submit">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
