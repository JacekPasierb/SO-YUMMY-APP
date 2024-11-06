import React from "react";
import styles from "./RegisterPage.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";

const RegisterPage: React.FC = () => {
  return (
    <main className={styles.registerPage}>
      <div className={styles.registerPage__container}>
        <AuthForm formType="register" />
      </div>
    </main>
  );
};

export default RegisterPage;
