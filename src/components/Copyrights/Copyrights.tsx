import React from "react";
import styles from "./Copyrights.module.css";

const Copyrights = () => {
  return (
    <div className={styles.copyrightsBox}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <span className={`${styles.text} ${styles.textMedium}`}>
            © 2023 All Rights Reserved.
          </span>
          <span className={styles.text}>Terms of Service</span>
        </div>
      </div>
    </div>
  );
};

export default Copyrights;
