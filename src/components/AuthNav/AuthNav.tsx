import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav: React.FC = () => {
  return (
    <nav className={styles.authNav}>
      <Link
        className={`${styles.authNav__link} ${styles.authNav__linkRegister}`}
        to="/register"
      >
        Registration
      </Link>
      <Link
        className={`${styles.authNav__link} ${styles.authNav__linkSignin}`}
        to="/signin"
      >
        Sign in
      </Link>
    </nav>
  );
};

export default AuthNav;
