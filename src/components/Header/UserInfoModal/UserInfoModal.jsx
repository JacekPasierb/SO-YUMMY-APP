import React, { useEffect, useRef } from "react";
import css from "./UserInfoModal.module.css";
import close from "../../../images/X.png";
import sprite from "../../../assets/icons/sprite.svg";

const UserInfoModal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
       if (modalRef.current && !modalRef.current.contains(e.target)) {
         onClose();
       }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);
 
  return (
    <div ref={modalRef} className={css.editProfileModal}>
      <img
        src={close}
        alt="ikona zamykająca modal"
        className={css.iconClose}
        onClick={onClose}
      />
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

export default UserInfoModal;
