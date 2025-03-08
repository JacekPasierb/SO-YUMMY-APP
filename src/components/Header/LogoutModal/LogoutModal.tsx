import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations";
import {
  setIsLogoutModalOpen,
  setIsUserLogoModalOpen,
} from "../../../redux/global/globalSlice";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../redux/store";
import styles from "./LogoutModal.module.css";
import { useTranslation } from "react-i18next";

interface LogoutModalProps {
  onClose: () => void;
  id?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  onClose,
  id = "logout-modal",
}) => {
  const dispatch = useDispatch<AppDispatch>();
const {t}=useTranslation();

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      dispatch(setIsLogoutModalOpen(false));
      dispatch(setIsUserLogoModalOpen(false));
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div
      className={styles.logoutModal}
      id={id}
      role="dialog"
      aria-labelledby="logout-title"
      aria-modal="true"
    >
      <IconCloseModal onClose={onClose} className="logOutModal--position"/>

      <p id="logout-title" className={styles.logoutModal__text}>
      {t("logoutConfirmation")}
      </p>

      <div className={styles.logoutModal__buttons}>
        <button
          type="button"
          onClick={handleLogout}
          className={styles.logoutModal__btnLogout}
        >
          {t("logOut")}
        </button>
        <button
          type="button"
          onClick={onClose}
          className={styles.logoutModal__btnCancel}
        >
         {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
