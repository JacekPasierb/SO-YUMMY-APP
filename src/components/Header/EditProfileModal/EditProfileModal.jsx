import React from "react";
import css from "./EditProfileModal.module.css";
import close from "../../../images/x.png";
import sprite from "../../../assets/icons/sprite.svg";

const EditProfileModal = ({ onClose }) => {
 
  return (
    <div  className={css.editProfileModal}>
      <img src={close} alt="ikona zamykająca modal" className={css.iconClose} onClick={onClose} />
      <form className={css.form}>
        <div className={css.logoBackground}>
          <svg className={css.iconPicture}>
            <use href={sprite + `#icon-Icon`}></use>
          </svg>
          <button type="button" className={css.btnAdd}>
            <svg className={css.iconPlus}>
              <use href={sprite + `#icon-plus`}></use>
            </svg>
          </button>
        </div>
        <div className={css.inputUsername}>
          <svg className={css.iconUser}>
            <use href={sprite + `#icon-Icon`}></use>
          </svg>
          <input type="text" placeholder="Username" className={css.input} />
          <svg className={css.iconEdit}>
            <use href={sprite + `#icon-edit-01`}></use>
          </svg>
        </div>
        <button type="button" className={css.btnSave}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
