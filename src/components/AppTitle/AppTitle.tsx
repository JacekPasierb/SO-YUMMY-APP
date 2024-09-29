import React from "react";
import styles from "./AppTitle.module.css";

const AppTitle = React.memo(() => {
  return (
    <h1 className={styles.title}>
      <span className={styles.title__highlight}>So</span>Yummy
    </h1>
  );
});

export default AppTitle;
