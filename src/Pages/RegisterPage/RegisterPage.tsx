import React from "react";
import css from "./RegisterPage.module.css";

import AuthForm from "../../components/AuthForm/AuthForm.jsx";

const RegisterPage: React.FC = () => {
  return (
    <main className={css.background}>
      <div className={css.flex}>
        <AuthForm />
      </div>
    </main>
  );
};

export default RegisterPage;
