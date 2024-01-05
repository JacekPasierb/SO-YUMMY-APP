import React from "react";
import css from "./EditProfile.module.css";
import sprite from "../../assets/icons/sprite.svg";

const EditProfile = () => {
  return (
    <button type="button" className={css.editProfile}>
      Edit profile
      <svg className={css.icon}>
        <use href={sprite + `#icon-edit-01`}></use>
      </svg>
    </button>
  );
};

export default EditProfile;
