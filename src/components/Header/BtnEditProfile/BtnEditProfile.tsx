import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BtnEditProfile.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import { selectIsUserInfoModalOpen } from "../../../redux/global/globalSelectors";
import { setIsUserInfoModalOpen } from "../../../redux/global/globalSlice";

const BtnEditProfile:React.FC = () => {
  const isUserInfoModalOpen = useSelector(selectIsUserInfoModalOpen);
  const dispatch = useDispatch();


  const handleModalClick = () => {
    dispatch(setIsUserInfoModalOpen(!isUserInfoModalOpen));
  };

  return (
    <>
      <button
        type="button"
        onClick={handleModalClick}
        className={styles["btn-edit-profile"]}
        aria-expanded={isUserInfoModalOpen}
      >
        Edit profile
        <svg className={styles["btn-edit-profile__icon"]} aria-hidden="true">
          <use href={sprite + `#icon-edit-01`}></use>
        </svg>
      </button>
      {isUserInfoModalOpen && <UserInfoModal onClose={handleModalClick} />}
    </>
  );
};

export default BtnEditProfile;
