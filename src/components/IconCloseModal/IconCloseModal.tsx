import React, { FC, KeyboardEvent } from "react";
import styles from "./IconCloseModal.module.css";
import sprite from "../../assets/icons/sprite.svg";

interface IconCloseModalProps {
  onClose: () => void;
  className?: string;
  ariaLabel?: string;
}

const IconCloseModal: FC<IconCloseModalProps> = ({ 
  onClose,
  className = '',
  ariaLabel = 'Close modal'
}) => {
  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <button
      type="button"
      onClick={onClose}
      className={`${styles.iconCloseButton} ${className ? styles[className] : ''}`}
      aria-label={ariaLabel}
    >
      <svg 
        className={styles.iconClose}
        width="24"
        height="24"
        aria-hidden="true"
      >
        <use href={`${sprite}#icon-CloseMenu`} />
      </svg>
    </button>
  );
};

export default IconCloseModal;
