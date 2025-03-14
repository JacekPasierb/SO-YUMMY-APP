import React, {useEffect} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./SigninPage.module.css";
import {useLocation} from "react-router";
import {toast} from "react-toastify";
import { useTranslation } from "react-i18next";

const SigninPage: React.FC = () => {
  const location = useLocation();
const {t}=useTranslation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("verified") === "true") {
      toast.success(t("accountActivated"));
    }
  }, [location]);
  return (
    <main className={styles.signinPage}>
      <div className={styles.signinPage__container}>
        <AuthForm formType="signin" />
      </div>
    </main>
  );
};

export default SigninPage;
