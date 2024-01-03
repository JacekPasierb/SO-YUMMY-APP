import React from 'react';

import logo from "../../images/logo.png";
import { Link, NavLink } from 'react-router-dom';
import css from "./Logo.module.css";

const Logo = () => {
    return (
      <Link to="/" className={css.link}>
        <img src={logo} alt="logo" width="40" height="40" />
      </Link>
    );
}

export default Logo