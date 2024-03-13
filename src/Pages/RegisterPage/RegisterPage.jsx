import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import css from "./RegisterPage.module.css";
import Logo from "../../images/LogoMobile1x.png";

const RegisterPage = () => {
  return (
    <main className={css.background}>
      <div className={css.form}>
        <AuthForm />
      </div>
    </main>
  );
};

export default RegisterPage;
