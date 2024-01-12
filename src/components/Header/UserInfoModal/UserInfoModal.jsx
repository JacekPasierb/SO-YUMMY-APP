import React, { useState } from "react";
import css from "./UserInfoModal.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const UserInfoModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalClick = () => {
    setIsEditModalOpen((prevIsEditModalOpen) => !prevIsEditModalOpen);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleEditModalClick}
        className={css.editProfile}
      >
        Edit profile
        <svg className={css.icon}>
          <use href={sprite + `#icon-edit-01`}></use>
        </svg>
      </button>
      {isEditModalOpen && <EditProfileModal onClose={handleEditModalClick} />}
    </>
  );
};

export default UserInfoModal;
