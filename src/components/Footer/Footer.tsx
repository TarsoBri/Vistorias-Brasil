import styles from "./Footer.module.css";

import { Link } from "react-router-dom";
import { FaMosquito } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>
        <Link to="/">
          Vistorias
          <FaMosquito className={styles.icon} />
          Brasil
        </Link>
      </span>

      <p>Vistorias Brasil &copy; 2024</p>
    </footer>
  );
};

export default Footer;
