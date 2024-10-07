import React, { FC } from "react";
import styles from "./IconCloseModal.module.css";
import sprite from "../../assets/icons/sprite.svg";

interface IconCloseModalProps {
  onClose: () => void;
}

const IconCloseModal: FC<IconCloseModalProps> = ({ onClose }) => {
  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.key === "Enter" || e.key === " ") { // Obsługuje także spację
      e.preventDefault(); // Zapobiega przewijaniu strony przy użyciu spacji
      onClose();
    }
  };
  return (
    <svg
      onClick={onClose}
      className={styles.iconClose}
      aria-label="Close modal"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown} 
    >
      <use href={`${sprite}#icon-CloseMenu`} />
    </svg>
  );
};

export default IconCloseModal;
