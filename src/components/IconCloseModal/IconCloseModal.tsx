import React, { FC } from "react";
import css from "./IconCloseModal.module.css";
import sprite from "../../assets/icons/sprite.svg";

interface IconCloseModalRequest {
  onClose: () => void;
}

const IconCloseModal: FC<IconCloseModalRequest> = ({ onClose }) => {
  return (
    <svg onClick={onClose} className={css.iconClose}>
      <use href={`${sprite}#icon-CloseMenu`} />
    </svg>
  );
};

export default IconCloseModal;
