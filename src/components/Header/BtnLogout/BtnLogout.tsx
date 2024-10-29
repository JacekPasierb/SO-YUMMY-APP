import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import styles from "./BtnLogout.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import LogoutModal from "../LogoutModal/LogoutModal";
import { selectIsLogoutModalOpen } from "../../../redux/global/globalSelectors";
import { setIsLogoutModalOpen } from "../../../redux/global/globalSlice";

const BtnLogout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);

  const handleToggleModal = () => {
    dispatch(setIsLogoutModalOpen(!isLogoutModalOpen));
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggleModal}
        className={styles.btnLogout}
        aria-label="Log out from application"
        aria-expanded={isLogoutModalOpen}
        aria-controls="logout-modal"
      >
        <span className={styles.btnLogout__text}>Log out</span>
        <svg className={styles.btnLogout__icon} aria-hidden="true">
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
      </button>
      {isLogoutModalOpen && <LogoutModal onClose={handleToggleModal} />}
    </>
  );
};

export default BtnLogout;
