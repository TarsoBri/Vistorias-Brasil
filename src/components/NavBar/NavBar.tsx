import style from "./NavBar.module.css";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <span className={style.title}>
        <Link to="/">Vistorias Brasil</Link>
      </span>

      <ul className={style.routes}>
        <li>
          <Link to="/Login">Entrar / Cadastrar</Link>
          <Link to="/about">Sobre </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
