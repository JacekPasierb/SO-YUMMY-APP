import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import styles from "./BtnEditProfile.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import { selectIsUserInfoModalOpen } from "../../../redux/global/globalSelectors";
import { setIsUserInfoModalOpen } from "../../../redux/global/globalSlice";
import { useTranslation } from "react-i18next";

const BtnEditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isUserInfoModalOpen = useSelector(selectIsUserInfoModalOpen);
const {t}=useTranslation();

  const handleToggleModal = () => {
    dispatch(setIsUserInfoModalOpen(!isUserInfoModalOpen));
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggleModal}
        className={styles.btnEditProfile}
        aria-label="Edit user profile"
        aria-expanded={isUserInfoModalOpen}
        aria-controls="user-info-modal"
      >
        <span className={styles.btnEditProfile__text}>{t("editProfile")}</span>
        <svg className={styles.btnEditProfile__icon} aria-hidden="true">
          <use href={`${sprite}#icon-edit-01`} />
        </svg>
      </button>
      {isUserInfoModalOpen && (
        <UserInfoModal 
          onClose={handleToggleModal}
          
        />
      )}
    </>
  );
};

export default BtnEditProfile;
