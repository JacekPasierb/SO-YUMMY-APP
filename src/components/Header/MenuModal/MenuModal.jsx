import React from "react";
import css from "./MenuModal.module.css";
import close from "../../../images/X.png";
import Logo from "../Logo/Logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";

import ThemeToggler from "../ThemeToggler/ThemeToggler";
const MenuModal = ({ onClose }) => {
  return (
    <div className={css.backgroundMenuModal}>
      <div className={` ${css.container} ${css.menuModal}`}>
        <div className={css.headModal}>
          <Logo />
          <img
            src={close}
            alt="ikona zamykająca modal"
            className={css.iconClose}
            onClick={onClose}
          />
        </div>
        <NavigationMobile onClose={onClose} />
        <div className={css.switcher}>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
