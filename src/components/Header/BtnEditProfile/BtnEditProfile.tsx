import React, { useState } from "react";
import css from "./BtnEditProfile.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserInfoModalOpen } from "../../../redux/global/globalSelectors";
import { setIsUserInfoModalOpen } from "../../../redux/global/globalSlice";

const BtnEditProfile = () => {
  const isUserInfoModalOpen = useSelector(selectIsUserInfoModalOpen);

  const dispatch = useDispatch();

  const handleModalClick = () => {
    isUserInfoModalOpen
      ? dispatch(setIsUserInfoModalOpen(false))
      : dispatch(setIsUserInfoModalOpen(true));
  };

  return (
    <>
      <button
        type="button"
        onClick={handleModalClick}
        className={css.editProfile}
      >
        Edit profile
        <svg className={css.icon}>
          <use href={sprite + `#icon-edit-01`}></use>
        </svg>
      </button>
      {isUserInfoModalOpen && <UserInfoModal onClose={handleModalClick} />}
    </>
  );
};

export default BtnEditProfile;
