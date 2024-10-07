import React, { useState } from "react";
import styles from "./BtnLogout.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogoutModalOpen } from "../../../redux/global/globalSelectors";
import { setIsLogoutModalOpen } from "../../../redux/global/globalSlice";

const BtnLogout = () => {
  const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);
  const dispatch = useDispatch();

  const handleLogoutModalClick = () =>
    dispatch(setIsLogoutModalOpen(!isLogoutModalOpen));

  return (
    <>
      <button
        type="button"
        onClick={handleLogoutModalClick}
        className={styles.btnLogout}
        aria-expanded={isLogoutModalOpen}
      >
        Log out
        <svg className={styles.btnLogoutIcon} aria-hidden="true">
          <use href={sprite + `#icon-arrow-right`}></use>
        </svg>
      </button>
      {isLogoutModalOpen && <LogoutModal onClose={handleLogoutModalClick} />}
    </>
  );
};

export default BtnLogout;
