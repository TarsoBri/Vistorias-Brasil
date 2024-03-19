import styles from "./Logout.module.css";

import { useNavigate } from "react-router-dom";

import useAuthenticate from "../../hooks/useAuthenticate";

const Logout = () => {
  const { user, handleModalLogout } = useAuthenticate();

  const navigate = useNavigate();

  return (
    <div id="modal_logout" className="hide">
      <div
        className={styles.logout_opacity}
        onClick={() => handleModalLogout(false)}
      ></div>
      <div className={styles.logout_container}>
        <h3>Tem certeza que deseja sair, {user && user!.firstName}?</h3>
        <button
          className="submit"
          onClick={() => {
            handleModalLogout(true);
            navigate("/");
          }}
        >
          Sim
        </button>
        <button className="button1" onClick={() => handleModalLogout(false)}>
          Não
        </button>
      </div>
    </div>
  );
};

export default Logout;
