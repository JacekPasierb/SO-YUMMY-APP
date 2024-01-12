import React, { useState } from "react";
import css from "./LogoutBtn.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import LogoutModal from "../LogoutModal/LogoutModal";
const LogoutBtn = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutModalClick = () => {
    setIsLogoutModalOpen((prevIsLogoutModalOpen) => !prevIsLogoutModalOpen);

    
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogoutModalClick}
        className={css.logoutBtn}
      >
        Log out
        <svg className={css.icon}>
          <use href={sprite + `#icon-arrow-right`}></use>
        </svg>
      </button>
      {isLogoutModalOpen && <LogoutModal onClose={handleLogoutModalClick} />}
    </>
  );
};

export default LogoutBtn;
