import React from "react";
import css from "./UserLogo.module.css";
import avatar from "../../images/avatar.jpg";
import menu from "../../images/menuIkona.png";

const UserLogo = () => {
  return (
    <div className={css.boxAvatar}>
      <img
        src={avatar}
        alt="avatar"
        width="34"
        height="34"
        className={css.boxAvatar__avatar}
      />
      <span className={css.boxAvatar__username}>Username</span>
    </div>
  );
};

export default UserLogo;
