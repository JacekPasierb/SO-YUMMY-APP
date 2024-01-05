import React from "react";
import css from "./LogoutBtn.module.css";
import sprite from "../../assets/icons/sprite.svg";

const LogoutBtn = () => {
  return (
    <button type="button" className={css.logoutBtn}>
      Log out
      <svg className={css.icon}>
        <use href={sprite + `#icon-arrow-right`}></use>
      </svg>
    </button>
  );
};

export default LogoutBtn;
