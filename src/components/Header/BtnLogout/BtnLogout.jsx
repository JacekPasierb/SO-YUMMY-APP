import React, { useState } from "react";
import css from "./BtnLogout.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogoutModalOpen } from "../../../redux/global/globalSelectors";
import { setIsLogoutModalOpen } from "../../../redux/global/globalSlice";
const BtnLogout = () => {
  const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);
  const dispatch = useDispatch();

  const handleLogoutModalClick = () =>
    isLogoutModalOpen
      ? dispatch(setIsLogoutModalOpen(false))
      : dispatch(setIsLogoutModalOpen(true));
  return (
    <>
      <button
        type="button"
        onClick={handleLogoutModalClick}
        className={css.logoutBtn}
      >
        Log out
        <svg className={css.icon}>
          <use href={sprite + `#icon-arrow-right`}></use>
        </svg>
      </button>
      {isLogoutModalOpen && <LogoutModal onClose={handleLogoutModalClick} />}
    </>
  );
};

export default BtnLogout;
