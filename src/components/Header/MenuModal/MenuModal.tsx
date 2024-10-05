import React, { FC } from "react";
import styles from "./MenuModal.module.css";
import closeIcon from "../../../images/X.png";
import Logo from "../Logo/Logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import ThemeToggler from "../ThemeToggler/ThemeToggler";


interface MenuModalProps {
  onClose: () => void;
}

const MenuModal:FC<MenuModalProps>= ({ onClose }) => {
  return (
    <div className={styles.menuModal__background}>
      <div className={` ${styles.menuModal__container} ${styles.menuModal}`}>
        <div className={styles.menuModal__header}>
          <Logo />
          <img
            src={closeIcon}
            alt="Close modal icon"
            className={styles.menuModal__iconClose} 
            onClick={onClose}
          />
        </div>
        <NavigationMobile onClose={onClose} />
        <div className={styles.menuModal__switcher}>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
