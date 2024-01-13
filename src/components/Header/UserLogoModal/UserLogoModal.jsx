import React from "react";
import css from "./UserLogoModal.module.css";

import BtnLogout from "../BtnLogout/BtnLogout";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";

const UserLogoModal = () => {
  const handleModalClick = (event) => {
    // Zapobiegaj propagacji kliknięć z wnętrza modala na zewnątrz
    event.stopPropagation();
  };

  return (
    <div onClick={handleModalClick} className={css.userModal}>
      <BtnEditProfile /> <BtnLogout />
    </div>
  );
};
export default UserLogoModal;
