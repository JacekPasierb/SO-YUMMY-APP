import styles from "./RegisterPage.module.css";

import React, { FC } from "react";

import AuthForm from "../../components/AuthForm/AuthForm";

const RegisterPage: FC = () => {
  return (
    <main className={styles.registerPage}>
      <div className={styles.registerPage__flex}>
        <AuthForm />
      </div>
    </main>
  );
};

export default RegisterPage;
