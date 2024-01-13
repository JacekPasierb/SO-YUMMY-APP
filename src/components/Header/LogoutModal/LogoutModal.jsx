import React from "react";
import css from "./LogoutModal.module.css";
import close from "../../../images/X.png";
import { useDispatch } from "react-redux";
import { logOut, refreshUser } from "../../../redux/auth/operations";
import { setIsLogoutModalOpen, setIsUserLogoModalOpen } from "../../../redux/global/globalSlice";
import { Navigate } from "react-router";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      dispatch(setIsLogoutModalOpen(false));
      dispatch(setIsUserLogoModalOpen(false));
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
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
        <button type="button" onClick={handleLogout} className={css.btnLogout}>
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
