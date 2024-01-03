import React from "react";
import menu from "../../images/menuIkona.png";
import css from "./HamburgerMenu.module.css";

const HamburgerMenu = () => {
    return <img src={menu} alt="menu Ikona" width="40" height="40" className={css.menuIcon} />;
};

export default HamburgerMenu;
