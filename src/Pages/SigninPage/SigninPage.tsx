import React, {useEffect} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./SigninPage.module.css";
import {useLocation} from "react-router";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";

const SigninPage: React.FC = () => {
  const location = useLocation();
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("verified") === "true") {
      toast.success(t("accountActivated"));
    }
  }, [location, t]);
  return (
    <>
      <Helmet>
        <title>{t("titles.signin")}</title>
      </Helmet>
      <main className={styles.signinPage}>
        <div className={styles.signinPage__container}>
          <AuthForm formType="signin" />
        </div>
      </main>
    </>
  );
};

export default SigninPage;
