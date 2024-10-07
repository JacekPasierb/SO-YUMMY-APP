import React, { FC } from "react";
import styles from "./MenuModal.module.css";
import Logo from "../Logo/Logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import sprite from "../../../assets/icons/sprite.svg";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";

interface MenuModalProps {
  onClose: () => void;
}

const MenuModal: FC<MenuModalProps> = ({ onClose }) => {
  return (
    <div className={styles.menuModal__background}>
      <div className={` ${styles.menuModal__container} ${styles.menuModal}`}>
        <div className={styles.menuModal__header}>
          <Logo />
          <IconCloseModal onClose={onClose}/>
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
