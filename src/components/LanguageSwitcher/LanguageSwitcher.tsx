import React from "react";
import styles from "./languageSwitcher.module.css"
import { useTranslation } from "react-i18next";
import plFlag from "../../assets/icons/pol.png;
import gbFlag from "../../assets/icons/eng.png";

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
    };
  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={() => changeLanguage("pl")}
        className={`${styles.langButton} ${
          i18n.language === "pl" ? styles.active : ""
        }`}
        aria-label="Zmień język na polski"
      >
     <img src={plFlag} alt="Polish" />
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`${styles.langButton} ${
          i18n.language === "en" ? styles.active : ""
        }`}
        aria-label="Change language to English"
      >
        <img src={gbFlag} alt="English" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
