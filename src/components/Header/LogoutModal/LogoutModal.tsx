import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations";
import {
  setIsLogoutModalOpen,
  setIsUserLogoModalOpen,
} from "../../../redux/global/globalSlice";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";
import { toast } from "react-toastify";
import { AppDispatch } from "src/redux/store";
import styles from "./LogoutModal.module.css";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      dispatch(setIsLogoutModalOpen(false));
      dispatch(setIsUserLogoModalOpen(false));

      toast.success("Logged out successfully !");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out.");
    }
  };
  return (
    <div className={styles.logoutModal}>
      <IconCloseModal onClose={onClose} />
      <p className={styles.logoutModal__text}>
        Are you sure you want to log out?
      </p>
      <div className={styles.logoutModal__buttons}>
        <button
          type="button"
          onClick={handleLogout}
          className={`${styles.logoutModal__btn} ${styles.logoutModal__btnLogout}`}
        >
          Log out
        </button>
        <button
          type="button"
          onClick={onClose}
          className={`${styles.logoutModal__btn} ${styles.logoutModal__btnCancel}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
