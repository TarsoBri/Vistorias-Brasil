import styles from "./Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.adm}>
          <div>
            <h3>Cadastrar vistoriador</h3>
            <Link to={"/RegisterSurveryor"} className="submit">
              Cadastrar
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
            <h3>Cadastrar vistoria</h3>
            <Link to={"/RegisterClient"} className="submit">
              Cadastrar
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
