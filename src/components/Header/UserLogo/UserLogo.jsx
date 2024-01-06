import React, { useState } from "react";
import css from "./UserLogo.module.css";
import avatar from "../../../images/avatar.jpg";

import UserLogoModal from "../UserLogoModal/UserLogoModal";

const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  return (
    <div className={css.boxAvatar} onClick={handleLogoClick}>
      <img
        src={avatar}
        alt="avatar"
        width="34"
        height="34"
        className={css.boxAvatar__avatar}
      />
      <span className={css.boxAvatar__username}>Username</span>
      {isModalOpen && <UserLogoModal />}
    </div>
  );
};

export default UserLogo;
