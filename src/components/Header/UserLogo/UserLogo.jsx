import React, { useState } from "react";
import css from "./UserLogo.module.css";
import avatar from "../../../images/avatar.jpg";

import UserLogoModal from "../UserLogoModal/UserLogoModal";
import { selectIsUserLogoModalOpen } from "../../../redux/global/globalSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLogoutModalOpen,
  setIsUserLogoModalOpen,
} from "../../../redux/global/globalSlice";

const UserLogo = () => {
  const dispatch = useDispatch();
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);
  const handleLogoClick = () => {
    if (isUserLogoModalOpen) {
      dispatch(setIsUserLogoModalOpen(false));
      dispatch(setIsLogoutModalOpen(false));
    } else {
      dispatch(setIsUserLogoModalOpen(true));
    }
  };

  return (
    <div className={css.boxAvatar} onClick={handleLogoClick}>
      <img
        src={avatar}
        alt="avatar"
        width="34"
        height="34"
        className={css.boxAvatar__avatar}
      />
      <span className={css.boxAvatar__username}>Username</span>
      {isUserLogoModalOpen && <UserLogoModal />}
    </div>
  );
};

export default UserLogo;
