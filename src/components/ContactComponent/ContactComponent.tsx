import styles from "./ContactComponent.module.css";

import { useNavigate } from "react-router-dom";

//icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLinkedin, FaGithub, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactComponent = () => {
  const whatsappUrl =
    "https://wa.me/5551998390368?text=Olá! Estou entrando em contato através do Vistorias Brasil.";

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>
      <h2>Contato</h2>
      <p>
        Olá, tudo bem? Me chamo Tarso e sou o desenvolvedor do Vistorias Brasil.
        Caso queira deixar um feedback ou me mandar uma mensagem, pode me chamar
        em alguma dessas formas de contato, obrigado.
      </p>
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
      <ul className={styles.networks}>
        <li>
          <a
            href="https://www.linkedin.com/in/tarso-brietzke-iracet-5556b5262/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://github.com/TarsoBri/" target="_blank">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href={whatsappUrl} target="_blank">
            <FaWhatsapp />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactComponent;
