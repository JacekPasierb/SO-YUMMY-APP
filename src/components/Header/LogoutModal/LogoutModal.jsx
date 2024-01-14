import React from "react";
import css from "./LogoutModal.module.css";
import close from "../../../images/X.png";
import { useDispatch } from "react-redux";
import { logOut, refreshUser } from "../../../redux/auth/operations";
import {
  setIsLogoutModalOpen,
  setIsUserLogoModalOpen,
} from "../../../redux/global/globalSlice";

import IconCloseModal from "../../IconCloseModal/IconCloseModal";

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
      <IconCloseModal onClose={onClose} />
      <p className={css.logoutText}>Are you sure you want to log out?</p>
      <div className={css.btnsBox}>
        <button type="button" onClick={handleLogout} className={`${css.btn} ${css.btnLogout}`}>
          Log out
        </button>
        <button type="button" onClick={onClose} className={`${css.btn} ${css.btnCancel}`}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
