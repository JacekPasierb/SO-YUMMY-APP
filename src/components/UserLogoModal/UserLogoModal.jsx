import React, { useEffect, useState } from "react";
import css from "./UserLogoModal.module.css";
import EditProfile from "../EditProfile/EditProfile";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const UserLogoModal = () => {
  const handleModalClick = (event) => {
    // Zapobiegaj propagacji kliknięć z wnętrza modala na zewnątrz
    event.stopPropagation();
  };

  return (
    <div onClick={handleModalClick} className={css.userModal}>
      <EditProfile /> <LogoutBtn />
    </div>
  );
};
export default UserLogoModal;
