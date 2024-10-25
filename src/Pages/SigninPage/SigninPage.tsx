import styles from "./SigninPage.module.css";
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

const SigninPage: React.FC = () => {
  return (
    <main className={styles.signinPage}>
      <div className={styles.signinPage__flex}>
        <AuthForm formType="signin" />
      </div>
    </main>
  );
};

export default SigninPage;
