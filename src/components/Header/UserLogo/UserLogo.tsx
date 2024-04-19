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
import { useAuth } from "../../../hooks/useAuth";
export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg";

const UserLogo = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

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
        src={user.avatar ? user.avatar : DEFAULT_AVATAR}
        alt="avatar"
        width="34"
        height="34"
        className={css.boxAvatar__avatar}
      />
      <span className={css.boxAvatar__username}>{user.user}</span>
      {isUserLogoModalOpen && <UserLogoModal />}
    </div>
  );
};

export default UserLogo;
