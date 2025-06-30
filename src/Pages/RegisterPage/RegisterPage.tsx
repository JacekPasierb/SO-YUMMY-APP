import React from "react";
import styles from "./RegisterPage.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";

const RegisterPage: React.FC = () => {
  const {t, i18n} = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("titles.register")}</title>
      </Helmet>
      <main className={styles.registerPage}>
        <div className={styles.registerPage__container}>
          <AuthForm formType="register" />
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
