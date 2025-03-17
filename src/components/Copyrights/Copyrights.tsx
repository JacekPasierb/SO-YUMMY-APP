import React from "react";
import { Link } from "react-router-dom";
import styles from "./Copyrights.module.css";
import { useTranslation } from "react-i18next";
import packageJson from "../../../package.json";

const CURRENT_YEAR = new Date().getFullYear();

const Copyrights: React.FC = () => {
  const {t}=useTranslation();
  return (
    <footer className={styles.copyrightsBox}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <span className={`${styles.text} ${styles.textMedium}`}>
            © {CURRENT_YEAR} {t("rights")}
          </span>
          <Link to="#" className={styles.text}>
          {t("terms")}
          </Link>
          <span className={styles.text}>So Yummy - Ver {packageJson.version}</span>
        </div>
      </div>
    </footer>
  );
};

export default Copyrights;
