import React from "react";
import styles from "./AppDescription.module.css"; 
import { useTranslation } from "react-i18next";

const AppDescription = React.memo(() => {
  const { t } = useTranslation();
  return (
    <p className={styles.description}>
      {t("welcome")}
    </p>
  );
});
AppDescription.displayName = 'AppDescription';

export default AppDescription;
