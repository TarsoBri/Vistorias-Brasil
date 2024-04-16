import styles from "./NavBar.module.css";

import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

// icons
import { FaMosquito } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";

// context
import useAuthenticate from "../../hooks/useContexts/useAuthenticate";

const NavBar = () => {
  const { user, handleModalLogout } = useAuthenticate();
  const [active, setActive] = useState<boolean>(false);

  const menuFunc = () => setActive(!active);

  return (
    <nav className={styles.navbar}>
      <span className={styles.title}>
        <Link to="/">
          Vistorias
          <FaMosquito className={styles.icon} />
          Brasil
        </Link>
      </span>

      <div className={active ? styles.active : ""}>
        <div className={styles.menu_icon} onClick={menuFunc}>
          <MdMenuOpen />
        </div>

        <ul className={styles.routes}>
          <li onClick={menuFunc}>
            <NavLink to="/">Vistorias</NavLink>
          </li>
          {user && user.surveyor !== true && (
            <li onClick={menuFunc}>
              <NavLink to="/MyVistory">Minha vistoria</NavLink>
            </li>
          )}
          {user && user.surveyor === true && (
            <li onClick={menuFunc}>
              <NavLink to="/SurveryorData">Seus dados</NavLink>
            </li>
          )}
          {!user && (
            <li onClick={menuFunc}>
              <NavLink to="/Login">Entrar / Cadastrar</NavLink>
            </li>
          )}
          <li onClick={menuFunc}>
            <NavLink to="/About">Sobre</NavLink>
          </li>

          <li onClick={menuFunc}>
            <NavLink to="/Contact">Contato</NavLink>
          </li>

          {user && (
            <li onClick={menuFunc}>
              <button
                className={styles.logout}
                onClick={() => handleModalLogout(false)}
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
