import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuthNav.module.css";
import { useTranslation } from "react-i18next";

const AuthNav: React.FC = () => {
  const {t}=useTranslation();
  return (
    <nav className={styles.authNav}>
      <Link
        className={`${styles.authNav__link} ${styles.authNav__linkRegister}`}
        to="/register"
      >
       {t("registration")}
      </Link>
      <Link
        className={`${styles.authNav__link} ${styles.authNav__linkSignin}`}
        to="/signin"
      >
        {t("signin")}
      </Link>
    </nav>
  );
};

export default AuthNav;
