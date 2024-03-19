import styles from "./NavBar.module.css";

import { Link } from "react-router-dom";

// context
import useAuthenticate from "../../hooks/useAuthenticate";

const NavBar = () => {
  const { user, handleModalLogout } = useAuthenticate();

  return (
    <nav className={styles.navbar}>
      <span className={styles.title}>
        <Link to="/">Vistorias Brasil</Link>
      </span>

      <ul className={styles.routes}>
        <li>
          {user && <Link to="/MyVistory">Minha vistoria</Link>}
          {!user && <Link to="/Login">Entrar / Cadastrar</Link>}
          <Link to="/about">Sobre </Link>
          {user && (
            <button className={styles.logout} onClick={() => handleModalLogout(false)}>Sair</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
