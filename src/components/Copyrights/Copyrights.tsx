import React from "react";
import { Link } from "react-router-dom";
import styles from "./Copyrights.module.css";

const CURRENT_YEAR = new Date().getFullYear();

const Copyrights: React.FC = () => {
  return (
    <footer className={styles.copyrightsBox}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <span className={`${styles.text} ${styles.textMedium}`}>
            © {CURRENT_YEAR} All Rights Reserved.
          </span>
          <Link to="#" className={styles.text}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Copyrights;
