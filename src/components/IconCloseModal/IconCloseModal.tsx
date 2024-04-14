import React, { FC } from "react";
import css from "./IconCloseModal.module.css";
import close from "../../images/X.png";

interface IconCloseModalRequest {
  onClose: () => void;
}

const IconCloseModal:FC<IconCloseModalRequest>= ({ onClose }) => {
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
