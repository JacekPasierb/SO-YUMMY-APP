import css from "./Logo.module.css";
import logo from "../../../images/logo.png";

import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className={css.link}>
      <img
        src={logo}
        alt="logo"
        width="40"
        height="40"
        className={css.iconLogo}
      />
    </Link>
  );
};

export default Logo;
