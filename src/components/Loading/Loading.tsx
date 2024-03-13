import styles from "./Loading.module.css";

import { Oval } from "react-loading-icons";

const Loading = () => {
  return (
    <div>
      <Oval className={styles.loader} />
    </div>
  );
};

export default Loading;
