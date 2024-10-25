import styles from "./SigninPage.module.css";

import React, { FC } from "react";

import AuthForm from "../../components/AuthForm/AuthForm";

const SigninPage: FC = () => {
  return (
    <main className={styles.signinPage}>
      <div className={styles.signinPage__flex}>
        <AuthForm />
      </div>
    </main>
  );
};

export default SigninPage;
