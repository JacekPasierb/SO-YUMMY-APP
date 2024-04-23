import css from "./SigninPage.module.css";

import React, { FC } from "react";

import AuthForm from "../../components/AuthForm/AuthForm";

const SigninPage: FC = () => {
  return (
    <main className={css.background}>
      <div className={css.flex}>
        <AuthForm />
      </div>
    </main>
  );
};

export default SigninPage;
