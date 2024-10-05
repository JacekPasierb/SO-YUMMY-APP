import React, { FC } from "react";
import styles from "./MenuModal.module.css";
import closeIcon from "../../../images/X.png";
import Logo from "../Logo/Logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import sprite from "../../../assets/icons/sprite.svg";

interface MenuModalProps {
  onClose: () => void;
}

const MenuModal: FC<MenuModalProps> = ({ onClose }) => {
  return (
    <div className={styles.menuModal__background}>
      <div className={` ${styles.menuModal__container} ${styles.menuModal}`}>
        <div className={styles.menuModal__header}>
          <Logo />
          <svg onClick={onClose} className={styles.menuModal__iconClose}>
            <use href={`${sprite}#icon-CloseMenu`} className={styles.icon}/>
          </svg>
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
