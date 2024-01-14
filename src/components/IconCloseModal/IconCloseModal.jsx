import React from "react";
import css from "./IconCloseModal.module.css";
import close from "../../images/X.png";

const IconCloseModal = ({ onClose }) => {
  return (
    <img
      src={close}
      alt="ikona zamykająca modal"
      className={css.iconClose}
      onClick={onClose}
    />
  );
};

export default IconCloseModal;
