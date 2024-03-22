import styles from "./NavBar.module.css";

import { Link, NavLink } from "react-router-dom";

// icon
import { FaMosquito } from "react-icons/fa6";

// context
import useAuthenticate from "../../hooks/useAuthenticate";

const NavBar = () => {
  const { user, handleModalLogout } = useAuthenticate();

  return (
    <nav className={styles.navbar}>
      <span className={styles.title}>
        <Link to="/">
          Vistorias
          <FaMosquito className={styles.icon} />
          Brasil
        </Link>
      </span>

      <ul className={styles.routes}>
        {user && user.surveyor !== true && (
          <li>
            <NavLink to="/MyVistory">Minha vistoria</NavLink>
          </li>
        )}
        {user && user.surveyor === true && (
          <li>
            <NavLink to="/SurveryorData">Seus dados</NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/Login">Entrar / Cadastrar</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about">Sobre </NavLink>
        </li>

        {user && (
          <li>
            <button
              className={styles.logout}
              onClick={() => handleModalLogout(false)}
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
