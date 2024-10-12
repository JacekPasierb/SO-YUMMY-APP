import React from "react";
import styles from "./PageTitle.module.css";

interface MainTitleProps {
  title: string;
}

const MainTitle: React.FC<MainTitleProps> = ({ title }) => {
  return (
    <div className={styles.pageTitle__container}>
      <h2 className={styles.pageTitle__text}>{title}</h2>
    </div>
  );
};

export default MainTitle;
