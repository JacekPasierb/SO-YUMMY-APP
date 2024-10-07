import React, { FC } from "react";
import styles from "./IconCloseModal.module.css";
import sprite from "../../assets/icons/sprite.svg";

interface IconCloseModalProps {
  onClose: () => void;
}

const IconCloseModal: FC<IconCloseModalProps> = ({ onClose }) => {
  return (
    <svg
      onClick={onClose}
      className={styles.iconClose}
      aria-label="Close modal"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClose()}
    >
      <use href={`${sprite}#icon-CloseMenu`} />
    </svg>
  );
};

export default IconCloseModal;
