import styles from "./RegisterPage.module.css";
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

const RegisterPage: React.FC = () => {
  return (
    <main className={styles.registerPage}>
      <div className={styles.registerPage__flex}>
        <AuthForm formType="register" />
      </div>
    </main>
  );
};

export default RegisterPage;
