import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./SigninPage.module.css";

const SigninPage: React.FC = () => {
  return (
    <main className={styles.signinPage}>
      <div className={styles.signinPage__container}>
        <AuthForm formType="signin" />
      </div>
    </main>
  );
};

export default SigninPage;
