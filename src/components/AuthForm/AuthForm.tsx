import styles from "./AuthForm.module.css";
import React, {lazy, Suspense} from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Loader/Loader";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import {useTranslation} from "react-i18next";

const SigninForm = lazy(() => import("../SigninForm/SigninForm"));
const RegisterForm = lazy(() => import("../RegisterForm/RegisterForm"));

interface AuthFormProps {
  formType: "register" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({formType}) => {
  const {t} = useTranslation();
  return (
    <Suspense fallback={<Loader />}>
      <div style={{position: "absolute", top: "0", left: "0"}}>
        <LanguageSwitcher />
      </div>

      {formType === "register" && (
        <>
          <RegisterForm />

          <Link className={styles.authForm__link} to="/signin">
            {t("signin")}
          </Link>
        </>
      )}
      {formType === "signin" && (
        <>
          <SigninForm />

          <Link className={styles.authForm__link} to="/register">
            {t("registration")}
          </Link>
        </>
      )}
    </Suspense>
  );
};

export default AuthForm;
