import React from "react";

import AuthForm from "../../components/AuthForm/AuthForm";
import css from "./SigninPage.module.css";

const SigninPage: React.FC = () => {
  return (
    <main className={css.background}>
    <div className={css.flex}>
      <AuthForm />
    </div>
  </main>
  );
};

export default SigninPage;
