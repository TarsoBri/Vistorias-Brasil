import style from "./NavBar.module.css";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <h1 className={style.title}>
        <Link to="/">Vistorias Brasil</Link>
      </h1>

      <ul className={style.routes}>
        <li>
          <Link to="/CreateClient">Criar</Link>
          <Link to="/CreateClient">Entrar / Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
