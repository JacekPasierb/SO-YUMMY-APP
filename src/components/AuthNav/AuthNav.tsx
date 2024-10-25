import styles from "./AuthNav.module.css";

import React, { FC } from "react";
import { Link } from "react-router-dom";

const AuthNav: FC = () => {
  return (
    <>
      <nav className={styles.authNav}>
        <Link
          className={`${styles.authNav__link} ${styles.authNav__linkRegister} ${styles.authNav__linkText}`}
          to="/register"
        >
          Registration
        </Link>
        <Link
          className={`${styles.authNav__link}  ${styles.authNav__linkSignin} ${styles.authNav__linkText}`}
          to="/signin"
        >
          Sign in
        </Link>
      </nav>
    </>
  );
};

export default AuthNav;
