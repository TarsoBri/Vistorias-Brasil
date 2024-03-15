import styles from "./Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.adm}>
          <h3>Cadastrar vistoriador</h3>
          <Link to={""}>Cadastrar</Link>
          <p>Entrar como Vistoriador</p>
          <Link to={""}>Entrar</Link>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.user}>
          <h3>Cadastrar vistoria</h3>
          <Link to={"/CreateClient"}>Cadastrar</Link>

          <p>Analisar vistoria</p>
          <Link to={"/EnterLogin"}>Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
