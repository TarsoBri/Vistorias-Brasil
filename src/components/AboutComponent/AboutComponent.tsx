import styles from "./AboutComponent.module.css";

import { useNavigate } from "react-router-dom";

// icon
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const AboutComponent = () => {
  const navigate = useNavigate();

  const questionsArticle = document.getElementsByClassName(
    `${styles.question_container}`
  );
  const handleChangeClass = (question: number) => {
    const questions = Array.from(questionsArticle);

    questions[question].classList.toggle(`${styles.show_response}`);
  };

  return (
    <div className={styles.container}>
      <div className="return_btn">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
        </button>
      </div>

      <h2>Sobre o Vistoria Brasil</h2>
      <p>Conheça sobre o projeto vendo essas perguntas recentes</p>

      <article className={styles.question_container}>
        <div className={styles.question} onClick={() => handleChangeClass(0)}>
          <h3>Quais os objetivos do Vistorias Brasil?</h3>
          <span>
            <MdOutlineArrowDropDown />
          </span>
        </div>
        <div className={styles.question_response}>
          <p>
            Tendo como primeiro objetivo, facilitar vistorias pelo Brasil,
            possibilitando o necessitado do serviço solicitar sua vistoria
            preenchendo seus dados residências. E como segundo objetivo, ajudar
            os vistoriadores do nosso serviço a acharem novas vistorias facilmente, além
            de defini-las como já vistoradas ou não.
          </p>
        </div>
      </article>

      <article className={styles.question_container}>
        <div className={styles.question} onClick={() => handleChangeClass(1)}>
          <h3>Por que o Vistorias Brasil foi criado?</h3>
          <span>
            <MdOutlineArrowDropDown />
          </span>
        </div>
        <div className={styles.question_response}>
          <p>
            Por conta da grande quantidade de novos casos registrados de dengue
            e outras doenças causadas pelo mosquito Aedes aegypti, o Vistorias
            Brasil foi criado para ajudar compater a proliferação do mosquito.
          </p>
        </div>
      </article>

      <article className={styles.question_container}>
        <div className={styles.question} onClick={() => handleChangeClass(2)}>
          <h3>Quais tecnologias foram utilizadas no Vistorias Brasil?</h3>
          <span>
            <MdOutlineArrowDropDown />
          </span>
        </div>
        <div className={styles.question_response}>
          <p>
            As principais tecnologias utilizadas no projeto foram: Typescript,
            Node.JS, express, React e MongoDB.
          </p>
        </div>
      </article>
    </div>
  );
};

export default AboutComponent;
