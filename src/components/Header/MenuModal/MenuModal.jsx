import React from "react";
import css from "./MenuModal.module.css";
import close from "../../../images/x.png";
import Logo from "../Logo/logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
const MenuModal = ({ onClose }) => {
  return (
    <div className={css.backgroundMenuModal}>
      <div className={css.menuModal}>
        <div className={css.headModal}>
          <Logo />
          <img
            src={close}
            alt="ikona zamykająca modal"
            className={css.iconClose}
            onClick={onClose}
          />
        </div>
        <NavigationMobile />
      </div>
    </div>
  );
};

export default MenuModal;
