import React, { useEffect } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./SigninPage.module.css";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const SigninPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 🔥 Sprawdzamy, czy w URL jest ?verified=true
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("verified") === "true") {
      toast.success("Konto zostało aktywowane! Możesz się teraz zalogować.");
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
