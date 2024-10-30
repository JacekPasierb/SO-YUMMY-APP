import React from "react";
import styles from "./MenuModal.module.css";
import Logo from "../Logo/Logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";
import { createPortal } from "react-dom";

interface MenuModalProps {
  onClose: () => void;
  id?: string;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const MenuModal: React.FC<MenuModalProps> = ({
  onClose,
  id = "menu-modal",
}) => {
  const modal = (
    <div 
      className={styles.menuModal__background}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
    >
      <div 
        id={id}
        className={styles.menuModal}
      >
        <header className={styles.menuModal__header}>
          <Logo />
          <IconCloseModal onClose={onClose} />
        </header>

        <nav 
          className={styles.menuModal__navigation}
          aria-label="Mobile navigation"
        >
          <NavigationMobile onClose={onClose} />
        </nav>

        <div className={styles.menuModal__switcher}>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, modalRoot);
};

export default MenuModal;
