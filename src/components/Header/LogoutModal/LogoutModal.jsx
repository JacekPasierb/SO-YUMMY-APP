import React from "react";
import css from "./LogoutModal.module.css";
import close from "../../../images/X.png";

const LogoutModal = ({onClose}) => {
  return (
    <div className={css.logoutModal}>
      <img
        src={close}
        alt="ikona zamykająca modal"
        className={css.iconClose}
        onClick={onClose}
      />
      <p className={css.logoutText}>Are you sure you want to log out?</p>
      <div className={css.btnsBox}>
        <button type="button" className={css.btnLogout}>
          Log out
        </button>
        <button type="button" onClick={onClose} className={css.btnCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
