import React from "react";
import {Link} from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../../../images/logo.png";
import sprite from "../../../assets/icons/sprite.svg";

const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo__link} aria-label="Go to home page">
      <svg width="40px" height="40px" className={styles.logo__image}>
        <use href={`${sprite}#icon-logo`}></use>
      </svg>
    </Link>
  );
};

export default Logo;
