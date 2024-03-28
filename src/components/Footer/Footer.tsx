import styles from "./Footer.module.css";

import { Link } from "react-router-dom";

// icons
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
      <ul className={styles.myData}>
        <li>
          <span>
            <MdEmail />
          </span>
          <p>tarsobrietzkeiracet@gmail.com</p>
        </li>
        <li>
          <span>
            <FaPhoneAlt />
          </span>
          <p>+55 (51) 99839-0368</p>
        </li>
      </ul>
      <p>Vistorias Brasil &copy; 2024</p>
    </footer>
  );
};

export default Footer;
