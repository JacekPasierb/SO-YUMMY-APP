import React from "react";
import css from "./EditProfileModal.module.css";
import close from "../../images/x.png";
import sprite from "../../assets/icons/sprite.svg";

const EditProfileModal = ({onClose}) => {
  return (
    <div className={css.editProfileModal}>
      <img src={close} alt="ikona zamykająca modal" className={css.iconClose} />
      <form className={css.form}>
        <button type="button">
          <svg className={css.iconUser}>
            <use href={sprite + `#icon-Icon`}></use>
          </svg>
          Username
        </button>
        <button type="button" className={css.btnSave}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
