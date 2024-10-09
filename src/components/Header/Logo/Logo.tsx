import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../../../images/logo.png";


const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo__link}>
      <img
        src={logo}
        alt="So Yummy Logo"
        width="40"
        height="40"
        className={styles.logo__icon}
      />
    </Link>
  );
};

export default Logo;
