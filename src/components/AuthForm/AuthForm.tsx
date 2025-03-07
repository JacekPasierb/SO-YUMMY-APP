import styles from "./AuthForm.module.css";
import React, {lazy, Suspense} from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Loader/Loader";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const SigninForm = lazy(() => import("../SigninForm/SigninForm"));
const RegisterForm = lazy(() => import("../RegisterForm/RegisterForm"));

interface AuthFormProps {
  formType: "register" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({formType}) => {
  return (
    <Suspense fallback={<Loader />}>
      <div style={{position: "absolute", top: "0", left: "0"}}>
        <LanguageSwitcher />
      </div>

      {formType === "register" && (
        <>
          <RegisterForm />

          <Link className={styles.authForm__link} to="/signin">
            Sign in
          </Link>
        </>
      )}
      {formType === "signin" && (
        <>
          <SigninForm />

          <Link className={styles.authForm__link} to="/register">
            Registration
          </Link>
        </>
      )}
    </Suspense>
  );
};

export default AuthForm;
